import React, { useState, useEffect } from 'react';
import { IoArrowBack, IoLockClosed, IoCheckmarkCircle, IoAlert, IoEye, IoEyeOff } from 'react-icons/io5';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './resetPassword.module.css';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [state, setState] = useState('initial'); // 'initial', 'loading', 'success', 'error'
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Check if token exists on component mount
  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token. Please request a new password reset.');
      setState('error');
    }
  }, [token]);

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update password strength for password field
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const validateForm = () => {
    if (!formData.password) {
      setError('Please enter a new password');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (!formData.confirmPassword) {
      setError('Please confirm your password');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (passwordStrength < 3) {
      setError('Password is too weak. Please include uppercase, lowercase, numbers, and special characters.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setState('error');
      return;
    }

    setState('loading');
    setError('');
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app: API call to reset password
      // const response = await fetch('/api/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     token: token,
      //     password: formData.password,
      //     confirmPassword: formData.confirmPassword
      //   })
      // });

      // Simulate success
      setMessage('Your password has been successfully reset. You can now log in with your new password.');
      setState('success');
      
      // Auto-redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      setError('Failed to reset password. The reset link may have expired. Please request a new one.');
      setState('error');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const getPasswordStrengthClass = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return styles.strengthVeryWeak;
      case 2: return styles.strengthWeak;
      case 3: return styles.strengthFair;
      case 4: return styles.strengthGood;
      case 5: return styles.strengthStrong;
      default: return styles.strengthDefault;
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return 'Very Weak';
      case 2: return 'Weak';
      case 3: return 'Fair';
      case 4: return 'Good';
      case 5: return 'Strong';
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <IoLockClosed className={styles.headerIcon} />
          </div>
          
          <h1 className={styles.title}>Reset Your Password</h1>
          
          <p className={styles.subtitle}>
            {state === 'success' ? 
              "Password reset successful!" : 
              "Enter your new password below"
            }
          </p>
        </div>

        {/* Success Message */}
        {state === 'success' && (
          <div className={styles.alertSuccess}>
            <IoCheckmarkCircle className={styles.alertIcon} />
            <p className={styles.alertText}>{message}</p>
          </div>
        )}

        {/* Error Message */}
        {state === 'error' && error && (
          <div className={styles.alertError}>
            <IoAlert className={styles.alertIcon} />
            <p className={styles.alertText}>{error}</p>
          </div>
        )}

        {/* Form */}
        {(state === 'initial' || state === 'loading' || state === 'error') && token && (
          <div className={styles.form}>
            {/* New Password Field */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>New Password *</label>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  disabled={state === 'loading'}
                  className={`${styles.input} ${state === 'loading' ? styles.inputDisabled : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.eyeButton}
                >
                  {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className={styles.strengthContainer}>
                  <div className={styles.strengthHeader}>
                    <span className={`${styles.strengthText} ${getPasswordStrengthClass()}`}>
                      {getPasswordStrengthText()}
                    </span>
                    <span className={styles.strengthScore}>
                      {passwordStrength}/5
                    </span>
                  </div>
                  <div className={styles.strengthBar}>
                    <div 
                      className={`${styles.strengthFill} ${getPasswordStrengthClass()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Confirm Password *</label>
              <div className={styles.inputWrapper}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                  disabled={state === 'loading'}
                  className={`${styles.input} ${state === 'loading' ? styles.inputDisabled : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={styles.eyeButton}
                >
                  {showConfirmPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className={styles.matchIndicator}>
                  <span className={formData.password === formData.confirmPassword ? 
                    styles.matchSuccess : styles.matchError
                  }>
                    {formData.password === formData.confirmPassword ? 
                      '✓ Passwords match' : 
                      '✗ Passwords do not match'
                    }
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={state === 'loading'}
              className={`${styles.submitButton} ${state === 'loading' ? styles.submitLoading : ''}`}
            >
              {state === 'loading' ? (
                <div className={styles.loadingContent}>
                  <div className={styles.spinner}></div>
                  Resetting...
                </div>
              ) : (
                <div className={styles.submitContent}>
                  <IoLockClosed size={16} />
                  Reset Password
                </div>
              )}
            </button>
          </div>
        )}

        {/* Success Actions */}
        {state === 'success' && (
          <div className={styles.successActions}>
            <p className={styles.redirectText}>
              Redirecting to login page in 3 seconds...
            </p>
            <button onClick={handleBackToLogin} className={styles.goToLoginButton}>
              Go to Login Now
            </button>
          </div>
        )}

        {/* Back to Login */}
        <div className={styles.backSection}>
          <button onClick={handleBackToLogin} className={styles.backButton}>
            <IoArrowBack size={16} />
            Back to Login
          </button>
        </div>

        {/* Password Requirements */}
        {(state === 'initial' || state === 'error') && token && (
          <div className={styles.requirements}>
            <h4 className={styles.requirementsTitle}>Password Requirements:</h4>
            <ul className={styles.requirementsList}>
              <li>At least 8 characters long</li>
              <li>Include uppercase and lowercase letters</li>
              <li>Include at least one number</li>
              <li>Include at least one special character</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}