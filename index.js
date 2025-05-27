const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const PORT = process.env.PORT || 3000;

const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

let lastCommand = "";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on("ready", () => {
  console.log(`Bot online als ${client.user.tag}`);
});

client.on("messageCreate", (msg) => {
  if (msg.channel.id === CHANNEL_ID && msg.content.startsWith("!run ")) {
    lastCommand = msg.content.substring(5).trim();
    console.log("Neuer Befehl:", lastCommand);
  }
});

app.get("/last", (req, res) => {
  res.send(lastCommand);
});

app.listen(PORT, () => {
  console.log(`API läuft auf Port ${PORT}`);
});

client.login(TOKEN);
