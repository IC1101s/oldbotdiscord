module.exports = {
	name: ['ytt', 'youtubetogether'],
	description: 'Cоздаёт ссылку на подключение к YouTube Together',
	async execute(message) {
		const fetch = require("node-fetch");
		const {channel} = message.member.voice;

	  if (!channel || channel.type !== "voice") return message.channel.send("❌ | Invalid channel specified!");

		fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
			method: "POST",
			body: JSON.stringify({
				max_age: 86400,
				max_uses: 0,
	      target_application_id: "755600276941176913", // youtubetogether_id
	      target_type: 2,
	      temporary: false,
	      validate: null
			}),
			headers: {
	      "Authorization": `Bot ${process.env.BOT_TOKEN}`,
	      "Content-Type": "application/json"
	    }
		}).then(res => res.json())
	    .then(invite => {
	      if (!invite.code) return message.reply("❌ | Не могу начать **YouTube Together**!");
	      message.channel.send(`✅ | Кликни по ссылке, чтобы начать **YouTube Together** в ${channel.name}: https://discord.com/invite/${invite.code}`);
	    })
	    .catch(e => {
	      message.channel.send("❌ | Не могу начать **YouTube Together**!");
	    })
	},
};