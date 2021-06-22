module.exports = {
	name: [`calculator`, `calc`],
	description: 'Калькулятор (умножение, деление, сложение, вычитание)',
	execute(message, args) {
		const info = `Подробная информация о командах **!help**`;
		const error = 
`**Error!**
Введите по шаблону: **!calculator num1 operator num2** or **!calc num1 operator num2**
Примеры: **!calculator 2 + 2** или **!calc 2 * 2**
${info}`;

		const num1 = Number(args[0]);
		const num2 = Number(args[2]);
		const operator = args[1];

		let result = null;
		let operatorMessage = ``;
		let isErorr = false;

		if (!isNaN(num1) && !isNaN(num2) && args.length <= 3) {
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

				// setTimeout(() => {
				// 	error.delete();
				// }, 1000 * 3);

			} else {
				message.channel.send(`Результат ${operatorMessage} равен: **${result}**`);
			}	
		}	else {
			message.channel.send(error);
		}
	},
};