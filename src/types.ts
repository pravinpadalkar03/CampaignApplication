export interface Campaign {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    active: boolean;
    budget: number;
    currency: string
}

export interface ICampaignFilterState {
    searchText: string;
    dateRange: [string | null, string | null] | null;
}

export type IcreateCampaign = Omit<Campaign, 'id'>