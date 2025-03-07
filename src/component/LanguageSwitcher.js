import React, { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import "./LanguageSwitcher.css";

const languages = [
    { code: "en", label: "🇬🇧 English" },
    { code: "es", label: "🇪🇸 Español" },
    { code: "fr", label: "🇫🇷 Français" },
    { code: "de", label: "🇩🇪 Deutsch" },
    { code: "it", label: "🇮🇹 Italiano" },
    { code: "pt", label: "🇵🇹 Português" },   // Portuguese
    { code: "nl", label: "🇳🇱 Nederlands" },  // Dutch
    { code: "ru", label: "🇷🇺 Русский" },    // Russian
    { code: "ja", label: "🇯🇵 日本語" },    // Japanese
    { code: "zh", label: "🇨🇳 中文" },      // Chinese
    { code: "hi", label: "🇮🇳 हिंदी" },     // Hindi
    { code: "ar", label: "🇸🇦 العربية" },  // Arabic
    { code: "tr", label: "🇹🇷 Türkçe" },   // Turkish
    { code: "ko", label: "🇰🇷 한국어" },   // Korean
];


const LanguageSwitcher = () => {
    const { language, setLanguage } = useContext(LanguageContext);

    return (
        <div className="language-switcher">
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSwitcher;
