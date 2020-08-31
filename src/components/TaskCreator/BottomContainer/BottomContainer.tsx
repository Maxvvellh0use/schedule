import React from 'react';
import {
  Form,
  Input,
  Upload,
} from 'antd';
import 'antd/dist/antd.css';
import { InboxOutlined } from '@ant-design/icons';

import './BottomContainer.scss';

const BottomContainer: React.FC = () => {
  const normFile = (e: { fileList: any }) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      <Form.Item name="details" label="Details">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Dragger">
        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>      
    </>
  )
}

export default BottomContainer;