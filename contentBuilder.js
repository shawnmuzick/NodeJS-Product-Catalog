const { tableStyle } = require('./styles');

module.exports = {
	//accepts a data source and options
	contentBuilder: (data, options = { width: 'auto', headerRows: 0, style: tableStyle }) => {
		//retrieve any user given options, otherwise us the defaults
		let { width, headerRows, style } = options;
		let body = [];
		let builtWidths = false;

		//build the table that houses the data
		let table = {
			headerRows: headerRows,
			widths: [],
			body: body,
		};

		//build the body of the table
		table.body = data.map((i) => {
			let arr = [];

			for (property in i) {
				arr.push({ text: i[property] });
				//if it's our first time through, set up the column widths
				if (!builtWidths) table.widths.push(width || 'auto');
			}

			//we set up the columns, so prevent future data from trying to
			builtWidths = true;

			return arr;
		});

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
