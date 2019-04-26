import React, { useState } from 'react';
import Tonight from './Tonight';
import Calendar from './Calendar';
const App = () => {
	const [active, setActive] = useState(Date.now());
	return (
		<div className="app">
			<Tonight active={active} />
			<Calendar active={active} setActive={setActive} />
		</div>
	);
};

export default App;
