"use client";

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { MdCall, MdEmail, MdLocationOn } from 'react-icons/md';
import Image from 'next/image';
import { toast } from 'react-toastify';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1440px] h-auto  mx-auto px-[120px] pt-[160px] pb-[100px] flex flex-col items-center gap-[40px] flex flex-col ">
        {/* Header Text */}
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="text-[16px] font-medium tracking-wider font-poppins   text-base leading-[26.4px] tracking-normal uppercase [leading-trim:none] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent">
            INDIA&apos;S BEST TAX EXPERTS AT YOUR SERVICE FOR A TAILORED, ACCURATE AND PREMIUM TAX FILING EXPERIENCE.
          </p>

          {/* Title */}
          <h1 className="font-poppins font-bold text-[42px] leading-[62.4px] tracking-normal [leading-trim:none]">
            Contact Us
          </h1>
        </div>

        <div className="flex flex-row w-full gap-10 h-auto">
          {/* Left Column - Contact Info */}
          <div className="flex flex-col gap-10">
            {/* Call Card */}
            <div className="flex flex-col w-[580px] h-[220px]  p-4 gap-4 rounded-[16px] bg-[#F8F0FF]">
              <div className="w-[60px] h-[60px] relative">
                <Image src="/contactbookspng.png" alt="Call" fill className="object-contain" />
              </div>
              <h3 className="font-poppins font-semibold text-[#1498EB] text-[28px] leading-[38.4px] tracking-normal">
                Call
              </h3>
              <p className="font-poppins font-normal text-base leading-6 tracking-normal">
                +91 9717245289 ; +91 9873945289
              </p>
            </div>

            {/* Mail Card */}
            <div className="flex flex-col w-[580px] h-[220px]  p-4 gap-4 rounded-[16px] bg-[#F8F0FF]">
              <div className="w-[60px] h-[60px] relative">
                <Image src="/mailPng.png" alt="Call" fill className="object-contain" />
              </div>
              <h3 className="font-poppins font-semibold text-[#1498EB] text-[28px] leading-[38.4px] tracking-normal">
                Mail
              </h3>
              <p className="font-poppins font-normal text-base leading-6 tracking-normal">
                support@candidtax.in
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-[580px] h-auto min-h-[480px] gap-4 rounded-[16px] p-4 bg-[#F8F0FF] flex flex-col justify-between">
            <form id="contact-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder=""
                className="w-[548px] h-[52px] gap-[10px] rounded-[10px] p-2 border border-[#8E8E93] bg-white"
                labelClassName="font-poppins font-normal text-base leading-6 tracking-normal"
              />

              <Input
                label="Email"
                variant="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
                required
                placeholder=""
                className="w-[548px] h-[52px] gap-[10px] rounded-[10px] p-2 border border-[#8E8E93] bg-white"
                labelClassName="font-poppins font-normal text-base leading-6 tracking-normal"
              />

              <div className="flex flex-col gap-2">
                <label className="font-poppins font-normal text-base leading-6 tracking-normal">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-[548px] h-[140px] gap-[10px] rounded-[10px] p-2 border border-[#D9D9D9] bg-white"
                  placeholder=""
                  required
                />
              </div> 
              <div className="flex justify-center mt-auto">
                <Button variant="brand" type="submit" isLoading={loading} className="h-[48px] rounded-[8px] font-poppins font-semibold text-base">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Offices Card */}
        <div className="w-full bg-[#F8F0FF] flex  flex-col  p-4 gap-4 rounded-[16px] bg-[#F8F0FF]">
          <div className="w-[60px] h-[60px] relative">
            <Image src="/mappng.png" alt="Offices" fill className="object-contain" />
          </div>
          <h3 className="text-[#1498EB] font-poppins font-semibold text-[24px] leading-[36px]">
            Offices
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="flex flex-col gap-1">
              <p className="font-poppins font-normal text-base leading-6 tracking-normal">
                <span className="font-poppins font-bold text-base leading-6 tracking-normal">Delhi:</span > Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-poppins font-normal text-base leading-6 tracking-normal">
                <span className="font-poppins font-bold text-base leading-6 tracking-normal">Noida:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-poppins font-normal text-base leading-6 tracking-normal">
                <span className="font-poppins font-bold text-base leading-6 tracking-normal">Gurugram:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-poppins font-normal text-base leading-6 tracking-normal">
                <span className="font-poppins font-bold text-base leading-6 tracking-normal">Ghaziabad:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-poppins font-normal text-base leading-6 tracking-normal">
                <span className="font-poppins font-bold text-base leading-6 tracking-normal">Faridabad:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
