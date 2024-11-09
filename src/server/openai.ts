import OpenAI from "openai";
import { env } from "~/env.js";

if (!env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in environment variables");
}

export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
}); 