import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { promisify } from 'util';

import glob from 'glob';
import client from './index.mjs';


const globPromise = promisify(glob);

export default async () => {
    try {

        console.log('Syncing commands...');
        
        const rest = new REST({ version: '9'}).setToken(client.token); 
        const commandJSON = []; 
        client.commands.forEach(async (interaction) => {
            commandJSON.push(interaction.command.toJSON());
        });
        
        console.log('[1] commands: ', commandJSON);
        await rest.put(Routes.applicationGuildCommands(client.user.id, '888254393554722847'), { body: commandJSON })
            .then(() => console.log('Successfully registered application commands.')).catch(e => console.log(e));
        

    } catch (e) {
        console.log('Failed to sync commands');
        console.log(e);
    }

};

