"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler';
import { RadixCheckboxDemo } from '@/components/demo/RadixCheckboxDemo';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="login-wrapper">Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptQuery = searchParams.get('prompt');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("You must accept the terms and conditions.");
      return;
    }
    setIsLoading(true);

    // Mock Authentication Delay
    setTimeout(() => {
      localStorage.setItem('auth_token', 'mock_token_123');
      localStorage.setItem('user_email', email);
      setIsLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <main className="login-wrapper relative">
      <div className="absolute top-6 right-6 z-50">
        <ThemeTogglerButton variant="outline" size="md" direction="ttb" modes={['light', 'dark', 'system']} />
      </div>
      {/* Decorative background blobs to mimic the image */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <div className="login-card">
        <div className="login-header">
          <Link href="/">
            <div className="logo-circle">
              <img src="/Logo.svg" alt="Happy Book Logo" width={72} height={72} className="logo-img" />
            </div>
          </Link>
          <h1 className="title">Create an account</h1>
          {promptQuery ? (
            <div className="prompt-detected">
              <span className="prompt-badge">Question saved</span>
              <p className="subtitle prompt-subtitle" title={promptQuery}>
                Sign up to see the answer to: <br /><strong>"{promptQuery.length > 40 ? promptQuery.substring(0, 40) + '...' : promptQuery}"</strong>
              </p>
            </div>
          ) : (
            <p className="subtitle">Enter your details to sign up</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Name*</label>
            <input
              type="text"
              placeholder="Your full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email*</label>
            <input
              type="email"
              placeholder="example@happybook.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password*</label>
            <input
              type="password"
              placeholder="Create a strong password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-2 mb-4 flex items-center justify-between">
            <span className="text-sm text-[var(--on-surface-variant)]">
              {termsAccepted ? (
                <span className="text-[#34A853] font-medium flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  Terms and Conditions accepted
                </span>
              ) : (
                "You must agree to our terms of service."
              )}
            </span>
            
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="text-sm font-semibold text-[var(--primary)] hover:underline outline-none">
                  Read Terms
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] border border-[var(--sidebar-border)] bg-[var(--background)] text-[var(--on-surface)] rounded-2xl p-0 overflow-hidden flex flex-col max-h-[85vh]">
                <DialogHeader className="p-6 pb-4 border-b border-[var(--sidebar-border)]">
                  <DialogTitle className="text-xl font-bold">Terms and Conditions</DialogTitle>
                </DialogHeader>
                
                <div className="flex-1 overflow-y-auto p-6 text-sm text-[var(--on-surface-variant)] leading-relaxed space-y-4 custom-scrollbar">
                  <p>
                    <strong>1. Acceptance of Terms</strong><br/>
                    By accessing or using the Happy Book platform, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you disagree with any part of the terms, you may not access the service.
                  </p>
                  <p>
                    <strong>2. User Accounts</strong><br/>
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                  </p>
                  <p>
                    <strong>3. Acceptable Use</strong><br/>
                    You agree not to use the platform for any illegal activities or to violate any laws in your jurisdiction. The AI Tutor features are built to assist your learning process and should be used ethically for supplementary education.
                  </p>
                  <p>
                    <strong>4. Intellectual Property</strong><br/>
                    The Service and its original content, features, and functionality are and will remain the exclusive property of Happy Book and its licensors.
                  </p>
                  <p>
                    <strong>5. Limitation of Liability</strong><br/>
                    In no event shall Happy Book or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our platform.
                  </p>
                  <p>
                    <strong>6. Changes to Terms</strong><br/>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                  </p>
                </div>

                <div className="p-6 border-t border-[var(--sidebar-border)] bg-[var(--surface)] flex flex-col gap-5">
                  <div className="flex items-center space-x-3">
                    <Checkbox id="read-terms" className="border-2 border-[var(--on-surface-variant)] data-[state=checked]:bg-[var(--primary)] data-[state=checked]:border-[var(--primary)]" />
                    <label htmlFor="read-terms" className="text-sm font-medium leading-none text-[var(--on-surface)]">
                      I have completely read and understood all the terms and conditions outlined above.
                    </label>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <DialogClose asChild>
                      <button 
                        type="button" 
                        onClick={() => setTermsAccepted(false)}
                        className="px-4 py-2 rounded-xl text-sm font-medium border border-[var(--sidebar-border)] text-[var(--on-surface)] hover:bg-[var(--card)] transition-colors"
                      >
                        Decline
                      </button>
                    </DialogClose>
                    <DialogClose asChild>
                      <button 
                        type="button" 
                        onClick={() => {
                          const checkbox = document.getElementById('read-terms') as HTMLButtonElement;
                          if (checkbox && checkbox.getAttribute('data-state') === 'checked') {
                            setTermsAccepted(true);
                          } else {
                            alert("Please check the box to confirm you have read the terms.");
                            setTermsAccepted(false);
                          }
                        }}
                        className="px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--on-surface)] text-[var(--background)] hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        Accept Terms
                      </button>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <button type="submit" className="btn-submit" disabled={isLoading || !termsAccepted} style={{ marginTop: '8px' }}>
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>

        <div className="login-footer">
          <p>Already have an account? <Link href="/login">Sign in</Link></p>
        </div>
      </div>

      <style jsx>{`
        .login-wrapper {
          min-height: 100vh;
          background-color: #09090b;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: inherit;
        }

        .bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          opacity: 0.5;
          pointer-events: none;
        }
        .blob-1 {
          width: 800px;
          height: 800px;
          background: #18181b;
          top: -200px;
          right: -200px;
        }
        .blob-2 {
          width: 600px;
          height: 600px;
          background: #111113;
          bottom: -100px;
          left: -200px;
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          background: #09090b;
          border-radius: 12px;
          padding: 40px 32px;
          position: relative;
          z-index: 10;
          color: #fafafa;
          border: 1px solid #1f1f22;
        }

        .login-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 32px;
        }

        .logo-circle {
          display: grid;
          place-items: center;
          margin-bottom: 24px;
        }

        .logo-img {
          display: block;
          border-radius: 50%;
          object-fit: cover;
        }

        .title {
          font-size: 24px;
          font-weight: 600;
          color: #fafafa;
          margin: 0 0 8px 0;
          letter-spacing: -0.02em;
        }

        .subtitle {
          font-size: 14px;
          color: #a1a1aa;
          margin: 0;
        }
        
        .prompt-detected {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          background: rgba(var(--primary-rgb), 0.1);
          padding: 12px;
          border-radius: 8px;
          border: 1px solid rgba(var(--primary-rgb), 0.2);
          margin-top: 8px;
        }

        .prompt-badge {
          background: #fafafa;
          color: #09090b;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .prompt-subtitle {
          color: #e4e4e7;
          line-height: 1.5;
        }

        .social-login {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }

        .btn-social {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #09090b;
          border: 1px solid #27272a;
          color: #fafafa;
          padding: 10px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .btn-social:hover {
          background: #18181b;
        }

        .divider {
          position: relative;
          text-align: center;
          margin-bottom: 24px;
        }

        .divider::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 1px;
          background: #27272a;
          z-index: 1;
        }

        .divider span {
          position: relative;
          z-index: 2;
          background: #09090b;
          padding: 0 12px;
          color: #a1a1aa;
          font-size: 12px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          font-size: 13px;
          font-weight: 500;
          color: #e4e4e7;
        }

        .input-group input {
          width: 100%;
          background: #09090b;
          border: 1px solid #27272a;
          color: #fafafa;
          padding: 12px;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }

        .input-group input::placeholder {
          color: #71717a;
        }

        .input-group input:focus {
          border-color: #fafafa;
        }

        .btn-submit {
          width: 100%;
          background: #fafafa;
          color: #09090b;
          border: none;
          padding: 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .btn-submit:hover {
          opacity: 0.9;
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-footer {
          margin-top: 24px;
          text-align: center;
        }

        .login-footer p {
          margin: 0;
          font-size: 13px;
          color: #a1a1aa;
        }

        .login-footer a {
          color: #fafafa;
          font-weight: 500;
          text-decoration: none;
        }
        
        .login-footer a:hover {
          text-decoration: underline;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-left: 4px solid var(--background);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--on-surface-variant);
          border-radius: 10px;
          border: 4px solid var(--background);
          background-clip: padding-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--on-surface);
        }
      `}</style>
    </main>
  );
}
