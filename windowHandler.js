const { fs, PDF } = require('./modules');
const fonts = require('./fonts');
const { header } = require('./header');
const { contentBuilder } = require('./contentBuilder');
const printer = new PDF(fonts);
const xlsx = require('xlsx');
const windowHandler = (file, options, headerOptions) => {
	const workbook = xlsx.readFile(file);
	var first_sheet_name = workbook.SheetNames[0];
	var worksheet = workbook.Sheets[first_sheet_name];
	const data = xlsx.utils.sheet_to_json(worksheet, { raw: true, header: 1 }); //pass header:1 to treat header row as data, everything will then just be indexed

	const content = contentBuilder(data, options);

	const definition = {
		defaultStyle: {
			font: 'Courier',
			margin: 2,
		},
		header: header(headerOptions),
		content: content,
	};

	const startTime = process.hrtime();
	const document = printer.createPdfKitDocument(definition);
	document.pipe(fs.createWriteStream('./catalog.pdf'));
	document.end();
	const endTime = process.hrtime(startTime);
	console.info('Total Execution Time %ds %dms', endTime[0], endTime[1] / 1000000);
};
module.exports = { windowHandler };
