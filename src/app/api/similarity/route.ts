import { NextResponse } from "next/server";
import { pipeline } from "@xenova/transformers";

// Cache the SBERT model to prevent reloading on every request
let modelPromise = null;
async function getModel() {
  if (!modelPromise) {
    modelPromise = pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return await modelPromise;
}

// Cosine similarity function
function cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

export async function POST(req: Request) {
    try {
        // Get the prompt from the request body.
        const { answer, correctAnswer } = await req.json();
        if (!answer || !correctAnswer) {
            return new NextResponse(JSON.stringify({ error: "answer or correctAnswer is required" }), { status: 400 });
        }

        /*
            Get the embeddings of the answers. 
            This quantifies the sentences along with its context, readying itself to be compared via cosine similarity.
        */
        const model = await getModel()
        const answerEmbedding = await model(answer, { pooling: 'mean', normalize: true });
        const correctAnswerEmbedding = await model(correctAnswer, { pooling: 'mean', normalize: true });  

        // Get their cosine similarity.
        const similarity = cosineSimilarity(Array.from(answerEmbedding.data), Array.from(correctAnswerEmbedding.data));

        // Return the similarity.
        return new NextResponse(JSON.stringify({ similarity: similarity }), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    }
}