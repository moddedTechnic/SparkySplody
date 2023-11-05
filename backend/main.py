from pydantic import BaseModel, Field

from fastapi import FastAPI
from fastapi.responses import RedirectResponse

import uvicorn

app = FastAPI()


class RequestData(BaseModel):
    motor: int = Field(ge=1, le=6)
    angle: int = Field(ge=0, le=180)


@app.get("/")
async def handle():
    return RedirectResponse("/docs")


@app.post("/")
async def recv_data(data: RequestData):
    # todo handle data.angle, data.motor
    return {"status": "OK"}


if __name__ == "__main__":
    uvicorn.run(app)