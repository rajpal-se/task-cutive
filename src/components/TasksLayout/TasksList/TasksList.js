import React, {useState, useEffect} from 'react'
import ListItem from './ListItem/ListItem'
import classes from './TasksList.module.scss'
import {axiosAuth} from './../../../axios'
import CircularLoader from './../../UI/Loader/CircularLoader/CircularLoader'

const TasksList = props => {
	const [fetchData, setFetchData] = useState(true)
	const tasksIS = {
		data: [],
		fetched: false
	}
	const [tasks, setTasks] = useState( tasksIS )
	console.log('---------------------------------')
	console.log({...tasks})
	
	useEffect(() => {
		if( !tasks.fetched ) {
			// setTasks( {...tasksIS} )
			let queryParams = {
				perPage: 2,
				page: props.info.page
			}
			if(props.info.filter === 'done' || props.info.filter === 'pending'){
				queryParams.isCompleted = (props.info.filter === 'done') ? true : false
			}
			queryParams = Object.keys(queryParams).map(key => {
				return `${key}=${queryParams[key]}`
			})
			queryParams = queryParams.join('&')
	
			axiosAuth( (axios) => {
				axios.get('tasks?' + queryParams)
					.then(res => {
						console.log(res.data)
						if(res.data.status){
							setTasks({
								data: res.data.data,
								fetched: true
							})
						}
					})
					.catch(e => {
						console.log(e)
					})
			})
		}

		
		console.log('[TasksList] useEffect')
	}, [tasks.fetched])
	useEffect( () => {
		setTasks( {...tasksIS} )
	}, [props.info.page, props.info.filter])


	return (
		<div className={classes.TasksList}>
			{ !tasks.fetched ? (
					<div className={classes.LoaderCon}>
						<CircularLoader />
					</div>
				) : ( tasks.data.length > 0 ? (
					<ul>
						{
							tasks.data.map(task => (
								<ListItem task={task} key={task._id} />
							) )
						}
					</ul>
					) : (
						'no'
					)
				)
			}
		</div>
	)
}

export default TasksList