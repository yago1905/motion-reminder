import { View, Text } from 'react-native'
import { FC } from 'react'

const Logo: FC = () => {
	return (
		<View className='items-center'>
			<Text className='text-3xl text-primary font-semibold'>
				Motion reminder
			</Text>
		</View>
	)
}

export default Logo
