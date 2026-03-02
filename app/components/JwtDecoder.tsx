"use client"

import { useState } from "react"
import { JwtPayload } from "../types/MyType"
import { jwtDecode } from "jwt-decode"


export default function JwtDecoder() {
    const [token, setToken] = useState("")
    const [decoded, setDecoded] = useState<JwtPayload | null>(null)
    const [error, setError] = useState("")

    const handleDecode = () => {
        try {
            setError("")
            const result: JwtPayload = jwtDecode(token)
            setDecoded(result);
            console.log
        } catch (err) {
            setDecoded(null)
            setError("Invalid JWT Token")
        }
    }

    const isExpired = (exp?: number) => {
        if (!exp) return false
        const now = Date.now() / 1000
        return exp < now
    }

    const formatDate = (timestamp?: number) => {
        if (!timestamp) return "N/A";
        return new Date(timestamp * 1000).toLocaleString();
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            <h1 className="text-2xl font-bold mb-4">JWT Token Decoder</h1>
            <textarea
                className="w-full p-3 border rounded-lg mb-4"
                placeholder="Paste your JWT token here..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
            />

            <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={handleDecode}
            >
                Decode Token
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {decoded && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Token Details</h2>

                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p><strong>Expired:</strong> {isExpired(decoded.exp) ? "Yes ❌" : "No ✅"}</p>
                        <p><strong>Expiration Date: {formatDate(decoded.iat)}</strong></p>
                        <p><strong>Issued AT:  {formatDate(decoded.iat)}</strong></p>
                    </div>
                    <h3 className="text-lg font-semibold mt-4">Payload</h3>
                    <pre className="bg-black text-green-400 p-4 rounded-lg overflow-auto">
                        {JSON.stringify(decoded, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    )
}