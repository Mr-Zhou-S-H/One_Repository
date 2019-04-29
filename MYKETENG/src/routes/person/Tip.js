import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Alert, Button} from 'antd';
import {withRouter} from 'react-router-dom'

class Tip extends Component {
  render() {
    return <div>
      <Alert type = 'warning'
       message='未登录提醒' 
       description = '您当前还没有登陆， 请点击按钮登陆。' 
       />
       <Button onClick = {e =>this.props.history.push('/person/login')}
       type = 'dashed' >立即登陆</Button>

       <Button onClick = {e =>this.props.history.push('/person/register')} 
       type = 'dashed' >立即注册</Button>
    </div>
  }
}

export default withRouter(connect()(Tip))