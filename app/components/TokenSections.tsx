"use client";

import { TokenSectionsType } from "../types/MyType";

export default function TokenSections({
    tokenParts,
    header,
    payload,
    t,
}: TokenSectionsType) {
    const copyToClipboard = (data: any) => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        alert("Copied to clipboard!");
    };

    return (
        <div className="grid md:grid-cols-3 gap-4 mt-6">
            {/* Header */}
            <div className="bg-white shadow rounded-lg p-4 relative">
                <h2 className="font-bold mb-2">{t.header}</h2>
                <button
                    onClick={() => copyToClipboard(header)}
                    className="absolute top-4 right-4 text-sm bg-gray-200 px-2 py-1 rounded"
                >
                    Copy
                </button>
                <pre className="text-sm overflow-auto">
                    {JSON.stringify(header, null, 2)}
                </pre>
            </div>

            {/* Payload */}
            <div className="bg-white shadow rounded-lg p-4 relative">
                <h2 className="font-bold mb-2">{t.payload}</h2>
                <button
                    onClick={() => copyToClipboard(payload)}
                    className="absolute top-4 right-4 text-sm bg-gray-200 px-2 py-1 rounded"
                >
                    Copy
                </button>
                <pre className="text-sm overflow-auto">
                    {JSON.stringify(payload, null, 2)}
                </pre>
            </div>

            {/* Signature */}
            <div className="bg-white shadow rounded-lg p-4">
                <h2 className="font-bold mb-2">{t.signature}</h2>
                <p className="break-all text-sm">{tokenParts[2] || "N/A"}</p>
            </div>
        </div>
    );
}