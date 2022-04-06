import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(req.body.animal),
    temperature: 0.6,
    max_tokens: 200,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(animal) {
  const input = animal[0].toUpperCase() + animal.slice(1).toLowerCase();

  return `Write a poem with the following title:
  Title: ${input}
  Poem:`;

  //   return `Write a shakespearean sonnet with the following title:
  // Title: ${input}
  // Poem:`;

  //   return `Write a poem in the new style:
  // Old Poem:
  // We sweep earth's streets sweeping Cracks in tiny laughing at crows sending tweets
  // New Poem:
  // we skeep urth eeks
  // sheeping carcks in itsy reets
  // chaucing acraws
  // imsing twees
  // Old Poem: ${input}
  // New Poem:`;
}
