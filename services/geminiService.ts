import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, Gender, Occasion } from "../types";

// Note: In a production app, never expose keys on client side.
// This is strictly for the demo runtime environment instructions provided.
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please set the API_KEY environment variable.");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeImage = async (
  base64Image: string,
  gender: Gender,
  occasion: Occasion
): Promise<AnalysisResult> => {
  const ai = getClient();
  
  // Clean base64 string if it has headers
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

  const prompt = `
    Analyze the uploaded image of a person to act as a professional high-end fashion stylist.
    
    Target User Profile:
    - Gender Presentation: ${gender}
    - Occasion Focus: ${occasion}

    Perform a deep analysis of:
    1. Skin Tone & Undertone (Cool, Warm, Neutral, Olive, etc.)
    2. Face Shape (Oval, Round, Square, Heart, Diamond, etc.)
    3. Seasonal Color Analysis (Spring, Summer, Autumn, Winter - including subtypes like Deep Autumn, Light Summer etc.)

    Based on this, provide specific recommendations.
    
    CRITICAL REQUIREMENT:
    You must provide TWO distinct categories of outfit recommendations:
    1. Western Wear (Modern, Chic, tailored to the occasion)
    2. Eastern/Pakistani Wear (Shalwar Kameez, Kurta, Lehenga, Saree, Sherwani etc., tailored to the occasion)

    Return strict JSON with the following structure. Do not use markdown code blocks.
  `;

  const schema = {
    type: Type.OBJECT,
    properties: {
      skinTone: { type: Type.STRING },
      undertone: { type: Type.STRING },
      faceShape: { type: Type.STRING },
      season: { type: Type.STRING },
      colorPsychology: { type: Type.STRING, description: "A brief psychological effect of wearing their power colors." },
      bestColors: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            hex: { type: Type.STRING },
            reason: { type: Type.STRING }
          }
        }
      },
      worstColors: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            hex: { type: Type.STRING }
          }
        }
      },
      hairSuggestions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            style: { type: Type.STRING },
            color: { type: Type.STRING },
            description: { type: Type.STRING }
          }
        }
      },
      accessories: {
        type: Type.OBJECT,
        properties: {
          jewelry: { type: Type.STRING },
          eyewear: { type: Type.STRING },
          other: { type: Type.STRING }
        }
      },
      outfits: {
        type: Type.OBJECT,
        properties: {
          western: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                items: { type: Type.ARRAY, items: { type: Type.STRING } },
                colorTheme: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          },
          eastern: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                items: { type: Type.ARRAY, items: { type: Type.STRING } },
                colorTheme: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          }
        }
      },
      makeup: {
        type: Type.OBJECT,
        nullable: true,
        properties: {
          foundation: { type: Type.STRING },
          lipColor: { type: Type.STRING },
          eyeShadow: { type: Type.STRING }
        }
      },
      beard: {
        type: Type.OBJECT,
        nullable: true,
        properties: {
          style: { type: Type.STRING },
          description: { type: Type.STRING }
        }
      }
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
        temperature: 0.4 // Lower temperature for more consistent analytical results
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Analysis Failed:", error);
    throw error;
  }
};
