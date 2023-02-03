import { FC } from 'react'
import { View, Text } from 'react-native'
import { exercises } from './exercises.dat'

const ExerciseList: FC = () => {
	return (
		<View className='mt-8'>
			{exercises.map(name => (
				<Text
					key={name}
					className='text-lg text-white opacity-30 mb-3 capitalize'
				>
					{name}
				</Text>
			))}
		</View>
	)
}

export default ExerciseList
