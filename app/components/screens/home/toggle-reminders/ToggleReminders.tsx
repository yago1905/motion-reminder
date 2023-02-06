import { FC, useEffect, useState } from 'react'
import { View, Text, Pressable, Button } from 'react-native'
import * as Notifications from 'expo-notifications'
import { randomExercise } from '../../../../utils/random'

import * as BackgroundFetch from 'expo-background-fetch'
import * as TaskManager from 'expo-task-manager'
import { useNotifications } from './useNotifications'

const BACKGROUND_FETCH_TASK = 'background-fetch'

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
	const now = Date.now()

	console.log(
		`Got background fetch call at date: ${new Date(now).toISOString()}`
	)

	// await schedulePushNotification()

	// Be sure to return the successful result type!
	return BackgroundFetch.BackgroundFetchResult.NewData
})

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync() {
	return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
		// minimumInterval: 60 * 1, // 15 minutes
		minimumInterval: 10, // 15 minutes
		stopOnTerminate: false, // android only,
		startOnBoot: true // android only
	})
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
	return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK)
}

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false
	})
})

async function schedulePushNotification() {
	await Notifications.scheduleNotificationAsync({
		content: {
			body: 'Stand up and do the exercise!',
			title: '🦾 ' + randomExercise()
		},
		trigger: { seconds: 2 }
	})
}

const ToggleReminders: FC = () => {
	const { token, registerNotification } = useNotifications()

	const [isRegistered, setIsRegistered] = useState(false)
	const [status, setStatus] =
		useState<BackgroundFetch.BackgroundFetchStatus | null>(null)

	useEffect(() => {
		checkStatusAsync()
	}, [])

	const checkStatusAsync = async () => {
		const status = await BackgroundFetch.getStatusAsync()
		const isRegistered = await TaskManager.isTaskRegisteredAsync(
			BACKGROUND_FETCH_TASK
		)
		setStatus(status)
		setIsRegistered(isRegistered)
	}

	const toggleFetchTask = async () => {
		if (isRegistered) {
			await unregisterBackgroundFetchAsync()
		} else {
			await registerBackgroundFetchAsync()
		}

		checkStatusAsync()
	}

	return (
		<View className='items-center mt-6'>
			<Pressable
				onPress={async () => {
					if (!token) await registerNotification()
					await schedulePushNotification()
				}}
				className='bg-primary px-5 py-3 rounded'
			>
				<Text className='text-2xl text-[#222] font-medium'>
					Enable reminders
				</Text>
			</Pressable>
			<Button
				title={
					isRegistered
						? 'Unregister BackgroundFetch task'
						: 'Register BackgroundFetch task'
				}
				onPress={toggleFetchTask}
			/>
		</View>
	)
}

export default ToggleReminders
