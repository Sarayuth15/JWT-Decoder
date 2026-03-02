"use client";

import { useState } from "react";
import { jwtVerify } from "jose";

interface Props {
    token: string;
}

export default function RS256Verifier({ token }: Props) {
    const [publicKey, setPublicKey] = useState("");
    const [result, setResult] = useState<string | null>(null);

    const verifyRS256 = async () => {
        try {
            const encoder = new TextEncoder();
            const keyData = encoder.encode(publicKey);

            const cryptoKey = await crypto.subtle.importKey(
                "spki",
                keyData,
                { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
                false,
                ["verify"]
            );

            await jwtVerify(token, cryptoKey);
            setResult("✅ RS256 Signature Valid");
        } catch (error) {
            setResult("❌ Invalid RS256 Signature / Public Key");
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg mt-6">
            <h2 className="font-bold mb-3">Verify RS256 (Public Key)</h2>

            <textarea
                placeholder="Paste RSA Public Key (PEM)"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                className="w-full border p-2 rounded mb-3 h-28 dark:bg-gray-900"
            />

            <button
                onClick={verifyRS256}
                className="bg-purple-600 text-white px-4 py-2 rounded"
            >
                Verify RS256
            </button>

            {result && <p className="mt-3 font-semibold">{result}</p>}
        </div>
    );
}