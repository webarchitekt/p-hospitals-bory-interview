export interface Slot {
    id: string;
    time: string;
}

export type SlotsByDate = Record<string, Slot[]>;
