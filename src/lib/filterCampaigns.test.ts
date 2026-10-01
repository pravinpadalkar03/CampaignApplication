import { describe, expect, it } from 'vitest';
import { filterCampaigns } from './filterCampaigns';
import type { Campaign } from '../types';

const campaigns: Campaign[] = [
    {
        id: 1,
        name: 'Spring Launch',
        startDate: '01/03/2026',
        endDate: '31/03/2026',
        active: true,
        budget: 3000,
        currency: 'USD',
    },
    {
        id: 2,
        name: 'Summer Sale',
        startDate: '01/06/2026',
        endDate: '30/06/2026',
        active: false,
        budget: 5000,
        currency: 'EUR',
    },
    {
        id: 3,
        name: 'Spring Retargeting',
        startDate: '15/03/2026',
        endDate: '15/04/2026',
        active: true,
        budget: 1500,
        currency: 'USD',
    },
];

describe('filterCampaigns', () => {
    it('returns all campaigns when no filters are selected', () => {
        expect(filterCampaigns(campaigns, '', null)).toEqual(campaigns);
    });

    it('filters names using a case-insensitive substring search', () => {
        expect(filterCampaigns(campaigns, 'SPRING', null).map(({ id }) => id)).toEqual([1, 3]);
        expect(filterCampaigns(campaigns, 'missing', null)).toEqual([]);
    });

    it('includes campaigns whose active dates overlap the selected range', () => {
        expect(filterCampaigns(campaigns, '', ['2026-03-20', '2026-03-25']).map(({ id }) => id))
            .toEqual([1, 3]);
    });

    it('treats campaign dates on either range boundary as overlapping', () => {
        expect(filterCampaigns(campaigns, '', ['2026-03-31', '2026-04-01']).map(({ id }) => id))
            .toEqual([1, 3]);
        expect(filterCampaigns(campaigns, '', ['2026-02-01', '2026-03-01']).map(({ id }) => id))
            .toEqual([1]);
    });

    it('excludes campaigns that fall entirely outside the selected range', () => {
        expect(filterCampaigns(campaigns, '', ['2026-05-01', '2026-05-31'])).toEqual([]);
    });

    it('applies name and date filters together', () => {
        expect(filterCampaigns(campaigns, 'spring', ['2026-04-01', '2026-04-30']).map(({ id }) => id))
            .toEqual([3]);
    });
});
