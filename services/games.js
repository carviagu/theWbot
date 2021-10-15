const Discord = require('discord.js');

const ping = function(msg) {
    const timeTaken = Date.now() - msg.createdTimestamp;
    msg.reply(`Pong! Este mensaje tuvo una latencia de ${timeTaken}ms.`);
}

const myavatar = function(msg) {
    msg.channel.send(msg.author.displayAvatarURL());
}

const execute = function(msg) {
    msg.channel.send("¡Así se hará mi lord!");
    msg.channel.send('https://tenor.com/view/star-wars-gif-18223629');
}

exports.ping = ping;
exports.myavatar = myavatar;
exports.execute = execute;