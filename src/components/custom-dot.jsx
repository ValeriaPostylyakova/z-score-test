export const CustomDot = ({ cx, cy, stroke, payload, dataKey, zScoreKey }) => {
	const actualZScoreKey =
		zScoreKey ?? `z${dataKey.charAt(0).toUpperCase() + dataKey.slice(1)}`
	const zScore = payload[actualZScoreKey]
	const fillColor = zScore > 1 ? '#ff0000' : stroke

	return (
		<circle
			cx={cx}
			cy={cy}
			r={5}
			fill={fillColor}
			stroke={fillColor}
			strokeWidth={2}
		/>
	)
}
