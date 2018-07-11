import React, { PureComponent } from 'react';
// import { connect } from 'dva';
// import { Link } from 'dva/router';
import { Card, Timeline } from 'antd';

export default class Logs extends PureComponent {
  render() {
    return (
      <Card>
        <article className="markdown">
          <h1>更新日志</h1>
          <section>目前，此项目应用于：好享派、竞价互联</section>
          <Timeline>
            {/* 0.0.4 */}
            <Timeline.Item>
              <h2>0.0.4</h2>
              <p><code>2018-07-05</code></p>
              <ul>
                <li>
                  <p><span role="img" aria-label="Star">🌟</span> </p>
                </li>
              </ul>
            </Timeline.Item>
            {/* 0.0.3 */}
            <Timeline.Item>
              <h2>0.0.3</h2>
              <p><code>2018-07-04</code></p>
              <ul>
                <li>
                  <p><span role="img" aria-label="Docs">📖</span> 发布更新日志</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Star">🌟</span> 新增异步菜单，菜单数据结构支持从服务器端获取</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Debug">🐞</span> 修复布局组件内容区 <code>x</code> 轴溢出问题</p>
                </li>
              </ul>
            </Timeline.Item>
            {/* 0.0.2 */}
            <Timeline.Item>
              <h2>0.0.2</h2>
              <p><code>2018-07-03</code></p>
              <ul>
                <li>
                  <p><span role="img" aria-label="Palette">🎨</span> <a href="http://h.zzcjxy.cn/admin" rel='noopener noreferrer' target="_blank">竞价互联</a> 最佳体验</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Lipstick">💄</span> 请求根地址根据当前路由源地址计算</p>
                </li>
              </ul>
            </Timeline.Item>
            {/* 0.0.1 */}
            <Timeline.Item>
              <h2>0.0.1</h2>
              <ul>
                <li>
                  <p><span role="img" aria-label="Star">🌟</span> 使用 <code>Ant Design Pro</code> 构建后台界面</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Star">🌟</span> 基本布局视图调整</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Star">🌟</span> 部分底层调整</p>
                </li>
              </ul>
            </Timeline.Item>
          </Timeline>
        </article>
      </Card>
    );
  }
}
