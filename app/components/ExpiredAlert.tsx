import { ExpiredAlertType } from "../types/MyType";

export default function ExpiredAlert({
    isExpired,
    textExpired,
    textValid,
}: ExpiredAlertType) {
    return (
        <div
            className={`p-4 rounded-lg font-semibold ${isExpired ? "bg-red-500 text-white" : "bg-green-500 text-white"
                }`}
        >
            {isExpired ? `🚨 ${textExpired}` : `✅ ${textValid}`}
        </div>
    );
}