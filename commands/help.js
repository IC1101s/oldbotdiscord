module.exports = {
	name: 'help',
	description: 'Выводит информацию о командах',
	execute(message) {
		message.channel.send(`
Все команды для использования:

**!help** — отображает меню помощи команд

**!youtubetogether** , **!ytt** — создаёт ссылку на подключение к YouTube Together
Просматривайте YouTube видео вместе с друзьями не выходя из Discord
(ранняя версия, в команде могут быть ошибки)

**!pokerhight** , **!poker** — создаёт ссылку на подключение к игре Poker Night
Играйте в Poker вместе с друзьями прямо в Discord
(ранняя версия, в команде могут быть ошибки)

**!clear count** — удаляет определённое кол-во сообщений
Команда работает не для всех ролей
Кол-во удаленных сообщений не больше 99 и не меньше 1 за раз
Давность удаленных сообщений не более 2-ух недель
Пример: **!clear число**

**!serverinfo** , **!si** — отображает краткую информацию о сервере

**!oldornot** — отображает точное время вашего вступления на сервер 
и приблизительное кол-во дней со дня входа (не считая часы и високосные года)
Если вы на сервере более 3 лет, то вы - OLD, иначе нет

**!headsortails** , **!hort** — включает игру "Орёл или Решка" (подбрасывает случайную монетку)

**!calculator num1 operator num2** , **!calc num1 operator num2** — калькулятор
Пример: **!calc число + число**
**operator** может быть только: **+** , **-** , ***** , **/**

**!gender** — команда работает рандомно (разраба попрошу палками не бить)

**p.s.** команду можно вводить в любом регистре (Примеры: **!Clear 5** , **!SI**)
**p.p.s.** ОБ ОШИБКАХ ПРОСЬБА СООБЩАТЬ РАЗРАБОТЧИКУ - @1C (IC 1101#7705)
`);
	},
};