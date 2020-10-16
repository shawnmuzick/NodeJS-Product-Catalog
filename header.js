const { headerStyle } = require('./styles');

module.exports = {
	header: () => {
		return [
			{
				text: 'Header Text function',
				alignment: 'right',
				style: headerStyle,
			},
		];
	},
};
