import React from 'react';
import { Linkedin, Twitter, Instagram, Youtube, Facebook } from 'lucide-react';
import styles from './styles.module.css';

const menuLinks = [
  { label: 'Individuals', href: 'https://www.lexailabs.com/individuals' },
  { label: 'Enterprises', href: 'https://www.lexailabs.com/enterprises' },
  { label: 'Institutions', href: 'https://www.lexailabs.com/institutions' },
  { label: 'Higher Education', href: 'https://www.lexailabs.com/institutions/higher-ed' },
  { label: 'Schools (K-12)', href: 'https://www.lexailabs.com/institutions/schools' },
];

const policyLinks = [
  { label: 'Refund Policy', href: 'https://www.lexailabs.com/refunds' },
  { label: 'Privacy Policy', href: 'https://www.lexailabs.com/privacy' },
  { label: 'Terms of Service', href: 'https://www.lexailabs.com/terms' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/106448852/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/labs_ai80315', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/lexailabs/', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/@LexAILabs', label: 'YouTube' },
  {
    icon: Facebook,
    href: 'https://www.facebook.com/people/Lex-AI-Labs/61580454084785/',
    label: 'Facebook',
  },
];

export default function Footer(): React.JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Social Links */}
          <div>
            <h4 className={styles.heading}>Connect</h4>
            <div className={styles.socials}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={styles.socialButton}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
            <img
              src="/img/lexailogo.svg"
              alt="Lex AI Labs"
              className={styles.footerLogo}
            />
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className={styles.heading}>Get in Touch</h4>
            <div className={styles.contactLinks}>
              <a href="mailto:puru@lexailabs.com" className={styles.contactLink}>
                puru@lexailabs.com
              </a>
              <a href="tel:+919996692323" className={styles.contactLink}>
                +91 99966 92323
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={styles.heading}>Quick Links</h4>
            <ul className={styles.linkList}>
              {menuLinks.concat(policyLinks).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={styles.footerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Lex AI Labs. All rights reserved.
          </p>
          <div className={styles.tagline}>
            <span className={styles.taglineText}>Build Intelligence. Build India.</span>
            <span className={styles.taglineDot}>&middot;</span>
            <span className={styles.taglineHashtag}>#AISeekhegaIndia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
