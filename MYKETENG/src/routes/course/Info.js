import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'antd'
import Qs from 'qs'
import {queryInfo ,addShopCart, removeShopCart } from '../../api/course'
import action from '../../store/action/index'

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      isShop:-1 //存储是否已经加载到购物车当中 -1还没有加入购物车 0已加入但未支付 1已支付
    }
  }

  async componentDidMount() {
    let {location:{search}} = this.props
    let {courseId = 0} = Qs.parse(search.substr(1) || {})
    this.courseId = courseId //挂载到实例上的作用是为了在其他方法中也可以调用
    let result = await queryInfo(courseId)
    if(parseFloat(result.code )=== 0){
      // 校验当前的课程状态是已支付还是未支付 或者还未加入购物车
      let {pay,unpay} = this.props.shopCart
      let isShop = -1
      // 在redux未购买和已购买的集合中筛选是否有当前展示课程 有代表当前课程已经加入购物车了
       unpay.find(item => parseFloat(item.id) === parseFloat(courseId))?isShop = 0 : null
      pay.find(item => parseFloat(item.id) === parseFloat(courseId))?isShop = 1 : null
      this.setState({
        data:result.data,
        isShop
      })
    }
  }

  handleShopCart = async () => {
    if(this.state.isShop === -1){
      // 还未加入购物车（按钮是加入）
      let result = await addShopCart(this.courseId)
      if(parseFloat(result.code) === 0){
        this.props.queryUnpay() //dispatch 派发任务 通知redux 容器中的购物车信息进行更新
        // 页面重新展示最新样式
        this.setState({isShop:0})
      }
      return  
    }
    // 已经加入购物车 (按钮是移除)
    let result = await removeShopCart(this.courseId)
    if(parseFloat(result.code) === 0){
      this.props.queryUnpay() //更新购物车存储的数据
      this.setState({isShop:-1})
    }
    return  
  }
  
  render() {
    let {data, isShop} = this.state
    if(!data) return '暂无数据'
    return <div className = 'baseInfo'>
      <video src = "http://111.0.25.23/variety.tc.qq.com/AbfpAFQi8k_QcuHRGqUXfLo2mNgyoQoec6-j406Aj3us/a0201rs3lid.p201.1.mp4?fmt=shd&vkey=6B3EFB2E9F8EFE0645E657371393730DF5DA7FBD9EBBAD90C49DB9B6337785A4086494CF80C4D7D68DE31B3D586EA7E2A5BDE1EDE44BA8E808EFA40C124A1D767B7841349DBB560CE2DDC8D503430F44782C4CEB382EA928089CDC712FA74AC6DDBC7F1BD1D07CF197C1181705A37F3E2E12414BE2AAC71C&platform=10201&level=0&sdtfrom=" 
      controls preload = 'none'  poster = {data.pic}></video>
      <div className = 'content'>
        <h3>{data.name}</h3>
        <p>{data.dec}</p>
        <span>课程价格：{data.price}</span>
        {isShop !== 1?
        (<Button 
        type = {isShop === -1?'danger':'success'} 
        onClick = {this.handleShopCart}
        >
        {isShop === -1?'加入购物车':'从购物车移除'}
        </Button>)
        :null}
      </div>
    </div>
  }
}

export default connect(state =>state.course,action.course)(Info)