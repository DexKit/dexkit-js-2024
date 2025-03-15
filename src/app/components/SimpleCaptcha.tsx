'use client';

import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useCaptcha } from './CaptchaContext';

export default function SimpleCaptcha() {
  const intl = useIntl();
  const { setCaptchaToken } = useCaptcha();
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    generateNewChallenge();
  }, []);

  const generateNewChallenge = () => {
    setFirstNumber(Math.floor(Math.random() * 10));
    setSecondNumber(Math.floor(Math.random() * 10));
    setUserAnswer('');
    setIsVerified(false);
    setError('');
  };

  const handleVerify = () => {
    const correctAnswer = firstNumber + secondNumber;
    
    if (parseInt(userAnswer) === correctAnswer) {
      setIsVerified(true);
      const simpleToken = btoa(`${firstNumber}+${secondNumber}=${correctAnswer}`);
      setCaptchaToken(simpleToken);
    } else {
      setError(intl.formatMessage({
        id: 'captcha.error',
        defaultMessage: 'Incorrect answer. Please try again.'
      }));
      generateNewChallenge();
    }
  };

  return (
    <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <div className="text-sm font-medium text-gray-700 mb-2">
        {intl.formatMessage({
          id: 'captcha.title',
          defaultMessage: 'Security verification'
        })}
      </div>
      
      {!isVerified ? (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="text-lg font-semibold text-black">{firstNumber} + {secondNumber} = ?</div>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-16 p-2 border text-black bg-gray-50 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              aria-label={intl.formatMessage({
                id: 'captcha.inputLabel',
                defaultMessage: 'Enter the answer'
              })}
            />
            <button
              type="button"
              onClick={handleVerify}
              className="px-3 py-2 bg-orange-400 text-black rounded hover:bg-orange-500 text-sm"
            >
              {intl.formatMessage({
                id: 'captcha.verify',
                defaultMessage: 'Verify'
              })}
            </button>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
      ) : (
        <div className="flex items-center text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {intl.formatMessage({
            id: 'captcha.verified',
            defaultMessage: 'Verification successful'
          })}
        </div>
      )}
    </div>
  );
} 