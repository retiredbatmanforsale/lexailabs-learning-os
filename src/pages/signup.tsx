import React, { useState } from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Signup functionality coming soon!");
  };

  return (
    <>
      <Head>
        <title>Create Account - Lex AI</title>
        <meta name="description" content="Create your Lex AI account and start learning" />
      </Head>

      <div className="flex min-h-screen">
        {/* Left — Form */}
        <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16 xl:px-24">
          <div className="mx-auto w-full max-w-md">
            {/* Logo */}
            <Link to="/" className="mb-10 inline-flex items-center gap-3 no-underline hover:no-underline">
              <img src="/lexai-logo.png" alt="Lex AI" width={40} height={40} className="size-10 rounded-lg" />
              <span className="text-xl font-bold text-gray-900">Lex AI</span>
            </Link>

            {/* Header */}
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Create your account</h1>
            <p className="mb-8 text-base text-gray-500">Start your AI learning journey today</p>

            {/* Google Sign Up */}
            <button
              onClick={() => alert("Google signup coming soon!")}
              className="mb-6 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <svg className="size-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign up with Google
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-400">or sign up with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                  minLength={8}
                />
                <p className="mt-1.5 text-xs text-gray-400">Must be at least 8 characters</p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  Create account
                </button>
              </div>

              <p className="text-center text-xs text-gray-400">
                By signing up, you agree to our{" "}
                <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
              </p>
            </form>

            {/* Sign in link */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Right — Decorative */}
        <div className="relative hidden lg:block lg:w-1/2">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-rose-50 to-blue-50" />
          <img
            src="/hero-section-bg.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">Master AI Skills</h2>
            <p className="mb-8 text-gray-600">Join thousands of professionals learning with Lex AI</p>
            <div className="relative w-full max-w-lg">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-200/40 via-purple-100/30 to-orange-200/40 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/90 p-2 shadow-2xl backdrop-blur-sm">
                <img src="/course-page-image.png" alt="Lex AI Platform" className="w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
