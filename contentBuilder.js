const { tableStyle } = require('./styles');

module.exports = {
	//accepts a data source and options
	contentBuilder: (
		data,
		options = { width: 'auto', numHeaderRows: 1, style: tableStyle }
	) => {
		//retrieve any user given options, otherwise us the defaults
		let { width, numHeaderRows, style } = options;

		//build the table that houses the data
		let table = {
			headerRows: numHeaderRows,
			widths: [],
			body: [],
		};

		//build the header and widths
		let headerContent = [];
		for (property in data[0]) {
			table.widths.push(width || 'auto');
			headerContent.push({ text: property });
		}

		//build the body of the table
		let body = data.map((i) => {
			let arr = [];
			for (property in i) {
				arr.push({ text: i[property] });
			}
			return arr;
		});

		table.body.push(headerContent);
		table.body.push(...body);

		//create the content object to return to the pdf maker
		let content = [
			{
				style: style,
				layout: 'lightHorizontalLines',
				table: table,
			},
		];
		return content;
	},
};
