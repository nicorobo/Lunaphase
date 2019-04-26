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

export const months = timeMonth.range(timeYear(Date.now()), timeYear.ceil(Date.now())).map((m) => {
	return timeDay.range(timeMonth(timeDay.offset(m)), timeMonth.ceil(timeDay.offset(m)));
});

export const formatMonth = timeFormat('%b');
export const formatDay = timeFormat('%B %e');
export const formatUnix = timeFormat('%Q');

export const isSameDay = (d1, d2) => {
	return formatUnix(timeDay.floor(d1)) === formatUnix(timeDay.floor(d2));
};

// Returns the given date at 11PM
export const evening = (d) => timeHour.offset(timeDay.floor(d), 23);

export const getCrescentGenerator = (scale, t = 3) => {
	const circle = geoCircle();
	const projection = geoOrthographic()
		.scale(scale)
		.translate([0, 0]);
	const path = geoPath().projection(projection);
	return (phase) => path(circle.center([360 * -phase, 0])());
};

export const drawMoon = (el, path, radius, strokeWidth) => {
	el.append('circle')
		.attr('class', 'moon')
		.attr('cx', 0)
		.attr('cy', 0)
		.attr('r', radius);
	el.append('path')
		.attr('class', 'moon-phase')
		.attr('d', path);
};
