import React, { useState, useEffect } from 'react';
import { select } from 'd3';
import { getMoonIllumination } from 'suncalc';
import { months, formatMonth, isSameDay, getCrescentGenerator, drawMoon } from './utils';

const Calendar = ({ active, setActive }) => {
	const [height, width] = [400, 820];
	const [svg, setSvg] = useState(null);
	const crescent = getCrescentGenerator(10);
	useEffect(() => {
		const calendar = select(svg)
			.append('g')
			.attr('transform', `translate(50, 15)`);
		calendar // Draw day labels
			.selectAll('text')
			.data(months[0])
			.join('text')
			.attr('class', 'label-day')
			.attr('x', (d, i) => 25 * i)
			.attr('y', 0)
			.text((d) => new Date(d).getDate())
			.attr('font-weight', (d) =>
				new Date(d).getDate() === new Date().getDate() ? 'bold' : '300'
			);

		const month = calendar
			.selectAll('.month')
			.data(months)
			.join('g')
			.attr('class', 'month')
			.attr('transform', (d, i) => `translate(0, ${15 + 25 * i})`);
		const day = month
			.selectAll('.day')
			.data((d) => d)
			.join('g')
			.attr('class', (d) => (isSameDay(active, d) ? 'day active' : 'day'))
			.attr('transform', (d, i) => `translate(${25 * i}, 0)`);
		drawMoon(day, (d) => crescent(getMoonIllumination(d).phase), 10);

		month // Draw month labels
			.append('text')
			.attr('class', 'label-month')
			.attr('x', -18)
			.attr('y', 3)
			.text((d) => formatMonth(d[0]))
			.attr('font-weight', (d) =>
				new Date(d[0]).getMonth() === new Date().getMonth() ? 'bold' : '300'
			);
	}, [svg]);

	return (
		<div className="calendar">
			<svg ref={setSvg} height={height} width={width} />
		</div>
	);
};

export default Calendar;
