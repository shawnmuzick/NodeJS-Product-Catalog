const fs = require('fs');
const { tableStyle, footerStyle } = require('./styles');

module.exports = {
	//accepts a data source and options
	contentBuilder: (
		data,
		options = {
			width: 'auto',
			numHeaderRows: 1,
			style: tableStyle,
			defaultImg: 'img/test.jpg',
			imgDimensions: { width: 100, height: 100 },
		}
	) => {
		//retrieve any user given options, otherwise us the defaults
		let { width, numHeaderRows, style, defaultImg, imgDimensions } = options;
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

			//check if already an image propery, if not set it
			if (!i.img) i.img = `img/${i.csk_sku}.jpg`;

			//loop through each row's columns
			for (property in i) {
				//if we haven't built the header, build it
				if (!builtHeader) {
					table.widths.push(width || 'auto');
					headerContent.push({ text: property });
				}
				//if the current property is image, insert the image object
				if (property === 'img') {
					//if the image path doesn't exist, set it to a default
					if (!fs.existsSync(i.img)) i.img = defaultImg;

					//read it as binary
					var bin = fs.readFileSync(i.img);

					//create base64 encoded string
					var b64 = Buffer.from(bin).toString('base64');

					//push the imagestring into the array as an image type
					arr.push({
						image: `data:image/jpeg;base64,${b64}`,
						width: imgDimensions.width,
						height: imgDimensions.height,
					});
				} else {
					//otherwise just push it in as text
					arr.push({ text: i[property] });
				}
			}
			//set the header to true after the first time around
			builtHeader = true;

			//push the array into the body
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
