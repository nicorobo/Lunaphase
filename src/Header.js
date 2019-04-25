import React, { useState, useEffect } from 'react';
import { select } from 'd3';
import { getCrescentGenerator, drawMoon } from './utils';
// Not needed now, but may bring back because it's fun!
const Header = () => {
	const [svg, setSvg] = useState();
	const [phase, setPhase] = useState(0.8);
	const crescent = getCrescentGenerator(10);
	useEffect(() => {
		window.setTimeout(() => setPhase(phase + 0.01), 30);
		const moon = select(svg)
			.append('g')
			.attr('transform', 'translate(20, 20)');
		drawMoon(moon, (d) => crescent(phase), 10, 0.5, '#333', '#eee');
		return () => moon.remove();
	}, [svg, phase]);
	return (
		<div className="header">
			<span className="title">Lunaphase</span>
			<svg ref={setSvg} height={40} width={40} />
		</div>
	);
};

export default Header;
