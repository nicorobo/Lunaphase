import React, { useState, useEffect } from 'react';
import { select, timeDay } from 'd3';
import { getMoonIllumination } from 'suncalc';
import { getCrescentGenerator, drawMoon, formatDay } from './utils';
const Tonight = ({ active }) => {
	const [svg, setSvg] = useState();
	console.log(timeDay.ceil(active));
	const { phase } = getMoonIllumination(timeDay.ceil(active));
	const phaseText = getPhaseText(phase);
	const crescent = getCrescentGenerator(38);
	useEffect(() => {
		const moon = select(svg)
			.append('g')
			.attr('transform', 'translate(40, 40)');
		drawMoon(moon, (d) => crescent(phase), 38);
		return () => moon.remove();
	}, [svg, phase]);
	return (
		<div className="tonight">
			<svg className="tonight-moon" ref={setSvg} height={80} width={80} />
			<div>
				{formatDay(active)}: <span className="phase-text">{phaseText}</span>
			</div>
		</div>
	);
};

const getPhaseText = (phase) => {
	const margin = 0.02; // May need to be updated, this is 1/31. Should it be 1/62?
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
