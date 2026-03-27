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
          <h1 className="title">Welcome to Happy Book</h1>
          <p className="subtitle">Login to your account now</p>
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
