import { PageContainer } from '@ant-design/pro-layout';
import Dragger from 'antd/lib/upload/Dragger';
import React, { useEffect, useRef, useState } from 'react';
import { InboxOutlined, InfoCircleFilled, LeftOutlined, RollbackOutlined } from '@ant-design/icons';
import { Button, Card, message, notification, Popover, Table, Tooltip, UploadProps } from 'antd';
import styles from '../index.less';
import { useModel } from '@umijs/max';
import { ProCard } from '@ant-design/pro-components';
import ActiveTable from './ActiveTable';
import { computeData } from '@/services/HomeApi/service'
import ExportJsonExcel from 'js-export-excel'
import moment from 'moment';

interface CounterTableProps {
  // data: any
}

export default (props: CounterTableProps) => {
  // const { data } = props;
  const { counterData, setCounterData } = useModel('counter');

  // console.log("data~~~~", counterData);
  const [computedData, setComputedData] = useState([]);
  

  const onSaveClick = async(dataSource: any) => {
    const data = await computeData({data: dataSource})
    // console.log("resultData!!!", data);
    if (data.code === 1) {
      message.success('计算成功')
      // setComputedData(data.data.resultData)
      setCounterData(data.data)
    } else {
      notification.error({
        message: "计算出错啦~",
        description: data.message,
        placement: 'top'
      })
    }
  }

  const resultColumn = [
    {
      title: '本次借款', 
      dataIndex: '本次借款',
    },
    {
      title: () => <Tooltip title="本金 = 本次借款 + 剩余本金">本金<InfoCircleFilled style={{marginLeft: '3px'}} /></Tooltip>,
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
      title: () => <Tooltip title="可移动到每一个的利率上查看使用的是哪个利率">利率(%)<InfoCircleFilled style={{marginLeft: '3px'}} /></Tooltip>,
      dataIndex: '利率',
      render: (text: string, data: any) => (
        <Popover color="rgba(0, 0, 0, 0.8)" content={() => (<div style={{color: 'white'}}>{data.利率信息}</div>)}>
          <span style={{cursor: 'pointer'}}>{text}</span>
        </Popover>
      )
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
      title: <Tooltip title="可移动到每一个利息上查看计算过程">利息<InfoCircleFilled style={{marginLeft: '3px'}} /></Tooltip>,
      dataIndex: '利息',
      render: (text: string, data: any) => (
        <Popover color="rgba(0, 0, 0, 0.8)" content={() => (<div style={{color: 'white'}} dangerouslySetInnerHTML={{__html: data.利息信息}}></div>)}>
          <span style={{cursor: 'pointer'}}>{text}</span>
        </Popover>
      )
    },
    {
      title: <Tooltip title="还利息余额 = 还款金额 - 利息">还利息余额<InfoCircleFilled style={{marginLeft: '3px'}} /></Tooltip>,
      dataIndex: '还利息余额',
    },
    {
      title: <Tooltip title="剩余本金 = 本金 - 还利息余额">剩余本金<InfoCircleFilled style={{marginLeft: '3px'}} /></Tooltip>,
      dataIndex: '剩余本金',
    }
  ]

  const exportCounterData = () => {
    // 进入导出
    let sheetFilter = ['本次借款', '本金', '起算时间', '截止时间', '利率', '还款时间', '还款金额', '利息', '还利息余额', '剩余本金'];
    let option:any = {};
    option.fileName = '计算结果'+ moment().format('YYYY_MM_DD_HH_mm_ss');
    option.datas = [
      {
        sheetData: counterData.resultData,
        sheetName: 'sheet1',
        sheetFilter: sheetFilter,
        sheetHeader: ['本次借款', '本金', '起算时间', '截止时间', '利率', '还款时间', '还款金额', '利息', '还利息余额', '剩余本金'],
        columnWidths: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
      },
    ];
    var toExcel = new ExportJsonExcel(option); //new
    toExcel.saveExcel(); //保存
  }

  return (
    <PageContainer
      header={{
        title: (
        <div style={{width: '100%'}}>
          <LeftOutlined className={styles.backIcon} onClick={() => setCounterData(undefined)} />
          <span>数据源</span>
        </div>
        ),
      }}
      className={styles.tableWrap}
    >
    {
      counterData && counterData.originData && (
        <ActiveTable tableData={counterData.originData} onSaveClick={onSaveClick}></ActiveTable>
      )
    }
      {
        counterData && counterData.resultData && counterData.resultData.length > 0 && (
          <>
            <p className={styles.rowTitle}>
              计算结果
              <Button onClick={exportCounterData} type="link" style={{float: 'right', fontWeight: 700, fontSize: '16px'}}>导出计算结果</Button>
            </p>
            <ProCard style={{marginBottom: '100px'}}>
              <Table 
                  columns={resultColumn}
                  dataSource={counterData.resultData}
                  pagination={false}
                  rowKey={'起算时间'}
                  summary={() => (
                    <Table.Summary fixed>
                      <Table.Summary.Row style={{backgroundColor: '#fafafa'}}>
                        <Table.Summary.Cell index={0}>合计</Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={9} align="right">
                          <span className={styles.totalItem}>总借款：<span>{counterData?.totalBrrow === undefined ? '-' : counterData.totalBrrow}</span></span>
                          <span className={styles.totalItem}>总还款：<span>{counterData?.totalPay === undefined ? '-' : counterData.totalPay}</span></span>
                          <span className={styles.totalItem}>计算后剩余本金：<span>{counterData?.totalRest === undefined ? '-' : counterData.totalRest}</span></span>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </Table.Summary>
                  )}
                ></Table>
              </ProCard>
            </>
        )
      }

    </PageContainer>
  )
}