export const calculateStats = values => {
	if (values.length === 0) {
		return { mean: NaN, stdDev: NaN }
	}
	const mean = values.reduce((sum, prev) => sum + prev, 0) / values.length

	const variance =
		values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
		(values.length > 1 ? values.length - 1 : 1)
	const stdDev = Math.sqrt(variance)
	return { mean, stdDev }
}
