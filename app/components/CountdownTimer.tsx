"use client";

import { useEffect, useState } from "react";

interface Props {
    exp?: number;
}

export default function CountdownTimer({ exp }: Props) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        if (!exp) return;

        const interval = setInterval(() => {
            const now = Math.floor(Date.now() / 1000);
            const diff = exp - now;

            if (diff <= 0) {
                setTimeLeft("Expired");
                clearInterval(interval);
                return;
            }

            const hours = Math.floor(diff / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            const seconds = diff % 60;

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(interval);
    }, [exp]);

    if (!exp) return null;

    return (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg font-semibold mt-3">
            ⏳ Time until expiration: {timeLeft}
        </div>
    );
}