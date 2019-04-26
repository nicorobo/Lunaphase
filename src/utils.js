import {
	geoCircle,
	geoOrthographic,
	geoPath,
	timeDay,
	timeMonth,
	timeYear,
	timeFormat,
	timeHour,
} from 'd3';
import { getMoonIllumination, getMoonPosition } from 'suncalc';

export const months = timeMonth.range(timeYear(Date.now()), timeYear.ceil(Date.now())).map((m) => {
	return timeDay.range(timeMonth(timeDay.offset(m)), timeMonth.ceil(timeDay.offset(m)));
});

const toDegrees = (r) => r * (180 / Math.PI);

export const formatMonth = timeFormat('%b');
export const formatDay = timeFormat('%B %e');
export const formatUnix = timeFormat('%Q');

export const isSameDay = (d1, d2) => {
	return formatUnix(timeDay.floor(d1)) === formatUnix(timeDay.floor(d2));
};

// Returns the given date at 11PM
export const evening = (d) => timeHour.offset(timeDay.floor(d), 23);

export const getCrescentGenerator = (scale) => {
	const circle = geoCircle();
	const projection = geoOrthographic()
		.scale(scale)
		.translate([0, 0]);
	const path = geoPath().projection(projection);
	return (phase) => path(circle.center([360 * -phase, 0])());
};

export const drawMoon = (el, crescent, radius) => {
	const lat = 30.267153;
	const lng = -97.743057;
	const rotate = (d) => {
		const ill = getMoonIllumination(d);
		return `rotate(${toDegrees(ill.angle)})`;
	};
	el.append('circle')
		.attr('class', 'moon')
		.attr('transform', rotate)
		.attr('cx', 0)
		.attr('cy', 0)
		.attr('r', radius);
	el.append('path')
		.attr('class', 'moon-phase')
		.attr('transform', rotate)
		.attr('d', (d) => crescent(getMoonIllumination(d).phase));
};
