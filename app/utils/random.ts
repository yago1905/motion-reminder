import { exercises } from './../components/screens/home/exercises/exercises.dat'

export const randomExercise = () => {
	const randomIndex = Math.floor(Math.random() * exercises.length - 1)
	console.log(randomIndex)
	return exercises[randomIndex]
}
