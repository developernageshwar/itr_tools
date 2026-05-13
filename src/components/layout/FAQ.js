"use client";

import React, { useState } from 'react';

const FAQItem = ({ number, question, answer, isOpen, onClick }) => {
  return (
    <div className="mb-4">
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-4 rounded-[16px] transition-all duration-300 ${isOpen ? 'bg-[#F0F4FF]' : 'bg-[#F0F4FF]/50 hover:bg-[#F0F4FF]'}`}
      >
        <div className="flex items-center gap-2">
          <span className="font-poppins font-semibold text-base leading-6 tracking-normal [leading-trim:none] align-middle  ">{number}.</span>
          <span className="font-poppins font-semibold text-base leading-6 tracking-normal [leading-trim:none] align-middle">{question}</span>
        </div>
        <span className="text-[24px] font-light text-brand-dark">{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div className="px-6 pb-4 bg-light-blue rounded-b-[20px] -mt-4">
          <p className="font-poppins font-normal text-base leading-6 tracking-normal [leading-trim:none] align-middle">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }
  ];

  return (
    <section className="w-full bg-white pt-[40px] border-b-[4px] border-transparent" style={{ borderImage: 'linear-gradient(to right, #1498EB, #962DE3) 1' }}>
      <div className="max-w-[1440px] mx-auto flex flex-col gap-[40px] px-4 md:px-20 pb-20">
        {/* Header */}
        <div className="flex flex-col gap-4 ">
          <p className="text-[16px] font-medium tracking-wider font-poppins   text-base leading-[26.4px] tracking-normal uppercase [leading-trim:none] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent">
            Clear answers to help you choose the right way to file — with complete confidence .
          </p>

          <h2 className="font-poppins font-bold text-[42px] leading-[62.4px] tracking-normal [leading-trim:none]">
            FAQ: Everything you need to know
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* FAQ List */}
          <div className="flex flex-col gap-2">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                number={index + 1}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>

          {/* Illustration Column */}
          <div className="hidden lg:flex justify-center items-center h-full">
            <div className="relative w-full max-w-[600px] aspect-square">
              <img
                src="/faqimg.gif"
                alt="Office Illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
