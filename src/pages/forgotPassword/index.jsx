import { useState } from 'react';
import { IoArrowBack, IoMail, IoCheckmarkCircle, IoAlert, IoSend } from 'react-icons/io5';
import styles from './forgotPassword.module.css';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('initial'); // 'initial', 'loading', 'success', 'error'
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    if (!email) {
      setError('Please enter your email address');
      setState('error');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setState('error');
      return;
    }

    setState('loading');
    setError('');
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app: API call to send reset email
      // const response = await fetch('/api/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      // Simulate success
      setMessage(`Password reset instructions have been sent to ${email}`);
      setState('success');
      
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      setState('error');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const resetForm = () => {
    setState('initial');
    setEmail('');
    setMessage('');
    setError('');
  };

  const getSubtitleText = () => {
    switch (state) {
      case 'success':
        return "Check your email for reset instructions";
      case 'error':
        return "Please try again";
      default:
        return "Enter your email address and we'll send you a link to reset your password.";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <IoMail size={32} style={{ color: '#3b82f6' }} />
          </div>
          
          <h1 className={styles.title}>
            Forgot Password?
          </h1>
          
          <p className={styles.subtitle}>
            {getSubtitleText()}
          </p>
        </div>

        {/* Success Message */}
        {state === 'success' && (
          <div className={styles.alertSuccess}>
            <IoCheckmarkCircle size={20} style={{ color: '#16a34a', flexShrink: 0 }} />
            <p className={`${styles.alertText} ${styles.alertTextSuccess}`}>
              {message}
            </p>
          </div>
        )}

        {/* Error Message */}
        {state === 'error' && error && (
          <div className={styles.alertError}>
            <IoAlert size={20} style={{ color: '#dc2626', flexShrink: 0 }} />
            <p className={`${styles.alertText} ${styles.alertTextError}`}>
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        {(state === 'initial' || state === 'loading' || state === 'error') && (
          <div className={styles.formContainer}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={state === 'loading'}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
                className={styles.input}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={state === 'loading'}
              className={styles.submitButton}
            >
              {state === 'loading' ? (
                <>
                  <div className={styles.loadingSpinner}></div>
                  Sending...
                </>
              ) : (
                <>
                  <IoSend size={16} />
                  Send Reset Link
                </>
              )}
            </button>
          </div>
        )}

        {/* Success Actions */}
        {state === 'success' && (
          <div className={styles.successActions}>
            <button
              onClick={resetForm}
              className={styles.secondaryButton}
            >
              Send Another Email
            </button>
          </div>
        )}

        {/* Back to Login */}
        <div className={styles.backToLogin}>
          <button
            onClick={handleBackToLogin}
            className={styles.linkButton}
          >
            <IoArrowBack size={16} />
            Back to Login
          </button>
        </div>

        {/* Additional Help */}
        {state === 'success' && (
          <div className={styles.helpSection}>
            <p className={styles.helpText}>
              Didn't receive the email? Check your spam folder or contact support.
            </p>
            <p className={styles.helpTextLast}>
              The reset link will expire in 15 minutes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}