import React from 'react';
import { Link } from 'dva/router';
import { Icon } from 'antd';
import PageHeader from '../components/PageHeader';
import styles from './PageHeaderLayout.less';

export default ({ children, wrapperClassName, top, ...restProps }) => (
  <div className={`${wrapperClassName} ${styles.pageHeaderLayoutRoot}`}>
    {top}
    <PageHeader
      key="pageheader"
      {...restProps}
      linkElement={Link}
      breadcrumbSeparator={<Icon type="swap-right" style={{ color: '#666' }} />}
    />
    {children ? <div className={styles.content}>{children}</div> : null}
  </div>
);
