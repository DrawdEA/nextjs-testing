"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "../../components/Button";

export default function Page() {
    const router = useRouter();
    const [answer, setAnswer] = useState("Create a prompt that other people will guess.");
    const [inputValue, setInputValue] = useState("");

    // Returns a DeepSeek AI Response from the textbox.
    async function getAIAnswer() {
        const input = inputValue
        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                  "Authorization": "Bearer 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",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  "model": "deepseek/deepseek-r1:free",
                  "messages": [
                    {
                      "role": "user",
                      "content": input
                    }
                  ]
                })
            });
    
            const data = await response.json();
            const markdownText = data.choices?.[0]?.message?.content;
            return markdownText;
        } catch(error) {
            return "Error";
        }
    }

    return (
        <div className="flex flex-col items-center h-screen gap-5">
            <div className="flex p-1 gap-1">
                <input 
                    className="border-2 rounded"
                    type="text" 
                    value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                />
                <Button text="SEARCH" onClick={async () => {
                    setAnswer("Loading..");
                    let generatedAnswer;
                    const start = performance.now();
                    generatedAnswer = await getAIAnswer();
                    const end = performance.now();
                    console.log(`Execution time: ${end - start} ms`);
                    if (generatedAnswer == null) {
                        setAnswer("Question not valid! Try a different prompt.");
                    } else {
                        setAnswer(generatedAnswer);
                        router.push("/game/guess");
                    }
                }} />
            </div>
            
            <p>{answer}</p>
        </div>
    );
}