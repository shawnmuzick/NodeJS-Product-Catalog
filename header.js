const { headerStyle } = require('./styles');

module.exports = {
	header: (
		options = {
			text: 'DEFAULT HEADER',
			alignment: 'right',
			style: headerStyle,
		}
	) => {
		const { text, textAlign, style } = options;
		console.log(style.background);
		return [
			{
				text: text,
				alignment: textAlign,
				style: style,
			},
		];
	},
};
