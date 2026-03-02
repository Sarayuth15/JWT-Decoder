interface Props {
    header: any;
}

export default function AlgorithmBadge({ header }: Props) {
    if (!header?.alg) return null;

    const alg = header.alg;
    const color =
        alg === "HS256"
            ? "bg-blue-500"
            : alg === "RS256"
                ? "bg-purple-500"
                : "bg-gray-500";

    return (
        <span className={`${color} text-white px-3 py-1 rounded-full text-sm`}>
            Algorithm: {alg}
        </span>
    );
}