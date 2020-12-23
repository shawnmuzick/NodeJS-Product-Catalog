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
		return [
			{
				text: text,
				alignment: textAlign,
				style: style,
				margin: 5,
				padding: 5,
			},
		];
	},
};
