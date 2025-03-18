"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAnswerStore } from "@/store/answerStore";

import Button from "../../components/Button";

export default function Page() {
    const router = useRouter();
    const [inputValue, setInputValue] = useState("");

    const answer = useAnswerStore((state) => state.answer);
    const setAnswer = useAnswerStore((state) => state.setAnswer);
    const setPrompt = useAnswerStore((state) => state.setPrompt);

    return (
        <>
            <div className="flex p-1 gap-1">
                <input 
                    className="border-2 rounded"
                    type="text" 
                    value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                />
                <Button text="SEARCH" onClick={async () => {
                    // Set the loading interface.
                    setAnswer("Loading..");
                    setPrompt(inputValue);
                    
                    // Try to generate an answer.
                    const start = performance.now();
                    let generatedAnswer;
                    try {
                        const response = await fetch("../../api/deepseek", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ prompt: inputValue }),
                        })
                        const data = await response.json();
                        generatedAnswer = data.response;
                    } catch (error) {
                        console.error("Error:", error);
                    }
                    const end = performance.now();
                    console.log(`Execution time: ${end - start} ms`);

                    // Check if the request for an answer is valid.
                    if (generatedAnswer == null) {
                        setAnswer("Question not valid! Try a different prompt.");
                    } else {
                        setAnswer(generatedAnswer);
                        router.push("/game/guess");
                    }
                }} />
            </div>
            
            <p>{answer}</p>
        </>
    );
}