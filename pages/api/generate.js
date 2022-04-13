import { Configuration, OpenAIApi } from "openai";
import { poemStyles } from "../../constants/poemStyles";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(req.body.title, req.body.style),
    temperature: 0.8,
    max_tokens: 200,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(title, style) {
  const prompt = poemStyles[style].prompt;

  return `${prompt}
  Title: ${title}
  Poem:`;
}
