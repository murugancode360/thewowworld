"use client";

import React, { useState, useEffect } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import { AuthModalMode } from "@/context/AuthModalContext";

interface AuthCardProps {
  initialMode?: AuthModalMode;
  onSuccess?: () => void;
}

export default function AuthCard({ initialMode = "signin", onSuccess }: AuthCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [frontMode, setFrontMode] = useState<AuthModalMode>(initialMode);
  const [backMode, setBackMode] = useState<AuthModalMode>(
    initialMode === "signup" ? "signin" : "signup"
  );
  const [forgotEmail, setForgotEmail] = useState("");

  useEffect(() => {
    setIsFlipped(false);
    setFrontMode(initialMode);
    setBackMode(initialMode === "signup" ? "signin" : "signup");
    setForgotEmail("");
  }, [initialMode]);

  const switchMode = (newMode: AuthModalMode, email = "") => {
    if (email) setForgotEmail(email);
    const currentActiveMode = isFlipped ? backMode : frontMode;
    if (newMode === currentActiveMode) return;

    if (!isFlipped) {
      setBackMode(newMode);
      setIsFlipped(true);
    } else {
      setFrontMode(newMode);
      setIsFlipped(false);
    }
  };

  const renderContent = (currentMode: AuthModalMode) => {
    switch (currentMode) {
      case "signup":
        return (
          <Signup
            onSwitchToSignin={() => switchMode("signin")}
            onSuccess={onSuccess}
          />
        );
      case "forgot-password":
        return (
          <ForgotPassword
            initialEmail={forgotEmail}
            onSwitchToSignin={() => switchMode("signin")}
            onSuccess={onSuccess}
          />
        );
      case "signin":
      default:
        return (
          <Signin
            onSwitchToSignup={() => switchMode("signup")}
            onSwitchToForgotPassword={(email) => switchMode("forgot-password", email)}
            onSuccess={onSuccess}
          />
        );
    }
  };

  return (
    <div className="relative flex items-center justify-center perspective-container w-full h-full">
      <div className={`flip-card-inner w-full h-full ${isFlipped ? "is-flipped" : ""}`}>
        {/* Front Side */}
        <div
          className={`flip-card-face flip-card-front relative bg-white px-[3vw] py-[2.2vw] flex flex-col justify-between ${
            isFlipped ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          {renderContent(frontMode)}
        </div>

        {/* Back Side */}
        <div
          className={`flip-card-face flip-card-back relative bg-white px-[3vw] py-[2.2vw] flex flex-col justify-between ${
            !isFlipped ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          {renderContent(backMode)}
        </div>
      </div>
    </div>
  );
}
