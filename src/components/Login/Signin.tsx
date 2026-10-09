"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface SigninProps {
  onSwitchToSignup?: () => void;
  onSwitchToForgotPassword?: (email?: string) => void;
  onSuccess?: () => void;
}

export default function Signin({
  onSwitchToSignup,
  onSwitchToForgotPassword,
  onSuccess,
}: SigninProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSwitchToForgotPassword) {
      onSwitchToForgotPassword(formData.emailId);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // UI mock simulation
    setTimeout(() => {
      setIsLoading(false);
      if (onSuccess) onSuccess();
    }, 800);
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
          WELCOME BACK
        </h1>
        <p className="text-[clamp(12px,0.8vw,14px)] text-gray-500 mt-[0.2vw]">
          Sign in to continue to The Wow World
        </p>
      </div>

      {/* 2. Inputs Form */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col justify-center gap-[1.1vw] mt-[0.5vw]"
        noValidate
      >
        {/* Email Address */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-[0.9vw] flex items-center pointer-events-none text-gray-400">
            <Icon icon="codicon:mail" className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" />
          </div>
          <input
            type="email"
            name="emailId"
            autoComplete="email"
            disabled={isLoading}
            value={formData.emailId}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full pl-[2.6vw] pr-[0.8vw] py-[0.7vw] bg-white border border-gray-200 rounded-[0.7vw] text-[clamp(13px,0.82vw,15px)] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF2D75] focus:ring-2 focus:ring-pink-100 transition-all disabled:opacity-60 shadow-xs"
          />
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-[0.9vw] flex items-center pointer-events-none text-gray-400">
              <Icon icon="ep:lock" className="w-[1.1vw] h-[1.1vw] min-w-[16px] min-h-[16px]" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              disabled={isLoading}
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full pl-[2.6vw] pr-[2.4vw] py-[0.7vw] bg-white border border-gray-200 rounded-[0.7vw] text-[clamp(13px,0.82vw,15px)] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF2D75] focus:ring-2 focus:ring-pink-100 transition-all disabled:opacity-60 shadow-xs"
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

          <div className="flex justify-end pt-[0.6vw]">
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              disabled={isLoading}
              className="text-[clamp(12px,0.8vw,14px)] text-[#FF2D75] hover:text-[#e62066] font-semibold hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {/* 3. Sign In Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading || !formData.emailId || !formData.password}
            className="w-full py-[0.7vw] px-[0.8vw] bg-gradient-to-r from-[#FF2D75] to-[#FF5E97] hover:from-[#e62066] hover:to-[#ff4785] active:opacity-95 text-white font-semibold text-[clamp(13px,0.88vw,15px)] rounded-[0.7vw] shadow-[0_0.3vw_1vw_rgba(255,45,117,0.35)] hover:shadow-[0_0.4vw_1.2vw_rgba(255,45,117,0.45)] transition-all flex items-center justify-center gap-[0.5vw] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Icon icon="lucide:loader-2" className="w-[1vw] h-[1vw] animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <Icon icon="lucide:arrow-right" className="w-[1vw] h-[1vw]" />
              </>
            )}
          </button>
        </div>

        {/* 4. Divider */}
        <div className="relative text-center my-[0.2vw]">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100" />
          </div>
          <span className="relative px-[0.6vw] bg-white text-[clamp(11px,0.78vw,13px)] text-gray-400 font-medium">
            or continue with
          </span>
        </div>

        {/* 5. Google Login Button */}
        <div>
          <button
            type="button"
            disabled={isLoading}
            className="w-full py-[0.65vw] px-[0.8vw] bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-[clamp(12px,0.8vw,14px)] font-medium rounded-[0.7vw] transition-colors flex items-center justify-center gap-[0.5vw] shadow-xs disabled:opacity-50 cursor-pointer"
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
            <span>Sign-in with Google</span>
          </button>
        </div>
      </form>

      {/* 6. Footer Switcher */}
      <div className="text-center text-[clamp(12px,0.8vw,14px)] text-gray-500 pt-[0.4vw]">
        Don't have an Account ?{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="font-semibold text-[#FF2D75] hover:text-[#e62066] hover:underline cursor-pointer"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
