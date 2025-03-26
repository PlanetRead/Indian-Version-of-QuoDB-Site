from deep_translator import GoogleTranslator
from typing import Optional

class Translate_Service:
    def __init__(self):
        pass

    async def translate(self, text: str, target: str = "en", source: str = "auto") -> str:
        try:
            if not isinstance(text, str):
                raise ValueError("Text must be a string")
            if not text.strip():
                raise ValueError("Text cannot be empty")
            
            translator = GoogleTranslator(source=source, target=target)
            translated_text = translator.translate(text)
            
            if not translated_text:
                raise ValueError("Translation failed")
                
            return translated_text
        except Exception as e:
            raise ValueError(f"Translation error: {str(e)}")

translate_service = Translate_Service()