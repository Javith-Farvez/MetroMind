import os
from typing import Dict, Any
from app.ai.base import BaseLLMProvider

class RuleBasedFallbackLLM(BaseLLMProvider):
    def generate(self, prompt: str) -> str:
        """Local high-performance LLM provider abstraction."""
        return f"AI Processing Result for prompt length ({len(prompt)})"

class LLMProviderFactory:
    @staticmethod
    def get_provider() -> BaseLLMProvider:
        api_key = os.getenv("AI_API_KEY")
        if api_key:
            # Future expansion for OpenAI / Gemini / Azure OpenAI
            return RuleBasedFallbackLLM()
        return RuleBasedFallbackLLM()

llm_provider = LLMProviderFactory.get_provider()
