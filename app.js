const fs = require('fs');
const PDF = require('pdfmake');
const fonts = require('./fonts');
const { header } = require('./header');
const { contentBuilder } = require('./contentBuilder');
const printer = new PDF(fonts);
const xlsx = require('xlsx');
const workbook = xlsx.readFile('test.xls');

/* DO SOMETHING WITH workbook HERE */
var first_sheet_name = workbook.SheetNames[0];
/* Get worksheet */
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

const document = printer.createPdfKitDocument(definition);
document.pipe(fs.createWriteStream('./test.pdf'));
document.end();
