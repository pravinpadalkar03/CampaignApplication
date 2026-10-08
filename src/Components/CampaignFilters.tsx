import { DatePicker, Input } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { setDateRange, setSearchText } from '../store/campaignFilterSlice';
import { dispatch } from '../store';
import { useState } from 'react';
import type { Dayjs } from 'dayjs';


function CampaignFilters() {
    const { RangePicker } = DatePicker;
    const { Search } = Input;
    const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);
    const [activeRange, setActiveRange] = useState<'start' | 'end' | null>(null);
    // const dispatch = useDispatch()

    const handleDateRangeChange: RangePickerProps['onChange'] = (_, dateStrings) => {
        dispatch(setDateRange(dateStrings ? [dateStrings[0] || null, dateStrings[1] || null] : null));
        setSelectedEndDate(_?.[1] ?? null);
    }

    return (
        <div className='flex justify-between items-center my-8'>
            <RangePicker placement='bottomLeft' onChange={handleDateRangeChange}
                onFocus={(_, info) => setActiveRange(info.range ?? null)}
                onCalendarChange={(dates, _, info) => {
                    if (info.range === 'end') {
                        setSelectedEndDate(dates[1]);
                    }
                }}
                disabledDate={(current, info) => {
                    if (activeRange === 'start' && selectedEndDate) {
                        return current.isAfter(selectedEndDate, 'day');
                    }

                    return activeRange === 'end' && Boolean(info.from) && current.isBefore(info.from, 'day');
                }} />
            <Search style={{ width: '300px' }} size="medium" placeholder="Search By Name" onChange={(e) => dispatch(setSearchText(e.target.value))} allowClear />
        </div>
    )
}

export default CampaignFilters