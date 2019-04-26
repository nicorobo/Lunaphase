import React, { useState, useEffect } from 'react';
import { select } from 'd3';
import { getMoonIllumination, getMoonTimes, getMoonPosition } from 'suncalc';
import { getCrescentGenerator, drawMoon, formatDay, formatTime, useLocation } from './utils';
const Tonight = ({ active }) => {
	const [lat, lng] = useLocation();
	const [svg, setSvg] = useState();
	const { phase } = getMoonIllumination(active);
	const times = lat === null ? {} : getMoonTimes(active, lat, lng);
	const phaseText = getPhaseText(phase);
	const crescent = getCrescentGenerator(38);
	console.log(times);
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
				{formatDay(active)}: <span className="phase-text">{phaseText}</span>
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

const getPhaseText = (phase) => {
	const margin = 0.019; // May need to be updated, this is 1/31. Should it be 1/62?
	if (phase >= 1 - margin || phase < margin) return 'New Moon';
	else if (phase < 0.25 - margin) return 'Waxing Crescent';
	else if (phase < 0.25 + margin) return 'First Quarter';
	else if (phase < 0.5 - margin) return 'Waxing Gibbous';
	else if (phase < 0.5 + margin) return 'Full Moon';
	else if (phase < 0.75 - margin) return 'Waning Gibbous';
	else if (phase < 0.75 + margin) return 'Last Quarter';
	else return 'Waning Crescent';
};

export default Tonight;
