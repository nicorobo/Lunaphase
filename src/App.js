import React from 'react';
import Calendar from './Calendar';
import Tonight from './Tonight';
const App = () => (
	<div
		style={{
			height: '100vh',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
		}}>
		<Tonight />
		<Calendar />
	</div>
);

export default App;
