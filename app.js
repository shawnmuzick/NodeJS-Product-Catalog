const PDF = require('pdfmake');
const fs = require('fs');
const fonts = require('./fonts');
const { header } = require('./header');
const { data } = require('./data');
const { contentBuilder } = require('./contentBuilder');
const printer = new PDF(fonts);

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
