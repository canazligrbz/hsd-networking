import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ALL_QUESTIONS, ANSWER_OPTIONS } from '../config';
import { addParticipant, getEvent } from '../firebase';
import { CheckCircle2, ChevronRight, ChevronLeft, Zap } from 'lucide-react';

export default function Survey() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [step, setStep] = useState(-1);
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    getEvent(eventId).then(ev => {
      if (!ev) setNotFound(true);
      else setEvent(ev);
    });
  }, [eventId]);

  const handleStart = () => {
    if (name.trim()) setStep(0);
  };

  const handleAnswer = (question, answer) => {
    setAnswers({ ...answers, [question]: answer });
    setTimeout(() => {
      if (step < ALL_QUESTIONS.length - 1) setStep(step + 1);
    }, 300);
  };

  const handleSubmit = async () => {
    await addParticipant(eventId, { name, ...answers });
    setIsSubmitted(true);
  };

  if (notFound) {
    return (
      <div className="container flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <div className="glass-card animate-fade-in" style={{ maxWidth: '400px', textAlign: 'center' }}>
          <h2 style={{ color: '#ef4444', marginBottom: '12px' }}>Etkinlik Bulunamadı</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Bu link geçersiz veya etkinlik silinmiş olabilir.</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Yükleniyor...</p>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="container flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <div className="glass-card animate-fade-in" style={{ textAlign: 'center', maxWidth: '420px' }}>
          <CheckCircle2 size={64} color="var(--gradient-2)" style={{ margin: '0 auto 20px' }} />
          <h2 className="text-gradient" style={{ marginBottom: '12px' }}>Tebrikler, {name}!</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            <strong style={{ color: 'white' }}>{event.name}</strong> etkinliği için anketini başarıyla tamamladın.
            Ekipler kurulduğunda moderatör tarafından ilan edilecektir.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex justify-center items-center" style={{ minHeight: '100vh', padding: '24px' }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '600px' }}>

        {step === -1 ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Zap size={20} color="var(--primary-color)" />
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>TeamSync AI</span>
            </div>
            <h2 className="text-gradient" style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{event.name}</h2>
            {event.description && <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>{event.description}</p>}
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Sana en uygun takımı oluşturmak için birkaç soruya cevap vermen gerekiyor. Yaklaşık 3-5 dakika sürer.
            </p>
            <div className="input-group">
              <label>Adınız Soyadınız</label>
              <input
                type="text"
                className="input-field"
                placeholder="Örn: Ahmet Yılmaz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              />
            </div>
            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '12px', padding: '14px' }}
              onClick={handleStart}
              disabled={!name.trim()}
            >
              Ankete Başla <ChevronRight size={20} />
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
              <button className="btn btn-secondary" style={{ padding: '8px' }}
                onClick={() => setStep(step - 1)} disabled={step === 0}>
                <ChevronLeft size={20} />
              </button>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {step + 1} / {ALL_QUESTIONS.length}
              </span>
            </div>

            <h3 style={{ fontSize: '1.15rem', marginBottom: '24px', lineHeight: 1.5 }}>
              {ALL_QUESTIONS[step]}
            </h3>

            <div>
              {ANSWER_OPTIONS[ALL_QUESTIONS[step]]?.map((option, idx) => (
                <div
                  key={idx}
                  className={`option-card ${answers[ALL_QUESTIONS[step]] === option ? 'selected' : ''}`}
                  onClick={() => handleAnswer(ALL_QUESTIONS[step], option)}
                >
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${answers[ALL_QUESTIONS[step]] === option ? 'var(--primary-color)' : 'var(--border-color)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {answers[ALL_QUESTIONS[step]] === option && (
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary-color)' }} />
                    )}
                  </div>
                  <span style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{option}</span>
                </div>
              ))}
            </div>

            {step === ALL_QUESTIONS.length - 1 && answers[ALL_QUESTIONS[step]] && (
              <button
                className="btn btn-primary animate-fade-in"
                style={{ width: '100%', marginTop: '24px', padding: '14px' }}
                onClick={handleSubmit}
              >
                Analizi Tamamla <CheckCircle2 size={20} />
              </button>
            )}

            <div style={{ marginTop: '28px', background: 'rgba(255,255,255,0.05)', height: '4px', borderRadius: '2px' }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(to right, var(--gradient-1), var(--gradient-2))',
                width: `${((step + 1) / ALL_QUESTIONS.length) * 100}%`,
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
