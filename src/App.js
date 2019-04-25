import React from 'react';
import Tonight from './Tonight';
import Calendar from './Calendar';
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
