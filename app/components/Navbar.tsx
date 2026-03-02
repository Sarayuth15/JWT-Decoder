"use client";

import { useState, useEffect } from "react";

interface Props {
    language: "en" | "km";
    setLanguage: (lang: "en" | "km") => void;
}

export default function Navbar({ language, setLanguage }: Props) {
    const [dark, setDark] = useState(false);
    const [activeTab, setActiveTab] = useState<"home" | "about">("home");

    // Load saved theme on first render
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDark(true);
        }
    }, []);

    const toggleDarkMode = () => {
        if (dark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setDark(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setDark(true);
        }
    };

    const translations = {
        en: {
            home: "Home",
            about: "About Developer",
            title: "JWT Inspector",
            developer:
                "This JWT Inspector tool is built with Next.js, Tailwind CSS, and modern JWT libraries. It supports decoding, verification (HS256 & RS256), payload editing, and expiration tracking — all locally in your browser.",
        },
        km: {
            home: "ទំព័រដើម",
            about: "អំពីអ្នកអភិវឌ្ឍន៍",
            title: "កម្មវិធីពិនិត្យ JWT",
            developer:
                "ឧបករណ៍ JWT Inspector នេះត្រូវបានបង្កើតដោយ Next.js និង Tailwind CSS។ វាអាច Decode Token, Verify Signature (HS256 & RS256), កែប្រែ Payload និងពិនិត្យ Expiration បានដោយសុវត្ថិភាពក្នុង Browser។",
        },
    };

    const t = translations[language];

    return (
        <nav className="w-full border-b bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
                {/* Top Row */}
                <div className="flex items-center justify-between">
                    {/* Logo / Title */}
                    <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold text-blue-600">
                            🔐 {t.title}
                        </div>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-3">
                        {/* 🌐 Language Selector */}
                        <select
                            value={language}
                            onChange={(e) =>
                                setLanguage(e.target.value as "en" | "km")
                            }
                            className="border rounded-lg px-3 py-1 text-sm 
                         bg-white dark:bg-gray-800 
                         text-gray-800 dark:text-white 
                         border-gray-300 dark:border-gray-700"
                        >
                            <option value="en">English</option>
                            <option value="km">ភាសាខ្មែរ</option>
                        </select>

                        {/* 🌙 Dark Mode Toggle */}
                        {/* <button
                            onClick={toggleDarkMode}
                            className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-800 text-white hover:bg-gray-700 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-300 transition"
                        >
                            {dark ? "☀ Light" : "🌙 Dark"}
                        </button> */}
                    </div>
                </div>

                {/* Tabs Row */}
                <div className="mt-4 flex items-center gap-6">
                    {/* Home Tab */}
                    <button
                        onClick={() => setActiveTab("home")}
                        className={`pb-2 text-sm font-semibold transition ${activeTab === "home"
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-600 dark:text-gray-300 hover:text-blue-500"
                            }`}
                    >
                        {t.home}
                    </button>

                    {/* About Developer Tab */}
                    <button
                        onClick={() => setActiveTab("about")}
                        className={`pb-2 text-sm font-semibold transition ${activeTab === "about"
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-600 dark:text-gray-300 hover:text-blue-500"
                            }`}
                    >
                        {t.about}
                    </button>
                </div>

                {/* About Developer Content Panel (jwt.io style info section) */}
                {activeTab === "about" && (
                    <div className="mt-4 p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                        <p className="font-semibold mb-2">
                            👨‍💻 {t.about}
                        </p>
                        <p>{t.developer}</p>

                        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            Features:
                            <ul className="list-disc ml-5 mt-1">
                                <li>JWT Decode (Header, Payload, Signature)</li>
                                <li>HS256 Secret Verification</li>
                                <li>RS256 Public Key Verification</li>
                                <li>Auto Expiration Detection + Countdown</li>
                                <li>JSON Edit & Token Regeneration</li>
                                <li>Dark Mode & Multi-language (EN/KH)</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}