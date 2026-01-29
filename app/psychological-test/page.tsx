"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const questions = [
  {
    id: 1,
    question: "When faced with a difficult new topic, you are most likely to...",
    options: [
      "Dive in and try to figure it out on my own.",
      "Look for a video tutorial first.",
      "Read articles and documentation.",
      "Ask a friend or mentor for help."
    ]
  },
  {
    id: 2,
    question: "How do you prefer to study?",
    options: [
      "In short, intense bursts.",
      "In long, uninterrupted sessions.",
      "With music or background noise.",
      "In complete silence."
    ]
  },
  {
    id: 3,
    question: "What motivates you most?",
    options: [
      "Achieving high grades.",
      "Understanding the concept deeply.",
      "Competing with others.",
      "Applying knowledge practically."
    ]
  }
];

export default function PsychologicalTestPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const question = questions[currentQ];
  const currentNum = currentQ + 1;
  const total = questions.length;
  // Progress logic: (current index) / total
  const progress = (currentQ / total) * 100;

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
    } else {
      router.push('/loading');
    }
  };

  return (
    <main className="page">
      <header className="top">
        <Link href="/academic-test" className="ghost">×</Link>
        <div className="progress">
          <div className="bar"><span style={{ width: `${progress}%` }} /></div>
          <div className="pill">{currentNum}/{total}</div>
        </div>
      </header>

      <section className="body">
        <div className="icon">🧠</div>
        <div className="eyebrow">Question {currentNum} of {total}</div>
        <h1>{question.question}</h1>
        <div className="options">
          {question.options.map((opt) => (
            <button
              key={opt}
              className={`option ${selectedOption === opt ? 'selected' : ''}`}
              onClick={() => setSelectedOption(opt)}
            >
              <span className={`radio ${selectedOption === opt ? 'active' : ''}`} />
              <span>{opt}</span>
            </button>
          ))}
        </div>
      </section>

      <footer className="footer">
        <button
          className="primary"
          onClick={handleNext}
          disabled={!selectedOption}
        >
          {currentNum === total ? 'Finish Assessment' : 'Continue'} →
        </button>
      </footer>

      <style jsx>{`
        .page { min-height: 100vh; background: var(--surface); color: var(--on-surface); display: flex; flex-direction: column; }
        .top { display: flex; align-items: center; gap: 12px; padding: 16px 24px; position: sticky; top: 0; background: var(--surface); z-index: 10; }
        .ghost { background: var(--card); border-radius: 50%; width: 44px; height: 44px; display: grid; place-items: center; border: 1px solid rgba(0,0,0,0.08); text-decoration: none; color: var(--on-surface); font-weight: 700; }
        .progress { display: flex; align-items: center; gap: 12px; flex: 1; }
        .bar { flex: 1; height: 10px; background: var(--secondary); border-radius: 8px; overflow: hidden; }
        .bar span { display: block; height: 100%; background: var(--primary); transition: width 0.3s ease; }
        .pill { background: var(--primary); color: var(--on-primary); padding: 8px 12px; border-radius: 999px; font-weight: 700; font-size: 14px; }
        
        .body { padding: 0 24px 24px; display: grid; gap: 14px; text-align: center; max-width: 500px; width: 100%; margin: 0 auto;  }
        .icon { width: 80px; height: 80px; border-radius: 50%; background: rgba(100,74,64,0.1); display: grid; place-items: center; font-size: 32px; justify-self: center; }
        .eyebrow { color: var(--primary); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; font-size: 12px; }
        h1 { margin: 0; font-size: clamp(20px, 4vw, 26px); line-height: 1.3; }
        
        .options { display: grid; gap: 12px; margin-top: 12px; }
        .option { display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: center; padding: 16px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.08); background: var(--card); cursor: pointer; text-align: left; transition: all 0.2s; color: var(--on-surface); font-size: 15px; }
        .option:hover { border-color: rgba(100,74,64,0.4); box-shadow: 0 8px 18px rgba(0,0,0,0.08); }
        .option.selected { border-color: var(--primary); background: rgba(100,74,64,0.05); }
        .radio { width: 22px; height: 22px; border: 2px solid rgba(0,0,0,0.25); border-radius: 50%; position: relative; }
        .radio.active { border-color: var(--primary); }
        .radio.active::after { content: ''; position: absolute; inset: 4px; background: var(--primary); border-radius: 50%; }
        
        .footer { margin-top: auto; padding: 20px 24px 32px; text-align: center; position: sticky; bottom: 0; background: linear-gradient(to top, var(--surface) 80%, transparent); }
        .primary { display: inline-block; background: var(--primary); color: var(--on-primary); padding: 14px 18px; border-radius: 14px; font-weight: 700; text-align: center; width: 100%; max-width: 320px; box-shadow: 0 12px 24px rgba(100,74,64,0.25); border: none; cursor: pointer; transition: opacity 0.2s; }
        .primary:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; }
        
        @media (max-width: 768px) { .body { padding: 0 16px 16px; } .top { padding: 12px 16px; } }
      `}</style>
    </main>
  );
}
