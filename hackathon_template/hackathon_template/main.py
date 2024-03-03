from datetime import datetime
from uvicorn import Server, Config
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import os
import yaml
import sys

sys.path.append(os.getcwd())

from emcie.server import EmcieServer
from emcie.server.agents import AgentStore, AgentId, Agent
from emcie.server.threads import JsonThreadStore
from emcie.server.models import ModelId

thread_store_file = "threads.json"

async def main(config):
    os.environ["OPENAI_API_KEY"] = ""
    os.environ["AZURE_OPENAI_API_KEY"] = "d84d3d4b8c794190a123d96babec55f4"
    os.environ["AZURE_OPENAI_URL"] = "https://apim-dev-eastus-spotgenai.azure-api.net/Spot-Oren-Gurfinkel/openai"
    os.environ["AZURE_OPENAI_API_VERSION"] = "2024-02-15-preview"
    os.environ["DEFAULT_AGENT_MODEL"] = "azure/gpt-4"

    agent = Agent(
        id=AgentId(config["agent_id"]),
        model_id=ModelId(os.environ["DEFAULT_AGENT_MODEL"]),
        creation_utc=datetime.utcnow(),
    )

    app = await EmcieServer(
        agent_store=AgentStore(agents={agent.id: agent}),
        thread_store=JsonThreadStore(thread_store_file),
        skills=config["skills"],
        rules=config["rules"],
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    config = Config(app, host="0.0.0.0", port=8000)
    server = Server(config)
    await server.serve()

if __name__ == "__main__":
    with open('config.yml') as file:
        config = yaml.safe_load(file)
        asyncio.run(main(config))
