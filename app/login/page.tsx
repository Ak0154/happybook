"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock Authentication Delay
    setTimeout(() => {
      // Create a mock session
      localStorage.setItem('auth_token', 'mock_token_123');
      localStorage.setItem('user_email', email);

      setIsLoading(false);
      router.push('/language');
    }, 1000);
  };

  return (
    <main className="shell">
      <header className="header">
        <div className="logo-box">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>
        <div className="header-text">
          <h2 className="eyebrow">Conquer Your Coursework</h2>
          <p className="subtitle">Last-minute academic support.</p>
        </div>
      </header>

      <section className="card">
        {/* Toggle Switch */}
        <div className="segmented">
          <button
            type="button"
            className={isLogin ? 'active' : ''}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            type="button"
            className={!isLogin ? 'active' : ''}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {isLogin && (
            <div className="forgot-password">
              <button type="button" className="link-btn">Forgot Password?</button>
            </div>
          )}

          <button type="submit" className="primary" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
          </button>
        </form>

        <div className="divider"><span>or</span></div>

        <div className="social-buttons">
          <button className="outlined">
            <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="Google" width="24" height="24" />
            <span>Continue with Google</span>
          </button>
          <button className="outlined">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" width="20" height="20" className="apple-icon" />
            <span>Continue with Apple</span>
          </button>
        </div>

        <p className="tos">
          By continuing, you agree to our <button className="link-btn inline">Terms of Service</button>.
        </p>
      </section>

      <style jsx>{`
        .shell {
          min-height: 100vh;
          background: var(--surface);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px;
        }
        .header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 24px;
          margin-bottom: 32px;
          text-align: center;
        }
        .logo-box {
          width: 64px;
          height: 64px;
          background: rgba(100, 74, 64, 0.2);
          border-radius: 16px;
          display: grid;
          place-items: center;
          color: var(--primary);
          margin-bottom: 16px;
        }
        .header-text h2 {
          font-size: 24px;
          font-weight: 700;
          color: var(--on-surface);
          margin: 0 0 8px;
        }
        .subtitle {
          color: var(--on-surface-variant);
          font-size: 16px;
          margin: 0;
        }
        .card {
          width: 100%;
          max-width: 480px;
          background: var(--card);
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.05);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .segmented {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--secondary);
          padding: 4px;
          border-radius: 8px;
        }
        .segmented button {
          border: none;
          background: transparent;
          padding: 10px;
          font-weight: 600;
          font-size: 14px;
          border-radius: 6px;
          cursor: pointer;
          color: var(--on-surface-variant);
          transition: all 0.2s;
        }
        .segmented .active {
          background: var(--card);
          color: var(--on-surface);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .form {
          display: grid;
          gap: 16px;
        }
        .field {
          display: grid;
          gap: 8px;
        }
        .field label {
          font-weight: 500;
          color: var(--on-surface);
          font-size: 16px;
        }
        .field input {
          width: 100%;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.1);
          background: var(--surface);
          font-size: 16px;
          color: var(--on-surface);
          transition: border-color 0.2s;
        }
        .field input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(100, 74, 64, 0.1);
        }
        
        .forgot-password {
          display: flex;
          justify-content: flex-end;
          margin-top: -8px;
        }
        .link-btn {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 500;
          font-size: 14px;
          text-decoration: underline;
          cursor: pointer;
          padding: 0;
        }
        .link-btn.inline { display: inline; }

        .primary {
          background: var(--primary);
          color: var(--on-primary);
          border: none;
          padding: 14px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          margin-top: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: opacity 0.2s;
        }
        .primary:disabled { opacity: 0.7; cursor: not-allowed; }
        
        .divider {
          position: relative;
          text-align: center;
          color: var(--on-surface-variant);
          font-size: 14px;
        }
        .divider span {
          background: var(--card);
          padding: 0 16px;
          position: relative;
          z-index: 1;
        }
        .divider::before {
          content: '';
          position: absolute;
          left: 0; right: 0; top: 50%;
          height: 1px;
          background: rgba(0,0,0,0.1);
        }

        .social-buttons {
          display: grid;
          gap: 12px;
        }
        .outlined {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: var(--on-surface);
          border: 1px solid rgba(0,0,0,0.1);
          padding: 12px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 16px;
          gap: 12px;
        }
        .apple-icon { filter: invert(var(--apple-icon-invert)); }
        
        /* Dark Mode adjustments for Apple Logo */
        @media (prefers-color-scheme: dark) {
          .apple-icon { filter: invert(1); }
        }
        @media (prefers-color-scheme: light) {
          :root { --apple-icon-invert: 0; }
        }
        
        .tos {
          margin: 0;
          color: var(--on-surface-variant);
          font-size: 12px;
          text-align: center;
        }
      `}</style>
    </main>
  );
}
