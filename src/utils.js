import {
	select,
	geoCircle,
	geoOrthographic,
	geoPath,
	timeDay,
	timeMonth,
	timeYear,
	timeFormat,
	timeHour,
} from 'd3';
import { useState, useEffect } from 'react';
import { getMoonIllumination, getMoonPosition } from 'suncalc';

export const months = timeMonth.range(timeYear(Date.now()), timeYear.ceil(Date.now())).map((m) => {
	return timeDay.range(timeMonth(timeDay.offset(m)), timeMonth.ceil(timeDay.offset(m)));
});

const toDegrees = (r) => r * (180 / Math.PI);

export const formatMonth = timeFormat('%b');
export const formatDay = timeFormat('%B %e');
export const formatTime = timeFormat('%-I:%M %p');
export const formatUnix = timeFormat('%Q');

export const isSameDay = (d1, d2) => {
	return formatUnix(timeDay.floor(d1)) === formatUnix(timeDay.floor(d2));
};

// Returns the given date at 11PM
export const evening = (d) => timeHour.offset(timeDay.floor(d), 22);

export const getCrescentGenerator = (scale) => {
	const circle = geoCircle();
	const projection = geoOrthographic()
		.scale(scale)
		.translate([0, 0]);
	const path = geoPath().projection(projection);
	return (phase) => path(circle.center([360 * -phase, 0])());
};

export const drawMoon = (el, crescent, radius) => {
	const rotate = (d) => `rotate(${toDegrees(getMoonIllumination(d).angle)})`;
	// el.classed('full', (d) => {
	// 	const phase = getMoonIllumination(d).phase;
	// 	const margin = 0.0195;
	// 	return phase > 0.5 - margin && phase < 0.5 + margin;
	// });
	console.log(el);
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

export const useLocation = () => {
	const [location, setLocation] = useState([null, null]);
	useEffect(() => {
		navigator.geolocation.getCurrentPosition((pos, a, b) => {
			const { latitude, longitude } = pos.coords;
			setLocation([latitude, longitude]);
		});
	}, []);
	return [location[0], location[1]];
};
