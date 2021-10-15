const Discord = require('discord.js');

const poll = function(msg, args) {
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
}

const anounce = function(anounces, noticia, serverLog) {
    if (!args[1]) {
        serverLog.send('**---EVENT INFO---**');
        serverLog.send('Type: *FAILED INVOCATION*');
        serverLog.send(`Time: *${new Date()}*`);
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
}

exports.poll = poll;
