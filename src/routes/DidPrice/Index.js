import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  // Col,
  // Card,
  Avatar,
  // Table,
  // Tooltip,
  // Icon,
} from 'antd';
// import numeral from 'numeral';
import {
  // MiniArea,
} from 'components/Charts';
// import Trend from 'components/Trend';
// import NumberInfo from 'components/NumberInfo';
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
    const { visitor } = this.props;

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar
            size="large"
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>早安，祝你开心每一天！</div>
          <div>竞价专家 | 轻易技术 - Ver.0.0.3</div>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>在线人数</p>
          <p style={{ color: '#52c41a' }}>{visitor.current}</p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout content={pageHeaderContent} extraContent={extraContent}>
        <Row gutter={24} className={styles.analysis}>
          <h1>好生活，乐享派</h1>
        </Row>
      </PageHeaderLayout>
    );
  }
}
