import { DatePicker, Input, Table, Tag } from 'antd';
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
const { RangePicker } = DatePicker;
const { Search } = Input;
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
        <>
            <div className='flex justify-between items-center my-8'>
                <RangePicker placement='bottomLeft' />
                <Search style={{ width: '300px' }} size="medium" placeholder="Search By Name" allowClear />
            </div>
            <Table<DataType>
                columns={columns}
                dataSource={campaignList}
                rowKey={(record) => record.id.toString()}
            />
        </>
    )
}

export default CampgainList




