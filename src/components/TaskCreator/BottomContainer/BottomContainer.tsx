import React from 'react';
import {
  Form,
  Input,
  Upload,
  InputNumber 
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
      <div className="inner-container">
        <Form.Item
          name="details"
          label="Details">
            <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration">
            <InputNumber min={0} step={0.5} />
        </Form.Item>
      </div>
      <div className="inner-container">
        <Form.Item label="Attachments" >
          <Form.Item name="attachments" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="notate"
          label="Other notes">
            <Input.TextArea rows={5} />
        </Form.Item>
      </div>           
    </>
  )
}

export default BottomContainer;