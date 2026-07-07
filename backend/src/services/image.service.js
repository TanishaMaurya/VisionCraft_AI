import { InferenceClient } from "@huggingface/inference";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import {
  STYLE_PROMPTS,
} from "../config/constants.js";

const client = new InferenceClient(env.hf.token);

const buildPrompt = (prompt, style) => {
  const suffix = STYLE_PROMPTS[style] || "";
  return suffix ? `${prompt}, ${suffix}` : prompt;
};

export const imageService = {
  async generate({ prompt, style }) {
    try {
      if (!env.hf.token) {
        throw ApiError.internal("Missing Hugging Face API Token");
      }

      const fullPrompt = buildPrompt(prompt, style);

      console.log("Generating image...");
      console.log("Model:", env.hf.model);

      const image = await client.textToImage({
        model: env.hf.model,
        inputs: fullPrompt,
      });

      const buffer = Buffer.from(await image.arrayBuffer());

      return `data:image/png;base64,${buffer.toString("base64")}`;

    } catch (err) {
      console.error(err);

      throw ApiError.internal(
        err.message || "Failed to generate image"
      );
    }
  },
};