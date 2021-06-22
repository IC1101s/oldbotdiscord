module.exports = {
	name: 'clear',
	description: 'Удаляет определённое кол-во сообщений',
	execute(message, args) {
		const SAGE = `631431981250510858`;
		const SPART_OLD = `570689924672782366`;
		const KING_OLD = `570684744132460559`;

		const info = `Подробная информация о командах **!help**`;

		const error = 
`**Error!**
Введите по шаблону: **!clear count**
Пример: **!clear 2**
${info}`;

		const error_2 = 
`**Error!**
Минимум удаленных сообщений: 1
Максимум удаленных сообщений: 99
${info}`;

		const count = args[0];

		if (message.member.roles.cache.has(SAGE, SPART_OLD, KING_OLD)) {
			if (isNaN(count)) {
				message.channel.send(error);
			} else if (count < 1 || count > 99) {
				message.channel.send(error_2);
			} else {
				message.channel.bulkDelete(Number(count) + 1, true);
			}		
		}	else {
			message.channel.send(`У вас нет прав на удаление сообщений!`);
		}		
	},
};