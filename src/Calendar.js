import React, { useState, useEffect } from 'react';
import { select } from 'd3';
import { getMoonIllumination } from 'suncalc';
import { months, formatMonth, getCrescentGenerator } from './utils';
import { foreground, background } from './colors';

const Calendar = () => {
	const [height, width] = [320, 850];
	const [svg, setSvg] = useState(null);
	const crescent = getCrescentGenerator(10);
	useEffect(() => {
		const calendar = select(svg)
			.append('g')
			.attr('transform', `translate(10, 15)`);
		const month = calendar
			.selectAll('.month')
			.data(months)
			.join('g')
			.attr('class', 'month')
			.attr('transform', (d, i) => `translate(70, ${15 + 25 * i})`);
		calendar
			.selectAll('text')
			.data(months[0])
			.join('text')
			.text((d) => new Date(d).getDate())
			.attr('text-anchor', 'middle')
			.attr('x', (d, i) => 70 + 25 * i)
			.attr('y', 0)
			.style('fill', '#333')
			.attr('font-size', '.8rem')
			.attr('font-weight', (d) =>
				new Date(d).getDate() === new Date().getDate() ? 'bold' : '300'
			);

		const day = month
			.selectAll('.day')
			.data((d) => d)
			.join('g')
			.attr('class', 'day')
			.attr('transform', (d, i) => `translate(${25 * i}, 0)`);
		day.append('circle')
			.attr('cx', 0)
			.attr('cy', 0)
			.attr('r', 10)
			.style('fill', background)
			.style('stroke-width', 0.5)
			.style('stroke', foreground);
		day.append('path')
			.attr('d', (d) => crescent(getMoonIllumination(d).phase))
			.style('fill', foreground);
		month
			.append('text')
			.attr('x', -18)
			.attr('y', 3)
			.style('fill', '#333')
			.text((d) => formatMonth(d[0]))
			.attr('text-anchor', 'end')
			.attr('font-size', '.8rem')
			.attr('font-weight', (d) =>
				new Date(d[0]).getMonth() === new Date().getMonth() ? 'bold' : '300'
			);
	}, [svg]);

	return (
		<div
			style={{ maxWidth: '100%', overflow: 'scroll', '-webkit-overflow-scrolling': 'touch' }}>
			<svg ref={setSvg} height={height} width={width} />
		</div>
	);
};

export default Calendar;
