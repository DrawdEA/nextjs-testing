type ButtonProps = {
    text: string;
    onClick: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
    return (
        <button onClick={onClick ?? (() => {})} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            {text}
        </button>
    );
}