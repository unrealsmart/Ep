import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '仪表盘',
    icon: 'dashboard',
    path: 'index',
  },
  {
    name: '用户',
    icon: 'user',
    path: 'users',
    children: [
      {
        name: '会员',
        icon: 'contacts',
        path: 'member',
      },
      {
        name: '管理员',
        icon: 'solution',
        path: 'administrators',
      },
      {
        name: '组设置',
        icon: 'team',
        path: 'group',
      },
    ],
  },
  {
    name: '商家',
    icon: 'shop',
    path: 'shop',
    children: [
      {
        name: '商家列表',
        path: 'lists',
      },
      {
        name: '入驻申请',
        path: 'enter',
      },
    ],
  },
  {
    name: '代理',
    icon: 'fork',
    path: 'agent',
    children: [
      {
        name: '代理列表',
        path: 'lists',
      },
      {
        name: '入驻申请',
        path: 'enter',
      },
    ],
  },
  {
    name: '财务管理',
    icon: 'pay-circle-o',
    children: [
      {
        name: '账务流水',
        path: 'stream',
      },
      {
        name: '提现列表',
        path: 'withdraw-lists',
      },
    ],
  },
  {
    name: '订单管理',
    icon: 'printer',
    path: 'order',
    children: [
      {
        name: '订单列表',
        path: 'lists',
      },
    ],
  },
  {
    name: '服务项目',
    path: 'item',
    hideInBreadcrumb: true,
    hideInMenu: true,
    children: [
      {
        name: '分类',
        path: 'category',
      },
      {
        name: '服务列表',
        path: 'lists',
      },
    ],
  },
  {
    name: '活动管理',
    icon: 'gift',
    path: 'activity',
    children: [
      {
        name: '秒杀',
        path: 'ms',
      },
      {
        name: '拼团',
        path: 'pt',
      },
    ],
  },
  {
    name: '票券管理',
    icon: 'red-envelope',
    path: 'ticket',
    children: [
      {
        name: '优惠券',
        path: 'coupon',
      },
    ],
  },
  {
    name: '设置',
    icon: 'setting',
    path: 'setting',
    children: [
      {
        name: '系统',
        icon: 'windows-o',
        path: 'system',
      },
      {
        name: '自定义',
        icon: 'form',
        path: 'custom',
      },
    ],
  },
  /*
  {
    name: '仪表盘',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: '表单页',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: '基础表单',
        path: 'basic-form',
      },
      {
        name: '分步表单',
        path: 'step-form',
      },
      {
        name: '高级表单',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: '列表页',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: '查询表格',
        path: 'table-list',
      },
      {
        name: '标准列表',
        path: 'basic-list',
      },
      {
        name: '卡片列表',
        path: 'card-list',
      },
      {
        name: '搜索列表',
        path: 'search',
        children: [
          {
            name: '搜索列表（文章）',
            path: 'articles',
          },
          {
            name: '搜索列表（项目）',
            path: 'projects',
          },
          {
            name: '搜索列表（应用）',
            path: 'applications',
          },
        ],
      },
    ],
  },
  {
    name: '详情页',
    icon: 'profile',
    path: 'profile',
    children: [
      {
        name: '基础详情页',
        path: 'basic',
      },
      {
        name: '高级详情页',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  },
  */
  {
    name: '结果页',
    icon: 'check-circle-o',
    path: 'result',
    hideInMenu: true,
    children: [
      {
        name: '成功',
        path: 'success',
      },
      {
        name: '失败',
        path: 'fail',
      },
    ],
  },
  {
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    hideInMenu: true,
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
      {
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
];

// 注意：
// 若要通过虚拟机环境或直接使用，修改 parentPath = '/' => parentPath = '/admin/'
// 此外，相关重定向跳转需要更改到 '/admin/'
export function formatter(data, parentPath = '/admin/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
