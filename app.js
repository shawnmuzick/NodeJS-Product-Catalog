const { fs, PDF, app, BrowserWindow, dialog } = require('./modules');
const fonts = require('./fonts');
const { header } = require('./header');
const { contentBuilder } = require('./contentBuilder');
const printer = new PDF(fonts);
const xlsx = require('xlsx');

async function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
		},
		frame: false,
	});

	win.loadFile('index.html');
	const file = await dialog
		.showOpenDialog({ properties: ['openFile'] })
		.then((p) => p.filePaths[0]);
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
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
