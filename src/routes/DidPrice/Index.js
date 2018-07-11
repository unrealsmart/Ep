import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Avatar,
  Table,
  Tooltip,
  Icon,
} from 'antd';
import numeral from 'numeral';
import {
  MiniArea,
} from 'components/Charts';
// import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Index.less';

let interval = () => {};

@connect(({ visitor, message }) => ({
  visitor,
  message,
}))
export default class Index extends PureComponent {
  componentDidMount() {
    this.fetch();
    interval = setInterval(() => { this.fetch() }, 60 * 1000);
  }
  
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'visitor/clear',
    });
    dispatch({
      type: 'message/clear',
    });
    clearInterval(interval);
  }
  
  fetch() {
    const { dispatch } = this.props;
    dispatch({
      type: 'visitor/fetch',
      payload: { userId: '00000001' },
    });
    dispatch({
      type: 'message/fetch',
    });
  }
  
  render() {
    const { visitor, message } = this.props;
    
    const columns = {
      online: [
        {
          title: '日期',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: (
            <Tooltip title="浏览次数">
              PV
            </Tooltip>
          ),
          dataIndex: 'pv',
          key: 'pv',
          render: (text) => (text || 0),
        },
        {
          title: (
            <Tooltip title="独立访客">
              UV
            </Tooltip>
          ),
          dataIndex: 'uv',
          key: 'uv',
        },
        {
          title: (
            <Tooltip title="IP访客统计">
              IP
            </Tooltip>
          ),
          dataIndex: 'ipCount',
          key: 'ipCount',
        },
        {
          title: '新IP访客',
          dataIndex: 'newIPCount',
          key: 'newIPCount',
        },
        // TODO：等待服务端实现
        // {
        //   title: '访问次数',
        //   dataIndex: 'visitsCount',
        //   key: 'visitsCount',
        // },
      ],
      message: [
        {
          title: '日期',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: '未读留言',
          dataIndex: 'unRead',
          key: 'unRead',
        },
        {
          title: '已读留言',
          dataIndex: 'read',
          key: 'read',
        },
        {
          title: '总留言',
          dataIndex: 'total',
          key: 'total',
        },
      ],
    };
    
    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar
            size="large"
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>{/* 早安， */}祝你开心每一天！</div>
          {/* <div>竞价专家 | 轻易技术－阿尔法先行测试 - 竞价模块版 - Ver.0.0.2 - 尊贵的内测体验用户~</div> */}
        </div>
      </div>
    );
    
    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>在线人数</p>
          <p style={{ color: '#52c41a' }}>{visitor.current}</p>
        </div>
        <div className={styles.statItem}>
          <p>收到的留言</p>
          <p>
            <span style={{ fontSize: 30, color: '#f5222d' }}>{message.unRead}</span>
            <span> / {message.total}</span>
          </p>
        </div>
      </div>
    );
    
    return (
      <PageHeaderLayout content={pageHeaderContent} extraContent={extraContent}>
        <Row gutter={24} className={styles.analysis}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={message.loading}
              bordered={false}
              title="留言状况"
            >
              <Row gutter={68}>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle="今日留言"
                    gap={8}
                    total={numeral(message.todayCount).format('0,0')}
                    status={message.todayCountYoy >= 0 ? 'up' : 'down'}
                    subTotal={Math.abs(message.todayCountYoy || 0)}
                  />
                  <MiniArea line height={45} data={[]} />
                </Col>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle="总留言"
                    total={message.total}
                    gap={8}
                  />
                  <MiniArea line height={45} data={[]} />
                </Col>
              </Row>
              <Table
                rowKey={(_, index) => index}
                size="small"
                columns={columns.message}
                dataSource={Array.from(message.lists)}
                pagination={false}
              />
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={visitor.loading}
              bordered={false}
              title="访客统计"
            >
              <Row gutter={68}>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle={
                      <div>
                        <Tooltip title="统计最近30分钟之内">
                          <span style={{ marginRight: 5 }}>今日访客</span>
                          <Icon type="question-circle-o" />
                        </Tooltip>
                      </div>
                    }
                    gap={8}
                    total={numeral(visitor.current || 0).format('0,0')}
                    status={visitor.currentYoy >= 0 ? 'up' : 'down'}
                    subTotal={Math.abs(visitor.currentYoy || 0)}
                  />
                  <MiniArea line height={45} data={[]} />
                </Col>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle="总访客"
                    total={visitor.total}
                    gap={8}
                  />
                  <MiniArea line height={45} data={[]} />
                </Col>
              </Row>
              <Table
                rowKey={(_, index) => index}
                size="small"
                columns={columns.online}
                dataSource={Array.from(visitor.lists)}
                pagination={false}
              />
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
