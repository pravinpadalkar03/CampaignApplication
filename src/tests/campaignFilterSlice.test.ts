import { describe, expect, it } from 'vitest';
import { campaignFilterReducer, setDateRange, setSearchText } from '../store/campaignFilterSlice';

describe('campaignFilterReducer', () => {
    it('starts with an empty search and no date range', () => {
        expect(campaignFilterReducer(undefined, { type: 'unknown' })).toEqual({
            searchText: '',
            dateRange: null,
        });
    });

    it('updates search text without changing the date range', () => {
        const state = campaignFilterReducer(undefined, setDateRange(['2026-03-01', '2026-03-31']));
        expect(campaignFilterReducer(state, setSearchText('spring'))).toEqual({
            searchText: 'spring',
            dateRange: ['2026-03-01', '2026-03-31'],
        });
    });

    it('updates or clears the date range without changing search text', () => {
        const state = campaignFilterReducer(undefined, setSearchText('spring'));
        const withRange = campaignFilterReducer(state, setDateRange(['2026-03-01', '2026-03-31']));

        expect(withRange).toEqual({
            searchText: 'spring',
            dateRange: ['2026-03-01', '2026-03-31'],
        });
        expect(campaignFilterReducer(withRange, setDateRange(null))).toEqual({
            searchText: 'spring',
            dateRange: null,
        });
    });
});
