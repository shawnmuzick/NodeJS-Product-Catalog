const { main } = require('./styles');
module.exports = {
	contentBuilder: (data) => {
		let table = {
			headerRows: 0,
			widths: ['auto', 'auto'],
			body: [],
		};

		table.body = data.map((p) => {
			return [{ text: p.name }, { text: p.age }];
		});
		let tableStyle = {
			fillColor: '#eee',
			color: 'blue',
			fontSize: 9,
			margin: [0, 15, 0, 5],
		};

		let content = [
			{
				style: tableStyle,
				layout: 'lightHorizontalLines',
				table: table,
			},
		];
		return content;
	},
};
