import { openai } from "./openai";

function looksJapanese(text: string) {
  return /[ぁ-んァ-ン一-龠]/.test(text);
}

export async function translatePromptIfNeeded(prompt: string) {
  if (!looksJapanese(prompt)) {
    return prompt;
  }


const response = await openai.responses.create({
    model: "gpt-5.4-mini",
    input: [
        {
            role: "system",
            content:
             "You convert Japanese image prompts into natural English prompts for AI image generation. Return only the English prompt."
        },
        {
            role: "user",
            content: prompt
        },
    ],
});
return response.output_text.trim()
}
