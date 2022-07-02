import { PageContainer } from '@ant-design/pro-layout';
import Dragger from 'antd/lib/upload/Dragger';
import React, { useEffect, useRef, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Card, message, Table, UploadProps } from 'antd';
import styles from '../index.less';
import { useModel } from '@umijs/max';
import { ProCard } from '@ant-design/pro-components';
import ActiveTable from './ActiveTable';
import { computeData } from '@/services/HomeApi/service'

interface CounterTableProps {
  // data: any
}

export default (props: CounterTableProps) => {
  // const { data } = props;
  const { counterData } = useModel('counter');

  // console.log("data~~~~", counterData);
  const [computedData, setComputedData] = useState([]);

  useEffect(() => {
    if (counterData && counterData.resultData.length > 0) {
      setComputedData(counterData.resultData)
    }
  }, [counterData])
  

  const onSaveClick = async(dataSource: any) => {
    const data = await computeData({data: dataSource})
    console.log("resultData!!!", data);
    if (data.code === 1) {
      message.success('重新计算成功')
      setComputedData(data.data.resultData)
    }
  }

  const resultColumn = [
    {
      title: '本次借款', 
      dataIndex: '本次借款',
    },
    {
      title: '本金',
      dataIndex: '本金',
    },
    {
      title: '起算时间',
      dataIndex: '起算时间',
    },
    {
      title: '截止时间',
      dataIndex: '截止时间',
    },
    {
      title: '利率',
      dataIndex: '利率',
    },
    {
      title: '还款时间',
      dataIndex: '还款时间',
    },
    {
      title: '还款金额',
      dataIndex: '还款金额',
    },
    {
      title: '利息',
      dataIndex: '利息',
    },
    {
      title: '还利息余额',
      dataIndex: '还利息余额',
    },
    {
      title: '剩余本金',
      dataIndex: '剩余本金',
    }
  ]

  return (
    <PageContainer
      header={{
        title: '数据源',
      }}
    >
      {/* <ProCard> */}
        {/* <div className={styles.activeContainer}> */}
          <ActiveTable tableData={counterData.originData} onSaveClick={onSaveClick}></ActiveTable>
        {/* </div> */}
      {/* </ProCard> */}

      <p className={styles.rowTitle}>计算结果</p>
      <ProCard style={{marginBottom: '100px'}}>
        <Table 
            columns={resultColumn}
            dataSource={computedData}
            pagination={false}
            rowKey={'起算时间'}
          ></Table>
      </ProCard>

    </PageContainer>
  )
}