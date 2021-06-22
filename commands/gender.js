module.exports = {
	name: 'gender',
	description: 'Выводит рандомный гендер',
	execute(message) {
		const random = Math.floor(Math.random() * 4) + 1;

		if (random === 1) { 
		  message.channel.send(`Вы натурал!`);
		} else if (random === 2) { 
		  message.channel.send(`Вы гей!`);
		} else if (random === 3) { 
		  message.channel.send(`Вы лесбиянка!`);
		} else if (random === 4) { 
		  message.channel.send(`Вы би!`);
		}
	},
};