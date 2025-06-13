require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const connectBot = require('./bots/connect');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.once('ready', () => {
  console.log('🤖 Bot de Discord listo');
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('!bots') || message.author.bot) return;

  const args = message.content.split(' ');
  const [command, code, region, action] = args;

  if (!code || !region || !action) {
    return message.reply('❌ Uso correcto: `!bots <código> <región> <acción>`');
  }

  message.reply(`⏳ Conectando bot a la party ${code} en ${region}, acción: ${action}`);

  try {
    await connectBot(code, region, action);
    message.reply('✅ Bot conectado y ejecutando acción');
  } catch (err) {
    console.error(err);
    message.reply('❌ Error al conectar bot');
  }
});

client.login(process.env.DISCORD_TOKEN);
