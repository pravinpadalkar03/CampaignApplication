import { DatePicker, Input } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { Dayjs } from 'dayjs';

type IPropType = {
    setSearchText: React.Dispatch<React.SetStateAction<string>>,
    setDateRange: React.Dispatch<React.SetStateAction<[Dayjs | null, Dayjs | null] | null>>
}
function CampaignFilters({ setDateRange, setSearchText }: IPropType) {
    const { RangePicker } = DatePicker;
    const { Search } = Input;

    const handleDateRangeChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
        setDateRange(dates);
        console.log(dateStrings)
    }

    return (
        <div className='flex justify-between items-center my-8'>
            <RangePicker placement='bottomLeft' onChange={handleDateRangeChange} />
            <Search style={{ width: '300px' }} size="medium" placeholder="Search By Name" onChange={(e) => setSearchText(e.target.value)} allowClear />
        </div>
    )
}

export default CampaignFilters