"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const languages = [
  { name: 'English', nativeName: 'English', flag: '🇬🇧', id: 'en' },
  { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', id: 'es' },
  { name: 'French', nativeName: 'Français', flag: '🇫🇷', id: 'fr' },
  { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', id: 'de' },
  { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', id: 'hi' },
  { name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', id: 'bn' },
  { name: 'Mandarin', nativeName: '中文', flag: '🇨🇳', id: 'zh' },
  { name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', id: 'pt' },
];

export default function LanguagePage() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filteredLanguages = languages.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedLang) {
      // Persist selection (mock)
      localStorage.setItem('preferred_language', selectedLang);
      router.push('/academic-test');
    }
  };

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
            <input
              placeholder="Search for a language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="list">
          {filteredLanguages.map((lang) => (
            <article
              key={lang.id}
              className={`card ${selectedLang === lang.id ? 'active' : ''}`}
              onClick={() => setSelectedLang(lang.id)}
            >
              <div className="flag">{lang.flag}</div>
              <div className="labels">
                <div className="native">{lang.nativeName}</div>
                <div className="name">{lang.name}</div>
              </div>
              <div className="radio-outer">
                {selectedLang === lang.id && <div className="radio-inner" />}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <button
          className="primary"
          disabled={!selectedLang}
          onClick={handleContinue}
        >
          Continue →
        </button>
      </footer>

      <style jsx>{`
        .page { min-height: 100vh; background: var(--surface); color: var(--on-surface); display: flex; flex-direction: column; }
        .topbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; position: sticky; top: 0; background: var(--surface); z-index: 10; }
        .back { color: var(--on-surface); font-weight: 600; }
        .title { font-weight: 700; }
        .content { flex: 1; padding: 0 24px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
        .copy h1 { margin: 0 0 8px; font-size: clamp(28px, 3vw, 36px); }
        .copy p { margin: 0 0 16px; color: var(--on-surface-variant); font-size: 16px; }
        .search input { width: 100%; padding: 14px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.08); background: var(--card); color: var(--on-surface); }
        .list { display: grid; gap: 12px; }
        .card { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 12px; padding: 16px; border-radius: 14px; background: var(--card); box-shadow: var(--shadow); cursor: pointer; border: 2px solid transparent; transition: all 0.2s; }
        .card:hover { transform: translateY(-2px); }
        .card.active { border-color: var(--primary); background: var(--card); }
        .flag { font-size: 22px; }
        .native { font-weight: 700; }
        .name { color: var(--on-surface-variant); font-size: 14px; }
        .radio-outer { width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--primary); display: grid; place-items: center; }
        .radio-inner { width: 10px; height: 10px; border-radius: 50%; background: var(--primary); }
        .footer { padding: 20px 24px 32px; position: sticky; bottom: 0; background: linear-gradient(to top, var(--surface) 80%, transparent); }
        .primary { display: block; background: var(--primary); color: var(--on-primary); padding: 14px 18px; border-radius: 14px; font-weight: 700; text-align: center; width: 100%; max-width: 360px; box-shadow: 0 12px 24px rgba(100,74,64,0.25); border: none; cursor: pointer; transition: opacity 0.2s; }
        .primary:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; }
        @media (max-width: 900px) { .content { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .content { padding: 0 16px 16px; } }
      `}</style>
    </main>
  );
}
