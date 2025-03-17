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

    const [inputValue, setInputValue] = useState("");
    const [currentPlayer, setPlayer] = useState(1);

    return (
        <div className="flex flex-col items-center gap-2">
            <div>Player {currentPlayer}, place your guess here:</div>
            <div className="flex gap-2">
                <input type="text" className="border-2 rounded" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <Button text="SUBMIT" onClick = {() => {
                    updatePrompt(currentPlayer, inputValue);
                    console.log(players.length);
                    console.log(currentPlayer);
                    if (currentPlayer >= players.length) {
                        router.push("/game/results");
                    }
                    setPlayer(currentPlayer + 1);
                    setInputValue("");
                }}/>
            </div>
            <div>{answer}</div>
        </div>
    );
}