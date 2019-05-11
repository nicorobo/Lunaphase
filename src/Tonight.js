import React, { useState, useEffect } from 'react';
import { select } from 'd3';
import { getMoonIllumination, getMoonTimes, getMoonPosition } from 'suncalc';
import {
	getCrescentGenerator,
	drawMoon,
	formatDay,
	formatTime,
	getPhaseIndex,
	useLocation,
} from './utils';

const phaseText = [
	'New Moon',
	'Waxing Crescent',
	'First Quarter',
	'Waxing Gibbous',
	'Full Moon',
	'Waning Gibbous',
	'Last Quarter',
	'Waning Crescent',
];

const Tonight = ({ active }) => {
	const [lat, lng] = useLocation();
	const [svg, setSvg] = useState();
	const { phase } = getMoonIllumination(active);
	const times = lat === null ? {} : getMoonTimes(active, lat, lng);
	const text = phaseText[getPhaseIndex(phase)];
	const crescent = getCrescentGenerator(38);
	useEffect(() => {
		const moon = select(svg)
			.datum(active)
			.append('g')
			.attr('transform', 'translate(40, 40)');
		drawMoon(moon, crescent, 38);
		return () => moon.remove();
	}, [svg, phase]);
	return (
		<div className="tonight">
			<svg className="tonight-moon" ref={setSvg} height={80} width={80} />
			<div>
				{formatDay(active)}: <span className="phase-text">{text}</span>
			</div>
			<div className="times">
				<div className="moonrise">
					<span>rise:</span> {times.rise ? formatTime(times.rise) : '--:--'}
				</div>
				<div className="moonset">
					<span>set:</span> {times.set ? formatTime(times.set) : '--:--'}
				</div>
			</div>
		</div>
	);
};

export default Tonight;
