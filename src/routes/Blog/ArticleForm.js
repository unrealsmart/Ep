import React  from 'react';
import { Modal, Form, Input, Radio } from 'antd';
// import UEditor from '../../components/UEditor';
// import styles from './style.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const UEditor = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields.content.value);
  },
  mapPropsToFields: (props) => {
    return Form.createFormField({
      ...props.content,
      value: props.value,
    })
  },
})(import('../../components/UEditor').default);

export default class ArticleForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };
  }
  
  handleFormChange = (changedFields) => {
    // changedFields
    // const ueditor = UE.getEditor(this.state.UEditorID);
    // ueditor.execCommand('cleardoc');
  }
  
  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
  
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        width={768}
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="文章标题"
          >
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入文章标题' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="副标题"
          >
            {getFieldDecorator('subtitle', {
              rules: [{ required: true, message: '请输入文章副标题' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="文章摘要"
          >
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入文章摘要' }],
            })(
              <TextArea rows={4} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            className="collection-create-form_last-form-item"
            label="状态"
          >
            {getFieldDecorator('modifier', {
              initialValue: 'public',
            })(
              <Radio.Group>
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="内容"
          >
            {getFieldDecorator('content', {
              initialValue: 'hello world',
              rules: [{ required: true, message: '请输入文章内容' }],
            })(
              <UEditor id={this.props.UEditorID} width="100%" height="300" hideAlert onChange={this.handleFormChange} />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
