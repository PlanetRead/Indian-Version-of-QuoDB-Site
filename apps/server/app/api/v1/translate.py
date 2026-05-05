from fastapi import APIRouter, Query, Body, HTTPException
from app.core.controllers.translate_controller import TranslateController
from app.core.models.translate_model import Translate

translate_router = APIRouter()
translate_controller = TranslateController()


@translate_router.post("/translate-auto", tags=["Translate"])
async def translate(
    query: str = Query(..., description="Translate a quote to English")
):
    try:
        return await translate_controller.translate(query)
    except Exception as e:
        raise HTTPException(status_code=502, detail="Translation service failed") from e


@translate_router.post("/translate-spec", tags=["Translate"])
async def translate_spec(translate: Translate = Body(...)):
    try:
        return await translate_controller.translate_spec(translate)
    except Exception as e:
        raise HTTPException(status_code=502, detail="Translation service failed") from e
