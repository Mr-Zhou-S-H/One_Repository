import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Carousel , Icon , Button} from 'antd'
import {Link} from 'react-router-dom'
import action from '../../store/action/index'

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false
    }
  }
  

  async componentDidMount() {
    let {queryBanner,bannerData,courseData,queryCourseList} = this.props
    if(!bannerData || bannerData.length === 0){
      queryBanner() /* dispatch 任务派发 */
    }
    if(courseData.data.length === 0){
      queryCourseList({})
    }
  }

  componentWillReceiveProps () {
    this.setState({isLoading:false})
  }

  queryType = () => {
    let {courseType} = this.props
    let text = '全部课程';
    switch(courseType) {
      case 'react':
      text = 'React框架开发课程'
      break
      case 'vue':
      text = 'Vue框架开发课程'
      break
      case 'xiaochengxu':
      text = '小程序开发课程'
      break
    }
    return text
  }

  loadMore = () => {
    let {queryCourseList,courseData,courseType} = this.props
    // 防止重复点击
    if(this.state.isLoading) return
    this.setState({isLoading:true})

    // 重新发送新的dispatch
    queryCourseList({
      page:courseData.page+1,
      type:courseType,
      flag:'push'
    })
  }

  render() {
    let {bannerData,courseType,courseData} = this.props
    let {data} = courseData
    return <div className = 'ListBox'>
        {/* 轮播图区域 */}
        {
          bannerData&&bannerData.length!==0?
        (<Carousel autoplay>
          {bannerData.map((item,index) => {
            let {pic,name} = item
            return <div key = {index}>
              <img src = {pic} alt = {name}/>
            </div>
          })}
        </Carousel>):''
        }
        {/* 数据列表 */}
        <div className = 'courseList'>
          <h2><Icon type = 'menu-fold'/>{this.queryType()}</h2>
          {data&&data.length !== 0?(
            <div>
            <ul>
              {
                data.map((item,index) => {
                  let {name,pic,dec,id,time} = item
                  return (
                    <li key = {index}>
                    <Link to = {{
                      pathname:'/course/info',
                      search:`?courseId=${id}`
                    }}>
                    <h3>{name}</h3>
                    <div className = "content">
                      <div className = 'pic'>
                        <img src = {pic} alt = {name}/>
                      </div>
                      <div className = 'desc'>
                        <p>{dec}</p>
                        <p>时间：{time}</p>
                      </div>
                    </div>
                    </Link>
                  </li>    
                  )
                })
              }
            </ul>
            <Button type = 'dashed' onClick = {this.loadMore} loading = {this.state.isLoading}>加载更多内容</Button>
            </div>            
          ):'暂无数据'}          
        </div>
    </div>
  }
}

export default connect(state =>({...state.course}),action.course)(List)