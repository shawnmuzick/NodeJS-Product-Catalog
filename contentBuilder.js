const fs = require('fs');
const { tableStyle, footerStyle } = require('./styles');

module.exports = {
	//accepts a data source and options
	contentBuilder: (
		data,
		options = { width: 'auto', numHeaderRows: 1, style: tableStyle }
	) => {
		//retrieve any user given options, otherwise us the defaults
		let { width, numHeaderRows, style } = options;
		let builtHeader = false;

		//build the table that houses the data
		let table = {
			headerRows: numHeaderRows,
			widths: [],
			body: [],
		};

		//build the header and widths
		let headerContent = [];

		//build the body of the table
		let body = data.map((i) => {
			let arr = [];
			i.img = `img/${i.csk_sku}.jpg`;
			for (property in i) {
				if (!builtHeader) {
					console.log(property);
					table.widths.push(width || 'auto');
					headerContent.push({ text: property });
				}

				if (property === 'img') {
					if (!fs.existsSync(i.img)) i.img = 'img/test.jpg';
					var bin = fs.readFileSync(i.img);
					var b64 = Buffer.from(bin).toString('base64');

					arr.push({
						image: `data:image/jpeg;base64,${b64}`,
					});
				} else {
					arr.push({ text: i[property] });
				}
			}
			builtHeader = true;
			return arr;
		});
		console.log(table.widths);
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
