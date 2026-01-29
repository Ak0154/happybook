"use client";

import Link from 'next/link';

const languages = [
  { name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' }
];

export default function LanguagePage() {
  return (
    <main className="page">
      <header className="topbar">
        <Link href="/login" className="back">← Back</Link>
        <div className="title">Language</div>
        <div style={{ width: 40 }} />
      </header>

      <section className="content">
        <div className="copy">
          <h1>What language do you prefer?</h1>
          <p>Choose your preferred language for the app interface.</p>
          <div className="search">
            <input placeholder="Search for a language..." />
          </div>
        </div>

        <div className="list">
          {languages.map((lang) => (
            <article key={lang.name} className="card">
              <div className="flag">{lang.flag}</div>
              <div className="labels">
                <div className="native">{lang.nativeName}</div>
                <div className="name">{lang.name}</div>
              </div>
              <button className="select">Select</button>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <Link href="/academic-test" className="primary">Continue →</Link>
      </footer>

      <style jsx>{`
        .page { min-height: 100vh; background: var(--surface); color: var(--on-surface); display: flex; flex-direction: column; }
        .topbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; }
        .back { color: var(--on-surface); font-weight: 600; }
        .title { font-weight: 700; }
        .content { flex: 1; padding: 0 24px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
        .copy h1 { margin: 0 0 8px; font-size: clamp(28px, 3vw, 36px); }
        .copy p { margin: 0 0 16px; color: var(--on-surface-variant); font-size: 16px; }
        .search input { width: 100%; padding: 14px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.08); background: var(--card); }
        .list { display: grid; gap: 12px; }
        .card { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 12px; padding: 16px; border-radius: 14px; background: var(--card); box-shadow: var(--shadow); }
        .flag { font-size: 22px; }
        .native { font-weight: 700; }
        .name { color: var(--on-surface-variant); font-size: 14px; }
        .select { border: 1px solid rgba(0,0,0,0.12); background: transparent; padding: 10px 14px; border-radius: 10px; font-weight: 700; cursor: pointer; }
        .footer { padding: 20px 24px 32px; }
        .primary { display: inline-block; background: var(--primary); color: var(--on-primary); padding: 14px 18px; border-radius: 14px; font-weight: 700; text-align: center; width: 100%; max-width: 360px; box-shadow: 0 12px 24px rgba(100,74,64,0.25); }
        @media (max-width: 900px) { .content { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .page { background: var(--surface); } .topbar { padding: 12px 16px; } .content { padding: 0 16px 16px; } }
      `}</style>
    </main>
  );
}
