import React, { PureComponent, Fragment } from 'react';
import { Badge, Table, Button, Input, Icon, message, Popconfirm, Divider } from 'antd';
import styles from './style.less';

export default class SubCategoryForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        data: nextProps.value,
      });
    }
  }
  componentWillUnmount() {
    this.setState({
      loading: true,
    });
  }
  getRowByKey(key, newData) {
    return (newData || this.state.data).filter(item => item.key === key)[0];
  }
  index = 0;
  cacheOriginData = {};
  toggleEditable = (e, key) => {
    e.preventDefault();
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };
  remove(id, isNew) {
    const removeElement = () => {
      const newData = this.state.data.filter(item => item.id !== id);
      this.setState({ data: newData });
      this.props.onChange(newData);
    }
    
    if (isNew) {
      removeElement();
      return;
    }
    
    const { dispatch } = this.props;
    dispatch({
      type: 'blog/subCategoryRemove',
      payload: {
        ...{id},
      },
      callback: () => {
        removeElement();
      },
    });
  }
  newCategory = () => {
    const newData = this.state.data.map(item => ({ ...item }));
    const iconTime = (<Icon type="clock-circle-o" />);
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      name: '',
      title: '',
      create_time: iconTime,
      update_time: iconTime,
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };
  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }
  handleFieldChange(e, fieldName, key) {
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }
  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    
    const target = this.getRowByKey(key) || {};
    if (!target.name || !target.title) {
      message.error('请填写完整信息。');
      e.target.focus();
      this.setState({
        loading: false,
      });
      return;
    }
    
    const { dispatch } = this.props;
    dispatch({
      type: 'blog/subCategorySave',
      payload: Object.assign({
        name: target.name,
        title: target.title,
      },!isNaN(target.id) && {
        id: target.id,
      }),
      callback: () => {
        delete target.isNew;
        this.toggleEditable(e, key);
        this.props.onChange(this.state.data);
        this.setState({
          loading: false,
        });
      },
    });
  }
  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({ data: newData });
    this.clickedCancel = false;
  }
  render() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
        minWidth: '80px',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'name', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="名称"
              />
            );
          }
          return text;
        },
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: '15%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'title', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="标题"
              />
            );
          }
          return text;
        },
      },
      {
        title: '创建日期',
        dataIndex: 'create_time',
        key: 'create_time',
        width: '20%',
      },
      {
        title: '更新日期',
        dataIndex: 'update_time',
        key: 'update_time',
        width: '20%',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '10%',
        minWidth: '80px',
        render: (text) => (
          <Badge status={text ? 'success' : 'error'} />
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          if (!!record.editable && this.state.loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.id, record.isNew)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.id, false)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];
    
    // console.log(this.state.data);

    return (
      <Fragment>
        <Table
          loading={this.state.loading}
          columns={columns}
          dataSource={this.state.data}
          pagination={false}
          rowClassName={record => {
            return record.editable ? styles.editable : '';
          }}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newCategory}
          icon="plus"
        >
          新增分类
        </Button>
      </Fragment>
    );
  }
}
