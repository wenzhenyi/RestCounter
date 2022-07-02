import services from '@/services/demo';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { getLPRList } from '@/services/LprApi/service';

const { addUser, queryUserList, deleteUser, modifyUser } =
  services.UserController;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.UserInfo) => {
  const hide = message.loading('正在添加');
  try {
    await addUser({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await modifyUser(
      {
        userId: fields.id || '',
      },
      {
        name: fields.name || '',
        nickName: fields.nickName || '',
        email: fields.email || '',
      },
    );
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.UserInfo[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteUser({
      userId: selectedRows.find((row) => row.id)?.id || '',
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.UserInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserInfo[]>([]);
  const columns: ProDescriptionsItemProps<API.UserInfo>[] = [
    {
      title: '年份',
      dataIndex: 'year',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '名称为必填项',
          },
        ],
      },
    },
    {
      title: '一月',
      dataIndex: 'month1',
      render: (value: any) => value ? `${(value * 100).toFixed(2)}%` : '-'
    },
    {
      title: '二月',
      dataIndex: 'month2',
      render: (value: any) => value ? `${(value * 100).toFixed(2)}%` : '-'
    },
    {
      title: '三月',
      dataIndex: 'month3',
      render: (value: any) => value ? `${(value * 100).toFixed(2)}%` : '-'
    },
    {
      title: '四月',
      dataIndex: 'month3',
      render: (value: any) => value ? `${(value * 100).toFixed(2)}%` : '-'
    },
    {
      title: '五月',
      dataIndex: 'month5',
      render: (value: any) => value ? `${(value * 100).toFixed(2)}%` : '-'
    },
    {
      title: '六月',
      dataIndex: 'month6',
      render: (value: any) => {
        console.log("value!!!", value)
        return value ? `${(value * 100).toFixed(2)}%` : '-'
      }
    },
    {
      title: '七月',
      dataIndex: 'month7',
      render: (value: any) => value ? `${(value * 100).toFixed(2)}%` : '-'
    },
    {
      title: '八月',
      dataIndex: 'month8',
      render: (value: any) => value ? `${(value * 100).toFixed(2)}%` : '-'
    },
    {
      title: '九月',
      dataIndex: 'month9',
      render: (value: any) => value ? `${(value * 100).toFixed(2)}%` : '-'
    },
    {
      title: '十月',
      dataIndex: 'month10',
      render: (value: any) => value ? `${(value * 100).toFixed(2)}%` : '-'
    },
    {
      title: '十一月',
      dataIndex: 'month11',
      render: (value: any) => value ? `${(value * 100).toFixed(2)}%` : '-'
    },
    {
      title: '十二月',
      dataIndex: 'month12',
      render: (value: any) => value ? `${(value * 100).toFixed(2)}%` : '-'
    },
    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   render: (_, record) => (
    //     <>
    //       <a
    //         onClick={() => {
    //           handleUpdateModalVisible(true);
    //           setStepFormValues(record);
    //         }}
    //       >
    //         配置
    //       </a>
    //       <Divider type="vertical" />
    //       <a href="">订阅警报</a>
    //     </>
    //   ),
    // },
  ];

  return (
    <PageContainer
      header={{
        title: 'LPR管理',
      }}
    >
      <ProTable<API.UserInfo>
        actionRef={actionRef}
        rowKey="year"
        search={false}
        options={false}
        toolBarRender={() => [
          <p></p>
          // <Button
          //   key="1"
          //   type="primary"
          //   onClick={() => handleModalVisible(true)}
          // >
          //   调整LPR
          // </Button>,
        ]}
        request={async (params, sorter, filter) => {
          const { data, success } = await getLPRList({
            ...params,
            // FIXME: remove @ts-ignore
            // @ts-ignore
            sorter,
            filter,
          });
          const formatData = data.reverse().map((item) => {
            const obj: any = {
              year: item.year
            }
            if (item.monthLPR) {
              for(let i = 0; i < 12; i++) {
                obj[`month${i+1}`] = item.monthLPR[i] || false
              }
            }
            return obj
          })
          console.log("data", formatData)
          return {
            data: formatData || [],
            success,
          };
        }}
        columns={columns}
      />
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<API.UserInfo, API.UserInfo>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<API.UserInfo>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
