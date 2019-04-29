import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Input,Button,Form,Modal,Row, Col} from 'antd'
import md5 from 'blueimp-md5'
import {registered} from '../../api/person'
import action from '../../store/action/index';

function loginFail() {
  const modal = Modal.error({
      title: '注册失败',
      content: '请稍后重新尝试!',
  });
  setTimeout(() => modal.destroy(), 2000);
}


class Register extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        values.password = md5(values.password)
        let result = await registered(values)
        if(parseFloat(result.code) === 0) {
          this.props.queryBaseInfo()
          this.props.history.push('/person')
          return
        }
        loginFail()
      }})
    }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const { getFieldDecorator } = this.props.form
    return <section className = 'personLoginBox'>
      <Form onSubmit={this.handleSubmit} >
      <Form.Item label="用户名" {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [
              {required: true, message: '请输入用户名'}
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="邮箱" {...formItemLayout}>
          {getFieldDecorator('email', {
            rules: [
              {required: true, message: '请输入邮箱'},
              {type: 'email', message: '输入的邮箱格式不正确!'}
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="手机" {...formItemLayout}>
          {getFieldDecorator('phone', {
            rules: [
              {required: true, message: '请输入手机号码'},
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('password', {
            rules: [
              {required: true, message: '请输入密码'},
            ]
          })(<Input type="password" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">立即注册</Button>
        </Form.Item>      
        </Form>
    </section>
  }
}

export default Form.create({ name: 'register' })(connect(null, action.person)(Register)) 