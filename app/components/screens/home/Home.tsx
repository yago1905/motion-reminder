import { FC } from 'react'
import Layout from '../../layout/layout'
import ExerciseList from './exercises/ExerciseList'
import Logo from './Logo'
import ToggleReminders from './toggle-reminders/ToggleReminders'

const Home: FC = () => {
	return (
		<Layout>
			<Logo />
			<ExerciseList />
			<ToggleReminders />
		</Layout>
	)
}

export default Home
