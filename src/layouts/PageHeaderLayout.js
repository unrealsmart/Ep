import React from 'react';
import { Link } from 'dva/router';
import { Icon } from 'antd';
import PageHeader from '../components/PageHeader';
import styles from './PageHeaderLayout.less';

export default ({ children, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
    <PageHeader
      key="pageheader"
      {...restProps}
      linkElement={Link}
      breadcrumbSeparator={<Icon type="swap-right" />}
    />
    {children ? <div className={styles.content}>{children}</div> : null}
  </div>
);
