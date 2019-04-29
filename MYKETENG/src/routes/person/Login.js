import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form,Icon,Input,Button, Modal} from 'antd'
import {Link} from 'react-router-dom'
import md5 from 'blueimp-md5'
import {login} from '../../api/person'
import action from '../../store/action/index';

function loginFail() {
  const modal = Modal.error({
      title: '登录失败',
      content: '请稍后重新尝试!',
  });
  setTimeout(() => modal.destroy(), 2000);
}


class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let {userName,userPass} = values
        userPass = md5(userPass) //md5 加密
        let result = await login({
          name:userName,
          password:userPass
        })
        if(parseFloat(result.code) === 0) {
          this.props.queryBaseInfo()
          // 登陆成功后 我们需要重新获取已购买的课程信息
          // 未登录下从服务器是获取不到支付课程信息的 但是登陆后我们需要把购买信息同步到redux中
          // 这样在我的课程当中才能展示出来相关信息
          this.props.queryPay()
          this.props.history.go(-1)
          return
        }
        loginFail()
      }})
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className = 'personLoginBox'>
        <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userName',{})(<Input prefix={<Icon type="user"/>} placeholder="用户名" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('userPass',{})(<Input prefix={<Icon type="lock"/>} type="password" placeholder="密码" />)}          
        </Form.Item>
        <Form.Item>
          <Button 
          type="primary" 
          htmlType="submit" 
          className="login-form-button"
          >
            登陆
          </Button>
          Or <Link to = '/person/register'>register now!</Link>
        </Form.Item>
      </Form>
      </div>
    );
  }
}




export default 
Form.create({ name: 'normal_login' })(connect(null,
{...action.person,...action.course})(Login))