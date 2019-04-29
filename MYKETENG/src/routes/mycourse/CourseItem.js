import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import action from '../../store/action/index';

class CourseItem extends Component {
  render() {
    let { name, pic, dec, price, id, check } = this.props.item
    return  <li>
    <Link to = { `/course/info?courseId=${id}` }>
    <h3>{name}</h3>
    <div className = "content">
      <div className = 'pic'><img src = {pic} alt = {name}/></div>
      <div className = 'desc'>
        <p>{dec}</p>
        <p>价格：{price}</p>
      </div>
    </div>
    </Link>
    {this.props.input?
        <input type = 'checkbox' checked = {check} onChange = {
          () =>this.props.handleSelect(id)
          } />:''}
  </li>    

  }
}

export default  connect(state =>({...state.course}), action.course )(CourseItem) 