export default function Page() {
    return (
        <div className="flex flex-col items-center gap-2">
            <div>
                <p>The prompt was..</p>
                <p>[PROMPT HERE]</p>
            </div> 
            <div className="flex gap-32">
                <div>
                    <p>Player 1 Guess</p>
                    <p>[GUESS HERE]</p>
                </div>
                <div>
                <p>Player 2 Guess</p>
                <p>[GUESS HERE]</p>
                </div>
            </div>
            <div>
                Player [NUMBER] Won!
            </div>
        </div>
    );
}