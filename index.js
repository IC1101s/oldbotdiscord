const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require('./config.json');

const command = require('./command');

client.on(`ready`, () => {
	console.log(`Ready!`);

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

	const info = `Подробная информация о командах **!help**`;

	client.user.setPresence({
		activity: {
			name: `Введите ${prefix}help`,
		},
	});

	command(client, [`ping`, `test`], (message) => {
		message.channel.send(`Pong!`);
	});

	command(client, [`mc`, `membercount`], (message) => {
		client.guilds.cache.forEach((guild) => {
			message.channel.send(`Олдеров — ${guild.memberCount} человек(а)`);
		});
	});
	
	command(client, [`si`, `serverinfo`], async (message) => {
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
	});

	command(client, [`hort`, `headsortails`], (message) => {
		const random = Math.floor(Math.random() * 2) + 1;

		if (random === 1) { // Если вычислено число 1, то выпадает орёл.
		  message.channel.send(`:full_moon: Орёл!`);
		} else if (random === 2) { // Если вычислено число 2, то выпадает решка.
		  message.channel.send(`:new_moon: Решка!`);
		}
	});

	command(client, `gender`, (message) => {
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
	});

	command(client, [`calculator`, `calc`], (message) => {	
		const arrayMessages = message.content.trim().split(' ');
		const num1 = Number(arrayMessages[1]);
		const num2 = Number(arrayMessages[3]);
		const operator = arrayMessages[2];

		const error = 
`**Error!**
Введите по шаблону: **!calculator num1 operator num2** or **!calc num1 operator num2**
Примеры: **!calculator 2 + 2** или **!calc 2 * 2**
${info}`;

		let result = null;
		let operatorMessage = ``;
		let isErorr = false;

		if (!isNaN(num1) && !isNaN(num2) && arrayMessages.length <= 4) {
			switch(operator) {
			  case '+': 
			  	result = num1 + num2;
			  	operatorMessage = `сложения`;
			    break;

			  case '-': 
			  	result = num1 - num2; 
			  	operatorMessage = `вычитания`;
			    break;

			  case '*': 
			  	result = num1 * num2; 
			  	operatorMessage = `умножения`;
			    break;

			  case '/':
			  	result = num1 / num2; 
			  	operatorMessage = `деления`;
			    break;

			  default: // РЕАЛИЗОВАТЬ АВТОУДАЛЕНИЕ СООБЩЕНИЯ ОБ ОШИБКЕ ЧЕРЕЗ 1 МИН
			  	isErorr = true;
			    break;
			}

			if (isErorr) {
				message.channel.send(error);
			} else {
				message.channel.send(`Результат ${operatorMessage} равен: **${result}**`);
			}	
		}	else {
			message.channel.send(error);
		}
	});

	command(client, `clear`, (message) => {
		const SAGE = `631431981250510858`;
		const SPART_OLD = `570689924672782366`;
		const KING_OLD = `570684744132460559`;

		const error = 
`**Error!**
Максимум удаленных сообщений: 99
Введите по шаблону: **!clear count or all**
Примеры: **!clear 2** или **!clear all**
${info}`;

		const arrayMessages = message.content.trim().split(' ');
		const count = arrayMessages[1];

		if (message.member.roles.cache.has(SAGE, SPART_OLD, KING_OLD)) {
			if (count === `all`) {
				message.channel.messages.fetch().then((results) => {
					message.channel.bulkDelete(results);
				});
			} else if (isNaN(count) || count > 99) {
				message.channel.send(error);
			} else {
				message.channel.bulkDelete(Number(count) + 1);
			}		
		}	else {
			message.channel.send(`У вас нет прав на удаление сообщений!`);
		}		
	});

	command(client, `oldornot`, (message) => {
		const numberToMonth = {
			'0': 'января',
			'1': 'февраля',
			'2': 'марта',
			'3': 'апреля',
			'4': 'мая',
			'5': 'июня',
			'6': 'июля',
			'7': 'августа',
			'8': 'сентября',
			'9': 'октября',
			'10': 'ноября',
			'11': 'декабря',
		};

		const numberToYearsName = {
			'0': 'лет',
			'1': 'год',
			'2': 'года',
			'3': 'года',
			'4': 'года',
			'5': 'лет',
			'6': 'лет',
			'7': 'лет',
			'8': 'лет',
			'9': 'лет',
			'10': 'лет',
		};

		const dateNow = new Date();
		const dateMemders = String(message.member.joinedAt).split(' ');	
		const dayMemder = dateMemders[2];
		const monthMemder = dateMemders[1];
		const yearsMemder = dateMemders[3];
		const timeMemder = dateMemders[4];
		
		const years = 3;
		const yearsToMilliseconds = years * 365 * 86400000;

		const nowMilliseconds = dateNow - message.member.joinedAt;
		const needMilliseconds = yearsToMilliseconds;

		const yearsAllFloat = nowMilliseconds / 31536000000;
		const yearsAllFloatString = yearsAllFloat.toString();

		const yearsAll = yearsAllFloatString.slice(0, 1);
		const daysAll = Math.floor(365 * yearsAllFloatString.replace(yearsAllFloatString[0], 0));

		const userName = message.author.username;

		message.channel.send(`${userName} на сервере с ${dayMemder} ${monthToMonth[monthMemder]} ${yearsMemder} года ${timeMemder}`);
		message.channel.send(`Уже приблизительно ${yearsAll} ${numberToYearsName[yearsAll]} и ${daysAll} дней(я) с момента вступления`);

		if (nowMilliseconds >= needMilliseconds) {
			message.channel.send(`Вы OLD!`);
		} else {
			message.channel.send(`Вы не OLD!`);
		}
	});

	// command(client, [`role`], (message) => {
	// 	// const {member} = message;
	// 	// const joinResponse = `Hello **${member.user.username}**, welcome to: **${member.guild.name}**!`
 //  //   let role = message.member.guild.roles.get('Жители олдынии');
 //  //   if(!role) return console.log("Роли не существует");

 //  //   member.addRole(role);

 //  //   const ch = member.guild.channels.get('general');
 //  //   if(!ch) return console.log("Channel doesen't exist.");
 //    // ch.send(joinResponse);
 //    // console.log(message.member.guild.role'570690592481214468');


 //    // for (let i = 0; i < 10; i++) {
 //    // 	let role = message.guild.roles.cache.find(role => role.name[i]); console.log(role);
 //    // }
    
	// 	// let role = message.guild.roles.cache.find(role => role.name === `Мудрец`); 
	// 	// message.member.roles.remove(role);

	// 	// role = message.guild.roles.cache.find(role => role.name === `Спартолд`); 
	// 	// message.member.roles.remove(role);
	// 	// console.log(message.member.guild.channels.cache);
	// 	let role = message.guild.roles.cache.find(role => role.name === `Жители олдынии`);

	// 	const embed = new Discord.MessageEmbed();
	//   embed.setTitle(`Добро пожаловать на сервер ${message.member.guild.name}!`)
	//     .setColor('#ffffff') //Цвет полоски

	//     .setDescription(message.member.user.tag + ` присоединился(ась) к серверу! \n\nВам автоматически присуждена роль ${role}`)
	    
	//     .setThumbnail(message.member.user.avatarURL())
	
	//     .setFooter('Всего пользователей: ' +  message.member.guild.memberCount)

	//   const channel = message.member.guild.channels.cache.find(channel => channel.name === `test-4`); 
	//   channel.send(`<@${message.member.user.id}>`, { embed });

  
	// 	message.member.roles.add(role);
	// });

	command(client, `help`, (message) => {
		message.channel.send(`
Все команды для использования:

**!help** — отображает меню помощи

**!clear count or all** — удаляет все или определённое кол-во сообщений
Команда работает не для всех ролей
Кол-во удаленных сообщений не больше 99 за раз, либо команда c all**'**
**'**all может работать не корректно (временно)
Примеры: **!clear число** или **!clear all**

**!serverinfo** , **!si** — отображает краткую информацию о сервере

**!oldornot** — отображает точное время вашего вступления на сервер 
и приблизительное кол-во дней со дня входа (не считая часы и високосные года)
Если вы на сервере более 3 лет, то вы - OLD, иначе нет

**!headsortails** , **!hort** — включает игру "Орёл или Решка" (подбрасывает случайную монетку)

**!membercount** , **!mc** — отображает количество участников

**!calculator num1 operator num2** , **!calc num1 operator num2** — калькулятор
Пример: **!calc число + число**
**operator** может быть только: **+** , **-** , ***** , **/**

**!gender** — команда на любителя, работает рандомно (p.s. разраба попрошу палками не бить)

**p.s.** команд может быть больше одной на одну задачу (для краткости написания)
**p.p.s.** начало команды можно вводить CAPSом (Примеры: **!CLEAR all** , **!SI**)
`);
	});
});

client.on(`guildMemberAdd`, function (member) {
	let role = member.guild.roles.cache.find(role => role.name === `Жители олдынии`); 
  let embed = new Discord.MessageEmbed()
  embed.setTitle(`Добро пожаловать на сервер ${member.guild.name}!`)
    .setColor(`#ffffff`)
    .setDescription(`${member.user.tag} присоединился(ась) к серверу! \n\nВам автоматически присуждена роль ${role}`)
    .setThumbnail(member.user.avatarURL())
    .setFooter(`Всего пользователей: ${member.guild.memberCount}`);

  const channel = member.guild.channels.cache.find(channel => channel.name === `летопись`); 
  channel.send(`<@${member.user.id}>`, {embed});

	member.roles.add(role);
});

client.login(process.env.BOT_TOKEN); // token
