// 基础部分
import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter,Switch,Route,Redirect} from 'react-router-dom'

// 渲染加载store
import store from './store/index'
import {Provider} from 'react-redux'

// antd
import {LocaleProvider} from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

// 导入样式
import './static/css/reset.min.css' //清空默认样式
import './static/css/common.less'

// 导入组件
import NavTop from './component/NavTop'
import NavBottom from './component/NavBottom'
import Home from './routes/Home'
import Mycourse from './routes/Mycourse'
import Person from './routes/Person'

ReactDOM.render(<Provider store = {store}>
	<HashRouter>
		<LocaleProvider locale = {zh_CN}>
		<div>
			{/* 头部导航 */}
			<NavTop/>

			{/* 主体部分  ROUTE 路由管控*/}
			<main className = 'container'>
				<Switch>
					<Route path = '/course' component = {Home} />
					<Route path = '/mycourse' component = {Mycourse} />
					<Route path = '/person' component = {Person} />
					<Redirect to='/course'/>
				</Switch>
			</main>

			{/* 底部导航 */}
			<NavBottom/>
		</div>
		</LocaleProvider>
	</HashRouter>
</Provider>,root)