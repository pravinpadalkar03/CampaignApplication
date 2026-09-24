import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
interface DataType {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    active: boolean;
    budget: number;
}
interface IPropType {
    dateRange: [Dayjs | null, Dayjs | null] | null,
    searchText: string
}
const columns: TableProps<DataType>['columns'] = [
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
    },
    {
        title: 'End Date',
        dataIndex: 'endDate',
        key: 'endDate',
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
        )
    }
]

dayjs.extend(customParseFormat);

function CampgainList({ dateRange, searchText }: IPropType) {
    const [campaignList, setCampaignList] = useState<DataType[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/campaigns')
            .then(response => response.json())
            .then(data => setCampaignList(data))
            .catch(error => console.error('Error fetching campaign data:', error));
    }, []);


    const filteredData = campaignList.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase())).filter((campaign) => {
        if (!dateRange) return true;
        const [startDate, endDate] = dateRange;
        const campgainStartDate = dayjs(campaign.startDate, "DD/MM/YYYY")
        const campgainEndDate = dayjs(campaign.endDate, "DD/MM/YYYY")

        return (campgainStartDate.isAfter(startDate) || campgainStartDate.isSame(startDate)) && (campgainEndDate.isSame(endDate) || campgainEndDate.isBefore(endDate));
    });
    return (
        <>

            <Table<DataType>
                columns={columns}
                dataSource={filteredData}
                rowKey={(record) => record.id.toString()}
            />
        </>
    )
}

export default CampgainList




