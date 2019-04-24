import React, { useState, useEffect } from 'react';
import { select } from 'd3';
import { getMoonIllumination } from 'suncalc';
import { getCrescentGenerator } from './utils';
import { foreground, background } from './colors';

const Tonight = () => {
	const [svg, setSvg] = useState();
	const { phase } = getMoonIllumination(Date.now());
	const phaseText = getPhaseText(phase);
	const crescent = getCrescentGenerator(38);
	useEffect(() => {
		const moon = select(svg)
			.append('g')
			.attr('transform', 'translate(40, 40)');
		moon.append('circle')
			.attr('cx', 0)
			.attr('cy', 0)
			.attr('r', 38)
			.style('fill', background)
			.style('stroke-width', 1)
			.style('stroke', foreground);
		moon.append('path')
			.attr('d', crescent(phase))
			.style('fill', foreground);
	}, [svg, phase]);
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				fontSize: '0.9rem',
				fontWeight: '300',
				marginBottom: '1rem',
			}}>
			<svg
				style={{ minHeight: 80, marginBottom: '.5rem' }}
				ref={setSvg}
				height={80}
				width={80}
			/>
			<div>
				Current Phase: <span style={{ fontWeight: 'bold' }}>{phaseText}</span>
			</div>
		</div>
	);
};

const getPhaseText = (phase) => {
	const margin = 0.032; // May need to be updated, this is 1/31. Should it be 1/62?
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
