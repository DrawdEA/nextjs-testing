"use client";

import { useState } from "react";

import Button from "../../../components/Button";

export default function Page() {
    const [currentPlayer, setPlayer] = useState(1);
    return (
        <div className="flex flex-col items-center gap-2">
            <div>Player {currentPlayer}, place your guess here:</div>
            <div className="flex gap-2">
                <input type="text" className="border-2 rounded" />
                <Button text="SUBMIT" onClick = {() => {
                    setPlayer(currentPlayer + 1);
                }}/>
            </div>
            <div>[Prompt Here]</div>
        </div>
    );
}