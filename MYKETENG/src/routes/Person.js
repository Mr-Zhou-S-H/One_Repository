import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Switch,Route,Redirect} from 'react-router-dom'

// 导入 API
import {checkLogin, queryInfo} from '../api/person'
import '../static/css/person.less'

// 导入二级路由需要的组件
import Login from './person/Login'
import Register from './person/Register'
import Tip from './person/Tip'
import Info from './person/Info'

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin:false
    }
  }
  async componentWillMount () {
    // 是否登陆的权限校验
    let result = await checkLogin()
    let isLogin = parseFloat(result.code) === 0?true:false
    this.setState({
      isLogin
    })
  }
  async componentWillReceiveProps () {
    // 是否登陆的权限校验
    let result = await checkLogin()
    let isLogin = parseFloat(result.code) === 0?true:false
    this.setState({
      isLogin
    })
  }
  
  handleLogin = () => {
    this.setState({
      isLogin:!this.state.isLogin
    })
  }

  render() {
    return <section>
      <Switch>
        <Route path='/person/info' render = {() => {
          // 是否登陆的权限校验
          if(this.state.isLogin){
            return <Info/>
          }
          return <Tip/>
        }} />
        <Route path = '/person/login' component = {Login}    />
        <Route path = '/person/register' component = {Register} />
        <Redirect from = '/person' to = '/person/info' />
      </Switch>
    </section>
  }
}

export default connect()(Person)