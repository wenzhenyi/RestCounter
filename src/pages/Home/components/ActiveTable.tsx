import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useState } from 'react';

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  children?: DataSourceType[];
};

export default (props: any) => {
  const { tableData, onSaveClick } = props;

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const [dataSource, setDataSource] = useState<DataSourceType[]>(() => tableData);
  
  const originColumn: ProColumns<DataSourceType>[] = [
      {
        title: '本金',
        dataIndex: '本金',
      },
      {
        title: '起算时间',
        dataIndex: '起算时间',
        valueType: 'date',
      },
      {
        title: '截止时间',
        dataIndex: '截止时间',
        valueType: 'date',
      },
      {
        title: '合同约定年利率(%)',
        dataIndex: '合同约定年利率',
        valueType: 'percent',
      },
      {
        title: '还款时间',
        dataIndex: '还款时间',
        valueType: 'date',
      },
      {
        title: '还款金额',
        dataIndex: '还款金额',
      },
      {
        title: '操作',
        valueType: 'option',
        width: 250,
        render: (text, record, _, action) => [
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            编辑
          </a>,
          <a
            key="delete"
            onClick={() => {
              setDataSource(dataSource.filter((item) => item.id !== record.id));
            }}
          >
            删除
          </a>,
        ],
      },
    ]

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '活动名称',
      dataIndex: 'title',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
          {
            message: '必须包含数字',
            pattern: /[0-9]/,
          },
          {
            max: 16,
            whitespace: true,
            message: '最长为 16 位',
          },
          {
            min: 6,
            whitespace: true,
            message: '最小为 6 位',
          },
        ],
      },
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'decs',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        columns={originColumn}
        rowKey="id"
        scroll={{
          x: 960,
        }}
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              key="save"
              onClick={() => {
                // dataSource 就是当前数据，可以调用 api 将其保存
                console.log(dataSource);
                if (onSaveClick) onSaveClick(dataSource)
              }}
            >
              开始计算
            </Button>,
          ];
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          // actionRender: (row, config, defaultDoms) => {
          //   return [defaultDoms.delete];
          // },
          // onValuesChange: (record, recordList) => {
          //   setDataSource(recordList);
          // },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};