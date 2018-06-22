import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Badge,
  Button,
  Card,
  Row,
  Col,
  Table,
  Alert,
  Icon,
  notification,
} from 'antd';
import { Link } from 'dva/router';
import Ellipsis from "../../components/Ellipsis/index";

import './Index.less'

@connect(({ message }) => ({
  message,
}))
export default class Monitor extends PureComponent {
  state = {
    dataSource: [],
    selectedRows: [],
    selectedRowKeys: [],
    paginationCurrent: 1,
  }
  
  componentDidMount() {
    const { dispatch } = this.props;
    this.setMessageLoading(true);
    dispatch({
      type: 'message/fetchLists',
      payload: {
        page: 1,
      },
      callback: (message) => {
        this.setState({
          dataSource: message && message.data,
        });
        this.setMessageLoading(false);
      },
    });
  }
  
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'message/clear',
    });
  }
  
  setMessageLoading(loading) {
    const { dispatch } = this.props;
    dispatch({
      type: 'message/save',
      payload: {
        loading,
      },
    });
  }
  
  handleSetRead = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'message/setRead',
      payload: this.state.selectedRowKeys,
      callback: (status) => {
        if (!status) return false;
        const { selectedRows } = this.state;
        selectedRows.map((data) => {
          const tempData = data;
          tempData.status = 1;
          return tempData;
        });
        this.cleanSelectedKeys();
      },
    });
  }
  
  handleExportMessage = () => {
    const { dispatch } = this.props;
    const { selectedRowKeys } = this.state;
    const args = {
      message: '请务必查阅此内容',
      description: '浏览器可能会限制弹窗，因此，请在浏览器弹窗拦截中设置或打开弹窗链接。',
      duration: 0,
      icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    };
    notification.open(args);
    
    dispatch({
      type: 'message/exportExcel',
      payload: selectedRowKeys,
      callback: (response) => {
        if (response.status) window.open(response && response.filePath);
      },
    });
  }
  
  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };
  
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };
  
  render() {
    const { message } = this.props;
    const {
      dataSource,
      selectedRowKeys,
      paginationCurrent,
    } = this.state;
    
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        width: 72,
        fixed: 'left',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 90,
      },
      {
        title: '手机号码',
        dataIndex: 'phone_number',
        key: 'phone_number',
        render: (text) => (
          <Link to={{ pathname: `tel:${text}` }}>{text}</Link>
        ),
        width: 120,
      },
      {
        title: '留言',
        dataIndex: 'content',
        key: 'content',
        render: (text) => (
          <Ellipsis tooltip={() => { return text }} length={30}>
            {text}
          </Ellipsis>
        ),
        width: 300,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text) => (
          <Badge status={text ? 'success' : 'error'} />
        ),
        align: 'center',
      },
      {
        title: 'QQ',
        dataIndex: 'qq',
        key: 'qq',
        width: 110,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        width: 150,
      },
      {
        title: '创建日期',
        dataIndex: 'create_time',
        key: 'create_time',
        width: 110,
      },
    ];
  
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      // getCheckboxProps: record => ({
      //   disabled: record.status === 1,
      //   name: 'status',
      // }),
    };
    
    const paginationProps = {
      current: paginationCurrent,
      hideOnSinglePage: true,
      pageSize: 5,
      onChange: (page) => {
        this.setState({
          paginationCurrent: page,
        })
        
        const { dispatch } = this.props;
        dispatch({
          type: 'message/fetchLists',
          payload: {
            ...page,
          },
        })
      },
    };
    
    return (
      <Card bordered={false}>
        <Row type="flex" align="middle" justify="start" style={{ marginBottom: 24 }}>
          <Col style={{ marginRight: 24 }}>
            <Alert
              style={{ display: 'inline-block' }}
              message={(
                <div>
                  <span style={{ marginRight: 12 }}>当前共选中 {selectedRowKeys.length} 个留言</span>
                  {selectedRowKeys.length ? (<a onClick={this.cleanSelectedKeys}>清除</a>) : null}
                </div>
              )}
              ype="info"
              showIcon
            />
          </Col>
          <Col>
            <Button type="primary" size="small" onClick={this.handleSetRead}>设为已读</Button>
            <Button type="primary" size="small" onClick={this.handleExportMessage}>导出</Button>
          </Col>
        </Row>
        <Table
          loading={message.loading}
          rowKey='id'
          rowSelection={rowSelection}
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: 1000 }}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </Card>
    );
  }
}
