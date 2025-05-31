import { ReferenceArea } from 'recharts'

export const HighlightedAreas = ({ processedData }) => {
	return (
		<>
			{processedData.map((entry, index) => {
				const zPvCondition = entry.zPv > 1
				const zUvCondition = entry.zUv > 1

				if (zPvCondition || zUvCondition) {
					const minY = Math.min(entry.pv, entry.uv)
					const maxY = Math.max(entry.pv, entry.uv)
					return (
						<ReferenceArea
							key={`area-${entry.name || index}`}
							x1={index - 0.5}
							x2={index + 0.5}
							y1={minY}
							y2={maxY}
							fill='red'
							fillOpacity={0.2}
							stroke='none'
						/>
					)
				}
				return null
			})}
		</>
	)
}
