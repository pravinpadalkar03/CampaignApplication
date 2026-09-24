import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { Campaign } from '../types';
import { useGetCampaignQuery } from '../store/apiSlice';

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
        )
    }
]

dayjs.extend(customParseFormat);

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
        const campgainStartDate = dayjs(campaign.startDate, "DD/MM/YYYY")
        const campgainEndDate = dayjs(campaign.endDate, "DD/MM/YYYY")

        return (campgainStartDate.isAfter(startDate) || campgainStartDate.isSame(startDate)) && (campgainEndDate.isSame(endDate) || campgainEndDate.isBefore(endDate));
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




