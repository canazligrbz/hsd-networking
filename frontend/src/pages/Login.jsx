import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { registerUser, loginUser } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';

const Logo = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="8"  r="4"   fill="#6366f1" />
    <circle cx="6"  cy="24" r="3.5" fill="#00c9ff" />
    <circle cx="26" cy="24" r="3.5" fill="#92fe9d" />
    <line x1="16" y1="12" x2="6"  y2="21" stroke="rgba(99,102,241,0.7)" strokeWidth="1.5"/>
    <line x1="16" y1="12" x2="26" y2="21" stroke="rgba(99,102,241,0.7)" strokeWidth="1.5"/>
    <line x1="10" y1="24" x2="22" y2="24" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5"/>
  </svg>
);

export default function Login() {
  const [searchParams] = useSearchParams();
  const [isRegister, setIsRegister] = useState(searchParams.get('tab') === 'register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isRegister) {
        await registerUser(email, password);
      } else {
        await loginUser(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      const messages = {
        'auth/email-already-in-use': 'Bu e-posta zaten kayıtlı.',
        'auth/invalid-email': 'Geçersiz e-posta adresi.',
        'auth/weak-password': 'Şifre en az 6 karakter olmalı.',
        'auth/invalid-credential': 'E-posta veya şifre hatalı.',
        'auth/user-not-found': 'Bu e-posta ile kayıtlı kullanıcı bulunamadı.',
      };
      setError(messages[err.code] || 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center" style={{ minHeight: '100vh' }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '420px' }}>

        <button
          onClick={() => navigate('/')}
          className="btn btn-secondary"
          style={{ padding: '6px 12px', marginBottom: '24px', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} /> Ana Sayfa
        </button>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <Logo size={48} />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>TeamSync</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isRegister ? 'IK hesabı oluştur' : 'Hesabına giriş yap'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="input-group">
              <label>Ad Soyad</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  className="input-field"
                  style={{ paddingLeft: '40px' }}
                  placeholder="Adınız Soyadınız"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="input-group">
            <label>E-posta</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                type="email"
                className="input-field"
                style={{ paddingLeft: '40px' }}
                placeholder="ornek@sirket.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Şifre</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                type="password"
                className="input-field"
                style={{ paddingLeft: '40px' }}
                placeholder={isRegister ? 'En az 6 karakter' : 'Şifreniz'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
              <p style={{ color: '#fca5a5', fontSize: '0.9rem' }}>{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', marginTop: '8px' }}
            disabled={loading}
          >
            {loading ? 'Lütfen bekleyin...' : isRegister ? 'Hesap Oluştur' : 'Giriş Yap'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {isRegister ? 'Zaten hesabın var mı? ' : 'Hesabın yok mu? '}
          <button
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 600 }}
          >
            {isRegister ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </p>
      </div>
    </div>
  );
}
