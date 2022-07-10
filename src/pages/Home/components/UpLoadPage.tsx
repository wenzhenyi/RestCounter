import { PageContainer } from '@ant-design/pro-layout';
import Dragger from 'antd/lib/upload/Dragger';
import React, { useRef, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, UploadProps } from 'antd';

interface UploadPageProps {
  onUploadSuccess: any
}

export default (props: UploadPageProps) => {
  const { onUploadSuccess } = props;
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
          onUploadSuccess(response.data)
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
      <Dragger
        {...UploadProp}
        >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击此处或拖动文件到此处上传</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
          <a>可下载模板文件</a>
        </p>
      </Dragger>
      </>
  )
}