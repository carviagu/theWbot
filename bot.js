// Run dotenv
require('dotenv').config();

// Prepare global variables and depencies 
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '.';
const newsChannel = 'anuncios';


// Bot message when it is initilized to console
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('.help', { type: 'PLAYING' });
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === newsChannel);
    if (!channel) return;
    channel.send(`Bienvenido a The W Server, ${member}.`);
    channel.send('https://tenor.com/view/the-office-dance-drinkingnsfw-gif-7490790');
});

// Bot actions depending on the given instruction
client.on('message', msg => {
    if (!msg.content.startsWith(prefix)) return;

    const commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const noticia = commandBody.slice(args[0].length + 1);
    const serverLog = client.channels.cache.find(ch => ch.name === 'server-bot-log');
    const anounces = client.channels.cache.find(ch => ch.name === '🔔anuncios');
    var Embed = new Discord.MessageEmbed();

    try {

        switch(args[0]) {
            case 'help':
                Embed = new Discord.MessageEmbed()
                .setTitle("Comandos para 4M-77")
                .setAuthor(client.user.username, client.user.avatarURL)
                .setColor('#FF0000')
                .setDescription('Aquí puedes ver todos los comandos que me puedes enviar')
                .setFooter('4M-77', client.user.avatarURL)
                .setTimestamp()
                .addField('.ping', 'Puedes jugar conmigo al ping-pong')
                .addField('.myavatar', 'Te puedo mostrar tu avatar en el chat')
                .addField('.poll', 'Realiza una encuesta de SI y NO')
                .addField('.study', 'Crea un temporizador para estudiar')
                //.addField('.execute', 'Si eres fan de Star Wars este es tu comando');
                msg.author.send(Embed);
                return;

            case 'info':
                Embed = new Discord.MessageEmbed()
                .setTitle("4M-77")
                .setColor('#FF0000')
                .setDescription('Hola, soy 4M-77 el asistente virtual de The W Server, descubre todos los comandos que puedo entender con .help .' + 
                ' En estos momentos estoy en periodo de pruebas por lo que es posible que no funcione al 100% de mi capacidad.')
                .setFooter('4M-77', client.user.avatarURL)
                .setTimestamp()
                msg.channel.send(Embed);
                return;

            // General commands
            
            case 'ping':
                const timeTaken = Date.now() - msg.createdTimestamp;
                msg.reply(`Pong! Este mensaje tuvo una latencia de ${timeTaken}ms.`);
                return;
    
            case 'myavatar': 
                msg.channel.send(msg.author.displayAvatarURL());
                return;
    
            case 'execute':
                msg.channel.send("¡Así se hará mi lord!");
                msg.channel.send('https://tenor.com/view/star-wars-gif-18223629');
                return;
    
            case 'poll':
                Embed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Iniciar una encuesta')
                .setDescription('Para inciar una encuesta escribe .poll <nombre de la encuesta>');
    
                if (!args[1]) {
                    msg.channel.send(Embed);
                    return;
                };
    
                let msgArgs = args.slice(1).join(" ");
    
                Embed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle(msgArgs)
                .setDescription('Si👍 o No👎');
    
                msg.channel.send(Embed).then(messageReaction => {
                    messageReaction.react("👍");
                    messageReaction.react("👎");
                    setTimeout(() => msg.delete(), 1000);
                });
                return;

            case 'study':
                if (!args[1]) {
                    Embed = new Discord.MessageEmbed()
                        .setTitle("Comando .study")
                        .setColor('#FF0000')
                        .setDescription('Para crear un temporizador escribe:: .timer <tiempo en minutos> y después confirma')
                        .setFooter('4M-77 *beta*', client.user.avatarURL)
                        .setTimestamp()
                        .addField('____','*Este comando está en fase de pruebas*')
                    msg.channel.send(Embed);
                    return;
                }

                Embed = new Discord.MessageEmbed()
                    .setTitle("CONFIRMACIÓN DE TIEMPO DE ESTUDIO")
                    .setColor('#FF0000')
                    .setDescription('Confimación de temporizador:')
                    .setFooter('4M-77 *beta*', client.user.avatarURL)
                    .setTimestamp()
                    .addField(`Tiempo:`, `*${args[1]} minutos*`)
                    .addField(`Confima dando al 👍`, "____________________")
                msg.channel.send(Embed).then(message => {
                    message.react("👍")
                    message.awaitReactions((reaction, user) => user.id == msg.author.id && reaction.emoji.name == '👍', {max: 1, maxEmojis: 2, time: 5000}).then(collected => {
                            message.delete();
                            console.log(collected);
                            if (collected.size < 1) {
                                msg.channel.send('Temporizador anulado 🛑');
                                return;
                            }
                            Embed = new Discord.MessageEmbed()
                                .setTitle("INICIADO TIEMPO DE ESTUDIO 📚⏳")
                                .setColor('#FF0000')
                                .setDescription('Se ha iniciado un temporizador de estudio')
                                .setFooter('4M-77 *beta*', client.user.avatarURL)
                                .setTimestamp()
                                .addField(`Tiempo:`, ` *${args[1]} minutos*`)
                                .addField(`Termina:`,` ${add_minutes(new Date() ,args[1])}`)
                                .addField('Puedes cancelar el temporizador dando a 🛑', "___________________________________")
                            msg.channel.send(Embed).then( m => {
                                m.react("🛑");
                                var t = setTimeout(() => { 
                                    m.delete();
                                    msg.channel.send(`Tiempo de estudio finalizado: ${args[1]} minutos 📚⌛`);
                                    return;
                                }, args[1]*60000);
                                m.awaitReactions((reaction) => reaction.emoji.name == '🛑', { max: 2 }).then( collected => {
                                    if (collected.size > 1) {
                                        clearTimeout(t);
                                        m.delete();
                                        msg.channel.send('Temporizador anulado 🛑');
                                        return;
                                    }
                                })
                            });
                    });    
                });
                return;
            
            case 'anounce':
                if (!args[1]) {
                    serverLog.send('**---EVENT INFO---**');
                    serverLog.send('Type: *FAILED INVOCATION*');
                    serverLog.send(`Time: *${Date.now()}*`);
                    serverLog.send('Info: *Command not well initialiced*');
                    serverLog.send('**---------------------**');
                    return;
                }

                Embed = new Discord.MessageEmbed()
                .setTitle("AVISO DE PARTIDA")
                .setDescription(noticia)
                .setColor('#FF0000')
                anounces.send('Aviso para @everyone');
                anounces.send(Embed).then(messageReaction => {
                    messageReaction.react("👍");
                });
                return;

            // Administrative features commands

            case 'change': 
                if (!args[1] || !args[3]) return;
                if (args[1] === '-a' ) {
                    client.user.setActivity(args[4], { type: args[2] });
                    return;
                }
                return;
            
            case 'shutdown':
                if (!args[1]) {
                    serverLog.send('**---EVENT INFO---**');
                    serverLog.send('Type: *SECURITY VIOLATION*');
                    serverLog.send(`Time: *${Date.now().toString()}*`);
                    serverLog.send('Info: *Unauthorized use of shutdown command without password*');
                    serverLog.send('**---------------------**');
                    return;
                }

                if (args[1] === '1234') {
                    serverLog.send('**---EVENT INFO---**');
                    serverLog.send('Type: SECURITY SHUTDOWN');
                    serverLog.send(`Time: *${Date.now().toString()}*`);
                    serverLog.send('**---------------------**').then( () => {
                        client.destroy() 
                    });
                }

                serverLog.send('**---EVENT INFO---**');
                serverLog.send('Type: *SECURITY VIOLATION*');
                serverLog.send(`Time: *${Date.now().toString()}*`);
                serverLog.send('Info: *Unauthorized use of shutdown command with password:* ' + args[1]);
                serverLog.send('**---------------------**');
                return;
    
            default: 
                Embed = new Discord.MessageEmbed()
                .setTitle("¡Ooops!")
                .setDescription("El comando solicitado no está disponible o no existe.")
                .setColor('#FF0000')
                .setFooter(client.user.username, client.user.avatarURL)
                msg.channel.send(Embed);
    
                serverLog.send('**---EVENT INFO---**');
                serverLog.send('Type: *RECOGNITION ERROR*');
                serverLog.send(`Time: *${Date.now().toString()}*`);
                serverLog.send('Info: ' + `*Command -${args[0]}- not recognized.*`);
                serverLog.send('**---------------------**');
                console.error(`Command -${args[0]}- not recognized.`);
        }

    } catch (error) {
        serverLog.send('**---EVENT INFO---**');
        serverLog.send('Type: *ERROR*');
        serverLog.send(`Time: *${Date.now().toString()}*`);
        serverLog.send('Info: *ERROR:: *' + error);
        serverLog.send('**---------------------**');
        console.error(`Command -${args[0]}- ERROR see LOG.`);
    }

});

// Bot login access
client.login(process.env.DISCORD_TOKEN);


// functions
var add_minutes =  function (dt, minutes) {
    return new Date(dt.getTime() + minutes*60000);
}