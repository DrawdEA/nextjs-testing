import { create } from "zustand";

interface Player {
    number: number;
    prompt: string;
}

interface PlayerStore {
    players: Player[];
    addPlayer: (number: number, prompt: string) => void;
    updatePrompt: (number: number, newPrompt: string) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
    players: [{number: 1, prompt: ""}, {number: 2, prompt: ""}],
    addPlayer: (number, prompt) => {
        set((state) => ({
            players: [
                ...state.players, { number: number, prompt: prompt }
            ]
        }))
    },
    updatePrompt: (number, newPrompt) => {
        set((state) => ({
            players: state.players.map((player) => player.number === number ? { ...player, prompt: newPrompt } : player ),
        }))
    }
}))