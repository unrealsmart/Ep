import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import { Link } from 'dva/router';
import {
  Card,
  Form,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import styles from './Category.less'
import SubCategoryForm from './SubCategoryForm';

@connect(({ blog }) => ({
  blog,
}))
@Form.create()
export default class SubCategory extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'blog/subCategory',
    });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { blog } = this.props;
    
    return (
      <PageHeaderLayout>
        <Card title="标签" bordered={false}>
          {getFieldDecorator('sub_category', {
            initialValue: blog.subCategory || [],
          })(
            <SubCategoryForm dispatch={this.props.dispatch} />
          )}
        </Card>
      </PageHeaderLayout>
    );
  }
}
