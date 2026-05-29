"use client";

import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi';

const SuccessModal = ({ isOpen, onClose, onProceed }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[400px]">
      <div className="p-10 flex flex-col items-center text-center gap-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <HiCheckCircle className="text-green-500 w-20 h-20" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="font-poppins font-semibold text-2xl text-black">Verification Successful!</h2>
          <p className="font-poppins text-gray-500 text-sm">
            Your PAN details have been verified and linked successfully to your account.
          </p>
        </div>

        <Button
          variant="brand"
          className="w-full py-3"
          onClick={onProceed}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
