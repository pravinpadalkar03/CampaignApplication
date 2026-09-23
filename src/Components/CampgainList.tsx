import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';

interface DataType {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    active: boolean;
    budget: number;
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
];



function CampgainList() {
    const [campaignList, setCampaignList] = useState<DataType[]>([]);
    useEffect(() => {
        fetch('http://localhost:3000/campaigns')
            .then(response => response.json())
            .then(data => setCampaignList(data))
            .catch(error => console.error('Error fetching campaign data:', error));
    }, []);
    return (
        <Table<DataType>
            style={{ width: '70%', margin: '0 auto' }}
            className='w-1/2'
            columns={columns}
            dataSource={campaignList}
            rowKey={(record) => record.id.toString()}
        />
    )
}

export default CampgainList




