const Discord = require('discord.js');

const help = function(msg) {
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
}

const info = function(msg) {
    Embed = new Discord.MessageEmbed()
                .setTitle("4M-77")
                .setColor('#FF0000')
                .setDescription('Hola, soy 4M-77 el asistente virtual de The W Server, descubre todos los comandos que puedo entender con .help .' + 
                ' En estos momentos estoy en periodo de pruebas por lo que es posible que no funcione al 100% de mi capacidad.')
                .setFooter('4M-77', client.user.avatarURL)
                .setTimestamp()
                msg.channel.send(Embed);
}

exports.help = help;
exports.info = info;