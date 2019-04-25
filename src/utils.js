import { geoCircle, geoOrthographic, geoPath, timeDay, timeMonth, timeYear, timeFormat } from 'd3';
import { foreground, background } from './colors';

export const months = timeMonth.range(timeYear(Date.now()), timeYear.ceil(Date.now())).map((m) => {
	return timeDay.range(timeMonth(timeDay.offset(m)), timeMonth.ceil(timeDay.offset(m)));
});

export const formatMonth = timeFormat('%b');

export const getCrescentGenerator = (scale, t = 3) => {
	const circle = geoCircle();
	const projection = geoOrthographic()
		.scale(scale)
		.translate([0, 0]);
	const path = geoPath().projection(projection);
	return (phase) => path(circle.center([360 * -phase, 0])());
};

export const drawMoon = (el, path, radius, strokeWidth, fg = foreground, bg = background) => {
	el.append('circle')
		.attr('cx', 0)
		.attr('cy', 0)
		.attr('r', radius)
		.style('fill', bg)
		.style('stroke-width', strokeWidth)
		.style('stroke', fg);
	el.append('path')
		.attr('d', path)
		.style('fill', fg);
};
