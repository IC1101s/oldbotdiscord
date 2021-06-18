const prefix = '!';  // const {prefix} = require('./config.json');

module.exports = (client, aliases, callback) => {
	if (typeof aliases === `string`) {
		aliases = [aliases];
	}

	client.on(`message`, message => {
		const {content} = message;

		aliases.forEach(alias => {
			const command = `${prefix}${alias}`;

			if (content.startsWith(`${command} `) || content === command || content === command.toUpperCase() || content.startsWith(`${command.toUpperCase()} `)) {
				console.log(`Running the command ${command}`);
				callback(message);
			}
		});
	});
}