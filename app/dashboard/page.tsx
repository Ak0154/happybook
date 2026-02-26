"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [userName, setUserName] = useState('Scholar');

  useEffect(() => {
    // Mock user data retrieval
    // In a real app, this would come from an API or Context
    const email = localStorage.getItem('user_email');
    if (email) {
      setUserName(email.split('@')[0]);
    }
  }, []);

  return (
    <div className="dashboard-content">
      <section className="welcome-banner">
        <div>
          <h1>Hello, {userName}! 👋</h1>
          <p>Ready to conquer your coursework today?</p>
        </div>
        <div className="daily-streak">
          <span className="flame">🔥</span>
          <div className="streak-info">
            <strong>3 Day Streak</strong>
            <span>Keep it up!</span>
          </div>
        </div>
      </section>

      <div className="grid-layout">
        <section className="card assignments">
          <div className="card-header">
            <h2>Upcoming Assignments</h2>
            <Link href="/dashboard/calendar" className="see-all">See All</Link>
          </div>
          <ul className="assignment-list">
            <li className="assignment-item urgent">
              <div className="icon">📐</div>
              <div className="details">
                <h3>Calculus Problem Set</h3>
                <span>Due Today, 11:59 PM</span>
              </div>
              <span className="tag">Urgent</span>
            </li>
            <li className="assignment-item">
              <div className="icon">🧬</div>
              <div className="details">
                <h3>Biology Lab Report</h3>
                <span>Due Tomorrow</span>
              </div>
            </li>
          </ul>
        </section>

        <section className="card quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn">
              <span className="icon">➕</span>
              Add Task
            </button>
            <Link href="/dashboard/tutor" className="action-btn">
              <span className="icon">🤖</span>
              AI Tutor
            </Link>
          </div>
        </section>
      </div>

      <section className="card recent-activity">
        <h2>Weekly Focus</h2>
        <div className="graph-placeholder">
          {/* Placeholder for a chart/graph */}
          <div className="bar" style={{ height: '40%' }}></div>
          <div className="bar" style={{ height: '60%' }}></div>
          <div className="bar" style={{ height: '30%' }}></div>
          <div className="bar" style={{ height: '80%' }}></div>
          <div className="bar" style={{ height: '50%' }}></div>
          <div className="bar" style={{ height: '90%' }}></div>
          <div className="bar" style={{ height: '70%' }}></div>
        </div>
      </section>
      <style jsx>{`
        .dashboard-content {
          padding: 24px 40px 40px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Banner */
        .welcome-banner {
          background: linear-gradient(135deg, var(--card), var(--surface));
          border: 1px solid rgba(0,0,0,0.05);
          padding: 32px;
          border-radius: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: var(--shadow);
        }
        .welcome-banner h1 { margin: 0 0 8px; font-size: 28px; }
        .welcome-banner p { margin: 0; color: var(--on-surface-variant); }
        .daily-streak {
          background: rgba(255, 149, 0, 0.1);
          color: #ff9500;
          padding: 12px 20px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .daily-streak .flame { font-size: 24px; }
        .streak-info { display: flex; flex-direction: column; }
        .streak-info strong { font-size: 14px; }
        .streak-info span { font-size: 12px; opacity: 0.8; }

        /* Grid */
        .grid-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }
        .card {
          background: var(--card);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.03);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .card h2 { margin: 0; font-size: 18px; }
        .see-all { font-size: 14px; color: var(--primary); font-weight: 600; }

        .assignment-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
        .assignment-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px;
          border-radius: 12px;
          background: var(--surface);
          border: 1px solid rgba(0,0,0,0.03);
        }
        .assignment-item .icon {
          width: 40px; height: 40px;
          background: var(--card);
          border-radius: 10px;
          display: grid;
          place-items: center;
          font-size: 20px;
        }
        .assignment-item .details { flex: 1; }
        .assignment-item h3 { margin: 0 0 4px; font-size: 15px; }
        .assignment-item span { font-size: 12px; color: var(--on-surface-variant); }
        .assignment-item.urgent { border-left: 4px solid var(--error); }
        .tag {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 6px;
          background: rgba(229,77,46,0.1);
          color: var(--error);
        }

        .action-buttons {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 16px;
        }
        .action-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: var(--surface);
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.03);
          font-weight: 600;
          font-size: 14px;
          color: var(--on-surface);
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        .action-btn:hover {
          background: var(--primary);
          color: var(--on-primary);
        }
        .action-btn .icon { font-size: 24px; }

        .graph-placeholder {
          height: 150px;
          display: flex;
          align-items: flex-end;
          gap: 16px;
          padding: 16px;
        }
        .bar {
          flex: 1;
          background: var(--secondary);
          border-radius: 8px 8px 0 0;
          opacity: 0.6;
        }
        .bar:nth-child(even) { background: var(--primary); opacity: 0.8; }

        @media (max-width: 1024px) {
          .grid-layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .dashboard-content { padding: 24px 16px; }
        }
      `}</style>
    </div>
  );
}
