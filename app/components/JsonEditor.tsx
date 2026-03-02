"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";

interface Props {
    payload: any;
    header: any;
    secret: string;
    setToken: (token: string) => void;
}

export default function JsonEditor({
    payload,
    header,
    secret,
    setToken,
}: Props) {
    const [editablePayload, setEditablePayload] = useState(
        JSON.stringify(payload, null, 2)
    );

    const base64Url = (obj: any) => {
        return btoa(JSON.stringify(obj))
            .replace(/=/g, "")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");
    };

    const regenerateToken = () => {
        try {
            const newPayload = JSON.parse(editablePayload);

            const encodedHeader = base64Url(header);
            const encodedPayload = base64Url(newPayload);

            const signature = CryptoJS.HmacSHA256(
                `${encodedHeader}.${encodedPayload}`,
                secret || "secret"
            )
                .toString(CryptoJS.enc.Base64)
                .replace(/=+$/, "")
                .replace(/\+/g, "-")
                .replace(/\//g, "_");

            const newToken = `${encodedHeader}.${encodedPayload}.${signature}`;
            setToken(newToken);
        } catch {
            alert("Invalid JSON format");
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg mt-6">
            <h2 className="font-bold mb-3">Edit Payload (JSON)</h2>

            <textarea
                className="w-full border rounded p-3 h-40 font-mono dark:bg-gray-900"
                value={editablePayload}
                onChange={(e) => setEditablePayload(e.target.value)}
            />

            <button
                onClick={regenerateToken}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
            >
                Regenerate Token (HS256)
            </button>
        </div>
    );
}