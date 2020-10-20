(function () {
	const remote = require('electron').remote;
	const dialog = require('electron').remote.dialog;
	const { windowHandler } = require('../windowHandler.js');
	function init() {
		document.getElementById('min-btn').addEventListener('click', function (e) {
			const window = remote.getCurrentWindow();
			window.minimize();
		});

		document.getElementById('max-btn').addEventListener('click', function (e) {
			const window = remote.getCurrentWindow();
			if (!window.isMaximized()) {
				window.maximize();
			} else {
				window.unmaximize();
			}
		});

		document.getElementById('close-btn').addEventListener('click', function (e) {
			console.log('test');
			const window = remote.getCurrentWindow();
			window.close();
		});
		document.getElementById('submit-btn').addEventListener('click', async () => {
			const window = remote.getCurrentWindow();
			const file = await dialog
				.showOpenDialog({
					properties: ['openFile'],
				})
				.then((p) => p.filePaths[0]);
			windowHandler(file);
		});
	}

	document.onreadystatechange = function () {
		if (document.readyState == 'complete') {
			init();
		}
	};
})();
