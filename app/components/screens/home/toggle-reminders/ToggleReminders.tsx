import { FC, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import { randomExercise } from '../../../../utils/random'

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
			title: '🦾 Stand up and do the exercise!',
			body: randomExercise()
		},
		trigger: { seconds: 2 }
	})
}

const ToggleReminders: FC = () => {
	const [token, setToken] = useState('')

	const registerNotification = async () => {
		if (Constants.deviceName) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync()
			let finalStatus = existingStatus
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync()
				finalStatus = status
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!')
				return
			}
			const pushToken = (await Notifications.getExpoPushTokenAsync()).data
			console.log(pushToken)
			setToken(pushToken)
		} else {
			alert('Must use physical device for Push Notifications')
		}

		if (Constants.platform?.android) {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C'
			})
		}
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
		</View>
	)
}

export default ToggleReminders
