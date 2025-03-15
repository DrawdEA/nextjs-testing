"use client";

import { useState } from "react";

import Button from "../../components/Button";

export default function Page() {
    const [answer, setAnswer] = useState("Create a prompt that other people will guess.");
    const [inputValue, setInputValue] = useState("");

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
            const markdownText = data.choices?.[0]?.message?.content || "No response received.";
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
                    const start = performance.now();
                    setAnswer("Loading..");
                    setAnswer(await getAIAnswer());
                    const end = performance.now();
                    console.log(`Execution time: ${end - start} ms`);
                }} />
            </div>
            
            <p>{answer}</p>
        </div>
    );
}