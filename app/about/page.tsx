export default function AboutPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg p-8 rounded-xl max-w-xl text-center">
                <h1 className="text-2xl font-bold mb-4">About Developer</h1>
                <p className="text-gray-600">
                    This JWT Inspector tool was built using Next.js, TypeScript, and Tailwind CSS.
                    It helps developers decode and inspect JWT tokens easily like jwt.io.
                </p>
            </div>
        </div>
    )
}