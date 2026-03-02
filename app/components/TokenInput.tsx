"use client";

interface Props {
    token: string;
    setToken: (value: string) => void;
    placeholder: string;
}

export default function TokenInput({ token, setToken, placeholder }: Props) {
    return (
        <div className="w-full">
            <textarea
                className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-lg font-mono text-sm bg-gray-50"
                rows={5}
                placeholder={placeholder}
                value={token}
                onChange={(e) => setToken(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-2">
                Paste a JWT token to decode header, payload, and check expiration.
            </p>
        </div>
    );
}