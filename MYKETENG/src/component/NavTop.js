import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Icon} from 'antd'
import action from '../store/action/index'

class NavTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display:'none'
    }
      // 因为每一次页面刷新 redux中存储的购物车信息都会消失 所以我们需要在页面刷新的时候 执行一个dispatch派发
  // 把服务器中存储的购物信息存储到redux、中（Nav是每次页面刷新 不管在哪个路由下都会执行的组件
    this.props.queryUnpay()
    this.props.queryPay()
  }


  handleClick = (e) => {
    let target = e.target
    let tarTag = target.tagName;
    console.log(target.getAttribute('type'))
    if(tarTag === 'LI'){
      this.props.queryCourseList({
        page:1,
        type:target.getAttribute('type'),
        flag:'replace'  //切换类别是替换容器中的状态信息
      })
      this.handleShow() //点击后 隐藏
    }
  }
  
  handleShow = () => {
    let {display} =this.state
    display?this.setState({display:''})
    :this.setState({display:'none'})  
    }
  render() {
    let {display} = this.state
    return <header className = 'headerNavBox'>
      {/* 首页的导航 */}
      <div className = 'homeBox'>
        <div className='baseBox'>
          <h1 className = 'logo'>logo背景图</h1>
          <Icon type = 'bars' className = 'icon' style = {{
            fontSize:'.6rem'
          }} onClick = {this.handleShow}/>
        </div>
        <ul className = 'filterBox' style = {{display}}
        onClick = {this.handleClick}>
          <li type = 'all'>全部课程</li>
          <li type = 'react'>React</li>
          <li type = 'vue'>Vue</li>
          <li type = 'xiaochengxu'>小程序</li>
        </ul>
      </div>
    </header>
  }
}


export default withRouter(connect(null,action.course)(NavTop)) 