import React from 'react'
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	ReferenceArea,
} from 'recharts'
import '../App.css'

import { CustomDot } from './custom-dot'
import { data } from '../data/data'

import { calculateZScores } from '../utils/calculateZScores'

const Example = () => {
	const processedData = React.useMemo(() => {
		let tempProcessedData = data.map((d, i) => ({ ...d, index: i }))
		tempProcessedData = calculateZScores(tempProcessedData, 'pv')
		tempProcessedData = calculateZScores(tempProcessedData, 'uv')
		return tempProcessedData
	}, [data])

	return (
		<ResponsiveContainer width='100%' height='100%'>
			<LineChart
				width={500}
				height={300}
				data={processedData}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray='3 3' />

				<XAxis
					dataKey='index'
					type='number'
					tickFormatter={(tickValue, index) => {
						return processedData[index] ? processedData[index].name : ''
					}}
					domain={[-0.5, processedData.length - 0.5]}
					allowDataOverflow={false}
					ticks={processedData.map((d, i) => i)}
				/>
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type='monotone'
					dataKey='pv'
					stroke='#8884d8'
					dot={<CustomDot dataKey='pv' />}
					activeDot={{ r: 8 }}
				/>
				<Line
					type='monotone'
					dataKey='uv'
					stroke='#82ca9d'
					dot={<CustomDot dataKey='uv' />}
					activeDot={{ r: 8 }}
				/>
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
			</LineChart>
		</ResponsiveContainer>
	)
}

export default Example
