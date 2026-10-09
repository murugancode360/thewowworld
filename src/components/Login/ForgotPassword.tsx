"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface ForgotPasswordProps {
  initialEmail?: string;
  onSwitchToSignin?: () => void;
  onSuccess?: () => void;
}

export default function ForgotPassword({
  initialEmail = "",
  onSwitchToSignin,
  onSuccess,
}: ForgotPasswordProps) {
  const [email, setEmail] = useState(initialEmail);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  // Step 1: Send OTP
  const handleGetOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !newPassword || newPassword !== confirmPassword) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
      setTimer(60);
      setTimeout(() => otpInputRefs.current[0]?.focus(), 150);
    }, 600);
  };

  // Step 2: Update Password
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onSuccess) onSuccess();
      if (onSwitchToSignin) onSwitchToSignin();
    }, 700);
  };

  const handleOtpChange = (index: number, value: string) => {
    const sanitized = value.replace(/[^0-9]/g, "");
    const digit = sanitized.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 5) {
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
    const pastedData = e.clipboardData
      .getData("text")
      .trim()
      .replace(/[^0-9]/g, "")
      .slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((digit, i) => {
      if (i < 6) newOtp[i] = digit;
    });
    setOtp(newOtp);
    const nextIndex = Math.min(pastedData.length, 5);
    otpInputRefs.current[nextIndex]?.focus();
  };

  const handleResendOtp = () => {
    if (timer > 0 || isResending) return;
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setTimer(60);
      setOtp(["", "", "", "", "", ""]);
      otpInputRefs.current[0]?.focus();
    }, 500);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-[0.8vw]">
      {/* Header with Website Branding */}
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
          RESET PASSWORD
        </h1>
        <p className="text-[clamp(12px,0.8vw,14px)] text-gray-500 mt-[0.2vw]">
          Enter your details to reset your password
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={!isOtpSent ? handleGetOtp : handleUpdatePassword}
        className="flex-1 flex flex-col justify-center gap-[0.9vw] mt-[0.4vw]"
        noValidate
      >
        <div className="space-y-[0.75vw]">
          {/* Email Address */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-[0.8vw] flex items-center pointer-events-none text-gray-400">
              <Icon icon="codicon:mail" className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" />
            </div>
            <input
              type="email"
              name="email"
              disabled={isLoading || isOtpSent}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Gmail / Email ID"
              required
              className="w-full pl-[2.4vw] pr-[0.8vw] py-[0.65vw] bg-white border border-gray-200 rounded-[0.65vw] text-[clamp(12px,0.8vw,14px)] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF2D75] focus:ring-2 focus:ring-pink-100 transition-all disabled:opacity-60 shadow-xs"
            />
          </div>

          {/* New Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-[0.8vw] flex items-center pointer-events-none text-gray-400">
              <Icon icon="ep:lock" className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" />
            </div>
            <input
              type={showNewPass ? "text" : "password"}
              name="newPassword"
              disabled={isLoading || isOtpSent}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password (min 6 characters)"
              required
              className="w-full pl-[2.4vw] pr-[2.4vw] py-[0.65vw] bg-white border border-gray-200 rounded-[0.65vw] text-[clamp(12px,0.8vw,14px)] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF2D75] focus:ring-2 focus:ring-pink-100 transition-all disabled:opacity-60 shadow-xs"
            />
            <button
              type="button"
              onClick={() => setShowNewPass(!showNewPass)}
              className="absolute inset-y-0 right-0 pr-[0.8vw] flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
            >
              {showNewPass ? (
                <Icon icon="lucide:eye-off" className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" />
              ) : (
                <Icon icon="lucide:eye" className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" />
              )}
            </button>
          </div>

          {/* Confirm New Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-[0.8vw] flex items-center pointer-events-none text-gray-400">
              <Icon icon="ep:lock" className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" />
            </div>
            <input
              type={showConfirmPass ? "text" : "password"}
              name="confirmPassword"
              disabled={isLoading || isOtpSent}
              value={confirmPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Confirm New Password"
              required
              className="w-full pl-[2.4vw] pr-[2.4vw] py-[0.65vw] bg-white border border-gray-200 rounded-[0.65vw] text-[clamp(12px,0.8vw,14px)] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF2D75] focus:ring-2 focus:ring-pink-100 transition-all disabled:opacity-60 shadow-xs"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute inset-y-0 right-0 pr-[0.8vw] flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
            >
              {showConfirmPass ? (
                <Icon icon="lucide:eye-off" className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" />
              ) : (
                <Icon icon="lucide:eye" className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" />
              )}
            </button>
          </div>

          {/* 3. OTP Section */}
          {isOtpSent && (
            <div className="space-y-[0.4vw] pt-[0.4vw]">
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
                    className="w-[2.6vw] h-[2.6vw] min-w-[34px] min-h-[34px] text-center text-[clamp(14px,1vw,18px)] font-medium text-gray-900 bg-white border border-gray-200 rounded-[0.6vw] focus:outline-none focus:border-[#FF2D75] focus:ring-2 focus:ring-pink-100 transition-all shadow-xs"
                    autoComplete="one-time-code"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button: "Get OTP" or "Update Password" */}
        <div className="mt-[0.2vw]">
          {!isOtpSent ? (
            <button
              type="submit"
              disabled={isLoading || !email || !newPassword || !confirmPassword}
              className="w-full py-[0.65vw] px-[0.8vw] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] hover:from-[#e62066] hover:to-[#ff4785] active:opacity-95 text-white font-semibold text-[clamp(13px,0.85vw,15px)] rounded-[0.65vw] shadow-[0_0.3vw_1vw_rgba(255,45,117,0.35)] hover:shadow-[0_0.4vw_1.2vw_rgba(255,45,117,0.45)] transition-all flex items-center justify-center gap-[0.4vw] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Icon icon="lucide:loader-2" className="w-[0.9vw] h-[0.9vw] animate-spin" />
                  <span>Sending OTP...</span>
                </>
              ) : (
                <>
                  <span>Get OTP</span>
                  <Icon icon="lucide:arrow-right" className="w-[0.9vw] h-[0.9vw]" />
                </>
              )}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading || otp.join("").length !== 6}
              className="w-full py-[0.65vw] px-[0.8vw] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] hover:from-[#e62066] hover:to-[#ff4785] active:opacity-95 text-white font-semibold text-[clamp(13px,0.85vw,15px)] rounded-[0.65vw] shadow-[0_0.3vw_1vw_rgba(255,45,117,0.35)] hover:shadow-[0_0.4vw_1.2vw_rgba(255,45,117,0.45)] transition-all flex items-center justify-center gap-[0.4vw] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Icon icon="lucide:loader-2" className="w-[0.9vw] h-[0.9vw] animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <span>Update Password</span>
                  <Icon icon="lucide:arrow-right" className="w-[0.9vw] h-[0.9vw]" />
                </>
              )}
            </button>
          )}
        </div>
      </form>

      {/* Footer Switcher */}
      <div className="text-center text-[clamp(12px,0.8vw,14px)] text-gray-500 pt-[0.4vw]">
        Remember your password ?{" "}
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
