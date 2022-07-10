import UpLoadPage from './components/UpLoadPage';
import CounterTable from './components/CounterTable';
import { useModel } from '@umijs/max';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { CalculatorFilled, EditFilled, FileExcelFilled } from '@ant-design/icons';
import styles from './index.less'
import { Upload, UploadProps, message } from 'antd';
import { useEffect, useState } from 'react';
import { downloadTemplate } from '@/services/HomeApi/service';
import { Link } from '@umijs/max';

const { Dragger } = Upload;

export default () => {
  const { name } = useModel('global');
  const { counterData, setCounterData } = useModel('counter');
  const [selectWayFlag, setSelectWayFlag] = useState<boolean>(true)
  // const [tableData, setTableData] = useState({originData: []})


  const onSetTableData = (data: any) => {
    // setTableData(data)
    setCounterData(data)
    setTimeout(() => setSelectWayFlag(false), 20)
    // setSelectWayFlag(false)
  }
  // console.log("counterData!!!", counterData)

  function downloadFileByForm(
    url: string,
    filename: string,
    method = 'get'
  ) {
    const form = document.createElement('form');
    form.setAttribute('action', `${url}`);
    form.setAttribute('method', `${method}`);
  
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'filename');
    input.setAttribute('value', `${filename}`);
  
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  
    setTimeout(() => {
      document.body.removeChild(form);
    }, 100);
  }

  const getTemplateFile = (e: any) => {
    e.stopPropagation()
    downloadFileByForm('http://127.0.0.1:8889/api/downloadTemplate', '模板文件.xlsx')
  } 

  const UploadProp: UploadProps = {
    name: 'file',
    multiple: false,
    action: 'http://127.0.0.1:8889/api/uploadFile',
    onChange(info) {
      const { status, response } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功.`);
        // 切换到计算器页
        if (response.code === 1) {
          onSetTableData(response.data)
        } else {
          message.error(`文件上传失败、原因：${response.message}`);
        }
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <>
      {
        !counterData ? (
          <PageContainer
              header={{
                title: (<>
                  请选择其中一种计算方式
                  <Link to="/use" style={{fontSize: '14px', cursor: 'pointer'}}>（点击此处查看使用说明）</Link>
                  </>),
              }}
              className={styles.pageContent}
              >
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <ProCard
                  colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
                  layout="center"
                  style={{ maxWidth: '500px', height: 300, margin: '20px 10% 0 0' }}
                  className={styles.cardBg}
                  direction="column"
                  hoverable
                  onClick={() => setCounterData({originData: []})}
                  >
                    {/* <CalculatorFilled /> */}
                    <EditFilled style={{fontSize: '60px'}} />
                    <div style={{fontSize: '22px', marginTop: '20px'}}>手动输入</div>
                </ProCard>
                <Upload {...UploadProp}>
                  <ProCard
                    colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
                    layout="center"
                    style={{ maxWidth: '500px', height: 300, marginTop: 20 }}
                    direction="column"
                    className={styles.cardBg2}
                    hoverable
                    >
                      <FileExcelFilled style={{fontSize: '60px'}} />
                      
                      <div style={{fontSize: '22px', marginTop: '20px'}}>上传文件</div>
                      <div className={styles.cardDetail} onClick={(e) => getTemplateFile(e)}>点击可获取模板文件</div>
                  </ProCard>
                </Upload>

              </div>
                
              {/* {
                counterData?.originData?.length > 0 ? (
                  <CounterTable />
                ) : (
                  <UpLoadPage onUploadSuccess={onSetTableData} />
                )
              } */}
            </PageContainer>
        ) : <CounterTable />
      }
  </>
  )
};
