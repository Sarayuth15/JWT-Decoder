"use client";

import { useState } from "react";
import { jwtDecode } from "jwt-decode";

import Navbar from "./components/Navbar";
import TokenInput from "./components/TokenInput";
import TokenSections from "./components/TokenSections";
import ExpiredAlert from "./components/ExpiredAlert";
import CountdownTimer from "./components/CountdownTimer";
import SignatureVerifier from "./components/SignatureVerifier";
import RS256Verifier from "./components/RS256Verifier";
import AlgorithmBadge from "./components/AlgorithmBadge";
import JsonEditor from "./components/JsonEditor";

import { translations } from "./lib/i18n";

interface JwtPayload {
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export default function Home() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState<any>(null);
  const [payload, setPayload] = useState<JwtPayload | null>(null);
  const [language, setLanguage] = useState<"en" | "km">("en");
  const [error, setError] = useState<string | null>(null);

  const t = translations[language];

  // Base64URL decode helper (safe for JWT)
  const base64UrlDecode = (str: string) => {
    try {
      const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
      const padded = base64.padEnd(
        base64.length + (4 - (base64.length % 4)) % 4,
        "="
      );
      return atob(padded);
    } catch {
      return null;
    }
  };

  const decodeToken = (value: string) => {
    if (!value || !value.includes(".")) {
      setHeader(null);
      setPayload(null);
      setError(null);
      return;
    }

    try {
      const parts = value.split(".");
      if (parts.length !== 3) {
        setError("Invalid JWT format");
        setHeader(null);
        setPayload(null);
        return;
      }

      // Decode Header (manual base64url decode)
      const headerJson = base64UrlDecode(parts[0]);
      const decodedHeader = headerJson ? JSON.parse(headerJson) : null;

      // Decode Payload (using jwt-decode)
      const decodedPayload: JwtPayload = jwtDecode(value);

      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setError(null);
    } catch (err) {
      setError("Failed to decode token. Please check your JWT.");
      setHeader(null);
      setPayload(null);
    }
  };

  const handleTokenChange = (value: string) => {
    setToken(value.trim());
    decodeToken(value.trim()); // Real-time decode like jwt.io
  };

  const isExpired = () => {
    if (!payload?.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp * 1000).toLocaleString();
  };

  const tokenParts = token ? token.split(".") : [];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* 🧭 Navbar (Language + Dark Mode + About) */}
      <Navbar language={language} setLanguage={setLanguage} />

      <main className="max-w-7xl mx-auto p-6">
        {/* 🔥 Title + Algorithm Badge */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {t.title}
          </h1>

          {/* 🤖 Auto Algorithm Detection */}
          {header && <AlgorithmBadge header={header} />}
        </div>

        {/* 📝 Token Input */}
        <TokenInput
          token={token}
          setToken={handleTokenChange}
          placeholder={t.pasteToken}
        />

        {/* ❌ Error Message */}
        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-500 text-white font-semibold">
            {error}
          </div>
        )}

        {/* 🚨 Expired Alert */}
        {payload && !error && (
          <div className="mt-4">
            <ExpiredAlert
              isExpired={isExpired()}
              textExpired={t.expired}
              textValid={t.valid}
            />
          </div>
        )}

        {/* ⏳ Countdown Timer */}
        {payload?.exp && !error && (
          <CountdownTimer exp={payload.exp} />
        )}

        {/* 📅 Token Metadata (iat / exp info like jwt.io) */}
        {payload && !error && (
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                Issued At (iat)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {formatDate(payload.iat)}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                Expiration Time (exp)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {formatDate(payload.exp)}
              </p>
            </div>
          </div>
        )}

        {/* 🧩 Header / Payload / Signature Sections (jwt.io style) */}
        {header && payload && !error && (
          <TokenSections
            tokenParts={tokenParts}
            header={header}
            payload={payload}
            t={t}
          />
        )}

        {/* 🔐 HS256 Secret Verification */}
        {token && header?.alg === "HS256" && !error && (
          <SignatureVerifier token={token} />
        )}

        {/* 🔑 RS256 Public Key Verification */}
        {token && header?.alg === "RS256" && !error && (
          <RS256Verifier token={token} />
        )}

        {/* ✏️ JSON Edit Mode (Regenerate Token) */}
        {header && payload && header?.alg === "HS256" && !error && (
          <JsonEditor
            payload={payload}
            header={header}
            secret="your-secret" // you can later connect this to a secret input
            setToken={handleTokenChange}
          />
        )}

        {/* 🧠 Helper Info Footer */}
        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            This tool decodes JWT locally in your browser. No token is sent to
            any server.
          </p>
          <p className="mt-1">
            Supports HS256 verification, RS256 public key verification, payload
            editing, and expiration tracking.
          </p>
        </div>
      </main>
    </div>
  );
}