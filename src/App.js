import React, { useState } from 'react';
import Tonight from './Tonight';
import Calendar from './Calendar';
import { evening } from './utils';
const App = () => {
	const [active, setActive] = useState(evening(Date.now()));
	return (
		<div className="app">
			<Tonight active={active} />
			<Calendar active={active} setActive={setActive} />
		</div>
	);
};

export default App;
