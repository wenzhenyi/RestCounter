import React from 'react';
import {
  PageContainer, ProCard,
} from '@ant-design/pro-components';
import { Anchor } from 'antd';
import styles from './index.less'
import writeImg from './write.png'
import uploadImg from './upload.jpg'
import result1 from './result1.png'
import result2 from './result2.png'
import result3 from './result3.png'
import result4 from './result4.png'
import origin1 from './origin1.png'
import origin2 from './origin2.png'
import origin3 from './origin3.png'
import origin4 from './origin4.png'
import origin5 from './origin5.png'
import origin6 from './origin6.png'



const { Link } = Anchor;

const UsePage: React.FC<unknown> = () => {
  
  return (
    <PageContainer
      header={{
        title: '',
      }}
    >
      <ProCard split="vertical" gutter={[32, 0]} ghost>
        <Anchor offsetTop={60} targetOffset={100}>
          <ProCard title="导航" colSpan="200px">
            <Link href="#计算方式" title="一、计算方式" />
            <Link href="#计算结果说明" title="二、计算结果说明">
              <Link href="#计算结果查看详细信息" title="详细信息" />
              <Link href="#计算结果导出" title="结果导出" />
            </Link>
            {/* <Link href="#components-anchor-demo-static" title="Static demo" />
            <Link href="#API" title="API">
              <Link href="#Anchor-Props" title="Anchor Props" />
              <Link href="#Link-Props" title="Link Props" />
            </Link> */}
          </ProCard>
          </Anchor>
          <ProCard title="" className={styles.container}>
            <div id='计算方式' className={styles.eachItem}>
              <h1>一、计算方式</h1>
              <h2>手动输入</h2>
              <img src={writeImg}></img>

              <h2>上传数据</h2>
              <img style={{width: '500px'}} src={uploadImg}></img>

              <h2>可支持的填写格式</h2>
              <h3>1. 单行填写欠款和还款</h3>
              <img src={origin1}></img>
              <h3>2. 仅填写借款信息</h3>
              <img src={origin2}></img>
              <h3>3. 仅填写还款信息</h3>
              <img src={origin3}></img>
              <h3>举个栗子：以下的输出结果是相等的</h3>
              <img src={origin5}></img>
              <img src={origin4}></img>

              <h3 style={{marginTop: '40px'}}>支持多笔欠款，多笔还款的计算</h3>
              <img src={origin6}></img>
            </div>


            <div id="计算结果说明" className={styles.eachItem}>
              <div id='计算结果查看详细信息'>
                <h1>二、计算结果说明</h1>
                <h2>详细信息</h2>
                <img src={result1}></img>
                <img style={{marginTop: '40px'}} src={result2}></img>
                <img style={{marginTop: '40px'}} src={result3}></img>
              </div>
            </div>

            <div id="计算结果导出">
              <h1>结果导出</h1>
               <img style={{marginTop: '40px'}} src={result4}></img>
            </div>
          </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default UsePage;
