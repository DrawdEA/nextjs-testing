import { create } from "zustand";

interface AnswerStore {
    prompt: string;    
    answer: string;
    setPrompt: (newPrompt: string) => void;
    setAnswer: (newName: string) => void;
}

export const useAnswerStore = create<AnswerStore>((set) => ({
    prompt: "",
    answer: "",
    setPrompt: (newPrompt) => {
        set((state) => ({prompt: newPrompt}));
    },
    setAnswer: (newAnswer) => {
        set((state) => ({answer: newAnswer}));
    },
}))