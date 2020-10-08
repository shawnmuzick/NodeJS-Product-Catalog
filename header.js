const { headerStyle } = require('./styles');

module.exports = {
	header: (currentPage, pageCount, pageSize) => {
		return [
			{
				text: 'Header Text function',
				alignment: currentPage % 2 ? 'left' : 'right',
				style: headerStyle,
			},
		];
	},
};
