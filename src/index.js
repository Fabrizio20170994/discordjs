import {Client, Routes} from 'discord.js'
import {config} from 'dotenv'
import {REST} from '@discordjs/rest'
import axios from 'axios'

config()
const TOKEN = process.env.BOT_TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = process.env.GUILD_ID
const client = new Client({intents: ["Guilds", "GuildMessages"]})
const ENDPOINT = process.env.ENDPOINT

const rest = new REST({version: '10'}).setToken(TOKEN)

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        console.log("Hello")
        axios({
            method: 'get',
            url: ENDPOINT
          });
        interaction.reply({ content: "Starting Server, wait a few minutes before entering..."})
    }
})

async function main() {
    const commands = [{
        name: "start",
        description: "Starts the MC Server"
    }];


    try {
        console.log('Started refreshing application (/) commands.')
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        });
        client.login(TOKEN)
    } catch (err) {
        console.log(err)
    }
}

main();