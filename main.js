// Run dotenv
require('dotenv').config();

// Prepare global variables and depencies 
const Discord = require('discord.js');
const Utils = require('./utilities.js');
const client = new Discord.Client();
const prefix = '.';
const newsChannel = 'anuncios';

// Import bot services
const Administration = require('./services/administration.js');
const Games = require('./services/games.js');
const General = require('./services/general.js');
const Moderation = require('./services/moderation.js');
const Education = require('./services/education.js');


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
            
            // GENERAL
            case 'help':
                General.help(msg);
                return;

            case 'info':
                General.info(msg);
                return;


            // GAMES
            case 'ping':
                Games.ping(msg);
                return;

            case 'myavatar':
                Games.myavatar(msg);
                return;
            
            case 'execute':
                Games.execute(msg);
                return;
            

            // MODERATION
            case 'poll':
                Moderation.poll(msg, args);
                return;
            
            case 'anounce':
                Moderation.anounces(anounces, noticia, serverLog);
                return;

        
            // EDUCATION
            case 'study':
                Education.study(msg, args, client, serverLog)
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
                serverLog.send(`Time: *${new Date()}*`);
                serverLog.send('Info: ' + `*Command -${args[0]}- not recognized.*`);
                serverLog.send('**---------------------**');
                console.error(`Command -${args[0]}- not recognized.`);
        }

    } catch (error) {
        serverLog.send('**---EVENT INFO---**');
        serverLog.send('Type: *ERROR*');
        serverLog.send(`Time: *${new Date()}*`);
        serverLog.send('Info: *ERROR:: *' + error);
        serverLog.send('**---------------------**');
        console.error(`Command -${args[0]}- ERROR see LOG.`);
    }

});


// Bot login access
client.login(process.env.TEST_TOKEN);