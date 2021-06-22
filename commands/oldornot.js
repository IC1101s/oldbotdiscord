module.exports = {
	name: 'oldornot',
	description: 'Отображает точное время вашего вступления на сервер и выводит OLD вы или нет',
	execute(message) {
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
	},
};