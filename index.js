const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');
const prefix = '!'; 

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	if (typeof command.name === `string`) {
		command.name = [command.name];
	}

	command.name.forEach(name => {
		client.commands.set(name, command);
	});
}

client.once('ready', () => {
	console.log('Ready!');
	
	client.user.setPresence({
		activity: {
			name: `Введите ${prefix}help`,
		},
	});
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
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