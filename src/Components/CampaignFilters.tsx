import { DatePicker, Input } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { setDateRange, setSearchText } from '../store/campaignFilterSlice';
import { dispatch } from '../store';


function CampaignFilters() {
    const { RangePicker } = DatePicker;
    const { Search } = Input;
    // const dispatch = useDispatch()

    const handleDateRangeChange: RangePickerProps['onChange'] = (_, dateStrings) => {
        dispatch(setDateRange(dateStrings ? [dateStrings[0] || null, dateStrings[1] || null] : null));
        console.log(dateStrings)
    }

    return (
        <div className='flex justify-between items-center my-8'>
            <RangePicker placement='bottomLeft' onChange={handleDateRangeChange} />
            <Search style={{ width: '300px' }} size="medium" placeholder="Search By Name" onChange={(e) => dispatch(setSearchText(e.target.value))} allowClear />
        </div>
    )
}

export default CampaignFilters