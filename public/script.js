(function () {
	const remote = require('electron').remote;
	const { windowHandler } = require('../windowHandler.js');
	const file = document.getElementById('file');
	const widths = document.getElementById('widths');
	const numHeaderRows = document.getElementById('numHeaderRows');
	const imageHeight = document.getElementById('imageHeight');
	const defaultImg = document.getElementById('defaultImg');

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
			const window = remote.getCurrentWindow();
			window.close();
		});
		document.getElementById('submit-btn').addEventListener('click', async (e) => {
			e.preventDefault();
			let options = {
				width: Number(widths.value) ? Number(widths.value) : widths.value,
				numHeaderRows: Number(numHeaderRows.value),
				defaultImg: defaultImg.files[0].path,
				imgDimensions: {
					width: Number(imageHeight.value),
					height: Number(imageHeight.value),
				},
			};
			windowHandler(file.files[0].path, options);
		});
	}

	document.onreadystatechange = function () {
		if (document.readyState == 'complete') {
			init();
		}
	};
})();
