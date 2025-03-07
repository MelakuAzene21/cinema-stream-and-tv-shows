import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
    // Load saved language from localStorage or default to English
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        localStorage.setItem('language', language); // Save language to localStorage
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageProvider;
