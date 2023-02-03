import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Home from './app/components/screens/home/Home'

export default function App() {
	return (
		<>
			<SafeAreaProvider>
				<Home />
			</SafeAreaProvider>
			<StatusBar style='light' />
		</>
	)
}
