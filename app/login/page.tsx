"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        <ThemeTogglerButton variant="outline" size="md" direction="right" modes={['light', 'dark', 'system']} />
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
          <h1 className="title">Welcome to Happy Book</h1>
          <p className="subtitle">Login to your account now</p>
        </div>

        <div className="social-login">
          <button className="btn-social" type="button">
            <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign in with Google
          </button>
          <button className="btn-social" type="button">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            Sign in with Github
          </button>
        </div>

        <div className="divider">
          <span>or sign in with</span>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
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
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span className="checkbox-custom"></span>
              <span>Remember this device</span>
            </label>
            <button type="button" className="forgot-link">Forgot password?</button>
          </div>

          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link href="/signup">Create an account</Link></p>
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

        .form-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
          margin-bottom: 8px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #fafafa;
          cursor: pointer;
        }

        .checkbox-label input {
          display: none;
        }

        .checkbox-custom {
          width: 16px;
          height: 16px;
          border: 1px solid #27272a;
          border-radius: 4px;
          background: #09090b;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .checkbox-label input:checked + .checkbox-custom {
          background: #fafafa;
          border-color: #fafafa;
        }

        .checkbox-label input:checked + .checkbox-custom::after {
          content: '';
          width: 4px;
          height: 8px;
          border: solid #09090b;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
          margin-bottom: 2px;
        }

        .forgot-link {
          background: none;
          border: none;
          padding: 0;
          font-size: 13px;
          color: #fafafa;
          cursor: pointer;
        }

        .forgot-link:hover, .login-footer Link:hover {
          text-decoration: underline;
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
          margin-top: 8px;
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
      `}</style>
    </main>
  );
}
