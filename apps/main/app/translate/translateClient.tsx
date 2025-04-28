"use client"
import React, { useState, useRef } from 'react';
import { translate } from '../../libs/utils';
'lucide-react'
import { Loader2 } from 'lucide-react'; // optional loading icon from lucide-react or any spinner you like

const languages = ['Detect Language', 'English', 'Hindi', 'Tamil', 'Telugu'];
const slug = { 'Detect Language': 'auto', 'English': 'en', 'Hindi': 'hi', 'Tamil': 'ta', 'Telugu': 'te' };

const TranslateClient = () => {
    const [sourceText, setSourceText] = useState('');
    const [target, setTarget] = useState('English');
    const [source, setSource] = useState('Detect Language');
    const [translatedText, setTranslatedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleTranslate = async () => {
        if (!sourceText.trim()) return;
        setIsLoading(true);
        setTranslatedText('');
        try {
            const targetSlug = slug[target as keyof typeof slug];
            const sourceSlug = slug[source as keyof typeof slug];
            const data = { sentence: sourceText, source: sourceSlug, target: targetSlug };
            const response: any = await translate(data);
            setTranslatedText(response);
        } catch (error) {
            console.error(error);
            setTranslatedText('Translation failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setSourceText('');
        setTranslatedText('');
        inputRef.current?.focus();
    };

    const selectLanguage = (lang: string) => {
        setSource(lang);
    };

    const selectTargetLanguage = (lang: string) => {
        setTarget(lang);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-white flex items-center justify-center p-6">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-10 transition-all duration-500">
                
                {/* Language selectors */}
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex flex-wrap gap-2">
                        {languages.map(lang => (
                            <button
                                key={lang}
                                className={`py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 ${source === lang ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
                                onClick={() => selectLanguage(lang)}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {languages.filter(lang => lang !== 'Detect Language').map(lang => (
                            <button
                                key={lang}
                                className={`py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 ${target === lang ? 'bg-indigo-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'}`}
                                onClick={() => selectTargetLanguage(lang)}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Textareas */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 relative group">
                        <textarea
                            ref={inputRef}
                            className="w-full h-44 p-4 bg-gray-50 rounded-2xl shadow-inner outline-none text-lg resize-none focus:ring-2 focus:ring-blue-400 transition-all custom-scrollbar"
                            placeholder="Enter your text..."
                            spellCheck="false"
                            value={sourceText}
                            onChange={(e) => setSourceText(e.target.value)}
                        />
                        {sourceText.length > 0 && (
                            <button
                                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-all"
                                onClick={handleClear}
                                title="Clear"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div className="flex-1 relative">
                        <div className="w-full h-44 p-4 bg-gray-50 rounded-2xl shadow-inner text-lg custom-scrollbar overflow-y-auto">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-full animate-pulse text-blue-400">
                                    <Loader2 className="h-8 w-8 animate-spin" />
                                </div>
                            ) : (
                                <p className="whitespace-pre-line">{translatedText}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Translate Button */}
                <div className="flex justify-center">
                    <button
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
                        onClick={handleTranslate}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Translating...' : 'Translate Text'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TranslateClient;
