import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Switch,Route,Redirect} from 'react-router-dom'
import List from './course/List';
import Info from './course/Info';
import '../static/css/course.less'

class Home extends Component {
  render() {
    return <section className = 'courseBox'>
      <Switch>
        <Route path = '/course' exact component = {List} />
        <Route path = '/course' component = {Info} />
      </Switch>
    </section>
  }
}

export default connect()(Home)