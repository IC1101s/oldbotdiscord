module.exports = {
	name: 'join',
	description: 'join',
	async execute(message) {
		if (message.member.voice.channel) {
			const connection = await message.member.voice.channel.join();
		}
	},
};