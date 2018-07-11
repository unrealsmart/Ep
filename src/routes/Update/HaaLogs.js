import React, { PureComponent } from 'react';
// import { connect } from 'dva';
// import { Link } from 'dva/router';
import { Card, Timeline } from 'antd';

export default class HaaLogs extends PureComponent {
  render() {
    return (
      <Card>
        <article className="markdown">
          <h1>更新日志</h1>
          <section>好享派 2.x</section>
          <Timeline>
            {/* 2.0.7 */}
            <Timeline.Item>
              <h2>2.0.7</h2>
              <p><code>2018-07-11</code></p>
            </Timeline.Item>
            {/* 2.0.6 */}
            <Timeline.Item>
              <h2>2.0.6</h2>
              <p><code>2018-07-09</code></p>
              <ul>
                <li>
                  <p>推荐商家组件</p>
                  <ul>
                    <li>
                      <p><span role="img" aria-label="Star">🌟</span> 新增排序切换锁，接入数据请求</p>
                      <p>
                        注意：设置 <code>setTimeout</code> 为 <code>500ms</code>，可以体验到加载过程，真实切换数据程序实现需调整数据结构。
                      </p>
                    </li>
                    <li>
                      <p><span role="img" aria-label="Star">🌟</span> 新增切换列表特效</p>
                    </li>
                    <li>
                      <p><span role="img" aria-label="Lipstick">💄</span> 列表样式优化</p>
                    </li>
                  </ul>
                </li>
                <li>
                  <p><span role="img" aria-label="Lipstick">💄</span> 其他细节化修改</p>
                </li>
              </ul>
            </Timeline.Item>
            {/* 2.0.5 */}
            <Timeline.Item>
              <h2>2.0.5</h2>
              <p><code>2018-07-07</code></p>
              <ul>
                <li>
                  <p>推荐商家组件</p>
                  <ul>
                    <li>
                      <p><span role="img" aria-label="Star">🌟</span> 新增排序后端实现。按照：离我最近、评分最高、人气最高进行排序</p>
                    </li>
                    <li>
                      <p><span role="img" aria-label="Lipstick">💄</span> 列表项目样式布局优化</p>
                    </li>
                  </ul>
                </li>
              </ul>
            </Timeline.Item>
            {/* 2.0.4 */}
            <Timeline.Item>
              <h2>2.0.4</h2>
              <p><code>2018-07-06</code></p>
              <ul>
                <li>
                  <p>推荐商家组件</p>
                  <ul>
                    <li>
                      <p><span role="img" aria-label="Star">🌟</span> 新增商铺图片及预览图</p>
                    </li>
                    <li>
                      <p><span role="img" aria-label="Star">🌟</span> 新增商铺标题、距离</p>
                    </li>
                  </ul>
                </li>
                <li>
                  <p><span role="img" aria-label="Lipstick">💄</span> 导航图标 <code>Flow</code> 布局优化</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Restructure">🛠</span> 优化店铺距离算法，<code>5</code>次修订</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Lipstick">💄</span> 轮播图片迁移至 <code>OSS</code> 存储</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Lipstick">💄</span> 移除<code>wepy-redux</code> 冗余文件</p>
                </li>
                <li>
                  <p>
                    <span role="img" aria-label="Star">🌟</span> 新增全局 <code>config.js</code> 文件
                  </p>
                  <p>现在可以通过 <code>import &#123; config &#125; from &#39;./config.js&#39;</code> 使用全局配置文件</p>
                </li>
              </ul>
            </Timeline.Item>
            {/* 2.0.3 */}
            <Timeline.Item>
              <h2>2.0.3</h2>
              <p><code>2018-07-05</code></p>
              <ul>
                <li>
                  <p><span role="img" aria-label="Star">🌟</span> 分离小程序首页轮播图 <code>API</code></p>
                </li>
                <li>
                  <p><span role="img" aria-label="Star">🌟</span> 新增小程序首页店铺列表及服务端实现</p>
                </li>
              </ul>
              <p><code>2018-07-06</code></p>
              <ul>
                <li>
                  <p><span role="img" aria-label="Restructure">🛠</span> 重构店铺距离算法</p>
                </li>
              </ul>
            </Timeline.Item>
            {/* 2.0.1 */}
            <Timeline.Item>
              <h2>2.0.1</h2>
              <p><code>2018-07-04</code></p>
              <ul>
                <li>
                  <p><span role="img" aria-label="Lipstick">💄</span> 页面背景颜色调整</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Star">🌟</span> 新增首页推荐列表组件</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Star">🌟</span> 新增上拉、下拉刷新</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Star">🌟</span> 新增 <code>tabBar</code> 底部菜单</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Star">🌟</span> 新增自动定位</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Star">🌟</span> 通过微信内置地图可选择位置（支持搜索）</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Lipstick">💄</span> 轮播图现在可以跳转到页面（后台未实现相关功能接口，暂使用手动修改代替）</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Lipstick">💄</span> 修改小程序公共标题文案</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Lipstick">💄</span> 修改首页标题文案</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Debug">🐞</span> 修复自动定位可能会发生失败的问题</p>
                </li>
              </ul>
            </Timeline.Item>
            {/* 2.0.0 */}
            <Timeline.Item>
              <h2>2.0.0</h2>
              <p><code>2018-07-03</code></p>
              <ul>
                <li>
                  <p><span role="img" aria-label="Star">🌟</span> 新增地址框及搜索框视觉优化</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Lipstick">💄</span> <code>swiper</code> 轮播图高度优化</p>
                </li>
                <li>
                  <p><span role="img" aria-label="Star">🌟</span> 新增 <code>iconfont</code> 多彩图标导航</p>
                </li>
              </ul>
            </Timeline.Item>
            {/* 1.x.x */}
            <Timeline.Item>
              <h2>1.x.x</h2>
              旧版本未做更新日志记录，且不再维护
            </Timeline.Item>
          </Timeline>
        </article>
      </Card>
    );
  }
}
