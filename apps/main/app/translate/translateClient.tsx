"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { translate } from '../../libs/utils';

const languages = ['Detect Language', 'English', 'Hindi', 'Tamil', 'Telugu'];
const slug = { 'Detect Language': 'auto', 'English': 'en', 'Hindi': 'hi', 'Tamil': 'ta', 'Telugu': 'te' }

const TranslateClient = () => {
    const [sourceText, setSourceText] = useState('');
    const [target, setTarget] = useState('English');
    const [source, setSource] = useState('Detect Language');
    const [translatedText, setTranslatedText] = useState('');

    const handleTranslate = async () => {
        setTranslatedText('Translating...');
        try {
            const targetSlug = slug[target as keyof typeof slug];
            const sourceSlug = slug[source as keyof typeof slug];
            const data = {
                "sentence": sourceText,
                "source": sourceSlug,
                "target": targetSlug
            }

            const response: any = await translate(data);
            setTranslatedText(response);
        } catch (error) {
            console.log(error);
            setTranslatedText('Translation failed. Please try again.');
        }

    };

    const handleClear = () => {
        setSourceText('');
        setTranslatedText('');
    };

    const selectLanguage = (lang: string) => {
        setSource(lang);
    };

    const selectTargetLanguage = (lang: string) => {
        setTarget(lang);
    };

    return (
        <div className="relative bg-white w-full">
            <div className="flex flex-col">
                <div className="container mx-auto px-0 lg:px-24">
                    <div className="flex flex-row justify-between my-4">
                        <div>
                            {languages.map(lang => (
                                <button
                                    key={lang}
                                    className={`uppercase py-3.5 px-3 font-semibold text-xs lg:text-sm ${source === lang ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-700'} transition-colors duration-100`}
                                    onClick={() => selectLanguage(lang)}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                        <div>
                            {languages.filter(lang => lang !== 'Detect Language').map(lang => (
                                <button
                                    key={lang}
                                    className={`uppercase py-3.5 px-3 font-semibold text-xs lg:text-sm ${target === lang ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-700'} transition-colors duration-100`}
                                    onClick={() => selectTargetLanguage(lang)}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-6/12 bg-gray-100 p-2">
                            <textarea
                                className="resize-none w-full h-40 focus:outline-none text-base lg:text-2xl text-black custom-scrollbar"
                                spellCheck="false"
                                value={sourceText}
                                onChange={(e) => setSourceText(e.target.value)}
                            ></textarea>
                            <div className='h-10'>

                                {sourceText.length > 0 && (
                                    <button
                                        className="hover:bg-gray-100 rounded-full w-10 h-10 mt-1 transition-colors duration-100"
                                        title="Clear"
                                        onClick={handleClear}
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="w-6/12 bg-gray-100 rounded-br-lg p-4">
                            <textarea
                                className="resize-none w-full bg-gray-100 h-40 focus:outline-none text-base lg:text-2xl text-black custom-scrollbar"
                                spellCheck="false"
                                readOnly
                                value={translatedText}
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex w-full items-center justify-center my-4">
                        <button className="rounded px-3 py-1 bg-blue-100 border border-blue-200 text-base text-blue-700 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-600" onClick={handleTranslate}>
                            Translate Text
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TranslateClient;
