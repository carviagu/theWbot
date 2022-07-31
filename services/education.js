const Discord = require('discord.js');
const Utils = require('./utilities');

const study = function(msg, args, client, serverLog) {
    if (msg.channel.name !==  '📓estudio') {
        msg.channel.send("El comando study solo funciona en el canal #📓estudio .")
        return;
    }

   if (!args[1]) {
       Embed = new Discord.MessageEmbed()
           .setTitle("Comando .study")
           .setColor('#FF0000')
           .setDescription('Para crear un temporizador escribe:: .study <tiempo en minutos> y después confirma')
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
                   msg.reply('Temporizador anulado 🛑');
                   return;
               }
               Embed = new Discord.MessageEmbed()
                   .setTitle("INICIADO TIEMPO DE ESTUDIO 📚⏳")
                   .setColor('#FF0000')
                   .setDescription('Se ha iniciado un temporizador de estudio')
                   .setFooter('4M-77 *beta*', client.user.avatarURL)
                   .setTimestamp()
                   .addField(`Tiempo:`, ` *${args[1]} minutos*`)
                   .addField(`Termina:`,` ${Utils.add_minutes(new Date() ,args[1])}`)
                   .addField('Puedes cancelar el temporizador dando a 🛑', "___________________________________");

                   serverLog.send('**---EVENT INFO---**');
                   serverLog.send('Type: *STUDY TIMER ON*');
                   serverLog.send(`Time: *${new Date()}*`);
                   serverLog.send(`Info: *Timer of ${args[1]} minutes initiated by ${msg.author.username}*`);
                   serverLog.send('**---------------------**');
               var deleted = false;
               msg.channel.send(Embed).then( m => {
                   m.react("🛑");
                   var t = setTimeout(() => { 
                       m.delete();
                       deleted = true;
                       msg.reply(`Tiempo de estudio finalizado: ${args[1]} minutos 📚⌛`);

                       serverLog.send('**---EVENT INFO---**');
                       serverLog.send('Type: *STUDY TIMER ENDED*');
                       serverLog.send(`Time: *${new Date()}*`);
                       serverLog.send(`Info: *Timer of ${args[1]} minutes ended*`);
                       serverLog.send('**---------------------**');

                       return;
                   }, args[1]*60000);
                   m.awaitReactions((reaction) => reaction.emoji.name == '🛑', { max: 2, maxEmojis: 2 }).then( collected => {
                       if (deleted === true) {return;}
                       if (collected.size > 0) {
                           clearTimeout(t);
                           m.delete();
                           msg.reply('Temporizador anulado 🛑');

                           serverLog.send('**---EVENT INFO---**');
                           serverLog.send('Type: *STUDY TIMER STOPPED*');
                           serverLog.send(`Time: *${new Date()}*`);
                           serverLog.send(`Info: *Timer of ${args[1]} minutes stopped by ...*`);
                           serverLog.send('**---------------------**');
                       }
                   })
               });
       });    
   });
}

exports.study = study