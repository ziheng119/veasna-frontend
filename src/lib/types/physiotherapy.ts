export interface PainPoint {
    xCoord: number;
    yCoord: number;
}

export interface Physiotherapy {
    notes?: string;
    painPoints: PainPoint[]; // A list of coordinates marked on a diagram
}