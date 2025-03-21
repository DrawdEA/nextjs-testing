"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAnswerStore } from "@/store/answerStore";
import { usePlayerStore } from "@/store/playersStore";

import Button from "../../../components/Button";



export default function Page() {
    const router = useRouter();
    const answer = useAnswerStore((state) => state.answer);
    const players = usePlayerStore((state) => state.players);
    const updatePrompt = usePlayerStore((state) => state.updatePrompt);
    const updateSimilarity = usePlayerStore((state) => state.updateSimilarity);

    const [inputValue, setInputValue] = useState("");
    const [currentPlayer, setPlayer] = useState(1);

    return (
        <>
            <div className="pb-5">Player {currentPlayer}, place your guess here:</div>
            <div className="flex gap-2 pb-5">
                <input type="text" className="border-2 rounded w-100" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <Button text="SUBMIT" onClick = {async () => {
                    updatePrompt(currentPlayer, inputValue);

                    // Generate the similarity.
                    let similarity = -1;
                    try {
                        const response = await fetch("/api/similarity", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ answer: inputValue, correctAnswer: answer }),
                        })
                        const data = await response.json();
                        similarity = data.similarity ?? -1;
                    } catch (error) {
                        console.error("Error:", error);
                    }
                    console.log(similarity);
                    updateSimilarity(currentPlayer, similarity);

                    if (currentPlayer >= players.length) {
                        router.push("/game/results");
                    } else {
                        setPlayer(currentPlayer + 1);
                    }
                    setInputValue("");
                }}/>
            </div>
            <div className="text-center mx-20">{answer}</div>
        </>
    );
}