import { create } from "zustand";

interface Player {
    number: number;
    prompt: string;
    similarity: number;
}

interface PlayerStore {
    players: Player[];
    addPlayer: (number: number, prompt: string) => void;
    updatePrompt: (number: number, newPrompt: string) => void;
    updateSimilarity: (number: number, newSimilarity: number) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
    players: [{number: 1, prompt: "", similarity: -1}, {number: 2, prompt: "", similarity: -1}],
    addPlayer: (number, prompt) => {
        set((state) => ({
            players: [
                ...state.players, { number: number, prompt: prompt, similarity: -1 }
            ]
        }))
    },
    updatePrompt: (number, newPrompt) => {
        set((state) => ({
            players: state.players.map((player) => player.number === number ? { ...player, prompt: newPrompt } : player ),
        }))
    },
    updateSimilarity: (number, newSimilarity) => {
        set((state) => ({
            players: state.players.map((player) => player.number === number ? { ...player, similarity: newSimilarity } : player ),
        }))
    }
}))