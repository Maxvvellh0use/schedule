import React from 'react';
import { useSelector } from 'react-redux';
import {
  Form,
  Input,
  Upload,
  InputNumber, 
  Checkbox
} from 'antd';
import 'antd/dist/antd.css';
import { InboxOutlined } from '@ant-design/icons';

import './BottomContainer.scss';

interface State {
  app: {
    language: string
  }
}

const BottomContainer: React.FC = () => {
  const normFile = (e: { fileList: any }) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const language = useSelector<State, string>(state => state.app.language);
  const detailsLabel = (language === 'eng') ? 'Details' : 'Подробности';
  const durationLabel = (language === 'eng') ? 'Duration' : 'Продолжительность';
  const attachmentsLabel = (language === 'eng') ? 'Attachments' : 'Вложения';
  const attachmentsDescription = (language === 'eng') ? 'Click or drag file to this area to upload' 
    : 'Выберите или перетащите файл в эту область, чтобы загрузить';
  const attachmentsUploadDescription = (language === 'eng') ? 'Support for a single or bulk upload.' 
    : 'Поддерживается одиночная и множественная загрузка';
  const notate = (language === 'eng') ? 'Other notes' : 'Другие пометки';
  const feedback = (language === 'eng') ? 'Request feedback' : 'Запросить отзыв';

  return (
    <>
      <div className="inner-container">
        <Form.Item
          name="details"
          label={detailsLabel}>
            <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="duration"
          label={durationLabel}>
            <InputNumber min={0} step={0.5} />
        </Form.Item>
      </div>
      <div className="inner-container">
        <Form.Item label={attachmentsLabel} >
          <Form.Item name="attachments" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">{attachmentsDescription}</p>
              <p className="ant-upload-hint">{attachmentsUploadDescription}</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="notate"
          label={notate}>
            <Input.TextArea rows={5} />
        </Form.Item>
      </div>
      <div className="inner-container">
        <Form.Item name="feedback" valuePropName="checked">
          <Checkbox >{feedback}</Checkbox>
        </Form.Item>
      </div>
    </>
  )
}

export default BottomContainer;