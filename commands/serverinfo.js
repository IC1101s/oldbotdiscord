module.exports = {
	name: [`si`, `serverinfo`],
	description: 'Выводит информацию о сервере',
	async execute(message) {
		const monthToMonth = {
			'Jan': 'января',
			'Feb': 'февраля',
			'Mar': 'марта',
			'Apr': 'апреля',
			'May': 'мая',
			'Jun': 'июня',
			'Jul': 'июля',
			'Aug': 'августа',
			'Sep': 'сентября',
			'Oct': 'октября',
			'Nov': 'ноября',
			'Dec': 'декабря',
		};

		const {guild} = message;
		const {name, region, memberCount, createdAt, afkTimeout} = guild;

		const icon = guild.iconURL();

		const owner = await message.guild.members.fetch(message.guild.ownerID);
		const usernameOwner = guild.owner.user.username;
		const discriminatorOwner = guild.owner.user.discriminator; 
		const regionModified = region[0].toUpperCase() + region.slice(1);

		const dateCreated = String(createdAt).split(' ');	
		const dayCreated = dateCreated[2];
		const monthCreated = dateCreated[1];
		const yearsCreated = dateCreated[3];
		const timeCreated = dateCreated[4];

		const messageCreated = `В ${yearsCreated} году ${dayCreated} ${monthToMonth[monthCreated]} в ${timeCreated}`;

		let afkName = ``;
		if (afkTimeout / 60 === 1) {
			afkName = `минута`;
		} else {
			afkName = `минут`;
		}

		const Discord = require('discord.js');
		const embed = new Discord.MessageEmbed()
			.setTitle(`Информация о сервере — ${name}`)
			.setThumbnail(icon)
			.setColor(`#20B2AA`)
			.addFields(
				{
					name: `Король-Олд:`,
					value: `${usernameOwner} #${discriminatorOwner}`,
					inline: true
				},
				{
					name: `Жителей:`,
					value: `${memberCount} человек(а)`,
					inline: true
				},
				{
					name: `Регион:`,
					value: regionModified,
					inline: true
				},
				{
					name: `Сервер создан:`,
					value: messageCreated,
					inline: false
				},
				{
					name: `AFK Timeout:`,
					value: `${afkTimeout / 60} ${afkName}`,
					inline: true
				},
			)
			
			message.channel.send(embed);
	},
};