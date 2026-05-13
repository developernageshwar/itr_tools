"use client";

import React, { useState, useEffect, useRef } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { toast } from 'react-hot-toast';

const OTPModal = ({ isOpen, onClose, onVerify, panNumber, loading }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    let interval;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  useEffect(() => {
    if (isOpen) {
      setOtp(['', '', '', '', '', '']);
      setTimer(30);
      setCanResend(false);
      setTimeout(() => {
        if (inputs.current[0]) inputs.current[0].focus();
      }, 100);
    }
  }, [isOpen]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return false;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Focus next input
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    toast.success('OTP resent successfully');
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onVerify(otp.join(''));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[450px]">
      <div className="p-8 flex flex-col items-center gap-6">
        <div className="text-center">
          <h2 className="font-poppins font-semibold text-2xl text-black mb-2">Verify OTP</h2>
          <p className="font-poppins text-sm text-gray-500">
            Enter the 6-digit code sent to the mobile number linked with PAN <span className="font-semibold">{panNumber}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6">
          <div className="flex gap-2 justify-center my-4">
            {otp.map((data, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                type="text"
                maxLength="1"
                className="w-12 h-12 border-2 border-gray-200 rounded-lg text-center font-poppins font-semibold text-xl focus:border-blue-500 focus:outline-none transition-all"
                value={data}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          <div className="text-center">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-600 font-poppins font-medium text-sm hover:underline"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-gray-500 font-poppins text-sm">
                Resend OTP in <span className="font-semibold text-blue-600">{timer}s</span>
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="brand"
            className="w-full py-3 mt-2"
            isLoading={loading}
            disabled={otp.join('').length < 6 || loading}
          >
            Verify & Proceed
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default OTPModal;
