const Discord = require('discord.js')
const client = new Discord.Client()
const fetch = require('node-fetch')

var ApiKey = '461d1b8c3074b73f6e5255ad5b1a92d7326dc5596145c8d23728fef99d41f3db'
var clientKey = 'NTkxNDMyMjYyNDA3Njg0MDk3.XQws3Q.vYgX6W-sQH83vzeAi-N1m87cyVU'

const prefix = '.'

var welcomeChannelID = '<#485565633099071509>'
var botChannel = '482491530935009280'
var debug = false

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', async message => {

    if(message.channel.type === 'dm' && !message.author.bot){
        message.author.send(`This bot does not accept DM commands. Please use the <#${botChannel}> channel.`)
        return
    }

    if (!message.content.startsWith(prefix) || message.author.bot || message.channel.id != botChannel) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // console.log(command)

    if (command === 'iam') {
        iamCommand(message, args)
    }

    else if (command === 'setrole') {
        setRoleCommand(message, args)
    }

    else if (command === 'removerole') {
        removeRoleCommand(message, args)
    }

    else if (command === 'help') {
        helpCommand(message, args)
    }

    else if (command === 'goodbot') {
        message.channel.send('Thank you :)')
    }

    else if (command === 'badbot') {
        message.channel.send('Rude....')
    }

    else if (command === 'mother') {
        motherCommand(message, args)
    }

    else if (command === 'jed') {
        message.channel.send('Jedediah Jones, first of his name, breaker of worlds, defender of all the land, is the greatest person on this planet. You are privileged to stand in his presence.')
    }

    else if (command === 'turnsleft') {
        message.channel.send('https://www.twitch.tv/xsmurfyy')
        message.channel.send('Come watch me turn left on Twitch!')
    }

    else if (command === 'leanboey') {
        message.channel.send('LEFT....')
    }

    else if (command === 'avasti') {
        avastiCommand(message, args)
    }

    else if (command === 'tae'){
        message.channel.send('https://tenor.com/view/sad-walk-of-shame-shame-shameful-head-down-gif-5548725')
    }

    else {
        message.channel.send('Unknown command. Valid commands are \'.iam\' [Forum Username], \'.setRole\' [Role], \'.removeRole\' [Role]. Type \'.help [command]\' for more info on each command.')
    }


})

client.on('guildMemberAdd', member => {
    member.send(`
    (If you are here for a pug or pickup group, please disregard this DM. You will be dragged to the appropriate channel when you join the Evolved General voice channel.)

Hello and welcome to Evolved Gaming.

I am **Jedbot**, Evolved's Personal Assistant. I will be assisting you with setting up your roles on our Evolved Discord server. If you are not yet registered on our forums, please start there: <https://evolvedgaming.org/>. Once you're registered, please use the following info to continue:

In the <#${botChannel}>, use the following commands:

**Start here:**
**.iam** - The .iam command verifies your membership on the Evolved Forums. If verified, you will be granted the Member role and your Discord Name on the server will be updated to match your Forum username. 
If your Discord Name on the forums is not correct, you will receive an error message with instructions on how to update your Discord Name on the forums. 
Proper usage: .iam [Forum Username]
    
**Then, you can set your preferred game role by using this command:**
**.setRole** - The .setRole command grants you a role specifically correlating to a game (or Get-Together). Valid roles are \'ESO\', \'FFXIV\', \'WoW-A\', \'WoW-H\', \'Get-Together\' (Case Sensitive).
Proper usage: .setRole [Role Name]
    
**Additionally, if you want to remove a game from your list of roles:**
**.removeRole** - The .removeRole command removes you from a role specifically correlating to a game (or Get-Together). Same roles as above.
Proper usage: .removeRole [Role Name]

**Having troubles? Use the .help command:**
**.help** - Valid commands are \'.iam\', \'.setRole\', \'.removeRole\'. Type \'.help [command]\' for more info on each command. Make sure you\'re registered on our website at <https://evolvedgaming.org/>
    
If you need any additional help or assistance please contact any Officer or Above. Thanks and have a great day!`)
})


