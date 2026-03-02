"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";
import { SignatureVerifierType } from "../types/MyType";

export default function SignatureVerifier({ token }: SignatureVerifierType) {
  const [secret, setSecret] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const verifySignature = () => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return;

      const signingInput = parts[0] + "." + parts[1];
      const signature = parts[2];

      const expected = CryptoJS.HmacSHA256(signingInput, secret)
        .toString(CryptoJS.enc.Base64)
        .replace(/=+$/, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

      if (expected === signature) {
        setResult("✅ Signature Valid");
      } else {
        setResult("❌ Invalid Signature");
      }
    } catch {
      setResult("Verification Error");
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded-lg mt-6">
      <h2 className="font-bold mb-3">Verify Signature (HS256)</h2>

      <input
        type="text"
        placeholder="Enter secret key"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <button
        onClick={verifySignature}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Verify
      </button>

      {result && (
        <p className="mt-3 font-semibold">{result}</p>
      )}
    </div>
  );
}