import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import type { Campaign } from '../types';
import { useAddCampaignMutation, useGetCampaignQuery } from '../store/apiSlice';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useEffect } from 'react';
import dayjs from '../lib/dayjs';

declare global {
    interface Window {
        addCampaigns: (campaigns: Campaign[]) => void;
    }
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

function CampgainList() {
    const searchText = useSelector((state: RootState) => state.campaignFilter.searchText)
    const dateRange = useSelector((state: RootState) => state.campaignFilter.dateRange)
    const { data: campaignList = [], isLoading, isError } = useGetCampaignQuery();
    const [addCampaign, { isLoading: isPostingCampaigns }] = useAddCampaignMutation();

    const filteredData = campaignList.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase())).filter((campaign) => {
        if (!dateRange) return true;
        const [startDate, endDate] = dateRange;
        const campaignStartDate = dayjs(campaign.startDate, "DD/MM/YYYY")
        const campaignEndDate = dayjs(campaign.endDate, "DD/MM/YYYY")
        return (
            campaignStartDate.isSameOrBefore(dayjs(endDate, "YYYY-MM-DD"), "day") &&
            campaignEndDate.isSameOrAfter(dayjs(startDate, "YYYY-MM-DD"), "day")
        );
    });

    const addCampaings = async (data: Campaign[]) => {
        await Promise.all(data.map((campaign) =>
            addCampaign(campaign).unwrap()
        ))
    }
    useEffect(() => {
        window.addCampaigns = addCampaings
    }, [])
    return (
        <>
            {isPostingCampaigns && <div>Adding campaigns...</div>}
            {isError ? <div>Error fetching campaign data</div> :
                <Table<Campaign>
                    columns={columns}
                    dataSource={filteredData}
                    rowKey={(record) => record.id.toString()}
                    loading={isLoading}
                />
            }
        </>
    )
}

export default CampgainList




