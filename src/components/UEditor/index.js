import React from 'react';
import { Alert, Input } from 'antd';
import UE from './ueditor.all.min';
import './index.less';

const { TextArea } = Input;

export default class UEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
    this.initEditor()
  }
  componentWillUnmount() {
    // 组件卸载后，清除放入库的id
    UE.delEditor(this.props.id);
  }
  initEditor() {
    const { id, config, form, value } = this.props;
    const ueEditor = UE.getEditor(this.props.id, config);
    const self = this;
    
    ueEditor.ready((ueditor) => {
      if (!ueditor) {
        UE.delEditor(id);
        self.initEditor();
      } else {
        ueEditor.setContent(value);
      }
    });
  
    ueEditor.addListener('contentChange', () => {
      form.setFieldsValue({
        content: UE.getEditor('content').getContent(),
      });
    });
  }
  
  render() {
    const { hideAlert, form } = this.props;
    const { getFieldDecorator } = form;
    
    return (
      <div>
        {!hideAlert && (
          <Alert
            style={{ marginBottom: 12 }}
            message="百度 UEditor 编辑器"
            description={(
              <div>
                <div>请慎重使用此富文本编辑器，其表现性能较低，使用期间可能会发生不可预料的错误。</div>
                <div>在组件 props 使用 hideAlert 即可隐藏此提示。</div>
              </div>
            )}
            type="warning"
            closable="true"
            showIcon
          />
        )}
        
        <div id={this.props.id} name="content" type="text/plain" />
        
        <div style={{ display: 'none' }}>
          {getFieldDecorator('content', {
            initialValue: '',
          })(
            <TextArea />
          )}
        </div>
      </div>
    )
  }
}
