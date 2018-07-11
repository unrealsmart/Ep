import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import { Link } from 'dva/router';
import {
  Card,
  Form,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import styles from './Category.less'
import CategoryForm from './CategoryForm';

@connect(({ blog }) => ({
  blog,
}))
@Form.create()
export default class Category extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'blog/category',
    });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { blog } = this.props;
    
    return (
      <PageHeaderLayout>
        <Card title="分类" bordered={false}>
          {getFieldDecorator('category', {
            initialValue: blog.category || [],
          })(
            <CategoryForm dispatch={this.props.dispatch} />
          )}
        </Card>
      </PageHeaderLayout>
    );
  }
}
