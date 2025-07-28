const apiKey = import.meta.env.VITE_HF_TOKEN;
const baseURL = "https://router.huggingface.co/v1";

export const generateText = async (prompt, tone, format, outputLength) => {
  if (!prompt) throw new Error('Prompt is required');

  let attempt = 0;
  const maxAttempts = 3;
  const baseDelay = 2000; // 2 seconds

  while (attempt < maxAttempts) {
    try {
      const response = await fetch(`${baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "google/gemma-2-2b-it:nebius",
          messages: [
            {
              role: "system",
              content: `You are a creative writing assistant. Generate text in a ${tone} tone for a ${format} format, with a ${outputLength} length (approximately ${outputLength === 'Short' ? '50 words' : outputLength === 'Medium' ? '150 words' : '300 words'}).`,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: outputLength === 'Short' ? 60 : outputLength === 'Medium' ? 200 : 400,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      attempt++;
      const errorMessage = error.message || '';
      if (error.status === 429 && attempt < maxAttempts) {
        if (errorMessage.includes('quota') || errorMessage.includes('rate limit')) {
          throw new Error('Rate limit exceeded. Please try again later or check your Hugging Face token.');
        }
        const waitTime = baseDelay * attempt; // Linear backoff (2s, 4s, 6s)
        console.log(`Rate limit hit. Retrying in ${waitTime / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      throw new Error(errorMessage || 'Failed to generate text. Please check your API key or network.');
    }
  }
  throw new Error('Max retry attempts reached. Check your Hugging Face token and quota.');
};