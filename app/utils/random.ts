import { exercises } from './../components/screens/home/exercises/exercises.dat'

export const randomExercise = () => {
	const randomIndex = Math.floor(Math.random() * exercises.length - 1)
	const exercise = exercises[randomIndex]

	return exercise.charAt(0).toUpperCase() + exercise.slice(1)
}