async function iamCommand(message, args) {

    var myHeaders = new fetch.Headers()

    myHeaders.append('Api-Key', ApiKey)

    var myInit = {
        headers: myHeaders
    }

    if (args === undefined || args.length == 0) {
        message.channel.send('Invalid format. Correct format is \'.iam [Forum Username]\'')
    }

    else if (args.length > 1) {
        message.channel.send('Invalid format. Correct format is \'.iam [Forum Username]\'')
    }


    else {
        var username = (args[0])

        var request = new fetch.Request(`https://community.evolvedgaming.org/users/${username}.json`, myInit)

        body = {}

        try {
            body = await fetch(request).then(response => response.json());
        }
        finally {
            if (body.errors === undefined) {

                var id = (body.user.id)

                request = new fetch.Request(`https://community.evolvedgaming.org/admin/users/${id}.json`, myInit)

                body = await fetch(request).then(response => response.json());


                if (body.approved === false || body.suspended === true) {
                    message.channel.send('Your account has not been approved yet, or is suspended. Please contact a leader for help.')
                }

                else if (body.approved === true && body.suspended === false) {
                    //console.log("I made it.")

                    var webDiscordUsername = body.user_fields[15]
                    var messageSenderUsername = message.author.tag

                    //does discord match forum?
                    if (webDiscordUsername != messageSenderUsername) {
                        message.channel.send(`Your Discord Name does not match the one you provided when signing up on the forums. Please click this link - <https://community.evolvedgaming.org/u/${body.username}/preferences/profile> - and update your Discord Name (needs to match the Discord Name in the bottom left of your Discord screen - Example Discord Name: Jed#6293) and click Save Changes. Once you have done so, use the \'.iam [FORUM NAME]\' again.`)
                    }
                    else {
                        //Update member roles
                        //console.log('Time to update member roles!')
                        const guildMember = message.member
                        let role = message.guild.roles.find(r => r.name === 'Member')
                        if (message.member.roles.find(r => r.name === 'Member')) {
                            message.channel.send('You already have the Member role. Are you trying to get a specific game role? Use `.setRole [Role Name]` to do this.')
                        }
                        else {
                            try {
                                await guildMember.addRole(role)
                                message.channel.send(`Welcome to Evolved! You\'ve been given the \'Member\' role and can now see all of the channels! Check the ${welcomeChannelID} channel for more info.`)

                                if (message.guild.members.get(client.user.id).hasPermission("CHANGE_NICKNAME")) {
                                    try {
                                        await message.member.setNickname(body.username)

                                    }
                                    catch (err) {
                                        if (body.username != message.member.nickname) {
                                            message.channel.send('I was unable to change your discord nickname on the server. Please change your nickname to match your forum username. Thank you!')
                                        } 
                                    }

                                }
                            }
                            catch (err) {
                                message.channel.send('Failed to set role. Please try again or contact an officer for help.')
                            }

                        }
                    }
                }
            }
            else {
                message.channel.send('An account for the supplied username was not found. Have you registered with our forums yet?')
            }
        }


    }
}

async function setRoleCommand(message, args) {

    //console.log("got here")
    if (args === undefined || args.length == 0) {
        message.channel.send('Invalid format. Correct format is \'.setRole [Role]\'. Valid roles are \'ESO\', \'FFXIV\', \'WoW-A\', \'WoW-H\', \'Get-Together\' (Case Sensitive).')
    }

    else if (args.length > 1) {
        message.channel.send('Invalid format. Correct format is \'.setRole [Role]\'. Valid roles are \'ESO\', \'FFXIV\', \'WoW-A\', \'WoW-H\', \'Get-Together\' (Case Sensitive).')
    }

    else {

        var roleName = (args[0])

        //CATA GO HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
        //append new roles by typing || roleName === 'WoW-C' inside the closing ')' (as an example) so the line would become if(roleName === 'ESO' || roleName === 'FFXIV' || roleName === 'WoW-A' || roleName === 'WoW-H' || roleName === 'WoW-C')
        if (roleName === 'ESO' || roleName === 'FFXIV' || roleName === 'WoW-A' || roleName === 'WoW-H' || roleName === 'Get-Together') {
            const guildMember = message.member
            let role = message.guild.roles.find(r => r.name === roleName)
            if (message.member.roles.find(r => r.name === roleName)) {
                message.channel.send('You already have this role.')
            }
            else {
                //console.log('didnt fail yet')
                try {
                    await guildMember.addRole(role)
                    message.channel.send(`Success! You have been granted the ${roleName} role. Check out the announcements tab in the ${roleName} discord section for more information, and (if this role is for a game) post in the ${roleName} chat channel for a guild invite. Don't forget to check the pins in each text channel.`)
                }
                catch (err) {
                    message.channel.send('Error: Failed to set role. Did you type it correctly? Valid roles are \'ESO\', \'FFXIV\', \'WoW-A\', \'WoW-H\', \'Get-Together\' (Case Sensitive).')
                }
            }
        }
        else {
            message.channel.send('Error: Failed to set role. Did you type it correctly? Valid roles are \'ESO\', \'FFXIV\', \'WoW-A\', \'WoW-H\', \'Get-Together\' (Case Sensitive).')
        }
    }
}

