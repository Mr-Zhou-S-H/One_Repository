import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Menu } from 'antd';
import '../static/css/Mycourse.less'
import { Switch, Route, Redirect } from 'react-router-dom'
import Pay from './mycourse/Pay'
import Unpay from './mycourse/Unpay'


class Mycourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 根据当前的路由地址 验证初始的Menu 到底是pay 还是 unpay
      current:this.props.location.pathname === '/mycourse/pay'?'pay':'unpay'
    }
  }
  

  handleClick = (e) => {
    // antd 组件 在点击的时候 把事件对象重构了（用自己构建的值替换了事件对象
    this.setState({
      current:e.key
    })
    // 点击跳转到指定路由
    this.props.history.push(e.key === 'pay'?'/mycourse/pay':'/mycourse')
  }

  render() {
    return <section className = 'MycourseBox'>
      <Menu 
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal">
        <Menu.Item key = 'unpay'>未支付</Menu.Item>
        <Menu.Item key = 'pay'>已支付</Menu.Item>
      </Menu>
      <div className = 'courseItem' >
        <Switch>
          <Route path = '/mycourse' exact component = {Unpay} />   
          <Route path = '/mycourse/pay' component = {Pay} />
        </Switch>
      </div>
    </section>
  }
}

export default connect()(Mycourse)