const { main } = require('./styles');
module.exports = {
	contentBuilder: (data) => {
		let arr = data.map((p) => {
			return [{ text: p.name }, { text: p.age }];
		});
		arr = arr.flat();
		arr.forEach((i) => {
			i.style = main;
		});
		return arr;
	},
};
