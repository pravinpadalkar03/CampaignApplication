import type { Campaign } from '../types';
import dayjs from './dayjs';

export function filterCampaigns(
    campaigns: Campaign[],
    searchText: string,
    dateRange: [string | null, string | null] | null,
): Campaign[] {
    return campaigns
        .filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()))
        .filter((campaign) => {
            if (!dateRange) return true;
            const [startDate, endDate] = dateRange;
            const campaignStartDate = dayjs(campaign.startDate, 'DD/MM/YYYY');
            const campaignEndDate = dayjs(campaign.endDate, 'DD/MM/YYYY');
            return (
                campaignStartDate.isSameOrBefore(dayjs(endDate, 'YYYY-MM-DD'), 'day') &&
                campaignEndDate.isSameOrAfter(dayjs(startDate, 'YYYY-MM-DD'), 'day')
            );
        });
}
