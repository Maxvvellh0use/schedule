import React, { useEffect, useState } from 'react';
import {
  ConfigProvider,
  Layout,
  Row,
  Col,
  Form,
  Button,
  notification 
} from 'antd';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import MainPageHeader from '../../MainPageHeader/MainPageHeader';
import LeftPanel from '../LeftPanel/LeftPanel';
import AddressContainer from '../AddressContainer/AddressContainer';
import BottomContainer from '../BottomContainer/BottomContainer';

import './TaskCreatorLayout.scss';

import { EventData, RootStateType } from '../../types';
import { parseFormValuesToEventData, createEvent, createDeadlineEvent, openNotification, changeEvent } from './helpers';
import { getEventsData } from '../../../redux/actions';
import { Store } from 'antd/lib/form/interface';

import enUS from 'antd/es/locale/en_US';
import ruRU from 'antd/es/locale/ru_RU';
import 'moment/locale/ru';

interface RootState {
  allEventsData: EventData[];
}

const TaskCreatorLayout: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const allEventsData = useSelector<RootStateType, EventData[]>(state => state.allEventsData);
  const accessability = useSelector<RootStateType, boolean>(state => state.app.accessability);
  const curEvent = allEventsData.find((event) => event._id === id);
  const { Header, Content } = Layout;
  const formItemLayout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 100 },
  };
  const [form] = Form.useForm();

  const history = useHistory();  
  const dispatch = useDispatch();

  useEffect(() => {
    if (curEvent) {
      const { materials } = curEvent?.optional;
      form.setFieldsValue({
        name: curEvent.name,
        course: curEvent.course,
        type: curEvent.type,
        date: moment(curEvent.optional.date),
        time: moment(curEvent.optional.date),
        hasDeadline: curEvent.optional.deadline,
        deadlineDate: moment(curEvent.optional.deadline),
        deadlineTime: moment(curEvent.optional.deadline),
        description: curEvent.optional.description,
        materials: Array.isArray(materials) ? materials : materials ? [ materials ] : undefined,
        result: curEvent.optional.result,
        place: curEvent.optional.place,
        details: curEvent.optional.details,
        duration: curEvent.optional.duration,
        notate: curEvent.optional.notate,
      });
    }
  }, []);    
  const language = useSelector<RootStateType, string>(state => state.app.language);
  const locale = ( language === 'eng') ? enUS : ruRU;
  if (language === 'eng') {
    moment.locale('en')
  } else {
    moment.locale('ru')
  }
  const backToSheduleBtn = ( language === 'eng') ? "Back to schedule" : "Вернутся к расписанию";
  const createBtn = ( language === 'eng') ? "Create" : "Создать";
  const completeEdition = ( language === 'eng') ? "Complete edition" : "Полное издание";

  function onMarkerMove(value: string) {
    form.setFieldsValue({
      place: value,
    });
  }  

  async function onFinish(values: Store) {
    setLoading(true);
    const eventData = parseFormValuesToEventData(values);
    if (!id) {      
      const res1 = await createEvent(eventData);
      if (res1 && res1.ok) {
        if (values.deadlineDate) {
          const res2 = await createDeadlineEvent(eventData);
          openNotification(res2, id);
        }
      }
      openNotification(res1, id);      
    } else {
      const res1 = await changeEvent(id, eventData);
      openNotification(res1, id);
    }
    dispatch(getEventsData());
    setLoading(false);    
    history.push('/');    
  }

  return (
    <ConfigProvider locale={locale}>
    <Layout className={accessability ? 'accessability-on' : ''}>
      <Header>
        <MainPageHeader />
      </Header>
      <Button type="link" onClick={() => history.push('/')} >
        {backToSheduleBtn}
      </Button> 
      <Form
        form={form}
        onFinish={onFinish}
        {...formItemLayout}
        layout="vertical"
      >
        <Content>
          <Row>          
              <Col flex={1}>
                <div className="container">
                  <LeftPanel />                  
                </div>
              </Col>
              <Col flex={3}>
                <div className="container">
                <AddressContainer onMarkerMove={onMarkerMove} />
                </div>
              <div className="container bottom-container">
                <BottomContainer/>
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}> 
                  <Button 
                    className="form-submit-button"
                    type="primary" 
                    htmlType="submit" 
                    loading={loading}>
                      {curEvent ? completeEdition : createBtn}
                  </Button>
                </Form.Item>
                <Button 
                  type="link"  
                  onClick={() => history.push('/')} >
                    {backToSheduleBtn}
                </Button>                
              </div>
            </Col>         
          </Row>
        </Content>
      </Form>
    </Layout>
    </ConfigProvider>
  )
 }

export default TaskCreatorLayout;