const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generame un CV\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: JSON.stringify(
            {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: {
                    level: 1,
                  },
                  content: [
                    {
                      type: "text",
                      text: "Cook?",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "hola a todos como estan?",
                    },
                  ],
                },
                {
                  type: "bulletList",
                  content: [
                    {
                      type: "listItem",
                      content: [
                        {
                          type: "paragraph",
                          content: [
                            {
                              type: "text",
                              text: "1",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            null,
            2
          ), // Ensure JSON is properly formatted and indented
        },
      ],
    },
  ],
});