async function removeRoleCommand(message, args) {
    //console.log("got here")
    if (args === undefined || args.length == 0) {
        message.channel.send('Invalid format. Correct format is \'.removeRole [Role]\'. Valid roles are \'ESO\', \'FFXIV\', \'WoW-A\', \'WoW-H\', \'Get-Together\' (Case Sensitive).')
    }

    else if (args.length > 1) {
        message.channel.send('Invalid format. Correct format is \'.removeRole [Role]\'. Valid roles are \'ESO\', \'FFXIV\', \'WoW-A\', \'WoW-H\', \'Get-Together\' (Case Sensitive).')
    }
    else {

        var roleName = (args[0])

        //CATA GO HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
        //append new roles by typing || roleName === 'WoW-C' inside the closing ')' (as an example) so the line would become if(roleName === 'ESO' || roleName === 'FFXIV' || roleName === 'WoW-A' || roleName === 'WoW-H' || roleName === 'WoW-C')
        if (roleName === 'ESO' || roleName === 'FFXIV' || roleName === 'WoW-A' || roleName === 'WoW-H' || roleName === 'Get-Together') {
            const guildMember = message.member
            let role = message.guild.roles.find(r => r.name === roleName)
            if (message.member.roles.find(r => r.name === roleName)) {
                //console.log('didnt fail yet')
                try {
                    await guildMember.removeRole(role)
                    message.channel.send(`Success! You have been removed from the ${roleName} role.`)
                }
                catch (err) {
                    message.channel.send('Error: Failed to remove role. Did you type it correctly? Valid roles are \'ESO\', \'FFXIV\', \'WoW-A\', \'WoW-H\', \'Get-Together\' (Case Sensitive).')
                }

            }
            else {
                message.channel.send('You do not have this role.')
            }
        }
        else {
            message.channel.send('Error: Failed to remove role. Did you type it correctly? Valid roles are \'ESO\', \'FFXIV\', \'WoW-A\', \'WoW-H\', \'Get-Together\' (Case Sensitive).')
        }
    }
}

async function helpCommand(message, args) {

    //message.channel.send('Work in progress...')

    if (args === undefined || args.length == 0) {
        message.channel.send('Valid commands are \'.iam\' [Forum Username], \'.setRole\' [Role], \'.removeRole\' [Role]. Type \'.help [command]\' for more info on each command. Make sure you\'re registered on our website at <https://evolvedgaming.org/>')
    }

    else if (args[0] === '.iam' || args[0] === 'iam') {
        message.channel.send('The .iam command verifies your membership on the forums. If verified, you will be granted the Member role and your discord nickname on the server will be updated to match your forum username.')
        message.channel.send('Proper usage: `.iam [Forum Username]`')
    }

    else if (args[0] === '.setRole' || args[0] === 'setRole' || args[0] === '.setrole' || args[0] === 'setrole') {
        message.channel.send('The .setRole command grants you a role specifically correlating to a game. Valid roles are \'ESO\', \'FFXIV\', \'WoW-A\', \'WoW-H\', \'Get-Together\' (Case Sensitive).')
        message.channel.send('Proper usage: `.setRole [Role Name]`')
    }

    else if (args[0] === '.removeRole' || args[0] === 'removeRole' || args[0] === '.removerole' || args[0] === 'removerole') {
        message.channel.send('The .removeRole command removes you from a role specifically correlating to a game. Valid roles are \'ESO\', \'FFXIV\', \'WoW-A\', \'WoW-H\', \'Get-Together\' (Case Sensitive).')
        message.channel.send('Proper usage: `.removeRole [Role Name]`')
    }
    else { message.channel.send('Valid commands are \'.iam\' [Forum Username], \'.setRole\' [Role], \'.removeRole\' [Role]. Type \'.help [command]\' for more info on each command.') }

}

async function motherCommand(message, args) {
    var data = {}
    let mom = new Discord.RichEmbed(data)
    message.channel.send('Mom is always watching...', {
        files: [
            'https://cdn.discordapp.com/attachments/527617314321858596/591722355483607265/Isi_Death_Stare.jpg'
        ]
    })
}

async function avastiCommand(message, args) {
    var min = 1
    var max = 2
    var random = Math.floor(Math.random() * max) + min
    //console.log(random)
    if (random === 1) {
        message.channel.send('Haaaaiiiiii frands!')
    }
    else {
        message.channel.send('OHHH BOI')
    }
}

client.login(clientKey)
console.log('Logged in.')