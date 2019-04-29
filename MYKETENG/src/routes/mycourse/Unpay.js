import React, {Component} from 'react'
import {connect} from 'react-redux'
import action from '../../store/action/index'
import CourseItem from './CourseItem'
import { Alert, Button } from 'antd'
import { payShopCart, removeShopCart } from '../../api/course'
import { checkLogin } from '../../api/person'

class Unpay extends Component {

  // 删除的方法
  handleRemove = () => {
    // 获取所有被选中的 课程id 项
    let selectIDList = []
    this.props.shopCart.unpay.forEach(item => {
      if(item.check){
        selectIDList.push(item.id)
      }
    });
    if(selectIDList.length === 0) {
      alert('没有要删除的信息')
      return
    }
    // 根据ID 发送删除的请求: 生成每一个axios删除操作的promis数组基于promis。all 验证是否都完成
    selectIDList = selectIDList.map(item => {
      return removeShopCart(item)
    })
    Promise.all(selectIDList).then(() => {
      this.props.queryUnpay()
    })

  }

  // 支付的方法
  handlePay = async () => {
    // 验证当前是否登陆
    let result = await checkLogin()
    if(parseFloat(result.code) !== 0){
      alert('请先登陆')
      return 
    }
        // 获取所有被选中的 存储id 项
    let selectIDList = []
    this.props.shopCart.unpay.forEach(item => {
      if(item.check){
        selectIDList.push(item.storeID)
      }
    });
    if(selectIDList.length === 0) {
      alert('没有要删除的信息')
      return
    }
    // 根据ID 发送删除的请求: 生成每一个axios删除操作的promis数组基于promis。all 验证是否都完成
    selectIDList = selectIDList.map(storeID => {
      return payShopCart(storeID)
    })
    Promise.all(selectIDList).then(() => {
      this.props.queryUnpay()
      this.props.queryPay()
    })
  } 

  render() {
    let { unpay } = this.props.shopCart
    if(unpay.length === 0 ) {
      return <Alert description = '当前还没有购买任何课程，快去购买吧！' 
      type = 'warning' />
    }
    return <div>
      <div style = {{
      }}>
        <Button type = 'dashed' 
        onClick = { this.handleRemove }>删除</Button>
        <Button type = 'dashed'
        onClick = { this.handlePay } >支付</Button>
        全选/全部选 <input type ='checkbox' checked = {this.props.selectAll} 
        onChange = { () => this.props.handleSelect('all') } /> 
      </div>
      <ul className = 'courseItem' >
        {unpay.map((item,index) => {
          return <CourseItem key = { index } item = { item } input = {true} />
          })}      
      </ul>
    </div>
  }
}

export default connect(state => state.course,action.course)(Unpay)