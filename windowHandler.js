const { fs, PDF } = require('./modules');
const fonts = require('./fonts');
const { header } = require('./header');
const { contentBuilder } = require('./contentBuilder');
const printer = new PDF(fonts);
const xlsx = require('xlsx');
const windowHandler = (file) => {
	const workbook = xlsx.readFile(file);
	var first_sheet_name = workbook.SheetNames[0];
	var worksheet = workbook.Sheets[first_sheet_name];
	const data = xlsx.utils.sheet_to_json(worksheet, { raw: true, header: 1 }); //pass header:1 to treat header row as data, everything will then just be indexed

	const content = contentBuilder(data);

	const definition = {
		defaultStyle: {
			font: 'Courier',
		},
		header: header,
		content: content,
	};

	const startTime = process.hrtime();
	const document = printer.createPdfKitDocument(definition);
	document.pipe(fs.createWriteStream('./test.pdf'));
	document.end();
	const endTime = process.hrtime(startTime);
	console.info('Total Execution Time %ds %dms', endTime[0], endTime[1] / 1000000);
};
module.exports = { windowHandler };