const fs = require('fs');
const PDF = require('pdfmake');
const { app, BrowserWindow, dialog } = require('electron');

module.exports = {
	fs,
	PDF,
	app,
	BrowserWindow,
	dialog,
};
