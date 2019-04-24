import { geoCircle, geoOrthographic, geoPath, timeDay, timeMonth, timeYear, timeFormat } from 'd3';

export const months = timeMonth.range(timeYear(Date.now()), timeYear.ceil(Date.now())).map((m) => {
	return timeDay.range(timeMonth(timeDay.offset(m)), timeMonth.ceil(timeDay.offset(m)));
});

export const formatMonth = timeFormat('%b');

export const getCrescentGenerator = (scale) => {
	const circle = geoCircle();
	const projection = geoOrthographic()
		.scale(scale)
		.translate([0, 0]);
	const path = geoPath().projection(projection);
	return (phase) => path(circle.center([360 * -phase, 0])());
};
