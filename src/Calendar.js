import React, { useState, useEffect, useRef } from 'react';
import { select, timeHour } from 'd3';
import { getMoonIllumination } from 'suncalc';
import { months, formatMonth, isSameDay, evening, getCrescentGenerator, drawMoon } from './utils';

const Calendar = ({ active, setActive }) => {
	const [height, width] = [400, 820];
	const [svg, setSvg] = useState(null);
	const calendar = useRef();
	const month = useRef();
	const day = useRef();
	const crescent = getCrescentGenerator(10);
	useEffect(() => {
		calendar.current = select(svg)
			.append('g')
			.attr('transform', `translate(50, 15)`);
		calendar.current // Draw day labels
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
		month.current = calendar.current
			.selectAll('.month')
			.data(months)
			.join('g')
			.attr('class', 'month')
			.attr('transform', (d, i) => `translate(0, ${15 + 25 * i})`);
		day.current = month.current
			.selectAll('.day')
			.data((d) => d.map((day) => timeHour.offset(day, 23)))
			.join('g')
			.attr('class', (d) => (isSameDay(active, d) ? 'day active' : 'day'))
			.attr('transform', (d, i) => `translate(${25 * i}, 0)`)
			.on('click', (d) => setActive(evening(d))); // Evening shouldn't be needed, but data was still midnight for some reason?
		drawMoon(
			day.current,
			(d) => {
				console.log('draw moon: ', d);
				return crescent(getMoonIllumination(d).phase);
			},
			10
		);
		month.current // Draw month labels
			.append('text')
			.attr('class', 'label-month')
			.attr('x', -18)
			.attr('y', 3)
			.text((d) => formatMonth(d[0]))
			.attr('font-weight', (d) =>
				new Date(d[0]).getMonth() === new Date().getMonth() ? 'bold' : '300'
			);
		return () => calendar.current.remove();
	}, [svg]);

	useEffect(() => {
		// Only update class, don't rerender moons
		month.current
			.selectAll('.day')
			.data((d) => d)
			.join('g')
			.attr('class', (d) => (isSameDay(active, d) ? 'day active' : 'day'));
	}, [svg, active]);

	return (
		<div className="calendar">
			<svg ref={setSvg} height={height} width={width} />
		</div>
	);
};

export default Calendar;
