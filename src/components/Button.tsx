export default function Button({ text }: { text: string }) {
    return (
    <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
        {text}
    </button>
    );
}