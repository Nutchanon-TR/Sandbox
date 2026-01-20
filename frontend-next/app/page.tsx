'use client'
import TextField from '@mui/material/TextField';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { DataType } from './interface/DataType';

export default function Home() {
  
  const columns: TableProps<DataType>['columns'] = [
      {
        title: 'Name', 
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a>Edit</a>/
            <a>Delete</a>
          </Space>
        ),
      },
    ];
  
    const data: DataType[] = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ];
  return (<>
  <div className="w-[500px] flex items-center justify-start">
          <TextField
            id="outlined-search"
            label="Search for setting..."
            type="search"
            className="w-full max-w-[300px]"
          />
        </div>
   <Table<DataType> columns={columns} dataSource={data} />
  </>
  );  
}
