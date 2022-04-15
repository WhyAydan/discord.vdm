import { SlashCommandBuilder, codeBlock } from '@discordjs/builders';
import { write, read, fetchAll, remove } from '../database/index.js';
import { inspect } from 'util';
import { settings } from '../settings.js';

export const name = 'eval';

export const command = new SlashCommandBuilder()
    .setName('eval').setDescription('Handle direct messages.')
    .addStringOption((option) =>  option.setName('code').setDescription('Custom code that needs to be executed'));

        
export default async (interaction, client) => {

    if (interaction.commandName !== 'eval') return;
    interaction.deferReply({ ephemeral: true });

    // Command options
    let code = interaction.options.getString('code');
    if (code == null) return await interaction.followUp({content: `Sorry **${interaction.user.username}**, but I couldn't find any options for this command.\n\nTry using the command like this \`/eval code\`` , ephemeral: true });


    if (code) {
        console.log(`${interaction.user.username} is trying to execute the following code:`);

        
        // Pulls owners from config
        const authors = settings.authors;
        if (!authors.includes(interaction.user.id)) return  interaction.reply({content: `Sorry **${interaction.user.username}**, but you aren't authorized to use this command.` , ephemeral: true });

        function clean(text) {
          if (typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)); else return text;
        }
        
        try { let evaluated = eval(code);

          if (typeof evaluated !== "string") evaluated = inspect(evaluated);
        
          interaction.followUp({ content: codeBlock('js', clean(evaluated)), ephemeral: true});

        } catch (err) {
          interaction.followUp({ content: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``, ephemeral: true , code: 'js'});
        
        }
        
    };
};
