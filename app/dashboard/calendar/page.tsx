"use client";

import { useState } from 'react';

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());

    // Generating a simple current month view
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    const assignments = [
        { id: 1, title: "Calculus Problem Set", date: 15, type: "exam", color: "#e54d2e" },
        { id: 2, title: "Biology Lab Report", date: 15, type: "assignment", color: "#ffa500" },
        { id: 3, title: "History Essay", date: 18, type: "assignment", color: "#00b5ad" },
        { id: 4, title: "Physics Quiz", date: 22, type: "exam", color: "#e54d2e" },
    ];

    const upcomingEvents = assignments.filter(a => a.date >= selectedDate);

    return (
        <div className="calendar-page">
            <div className="calendar-grid">
                <section className="main-cal card">
                    <div className="cal-header">
                        <h2>November 2024</h2>
                        <div className="cal-nav">
                            <button>←</button>
                            <button>→</button>
                        </div>
                    </div>

                    <div className="days-grid">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                            <div key={d} className="day-label">{d}</div>
                        ))}
                        {/* Blank start days for alignment simulation */}
                        <div className="day empty"></div>
                        <div className="day empty"></div>

                        {days.map(d => {
                            const hasEvents = assignments.some(a => a.date === d);
                            return (
                                <div
                                    key={d}
                                    className={`day ${selectedDate === d ? 'selected' : ''} ${hasEvents ? 'has-event' : ''}`}
                                    onClick={() => setSelectedDate(d)}
                                >
                                    <span className="day-num">{d}</span>
                                    {hasEvents && <div className="dot" />}
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="side-panel">
                    <div className="card event-list">
                        <h3>Events for Nov {selectedDate}</h3>
                        {upcomingEvents.length > 0 ? (
                            <ul className="events">
                                {assignments.filter(a => a.date === selectedDate).map(evt => (
                                    <li key={evt.id} className="event-item">
                                        <div className="evt-mark" style={{ background: evt.color }} />
                                        <div>
                                            <h4>{evt.title}</h4>
                                            <span>10:00 AM • {evt.type}</span>
                                        </div>
                                    </li>
                                ))}
                                {assignments.filter(a => a.date === selectedDate).length === 0 && (
                                    <p className="empty-msg">No events for this day.</p>
                                )}
                            </ul>
                        ) : (
                            <p className="empty-msg">Select a date to view events.</p>
                        )}

                        <h3 className="sub-header">Upcoming</h3>
                        <ul className="events upcoming">
                            {upcomingEvents.filter(a => a.date !== selectedDate).map(evt => (
                                <li key={evt.id} className="event-item faded">
                                    <div className="evt-mark" style={{ background: evt.color }} />
                                    <div>
                                        <h4>{evt.title}</h4>
                                        <span>Nov {evt.date} • {evt.type}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>

            <style jsx>{`
        .calendar-page { height: 100%; }
        .calendar-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
          height: 100%;
        }

        .card {
          background: var(--card);
          padding: 24px;
          border-radius: 20px;
          box-shadow: var(--shadow);
          border: 1px solid rgba(0,0,0,0.03);
        }

        /* Calendar Styles */
        .cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .cal-header h2 { margin: 0; font-size: 24px; }
        .cal-nav button { padding: 8px 16px; border-radius: 8px; background: var(--surface); color: var(--on-surface); font-weight: bold; cursor: pointer; }

        .days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }
        .day-label { text-align: center; color: var(--on-surface-variant); font-weight: 600; font-size: 14px; padding-bottom: 8px; }
        
        .day {
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          cursor: pointer;
          position: relative;
          font-weight: 600;
          transition: all 0.2s;
        }
        .day:hover { background: var(--surface); }
        .day.selected { background: var(--primary); color: var(--on-primary); }
        .dot { width: 6px; height: 6px; background: var(--error); border-radius: 50%; position: absolute; bottom: 8px; }
        .day.selected .dot { background: var(--on-primary); }

        /* Side Panel */
        .event-list h3 { margin: 0 0 16px; font-size: 18px; }
        .sub-header { margin: 24px 0 16px; font-size: 16px; color: var(--on-surface-variant); }
        .events { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
        
        .event-item { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 12px; background: var(--surface); }
        .evt-mark { width: 4px; height: 32px; border-radius: 2px; }
        .event-item h4 { margin: 0 0 4px; font-size: 15px; }
        .event-item span { font-size: 12px; color: var(--on-surface-variant); display: block; text-transform: capitalize; }
        
        .empty-msg { color: var(--on-surface-variant); font-style: italic; }
        .faded { opacity: 0.7; }

        @media (max-width: 900px) {
          .calendar-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
}
