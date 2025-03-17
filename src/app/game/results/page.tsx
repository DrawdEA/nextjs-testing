"use client";

import { useAnswerStore } from "@/store/answerStore";
import { usePlayerStore } from "@/store/playersStore";

export default function Page() {
    const prompt = useAnswerStore((state) => state.prompt);
    const players = usePlayerStore((state) => state.players);

    return (
        <div className="flex flex-col items-center gap-2">
            <div>
                <p>The prompt was..</p>
                <p>{prompt}</p>
            </div> 
            <div className="flex gap-32">
                <div>
                    <p>Player 1 Guess</p>
                    <p>{players[0].prompt}</p>
                </div>
                <div>
                <p>Player 2 Guess</p>
                <p>{players[1].prompt}</p>
                </div>
            </div>
            <div>
                Player [NUMBER] Won!
            </div>
        </div>
    );
}