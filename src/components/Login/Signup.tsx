"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface SignupProps {
  onSwitchToSignin?: () => void;
  onSuccess?: () => void;
}

export default function Signup({ onSwitchToSignin, onSuccess }: SignupProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // OTP Verification States
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Timer countdown when OTP is sent
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Step 1: Send Signup OTP (UI simulation)
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || formData.password !== formData.confirmPassword) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
      setTimer(60);
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    }, 600);
  };

  // Step 2: Verify Signup OTP & Finish Registration
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onSuccess) onSuccess();
    }, 700);
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (isResending || timer > 0) return;
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setTimer(60);
      setOtp(["", "", "", "", "", ""]);
      otpInputRefs.current[0]?.focus();
    }, 500);
  };

  // OTP Input handlers
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      const digits = pasteData.split("");
      setOtp(digits);
      otpInputRefs.current[5]?.focus();
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-[0.8vw]">
      {/* 1. Header Section with Website Branding */}
      <div className="text-center flex flex-col items-center">
        {/* Website Logo & Name */}
        <div className="flex items-center gap-[0.4vw] mb-[0.6vh]">
          <div className="relative w-[2.2vw] h-[2.2vw] min-w-[28px] min-h-[28px]">
            <Image
              src="/navBar/logo.svg"
              alt="The Wow World Logo"
              fill
              className="object-contain drop-shadow-xs"
              priority
            />
          </div>
          <div className="flex flex-col text-[0.85vw] font-bold leading-none items-start">
            <span
              className="tracking-widest uppercase bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #FC0780 0%, #FB352E 20%, #F6AB03 43%, #0DC36B 64%, #089889 84%, #04ACBF 100%)",
              }}
            >
              THE
            </span>
            <span
              className="tracking-widest uppercase bg-clip-text text-transparent font-black mt-[1px]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #FC0780 0%, #FB352E 20%, #F6AB03 43%, #0DC36B 64%, #089889 84%, #04ACBF 100%)",
              }}
            >
              WOW WORLD
            </span>
          </div>
        </div>

        <h1 className="text-[clamp(19px,1.5vw,25px)] font-bold tracking-tight text-gray-900 uppercase leading-tight font-sans">
          {isOtpSent ? "Verify Email" : "Create Your Account"}
        </h1>
        <p className="text-[clamp(12px,0.8vw,14px)] text-gray-500 mt-[0.2vw]">
          {isOtpSent ? (
            <span>
              Code sent to <span className="font-semibold text-gray-800">{formData.email}</span>
            </span>
          ) : (
            "Join The Wow World and explore extraordinary journeys"
          )}
        </p>
      </div>

      {/* 2. Unified Form */}
      {!isOtpSent ? (
        /* Step 1: Input Registration Details */
        <form
          onSubmit={handleSendOtp}
          className="flex-1 flex flex-col justify-center gap-[0.6vw] mt-[0.3vw]"
          noValidate
        >
          {/* Full Name */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-[0.8vw] flex items-center pointer-events-none text-gray-400">
              <Icon icon="lucide:user" className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" />
            </div>
            <input
              type="text"
              name="name"
              autoComplete="name"
              disabled={isLoading}
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full pl-[2.4vw] pr-[0.8vw] py-[0.55vw] bg-white border border-gray-200 rounded-[0.65vw] text-[clamp(12px,0.8vw,14px)] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF2D75] focus:ring-2 focus:ring-pink-100 transition-all disabled:opacity-60 shadow-xs"
            />
          </div>

          {/* Email Address */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-[0.8vw] flex items-center pointer-events-none text-gray-400">
              <Icon icon="codicon:mail" className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" />
            </div>
            <input
              type="email"
              name="email"
              autoComplete="email"
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full pl-[2.4vw] pr-[0.8vw] py-[0.55vw] bg-white border border-gray-200 rounded-[0.65vw] text-[clamp(12px,0.8vw,14px)] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF2D75] focus:ring-2 focus:ring-pink-100 transition-all disabled:opacity-60 shadow-xs"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-[0.8vw] flex items-center pointer-events-none text-gray-400">
              <Icon icon="ep:lock" className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              disabled={isLoading}
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full pl-[2.4vw] pr-[2.4vw] py-[0.55vw] bg-white border border-gray-200 rounded-[0.65vw] text-[clamp(12px,0.8vw,14px)] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF2D75] focus:ring-2 focus:ring-pink-100 transition-all disabled:opacity-60 shadow-xs"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-[0.8vw] flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
            >
              {showPassword ? (
                <Icon icon="lucide:eye-off" className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" />
              ) : (
                <Icon icon="lucide:eye" className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-[0.8vw] flex items-center pointer-events-none text-gray-400">
              <Icon icon="ep:lock" className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              autoComplete="new-password"
              disabled={isLoading}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full pl-[2.4vw] pr-[2.4vw] py-[0.55vw] bg-white border border-gray-200 rounded-[0.65vw] text-[clamp(12px,0.8vw,14px)] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF2D75] focus:ring-2 focus:ring-pink-100 transition-all disabled:opacity-60 shadow-xs"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-[0.8vw] flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
            >
              {showConfirmPassword ? (
                <Icon icon="lucide:eye-off" className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" />
              ) : (
                <Icon icon="lucide:eye" className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" />
              )}
            </button>
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-start gap-[0.4vw] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-[0.1vw] h-[0.9vw] w-[0.9vw] min-w-[14px] min-h-[14px] rounded-[0.2vw] border-gray-300 text-[#FF2D75] focus:ring-pink-200 cursor-pointer accent-[#FF2D75]"
            />
            <span className="text-[clamp(11px,0.72vw,13px)] text-gray-500 leading-tight">
              I agree to the{" "}
              <span className="text-[#FF2D75] font-medium hover:underline">Terms of Service</span>
              {" "}and{" "}
              <span className="text-[#FF2D75] font-medium hover:underline">Privacy Policy</span>
            </span>
          </label>

          {/* Get Code Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading || !formData.email || !formData.password || !formData.confirmPassword}
              className="w-full py-[0.65vw] px-[0.8vw] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] hover:from-[#e62066] hover:to-[#ff4785] active:opacity-95 text-white font-semibold text-[clamp(13px,0.85vw,15px)] rounded-[0.65vw] shadow-[0_0.3vw_1vw_rgba(255,45,117,0.35)] hover:shadow-[0_0.4vw_1.2vw_rgba(255,45,117,0.45)] transition-all flex items-center justify-center gap-[0.4vw] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Icon icon="lucide:loader-2" className="w-[0.9vw] h-[0.9vw] animate-spin" />
                  <span>Sending Code...</span>
                </>
              ) : (
                <>
                  <span>Get Verification Code</span>
                  <Icon icon="lucide:arrow-right" className="w-[0.9vw] h-[0.9vw]" />
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative text-center my-[0.15vw]">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <span className="relative px-[0.6vw] bg-white text-[clamp(11px,0.75vw,13px)] text-gray-400 font-medium">
              or sign up with
            </span>
          </div>

          {/* Google Signup Button */}
          <div>
            <button
              type="button"
              disabled={isLoading}
              className="w-full py-[0.6vw] px-[0.8vw] bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-[clamp(12px,0.78vw,14px)] font-medium rounded-[0.65vw] transition-colors flex items-center justify-center gap-[0.5vw] shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Sign-up with Google</span>
            </button>
          </div>
        </form>
      ) : (
        /* Step 2: 6-Digit OTP Verification View */
        <form
          onSubmit={handleVerifyOtp}
          className="flex-1 flex flex-col justify-center gap-[1.2vw] mt-[0.5vw]"
          noValidate
        >
          <div className="flex flex-col gap-[0.6vw]">
            <div className="flex items-center justify-between px-[0.2vw]">
              <label className="text-[clamp(12px,0.75vw,14px)] font-semibold text-gray-700">
                Enter 6-Digit OTP:
              </label>
              <div className="text-[clamp(12px,0.75vw,14px)] text-gray-500">
                {timer > 0 ? (
                  <span className="font-semibold text-[#FF2D75]">Resend in {timer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isResending}
                    className="font-semibold text-[#FF2D75] hover:text-[#e62066] underline cursor-pointer"
                  >
                    {isResending ? "Sending..." : "Resend OTP"}
                  </button>
                )}
              </div>
            </div>

            {/* 6 OTP Inputs */}
            <div className="flex justify-between gap-[0.35vw]" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    otpInputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-[2.6vw] h-[2.6vw] min-w-[34px] min-h-[34px] text-center text-[clamp(14px,1.1vw,18px)] font-medium text-gray-900 bg-white border border-gray-200 rounded-[0.6vw] focus:outline-none focus:border-[#FF2D75] focus:ring-2 focus:ring-pink-100 transition-all shadow-xs"
                  autoComplete="one-time-code"
                />
              ))}
            </div>
          </div>

          {/* Action Button: Verify & Create Account */}
          <div>
            <button
              type="submit"
              disabled={isLoading || otp.join("").length !== 6}
              className="w-full py-[0.65vw] px-[0.8vw] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] hover:from-[#e62066] hover:to-[#ff4785] active:opacity-95 text-white font-semibold text-[clamp(13px,0.85vw,15px)] rounded-[0.65vw] shadow-[0_0.3vw_1vw_rgba(255,45,117,0.35)] hover:shadow-[0_0.4vw_1.2vw_rgba(255,45,117,0.45)] transition-all flex items-center justify-center gap-[0.4vw] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Icon icon="lucide:loader-2" className="w-[0.9vw] h-[0.9vw] animate-spin" />
                  <span>Verifying & Creating...</span>
                </>
              ) : (
                <>
                  <span>Verify & Create Account</span>
                  <Icon icon="lucide:arrow-right" className="w-[0.9vw] h-[0.9vw]" />
                </>
              )}
            </button>
          </div>

          {/* Back to Edit Details */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsOtpSent(false)}
              className="inline-flex items-center gap-[0.3vw] text-[clamp(12px,0.75vw,14px)] text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            >
              <Icon icon="lucide:arrow-left" className="w-[0.8vw] h-[0.8vw]" />
              <span>Edit Details / Change Email</span>
            </button>
          </div>
        </form>
      )}

      {/* 6. Footer Switcher */}
      <div className="text-center text-[clamp(12px,0.8vw,14px)] text-gray-500 pt-[0.4vw]">
        Already have an Account ?{" "}
        <button
          type="button"
          onClick={onSwitchToSignin}
          className="font-semibold text-[#FF2D75] hover:text-[#e62066] hover:underline cursor-pointer"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
