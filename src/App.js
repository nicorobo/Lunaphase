import React from 'react';
import Calendar from './Calendar';
import Tonight from './Tonight';
const App = () => (
	<div
		style={{
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: '1rem',
		}}>
		<Tonight />
		<Calendar />
	</div>
);

export default App;
