import React, { useState } from 'react';
import Tonight from './Tonight';
import Calendar from './Calendar';
import { evening } from './utils';
const App = () => {
	const [active, setActive] = useState(evening(Date.now()));
	console.log(active);
	return (
		<div className="app">
			<Tonight active={active} />
			<Calendar active={active} setActive={setActive} />
		</div>
	);
};

export default App;
