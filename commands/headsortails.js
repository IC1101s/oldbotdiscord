module.exports = {
	name: [`hort`, `headsortails`],
	description: 'Включает игру "Орёл или Решка" (подбрасывает случайную монетку)',
	execute(message) {
		const random = Math.floor(Math.random() * 2) + 1;

		if (random === 1) { // Если вычислено число 1, то выпадает орёл.
		  message.channel.send(`:full_moon: Орёл!`);
		} else if (random === 2) { // Если вычислено число 2, то выпадает решка.
		  message.channel.send(`:new_moon: Решка!`);
		}
	},
};