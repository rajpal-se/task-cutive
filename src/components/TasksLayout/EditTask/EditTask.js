import React, { useState } from 'react'
import Textarea from '../../UI/Textarea/Textarea'
import classes from './EditTask.module.scss'
import Button from './../../UI/Button/Button'
import AlertMessage from '../../UI/AlertMessage/AlertMessage'
import DateTimePicker from '../../UI/DateTimePicker/DateTimePicker'
import { axiosAuth } from '../../../axios'
import Radiogroup from '../../UI/RadioGroup/RadioGroup'
import { useHistory } from 'react-router'

const EditTask = props => {
	const stateObj = {}
	const messageHST = useState({error: 1, show: 0, text: ''})
	stateObj.messageHST = messageHST
	stateObj.history = useHistory()
	stateObj.EditTaskProps = props
	const [message] = messageHST
	console.log(props)

	return (
		<div className={classes.EditTask}>
			<h2>Edit Task</h2>
			<div className={classes.Error}>
				{ message.show ? (
					<AlertMessage error={message.error}>{message.text}</AlertMessage>
				) : (
					null
				) }
			</div>
			<form>
				<Textarea
					value={removeBRTag(props.editTaskState.task.title)}
					name="title"
					stateObj={stateObj}
					label="Task"
					textarea={{
						placeholder: "Enter brief title",
						autoFocus: true,
						required: true
					}}/>
				<Textarea
					value={removeBRTag(props.editTaskState.task.description)}
					name="description"
					stateObj={stateObj}
					label="Description"
					minRows={4}
					textarea={{
						placeholder: "Enter more info about task"
					}}/>
				<div className={classes.InputCon}>
					<div>
						<DateTimePicker
							value={props.editTaskState.task.due_datetime}
							name="due_datetime"
							stateObj={stateObj}
							label="Due date"/>
					</div>
					<div>
						<Radiogroup
							stateObj={stateObj}
							label="Priority"
							data={[
								{label: 'High', name: 'priority', value: '1'},
								{label: 'Normal', name: 'priority', value: '0'}
							]}
							value={props.editTaskState.task.is_high_priority ? '1' : '0'}
							/>
					</div>
				</div>
				<div className={classes.ButtonCon}>
					<Button id="updateTask" onClick={updateTaskTaskHandler.bind(null, stateObj)}>Update Task</Button>
				</div>
			</form>
		</div>
	)
}

const updateTaskTaskHandler = (stateObj, e) => {
	e.preventDefault()
	// console.log(stateObj)
	const setMessage = stateObj.messageHST[1]


	let title = stateObj.title.value
	let description = stateObj.description.value
	const patternS = /^([(\n|\r\n|\r)\s]+)/g
	const patternE = /([(\n|\r\n|\r)\s]+)$/g

	title = title.replaceAll(patternS, '')
	title = title.replaceAll(patternE, '')
	title = addBRTag(title)
	description = description.replace(patternS, '')
	// description = description.replace(patternE, '')
	description = addBRTag(description)
	console.log(description)
	if(title === ''){
		setMessage({show: 1, error: 1, text: 'Title is Required.'})
		stateObj.title.more.ref.current.focus()
		return
	}

	const p = stateObj.priority.value;
	const isHighPriority = (p === '1' || p === 1 || p === true) ? true : false
	const data = {}
	if(title !== removeBRTag( stateObj.EditTaskProps.editTaskState.task.title) ) data.title = title
	if(description !== removeBRTag( stateObj.EditTaskProps.editTaskState.task.description) ) data.description = description
	if(isHighPriority !== stateObj.EditTaskProps.editTaskState.task.is_high_priority) data.isHighPriority = isHighPriority

	let preDD = Math.floor( (new Date(stateObj.EditTaskProps.editTaskState.task.due_datetime) ).getTime() / 1000 )
	let newDD = Math.floor( (new Date(stateObj.dueDate.value) ).getTime() / 1000 )
	console.log(preDD)
	console.log(newDD)

	if(preDD !== newDD) data.dueDatetime = stateObj.dueDate.value
	// const data = {
	// 	title: title,
	// 	description: description,
	// 	dueDatetime: stateObj.dueDate.value,
	// 	isHighPriority,
	// }
	// console.log(data)
	// console.log(stateObj)
	const id = stateObj.EditTaskProps.editTaskState.task._id

	if(Object.keys(data).length > 0){
		axiosAuth(axios => {
			axios.patch(`tasks/${id}`, data)
				.then(res => {
					// console.log(res)
					if(res.data.status){
						stateObj.history.push(stateObj.EditTaskProps.editTaskState.url)
					}
					else{
						console.log(res.data)
						stateObj.history.push(stateObj.EditTaskProps.editTaskState.url)
					}
				})
				.catch(e => {
					// console.log(e)
				})
		})
	}
	else{
		stateObj.history.push(stateObj.EditTaskProps.editTaskState.url)
	}
}
const addBRTag = data => {
	return data !== '' && data.replace(/\r\n|\r|\n/g,"<br/>")
}
const removeBRTag = data => {
	return data !== '' && data.replace(/<br\/>/g,"\n")
}

export default EditTask