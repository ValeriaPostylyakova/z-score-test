import { calculateStats } from './calculateStats'

export const calculateZScores = (dataArray, key) => {
	const values = dataArray.map(value => Number(value[key]))
	const { mean, stdDev } = calculateStats(values)

	if (stdDev === 0 || isNaN(stdDev)) {
		return dataArray.map(value => {
			const zKey = `z${key.charAt(0).toUpperCase() + key.slice(1)}`
			return {
				...value,
				[zKey]: 0,
			}
		})
	}

	return dataArray.map(value => {
		const zScore = (Number(value[key]) - mean) / stdDev
		const zKey = `z${key.charAt(0).toUpperCase() + key.slice(1)}`
		return {
			...value,
			[zKey]: zScore,
		}
	})
}
