
import React, { useState, useEffect } from 'react';
import './App.css'; // For basic styling
import { quotesByAgeAndMood } from './quoteLibrary';

const themes = {
  light: {
    background: '#fffaf6',
    text: '#333',
    accent: '#f4a261',
  },
  calming: {
    background: '#fdf4ee',
    text: '#3e3e3e',
    accent: '#d1a38e',
  },
};

function App() {
  const [birthDate, setBirthDate] = useState(new Date().toISOString().slice(0, 10));
  const [currentAgeWeeks, setCurrentAgeWeeks] = useState(0);
  const [mood, setMood] = useState('❤️ Reassured');
  const [quote, setQuote] = useState('');
  const [theme, setTheme] = useState('light');
  const [isPremium, setIsPremium] = useState(false);
  const [customTime, setCustomTime] = useState('');
  const [journalNote, setJournalNote] = useState('');

  useEffect(() => {
    const today = new Date();
    const birth = new Date(birthDate);
    const ageInWeeks = Math.floor((today - birth) / (1000 * 60 * 60 * 24 * 7));
    setCurrentAgeWeeks(ageInWeeks);
  }, [birthDate]);

  useEffect(() => {
    if (quotesByAgeAndMood[currentAgeWeeks] && quotesByAgeAndMood[currentAgeWeeks][mood]) {
      const quoteList = quotesByAgeAndMood[currentAgeWeeks][mood];
      const random = quoteList[Math.floor(Math.random() * quoteList.length)];
      setQuote(random);
    } else {
      setQuote('You are doing beautifully, no matter the phase.');
    }
  }, [currentAgeWeeks, mood]);

  const colors = themes[theme];

  return (
    <div style={{ backgroundColor: colors.background, color: colors.text, minHeight: '100vh', padding: '2rem' }}>
      <h1>How are you feeling today?</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {['🌧️ Overwhelmed', '😢 Anxious / Doubting', '❤️ Reassured', '💪 Empowered', '😊 Joyful', '💤 Exhausted'].map((m) => (
          <button key={m} onClick={() => setMood(m)} style={{ backgroundColor: m === mood ? colors.accent : '#ccc' }}>{m}</button>
        ))}
      </div>

      <div style={{ marginTop: '2rem', fontStyle: 'italic' }}>{quote}</div>

      {isPremium && (
        <div style={{ marginTop: '2rem' }}>
          <label>Journal Entry:</label><br />
          <textarea
            value={journalNote}
            onChange={(e) => setJournalNote(e.target.value)}
            rows={4}
            cols={50}
            placeholder="Write your thoughts..."
          /><br />
          <button onClick={() => navigator.clipboard.writeText(journalNote)}>Copy Journal Entry</button>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <label>Baby's Birthdate:</label><br />
        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <label>Theme:</label><br />
        <button onClick={() => setTheme(theme === 'light' ? 'calming' : 'light')}>
          Switch to {theme === 'light' ? 'calming' : 'light'} theme
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <label>Premium Features:</label><br />
        <button onClick={() => setIsPremium(true)} disabled={isPremium}>
          {isPremium ? 'Premium Enabled ✅' : 'Upgrade to Premium'}
        </button>
        {isPremium && (
          <div style={{ marginTop: '1rem' }}>
            <label>Preferred Delivery Time:</label><br />
            <input type="text" placeholder="e.g., 8:00 AM" value={customTime} onChange={(e) => setCustomTime(e.target.value)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
