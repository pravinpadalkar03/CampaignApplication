export interface Campaign {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    active: boolean;
    budget: number;
    currency: string
}