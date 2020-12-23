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
		const startTime = process.hrtime();
		//retrieve any user given options, otherwise us the defaults
		let { width, numHeaderRows, style, defaultImg, imgDimensions } = options;

		//create the content object to return to the pdf maker
		let content = [
			{
				style: style,
				layout: 'lightHorizontalLines',
				table: {
					headerRows: numHeaderRows,
					widths: [],
					body: [],
				},
			},
		];

		for (let i = 0; i < data.length; i++) {
			let arr = [];

			for (let j = 0; j < data[i].length; j++) {
				//first row, set up a column width for each column
				if (i === 0) content[0].table.widths.push(width || 'auto');

				//for images, which should be the first column in every row after the first row
				if (j === 0 && i !== 0) {
					if (!data[i][j]) data[i][j] = `img/${i.csk_sku}.jpg`;

					//if the image path doesn't exist, set it to a default image
					if (!fs.existsSync(data[i][j])) data[i][j] = defaultImg;

					var bin = fs.readFileSync(data[i][j]);
					var b64 = Buffer.from(bin).toString('base64');

					//push the imagestring into the array as an image type
					arr.push([
						{
							image: `data:image/jpeg;base64,${b64}`,
							width: imgDimensions.width,
							height: imgDimensions.height,
						},
					]);
				} else {
					//no need for "img" column header
					if (i === 0 && j === 0)
						arr.push({ text: '', margin: 0, padding: 0 });
					//bold the column headers
					else if (i === 0)
						arr.push({
							text: data[i][j],
							bold: true,
							margin: 0,
							padding: 0,
						});
					//otherwise just push in the content
					else arr.push({ text: data[i][j], margin: 0, padding: 0 });
				}
			}
			//push the array into the body
			content[0].table.body.push(arr);
		}
		const endTime = process.hrtime(startTime);
		console.info('Function Execution Time %ds %dms', endTime[0], endTime[1] / 1000000);
		return content;
	},
};
