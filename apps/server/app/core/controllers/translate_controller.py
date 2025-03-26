from app.core.services.translate_service import translate_service


class TranslateController:
    def __init__(self):
        pass

    async def translate(self, query: str):
        try:
            if not query:
                raise ValueError("Query text cannot be empty")
            translated_quote = await translate_service.translate(query)
            return translated_quote
        except Exception as e:
            raise e

    async def translate_spec(self, translate: any):
        try:
            if not translate.sentence:
                raise ValueError("Sentence cannot be empty")
            response = await translate_service.translate(
                translate.sentence, translate.target, translate.source
            )
            return response
        except Exception as e:
            raise e
