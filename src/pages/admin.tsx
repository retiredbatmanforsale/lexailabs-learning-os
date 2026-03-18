import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useHistory } from '@docusaurus/router';

interface Organization {
  id: string;
  name: string;
  slug: string;
  emailDomains: string[];
  isActive: boolean;
  accessStartDate: string | null;
  accessEndDate: string | null;
  createdAt: string;
  _count?: { members: number; preloadedStudents: number };
}

interface Student {
  id: string;
  email: string;
  name: string | null;
  claimed: boolean;
  createdAt: string;
  claimedBy?: { id: string; name: string; email: string } | null;
}

interface OrgDetail extends Organization {
  members: Array<{
    id: string;
    user: { id: string; name: string; email: string };
    isActive: boolean;
  }>;
  preloadedStudents: Student[];
}

function AdminPanelContent() {
  const { useAuth } = require('../hooks/useAuth');
  const { apiFetch } = require('../services/api');
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const history = useHistory();

  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<OrgDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Create org form
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgSlug, setNewOrgSlug] = useState('');
  const [newOrgDomains, setNewOrgDomains] = useState('');
  const [newOrgStartDate, setNewOrgStartDate] = useState('');
  const [newOrgEndDate, setNewOrgEndDate] = useState('');
  const [createError, setCreateError] = useState('');
  const [createLoading, setCreateLoading] = useState(false);

  // Add student form
  const [studentEmail, setStudentEmail] = useState('');
  const [studentName, setStudentName] = useState('');
  const [addStudentError, setAddStudentError] = useState('');
  const [addStudentLoading, setAddStudentLoading] = useState(false);
  const [addStudentSuccess, setAddStudentSuccess] = useState('');

  // CSV upload
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvResult, setCsvResult] = useState<{ added: number; skipped: number; errors: string[] } | null>(null);
  const [csvLoading, setCsvLoading] = useState(false);

  // Timeline edit
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [timelineLoading, setTimelineLoading] = useState(false);
  const [timelineError, setTimelineError] = useState('');

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'ADMIN')) {
      history.push('/login?redirect=/admin');
    }
  }, [authLoading, isAuthenticated, user, history]);

  const fetchOrgs = useCallback(async () => {
    try {
      const data = await apiFetch('/admin/organizations');
      setOrgs(data.organizations);
    } catch (err: any) {
      console.error('Failed to fetch orgs:', err);
    } finally {
      setLoading(false);
    }
  }, [apiFetch]);

  const fetchOrgDetail = useCallback(async (orgId: string) => {
    try {
      const data = await apiFetch(`/admin/organizations/${orgId}`);
      setSelectedOrg(data.organization);
      setEditStartDate(
        data.organization.accessStartDate
          ? data.organization.accessStartDate.slice(0, 16)
          : ''
      );
      setEditEndDate(
        data.organization.accessEndDate
          ? data.organization.accessEndDate.slice(0, 16)
          : ''
      );
    } catch (err: any) {
      console.error('Failed to fetch org detail:', err);
    }
  }, [apiFetch]);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'ADMIN') {
      fetchOrgs();
    }
  }, [isAuthenticated, user, fetchOrgs]);

  const handleCreateOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');
    setCreateLoading(true);
    try {
      const body: Record<string, any> = {
        name: newOrgName,
        slug: newOrgSlug,
        emailDomains: newOrgDomains.split(',').map((d) => d.trim()).filter(Boolean),
      };
      if (newOrgStartDate) body.accessStartDate = new Date(newOrgStartDate).toISOString();
      if (newOrgEndDate) body.accessEndDate = new Date(newOrgEndDate).toISOString();

      await apiFetch('/admin/organizations', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      setNewOrgName('');
      setNewOrgSlug('');
      setNewOrgDomains('');
      setNewOrgStartDate('');
      setNewOrgEndDate('');
      fetchOrgs();
    } catch (err: any) {
      setCreateError(err.message || 'Failed to create organization');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrg) return;
    setAddStudentError('');
    setAddStudentSuccess('');
    setAddStudentLoading(true);
    try {
      const body: Record<string, any> = { email: studentEmail };
      if (studentName) body.name = studentName;
      await apiFetch(`/admin/organizations/${selectedOrg.id}/students`, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      setStudentEmail('');
      setStudentName('');
      setAddStudentSuccess(`Invitation sent to ${studentEmail}`);
      fetchOrgDetail(selectedOrg.id);
    } catch (err: any) {
      setAddStudentError(err.message || 'Failed to add student');
    } finally {
      setAddStudentLoading(false);
    }
  };

  const handleCsvUpload = async () => {
    if (!csvFile || !selectedOrg) return;
    setCsvLoading(true);
    setCsvResult(null);
    try {
      const formData = new FormData();
      formData.append('file', csvFile);
      const data = await apiFetch(
        `/admin/organizations/${selectedOrg.id}/students/bulk`,
        { method: 'POST', body: formData }
      );
      setCsvResult({ added: data.added, skipped: data.skipped, errors: data.errors });
      setCsvFile(null);
      fetchOrgDetail(selectedOrg.id);
    } catch (err: any) {
      setCsvResult({ added: 0, skipped: 0, errors: [err.message || 'Upload failed'] });
    } finally {
      setCsvLoading(false);
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (!selectedOrg) return;
    if (!confirm('Remove this student? Their invitation will be revoked.')) return;
    try {
      await apiFetch(
        `/admin/organizations/${selectedOrg.id}/students/${studentId}`,
        { method: 'DELETE' }
      );
      fetchOrgDetail(selectedOrg.id);
    } catch (err: any) {
      alert(err.message || 'Failed to remove student');
    }
  };

  const handleUpdateTimeline = async () => {
    if (!selectedOrg) return;
    setTimelineError('');
    setTimelineLoading(true);
    try {
      const body: Record<string, any> = {
        accessStartDate: editStartDate ? new Date(editStartDate).toISOString() : null,
        accessEndDate: editEndDate ? new Date(editEndDate).toISOString() : null,
      };
      await apiFetch(`/admin/organizations/${selectedOrg.id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
      });
      fetchOrgDetail(selectedOrg.id);
      fetchOrgs();
    } catch (err: any) {
      setTimelineError(err.message || 'Failed to update timeline');
    } finally {
      setTimelineLoading(false);
    }
  };

  const handleToggleActive = async () => {
    if (!selectedOrg) return;
    try {
      await apiFetch(`/admin/organizations/${selectedOrg.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive: !selectedOrg.isActive }),
      });
      fetchOrgDetail(selectedOrg.id);
      fetchOrgs();
    } catch (err: any) {
      alert(err.message || 'Failed to toggle status');
    }
  };

  const getTimelineStatus = (org: Organization | OrgDetail) => {
    const now = new Date();
    if (org.accessEndDate && new Date(org.accessEndDate) < now) {
      return `Expired on ${new Date(org.accessEndDate).toLocaleDateString()}`;
    }
    if (org.accessStartDate && new Date(org.accessStartDate) > now) {
      return `Starts on ${new Date(org.accessStartDate).toLocaleDateString()}`;
    }
    if (org.accessEndDate) {
      const days = Math.ceil(
        (new Date(org.accessEndDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      return `Active (${days} day${days !== 1 ? 's' : ''} remaining)`;
    }
    return 'No expiry set';
  };

  if (authLoading || loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <p style={{ color: 'var(--ifm-color-emphasis-600)' }}>Loading...</p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid var(--ifm-color-emphasis-300)',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    background: 'var(--ifm-background-color)',
    color: 'var(--ifm-font-color-base)',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.25rem',
    fontSize: '0.8125rem',
    fontWeight: 500,
  };

  const cardStyle: React.CSSProperties = {
    border: '1px solid var(--ifm-color-emphasis-200)',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    background: 'var(--ifm-background-surface-color)',
    marginBottom: '1.5rem',
  };

  // Organization detail view
  if (selectedOrg) {
    return (
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1rem' }}>
        <button
          onClick={() => {
            setSelectedOrg(null);
            setAddStudentError('');
            setAddStudentSuccess('');
            setCsvResult(null);
            setTimelineError('');
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            color: 'var(--ifm-color-primary)',
            padding: '0',
            marginBottom: '1rem',
          }}
        >
          &larr; Back to organizations
        </button>

        {/* Org header */}
        <div style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: '0 0 0.25rem' }}>{selectedOrg.name}</h2>
            <p style={{ margin: 0, color: 'var(--ifm-color-emphasis-500)', fontSize: '0.875rem' }}>
              Slug: {selectedOrg.slug} &middot; Domains: {selectedOrg.emailDomains.join(', ')}
            </p>
          </div>
          <button
            onClick={handleToggleActive}
            className={`button button--sm ${selectedOrg.isActive ? 'button--danger' : 'button--success'}`}
          >
            {selectedOrg.isActive ? 'Deactivate' : 'Activate'}
          </button>
        </div>

        {/* Access Timeline */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>Access Timeline</h3>
          <p style={{
            margin: '0 0 1rem',
            fontSize: '0.875rem',
            color: 'var(--ifm-color-emphasis-600)',
            fontWeight: 500,
          }}>
            Status: {getTimelineStatus(selectedOrg)}
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={labelStyle}>Start Date</label>
              <input
                type="datetime-local"
                value={editStartDate}
                onChange={(e) => setEditStartDate(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={labelStyle}>End Date</label>
              <input
                type="datetime-local"
                value={editEndDate}
                onChange={(e) => setEditEndDate(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-500)', margin: '0 0 0.75rem' }}>
            Leave blank for immediate start / no expiry
          </p>
          {timelineError && (
            <p style={{ color: 'var(--ifm-color-danger)', fontSize: '0.8125rem', margin: '0 0 0.5rem' }}>{timelineError}</p>
          )}
          <button
            onClick={handleUpdateTimeline}
            disabled={timelineLoading}
            className="button button--primary button--sm"
          >
            {timelineLoading ? 'Updating...' : 'Update Timeline'}
          </button>
        </div>

        {/* Add Student */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem' }}>Add Student</h3>
          <form onSubmit={handleAddStudent} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: 2, minWidth: '200px' }}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                required
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="student@example.com"
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1, minWidth: '150px' }}>
              <label style={labelStyle}>Name (optional)</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Student name"
                style={inputStyle}
              />
            </div>
            <button
              type="submit"
              disabled={addStudentLoading}
              className="button button--primary button--sm"
            >
              {addStudentLoading ? 'Adding...' : 'Add & Send Invite'}
            </button>
          </form>
          {addStudentError && (
            <p style={{ color: 'var(--ifm-color-danger)', fontSize: '0.8125rem', marginTop: '0.5rem', marginBottom: 0 }}>{addStudentError}</p>
          )}
          {addStudentSuccess && (
            <p style={{ color: 'var(--ifm-color-success)', fontSize: '0.8125rem', marginTop: '0.5rem', marginBottom: 0 }}>{addStudentSuccess}</p>
          )}
        </div>

        {/* CSV Upload */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem' }}>Bulk Upload (CSV)</h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--ifm-color-emphasis-500)', margin: '0 0 0.75rem' }}>
            Upload a CSV file with student emails and optional names. See the expected format below.
          </p>

          {/* Example CSV preview */}
          <div style={{
            border: '1px solid var(--ifm-color-emphasis-200)',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            marginBottom: '1rem',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem 0.75rem',
              background: 'var(--ifm-color-emphasis-100)',
              borderBottom: '1px solid var(--ifm-color-emphasis-200)',
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ifm-color-emphasis-700)' }}>
                students_template.csv
              </span>
              <button
                onClick={() => {
                  const csvContent = 'email,name\nalice@university.edu,Alice Johnson\nbob@university.edu,Bob Smith\ncharlie@university.edu,\njane@university.edu,Jane Doe\n';
                  const blob = new Blob([csvContent], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'students_template.csv';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                style={{
                  background: 'none',
                  border: '1px solid var(--ifm-color-emphasis-300)',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.6875rem',
                  color: 'var(--ifm-color-primary)',
                  padding: '0.2rem 0.5rem',
                  fontWeight: 500,
                }}
              >
                Download Template
              </button>
            </div>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.8125rem',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
            }}>
              <thead>
                <tr style={{ background: 'var(--ifm-color-emphasis-100)' }}>
                  <th style={{
                    textAlign: 'left',
                    padding: '0.375rem 0.75rem',
                    borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                    borderRight: '1px solid var(--ifm-color-emphasis-200)',
                    fontWeight: 600,
                    color: 'var(--ifm-color-emphasis-800)',
                  }}>email</th>
                  <th style={{
                    textAlign: 'left',
                    padding: '0.375rem 0.75rem',
                    borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                    fontWeight: 600,
                    color: 'var(--ifm-color-emphasis-800)',
                  }}>name</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { email: 'alice@university.edu', name: 'Alice Johnson' },
                  { email: 'bob@university.edu', name: 'Bob Smith' },
                  { email: 'charlie@university.edu', name: '' },
                  { email: 'jane@university.edu', name: 'Jane Doe' },
                ].map((row, i) => (
                  <tr key={i} style={{
                    borderBottom: i < 3 ? '1px solid var(--ifm-color-emphasis-200)' : 'none',
                  }}>
                    <td style={{
                      padding: '0.375rem 0.75rem',
                      borderRight: '1px solid var(--ifm-color-emphasis-200)',
                      color: 'var(--ifm-font-color-base)',
                    }}>{row.email}</td>
                    <td style={{
                      padding: '0.375rem 0.75rem',
                      color: row.name ? 'var(--ifm-font-color-base)' : 'var(--ifm-color-emphasis-400)',
                      fontStyle: row.name ? 'normal' : 'italic',
                    }}>{row.name || '(optional)'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-500)', margin: '0 0 0.75rem', lineHeight: 1.5 }}>
            The first row must be the header: <strong>email,name</strong>. The <strong>name</strong> column is optional &mdash; leave it blank if unknown. Max 10,000 rows per upload.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
              style={{ fontSize: '0.875rem' }}
            />
            <button
              onClick={handleCsvUpload}
              disabled={!csvFile || csvLoading}
              className="button button--primary button--sm"
            >
              {csvLoading ? 'Uploading...' : 'Upload & Send Invites'}
            </button>
          </div>
          {csvResult && (
            <div style={{ marginTop: '0.75rem', fontSize: '0.8125rem' }}>
              <p style={{ margin: '0 0 0.25rem' }}>
                Added: {csvResult.added} &middot; Skipped (already claimed): {csvResult.skipped}
              </p>
              {csvResult.errors.length > 0 && (
                <div style={{ color: 'var(--ifm-color-danger)' }}>
                  {csvResult.errors.map((err, i) => (
                    <p key={i} style={{ margin: '0.125rem 0' }}>{err}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Students table */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem' }}>
            Students ({selectedOrg.preloadedStudents?.length || 0})
          </h3>
          {selectedOrg.preloadedStudents?.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--ifm-color-emphasis-200)' }}>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Email</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Date</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrg.preloadedStudents.map((s) => (
                    <tr key={s.id} style={{ borderBottom: '1px solid var(--ifm-color-emphasis-200)' }}>
                      <td style={{ padding: '0.5rem' }}>{s.email}</td>
                      <td style={{ padding: '0.5rem', color: s.name ? 'inherit' : 'var(--ifm-color-emphasis-400)' }}>
                        {s.name || '-'}
                      </td>
                      <td style={{ padding: '0.5rem' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          background: s.claimed ? '#dcfce7' : '#fef3c7',
                          color: s.claimed ? '#166534' : '#92400e',
                        }}>
                          {s.claimed ? 'Claimed' : 'Pending'}
                        </span>
                      </td>
                      <td style={{ padding: '0.5rem', color: 'var(--ifm-color-emphasis-500)' }}>
                        {new Date(s.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '0.5rem', textAlign: 'right' }}>
                        {!s.claimed && (
                          <button
                            onClick={() => handleDeleteStudent(s.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: 'var(--ifm-color-danger)',
                              fontSize: '0.75rem',
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: 'var(--ifm-color-emphasis-500)', fontSize: '0.875rem', margin: 0 }}>
              No students added yet.
            </p>
          )}
        </div>
      </div>
    );
  }

  // Organizations list view
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Admin Panel</h1>

      {/* Create org form */}
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem' }}>Create Organization</h3>
        <form onSubmit={handleCreateOrg}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                required
                value={newOrgName}
                onChange={(e) => setNewOrgName(e.target.value)}
                placeholder="Acme University"
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={labelStyle}>Slug</label>
              <input
                type="text"
                required
                value={newOrgSlug}
                onChange={(e) => setNewOrgSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="acme-university"
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={labelStyle}>Email Domains (comma-separated)</label>
            <input
              type="text"
              required
              value={newOrgDomains}
              onChange={(e) => setNewOrgDomains(e.target.value)}
              placeholder="acme.edu, acmeuniversity.edu"
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={labelStyle}>Access Start Date (optional)</label>
              <input
                type="datetime-local"
                value={newOrgStartDate}
                onChange={(e) => setNewOrgStartDate(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={labelStyle}>Access End Date (optional)</label>
              <input
                type="datetime-local"
                value={newOrgEndDate}
                onChange={(e) => setNewOrgEndDate(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-500)', margin: '0 0 0.75rem' }}>
            Leave dates blank for immediate start / no expiry
          </p>
          {createError && (
            <p style={{ color: 'var(--ifm-color-danger)', fontSize: '0.8125rem', marginBottom: '0.5rem' }}>{createError}</p>
          )}
          <button
            type="submit"
            disabled={createLoading}
            className="button button--primary button--sm"
          >
            {createLoading ? 'Creating...' : 'Create Organization'}
          </button>
        </form>
      </div>

      {/* Orgs table */}
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem' }}>Organizations</h3>
        {orgs.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--ifm-color-emphasis-200)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Slug</th>
                  <th style={{ textAlign: 'center', padding: '0.5rem' }}>Students</th>
                  <th style={{ textAlign: 'center', padding: '0.5rem' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Access Period</th>
                </tr>
              </thead>
              <tbody>
                {orgs.map((org) => (
                  <tr
                    key={org.id}
                    onClick={() => fetchOrgDetail(org.id)}
                    style={{
                      borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                      cursor: 'pointer',
                    }}
                  >
                    <td style={{ padding: '0.5rem', fontWeight: 500 }}>{org.name}</td>
                    <td style={{ padding: '0.5rem', color: 'var(--ifm-color-emphasis-500)' }}>{org.slug}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                      {org._count?.preloadedStudents || 0}
                    </td>
                    <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.125rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        background: org.isActive ? '#dcfce7' : '#fee2e2',
                        color: org.isActive ? '#166534' : '#991b1b',
                      }}>
                        {org.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '0.5rem', color: 'var(--ifm-color-emphasis-500)', fontSize: '0.75rem' }}>
                      {getTimelineStatus(org)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: 'var(--ifm-color-emphasis-500)', fontSize: '0.875rem', margin: 0 }}>
            No organizations yet. Create one above.
          </p>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Layout title="Admin Panel" description="Manage organizations and students">
      <BrowserOnly fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
          Loading...
        </div>
      }>
        {() => <AdminPanelContent />}
      </BrowserOnly>
    </Layout>
  );
}
