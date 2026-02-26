"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [activePath, setActivePath] = useState(pathname);

    useEffect(() => {
        setActivePath(pathname);
    }, [pathname]);

    const navItems = [
        { name: 'Home', href: '/dashboard', icon: '🏠' },
        { name: 'Subjects', href: '/dashboard/subjects', icon: '📚' },
        { name: 'Calendar', href: '/dashboard/calendar', icon: '📅' },
        { name: 'AI Tutor', href: '/dashboard/tutor', icon: '🤖' },
    ];

    return (
        <div className="dashboard-shell">
            <aside className="sidebar">
                <div className="logo-area">
                    <div className="logo-icon">🎓</div>
                    <span className="logo-text">Happy Book</span>
                </div>

                <nav className="nav-links">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-item ${activePath === item.href ? 'active' : ''}`}
                        >
                            <span className="icon">{item.icon}</span>
                            <span className="label">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button onClick={() => router.push('/login')} className="logout-btn">
                        <span className="icon">🚪</span> Logout
                    </button>
                </div>
            </aside>

            <div className="content-area">
                <header className="top-header">
                    <div className="breadcrumbs">
                        {navItems.find(i => i.href === activePath)?.name || 'Dashboard'}
                    </div>
                    <div className="user-profile">
                        <button className="icon-btn">🔔</button>
                        <div className="avatar">S</div>
                    </div>
                </header>

                <main className="scrollable-content">
                    {children}
                </main>
            </div>

            <style jsx>{`
        .dashboard-shell {
          min-height: 100vh;
          display: flex;
          background: var(--background);
          color: var(--on-surface);
        }

        .sidebar {
          width: 260px;
          background: var(--surface);
          border-right: 1px solid rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          padding: 24px;
          position: fixed;
          top: 0; bottom: 0; left: 0;
          z-index: 100;
        }

        .logo-area {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
        }
        .logo-icon {
          width: 40px; height: 40px;
          background: rgba(100,74,64,0.1);
          color: var(--primary);
          border-radius: 10px;
          display: grid;
          place-items: center;
          font-size: 20px;
        }
        .logo-text { font-weight: 700; font-size: 20px; color: var(--on-surface); }

        .nav-links { display: grid; gap: 8px; flex: 1; }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          color: var(--on-surface-variant);
          font-weight: 600;
          transition: all 0.2s;
        }
        .nav-item:hover { background: rgba(0,0,0,0.04); color: var(--on-surface); }
        .nav-item.active { background: var(--primary); color: var(--on-primary); }
        .nav-item .icon { font-size: 18px; }

        .sidebar-footer { border-top: 1px solid rgba(0,0,0,0.08); padding-top: 16px; }
        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          text-align: left;
          padding: 12px 16px;
          color: var(--error);
          font-weight: 600;
          background: transparent;
          border-radius: 12px;
          cursor: pointer;
        }
        .logout-btn:hover { background: rgba(229,77,46,0.1); }

        .content-area {
          flex: 1;
          margin-left: 260px;
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        .top-header {
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          background: var(--surface);
          position: sticky;
          top: 0;
          z-index: 90;
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }
        .breadcrumbs { font-size: 18px; font-weight: 700; color: var(--on-surface); }
        .user-profile { display: flex; align-items: center; gap: 16px; }
        .icon-btn { background: none; border: none; font-size: 20px; cursor: pointer; padding: 8px; border-radius: 50%; }
        .icon-btn:hover { background: rgba(0,0,0,0.05); }
        .avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: var(--primary);
          color: var(--on-primary);
          display: grid;
          place-items: center;
          font-weight: 700;
          font-size: 14px;
        }

        .scrollable-content {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 32px 40px 64px;
        }

        @media (max-width: 1024px) {
          .sidebar { width: 80px; padding: 24px 12px; }
          .content-area { margin-left: 80px; }
          .logo-text, .label, .logout-btn span:not(.icon) { display: none; }
          .nav-item, .logout-btn { justify-content: center; padding: 12px; }
          .logo-area { justify-content: center; }
          .top-header { padding: 0 24px; }
          .scrollable-content { padding: 24px; }
        }
      `}</style>
        </div>
    );
}
