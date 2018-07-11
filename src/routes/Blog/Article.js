import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import { Link } from 'dva/router';
import {
  Button,
  Card,
  Form,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import UE from '../../components/UEditor/ueditor.all.min';

const ArticleForm = Form.create()(import('./ArticleForm').default)

@connect(({ blog }) => ({
  blog,
}))
@Form.create()
export default class Article extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      visible: false,
      UEditorID: 'content',
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'blog/article',
    });
  }
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  
  handleCancel = () => {
    this.setState({ visible: false });
  }
  
  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
      
      const ueditor = UE.getEditor(this.state.UEditorID);
      ueditor.execCommand('cleardoc');
    });
  }
  
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  
  render() {
    const { blog } = this.props;
    
    const columns = [{
      title: 'id',
      dataIndex: 'id',
    }];
    
    console.log(this)
    
    return (
      <PageHeaderLayout title="博客">
        <Card title="文章" bordered={false}>
          <div>搜索 & 选项</div>
          <div>多选统计 & 多选操作</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
            <Button type="primary" onClick={this.showModal}>添加文章</Button>
          </div>
          <Table
            columns={columns}
            dataSource={blog.article || []}
          />
          <ArticleForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            UEditorID={this.state.UEditorID}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
