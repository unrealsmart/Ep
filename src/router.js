import React from 'react';
import { Route, routerRedux, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import styles from './index.less';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/admin/user'].component;
  const BasicLayout = routerData['/admin'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/admin/user" component={UserLayout} />
          <AuthorizedRoute
            path="/admin"
            render={props => <BasicLayout {...props} />}
            authority={['Admin', 'Admin-Agent', 'Admin-User']}
            // noMatch={(<div>no match</div>)}
            redirectPath="/admin/user/login"
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
