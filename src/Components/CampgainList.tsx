import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { Campaign } from '../types';
import { useGetCampaignQuery } from '../store/apiSlice';
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

interface IPropType {
    dateRange: [Dayjs | null, Dayjs | null] | null,
    searchText: string
}
const columns: TableProps<Campaign>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'User Name',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
        sorter: (a, b) => dayjs(a.startDate, "DD/MM/YYYY").unix() - dayjs(b.startDate, "DD/MM/YYYY").unix()
    },
    {
        title: 'End Date',
        dataIndex: 'endDate',
        key: 'endDate',
        sorter: (a, b) => dayjs(a.endDate, "DD/MM/YYYY").unix() - dayjs(b.endDate, "DD/MM/YYYY").unix()
    },
    {
        title: 'Active',
        key: 'active',
        dataIndex: 'active',
        render: (active: boolean) =>
        (
            <Tag color={active ? 'green' : 'red'}>
                {active ? 'Active' : 'Inactive'}
            </Tag>
        ),
        align: 'center'
    },
    {
        title: 'Budget',
        dataIndex: 'budget',
        key: 'budget',
        render: (_, record) => `${new Intl.NumberFormat('en-US', {
            notation: 'compact',
            maximumFractionDigits: 1,
        }).format(record.budget)} ${record.currency}`,
        align: 'center'
    },
]

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
function CampgainList({ dateRange, searchText }: IPropType) {
    const { data: campaignList = [], isLoading, } = useGetCampaignQuery();
    // useEffect(() => {
    //     fetch('http://localhost:3000/campaigns')
    //         .then(response => response.json())
    //         .then(data => setCampaignList(data))
    //         .catch(error => console.error('Error fetching campaign data:', error));
    // }, []);

    const filteredData = campaignList.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase())).filter((campaign) => {
        if (!dateRange) return true;
        const [startDate, endDate] = dateRange;
        const campaignStartDate = dayjs(campaign.startDate, "DD/MM/YYYY")
        const campaignEndDate = dayjs(campaign.endDate, "DD/MM/YYYY")
        // console.log({
        //     1: campgainStartDate.isAfter(startDate),
        //     2: campgainStartDate.isSame(startDate),
        //     3: campgainEndDate.isSame(endDate),
        //     4: campgainEndDate.isBefore(endDate)
        // })
        return (
            campaignStartDate.isSameOrBefore(endDate, "day") &&
            campaignEndDate.isSameOrAfter(startDate, "day")
        );
    });
    return (
        <>

            <Table<Campaign>
                columns={columns}
                dataSource={filteredData}
                rowKey={(record) => record.id.toString()}
                loading={isLoading}
            />
        </>
    )
}

export default CampgainList




