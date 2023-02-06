import { useState } from 'react'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'

export const useNotifications = () => {
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
	return {
		registerNotification,
		token
	}
}
