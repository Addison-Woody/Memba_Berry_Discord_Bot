const Discord = require('discord.js');
const client = new Discord.Client();

var reply_msg = {text: 'I <:Memba:612833883209334804>', attachement: undefined};
var img_dir = './media/images';
var audio_dir = './media/audio';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if (msg.author.bot) return;

    if(/.*(memba|member|remember).*/.test(msg.content.toLowerCase())) {

        // Construct reply & add attachement
        if(/(?=.*(boomy|balance|chicken|boomkin)(?=.*(dmg|damage|dps)))/.test(msg.content.toLowerCase())) {
            reply_msg.attachement = {files: [`${img_dir}/boomy_dps.PNG`]};

        }else if(/(?=.*fura)(?=.*14)/.test(msg.content.toLowerCase())) {
            reply_msg.attachement = {files: [`${img_dir}/fura14.png`]};
        }

        // Send message
        msg.channel.send(reply_msg.text, reply_msg.attachement)
            .catch(err => console.error('Error', err.message));

        // Only try to join the sender's voice channel if they are in one themselves
        if (msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.join()
                .catch(err => console.error(err.message));

            const dispatcher = connection.play(`${audio_dir}/i_memba.wav`);

            dispatcher.on('finish', () => {
                connection.disconnect();
            })
        }
    }
});

client.login(process.env.BOT_TOKEN)
    .then(() => console.log('Token accepted'))
    .catch(err => console.error(err.message));