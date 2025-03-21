"use client";

import { useAnswerStore } from "@/store/answerStore";
import { usePlayerStore } from "@/store/playersStore";

import Button from "../../../components/Button";

import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const prompt = useAnswerStore((state) => state.prompt);
    const players = usePlayerStore((state) => state.players);
    const setAnswer = useAnswerStore((state) => state.setAnswer);

    return (
        <>
            <div className="flex flex-col items-center pb-4">
                <p>The prompt was..</p>
                <p>"{prompt}"</p>
            </div> 
            <div className="flex gap-32 pb-4">
                <div className="flex flex-col items-center">
                    <p className="pb-2">Player 1 Guess</p>
                    <p>"{players[0].prompt}"</p>
                    <p>{(players[0].similarity * 100).toFixed(2)}% Similarity</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="pb-2">Player 2 Guess</p>
                    <p>"{players[1].prompt}"</p>
                    <p>{(players[1].similarity * 100).toFixed(2)}% Similarity</p>
                </div>
            </div>
            <div className="pb-4">
                Player {players[0].similarity >= players[1].similarity ? 1 : 2} Won!
            </div>
            <Button text="PLAY AGAIN?" onClick={() => {
                setAnswer("")
                router.push("/game");
            }} />
        </>
    );
}