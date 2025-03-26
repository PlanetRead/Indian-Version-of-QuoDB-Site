from fastapi import APIRouter, Query, Body, status, HTTPException
from app.core.controllers.translate_controller import TranslateController
from app.core.models.translate_model import Translate

translate_router = APIRouter()
translate_controller = TranslateController()


@translate_router.post("/translate-auto", tags=["Translate"])
async def translate(
    query: str = Query(..., description="Translate a quote to English")
):
    try:
        translated_text = await translate_controller.translate(query)
        return {"translated_text": translated_text}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@translate_router.post("/translate-spec", tags=["Translate"])
async def translate_spec(translate: Translate = Body(...)):
    try:
        response = await translate_controller.translate_spec(translate)
        return {"translated_text": response}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
