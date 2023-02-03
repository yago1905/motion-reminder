import { FC, PropsWithChildren } from 'react'
import Constants from 'expo-constants'
import { View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const { top } = useSafeAreaInsets()

	return (
		<SafeAreaView className='flex-1 bg-[#1D1C21]'>
			<View
				className='flex-1 px-6'
				style={{ paddingTop: Constants.platform?.ios ? top / 5 : top * 1.6 }}
			>
				{children}
			</View>
		</SafeAreaView>
	)
}

export default Layout
