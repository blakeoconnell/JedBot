const Discord = require('discord.js')
const client = new Discord.Client()
const fetch = require('node-fetch')

//api key for discourse
var ApiKey = '461d1b8c3074b73f6e5255ad5b1a92d7326dc5596145c8d23728fef99d41f3db'

//client key for discord
var clientKey = 'NTkxNDMyMjYyNDA3Njg0MDk3.XQws3Q.vYgX6W-sQH83vzeAi-N1m87cyVU'


//prefix for bot commands
const prefix = '.'

var debug = false

//discord welcome channel
var welcomeChannelID = '<#485565633099071509>'

//bot spam channel
var botChannel = '585994441957965824'

//CHANGEABLE VARIABLES

//roles array - add additional roles to this
var roles = ["Apex", "Destiny-2", "Division-2", "Diablo-3", "ESO", "FFXIV", "Get-Together", "Minecraft", "Overwatch", "WoW-A", "WoW-C", "WoW-H"]

//role announcement channel dict
var roleAnnouncementChannels = {
    'Destiny-2': '526564744430223360', 'Division-2': '526564744430223360', 'Diablo-3': '526564744430223360',
    'ESO': '512441526362701825', 'FFXIV': '554728750684831756', 'Minecraft': '526564744430223360',
    'WoW-A': '497199207937998850', 'WoW-C': '526564744430223360', 'WoW-H': '512248600663818240',
    'Apex': '526564744430223360', 'Overwatch': '526564744430223360'
};

//role chat channel dict
var roleChatChannels = {
    "Destiny-2": '485266848598982677', "Division-2": '485266848598982677', "Diablo-3": '485266848598982677', "ESO": '512441643731910656',
    FFXIV: '554729746240503820', "Get-Together": '585910866461982744', "Minecraft": '591832637275111445', "WoW-A": '483029202979782666',
    "WoW-C": '591981450992025603', "WoW-H": '512249205280997380', "Apex": "485266848598982677", "Overwatch": "485266848598982677"
};

//ERROR MESSAGES - Edit this as you like.

//On DM Message - Error. Bot doesn't do DM commands as of now.
var dmError = `This bot does not accept DM commands. Please use the <#${botChannel}> channel.`

//on iAm, if member already has Member role
var iAmAlreadySet = 'You already have the Member role. Are you trying to get a specific game role? Use .setRole [Role Name] to do this, view roles using .rolelist.'

//on iAm, if account is unapproved or suspended
var iAmUnapprovedError = 'Your account has not been approved yet, or is suspended. Please contact a leader for help.'

//iAm failed to set discord nickname
var iAmFailedToSetDiscord = 'I was unable to change your discord nickname on the server. Please change your nickname to match your forum username. Thank you!'

//on iAm, failed to set role for unknown reason
var iAmFailedToSetRole = 'Failed to set role to Member. Please contact a leader for assistance.'

//iAm no account found
var iAmNotFound = 'An account for the supplied username was not found. Have you registered with our forums yet?'

//set role error
var setRoleError = 'Error: Failed to set role. Did you type it correctly? See list of valid roles with \'.rolelist\'.'

//set role invalid format
var setRoleInvalidFormat = 'Invalid format. Correct format is \'.setRole [Role]\'. See list of valid roles with \'.rolelist\'.'

//set role already error
var setRoleAlreadyError = 'You already have this role.'

//remove role invalid format
var removeRoleInvalidFormat = 'Invalid format. Correct format is \'.removeRole [Role]\'. See list of valid roles with \'.rolelist\'.'

//remove role error
var removeRoleError = 'Error: Failed to remove role. Did you type it correctly? See list of valid roles with \'.rolelist\'.'

//remove roled but doesn't have role
var removeRoleAlreadyRemoved = 'You don\'t have this role.'

//Invalid Command
var invalidCommand = 'Unknown command. Valid commands are \'.iam [Forum Username]\', \'.setRole [Role]\', \'.removeRole [Role]\', \'.roleList\'. Type \'.help [command]\' for more info on each command.'


client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', async message => {

    if (message.channel.type === 'dm' && !message.author.bot) {
        message.author.send(dmError)
        return
    }

    if (!message.content.startsWith(prefix) || message.author.bot || message.channel.id != botChannel) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // console.log(command)

    if (command === 'iam') {
        iamCommand(message, args)
    }

    //Set Role Command
    else if (command === 'setrole') {
        setRoleCommand(message, args)
    }

    //Remove Role Command
    else if (command === 'removerole') {
        removeRoleCommand(message, args)
    }

    //Role List Command
    else if (command === 'rolelist') {
        roleListCommand(message, args)
    }

    //Help Command
    else if (command === 'help') {
        helpCommand(message, args)
    }

    //Easter Eggs
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

    else if (command === 'tae') {
        message.channel.send('https://tenor.com/view/sad-walk-of-shame-shame-shameful-head-down-gif-5548725')
    }

    else if (command === 'cata') {
        message.channel.send('https://tenor.com/view/angry-panda-mascot-mad-gif-3456638')
    }

    else if (command === 'welcome') {
        message.channel.send(`(If you are here for a pug or pickup group, please disregard this message. You will be dragged to the appropriate channel when you join the Evolved General voice channel.)

Hello and welcome to Evolved Gaming.
        
I am **Jedbot**, Evolved's Personal Assistant. I will be assisting you with setting up your roles on our Evolved Discord server. If you are not yet registered on our forums, please start there: <https://evolvedgaming.org/>. Once you're registered, please use the following info to continue:
        
In the <#${botChannel}>, use the following commands:
        
**Start here:**
**.iam** - The .iam command verifies your membership on the Evolved Forums. If verified, you will be granted the Member role and your Discord Name on the server will be updated to match your Forum username. 
If your Discord Name on the forums is not correct, you will receive an error message with instructions on how to update your Discord Name on the forums. 
Proper usage: .iam [Forum Username]
        
**Looking for roles so you can be @mentioned**
**.rolelist** - Brings up the list with our current roles. Please note: roles are **CASE SENSITIVE**.
            
**Then, you can set your preferred game role by using this command:**
**.setRole** - The .setRole command grants you a role specifically correlating to a game (or Get-Together). See list of valid roles with '.rolelist'.
Proper usage: .setRole [Role Name]
        
**Having trouble? Use the .help command:**
**.help** - Valid commands are '.iam', '.setRole', '.removeRole', '.rolelist'. Type '.help [command]' for more info on each command. Make sure you\'re registered on our website at <https://evolvedgaming.org/>
            
If you need any additional help or assistance please first **read the pins** and if still having trouble, contact any Officer or Above. Thanks and have a great day!`)
    }

    else {
        message.channel.send(invalidCommand)
    }


})

client.on('guildMemberAdd', member => {
    member.send(`(If you are here for a pug or pickup group, please disregard this DM. You will be dragged to the appropriate channel when you join the Evolved General voice channel.)

Hello and welcome to Evolved Gaming.

I am **Jedbot**, Evolved's Personal Assistant. I will be assisting you with setting up your roles on our Evolved Discord server. If you are not yet registered on our forums, please start there: <https://evolvedgaming.org/>. Once you're registered, please use the following info to continue:

In the <#${botChannel}>, use the following commands:

**Start here:**
**.iam** - The .iam command verifies your membership on the Evolved Forums. If verified, you will be granted the Member role and your Discord Name on the server will be updated to match your Forum username. 
If your Discord Name on the forums is not correct, you will receive an error message with instructions on how to update your Discord Name on the forums. 
Proper usage: .iam [Forum Username]

**Looking for roles so you can be @mentioned**
**.rolelist** - Brings up the list with our current roles. Please note: roles are **CASE SENSITIVE**.
    
**Then, you can set your preferred game role by using this command:**
**.setRole** - The .setRole command grants you a role specifically correlating to a game (or Get-Together). See list of valid roles with '.rolelist'.
Proper usage: .setRole [Role Name]

**Having trouble? Use the .help command:**
**.help** - Valid commands are '.iam', '.setRole', '.removeRole', '.rolelist'. Type '.help [command]' for more info on each command. Make sure you\'re registered on our website at <https://evolvedgaming.org/>
    
If you need any additional help or assistance please first **read the pins** and if still having trouble, contact any Officer or Above. Thanks and have a great day!`)
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
                    message.channel.send(iAmUnapprovedError)
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
                            message.channel.send(iAmAlreadySet)
                        }
                        else {
                            try {
                                await guildMember.addRole(role)

                                if (message.guild.members.get(client.user.id).hasPermission("CHANGE_NICKNAME")) {
                                    try {
                                        await message.member.setNickname(body.username)
                                        message.channel.send(`Welcome to Evolved, <@${message.author.id}>! You\'ve been given the \'Member\' role and can now see all of the channels! You can use the \'.setRole\' command to assign yourself roles pertaining to specific games. Check the ${welcomeChannelID} channel for more info.`)
                                    }
                                    catch (err) {
                                        if (body.username != message.member.nickname) {
                                            message.channel.send(`Welcome to Evolved, <@${message.author.id}>! You\'ve been given the \'Member\' role and can now see all of the channels! You can use the \'.setRole\' command to assign yourself roles pertaining to specific games. Check the ${welcomeChannelID} channel for more info.`)
                                            message.channel.send(iAmFailedToSetDiscord)
                                        }
                                    }

                                }
                            }
                            catch (err) {
                                message.channel.send(iAmFailedToSetRole)
                            }

                        }
                    }
                }
            }
            else {
                message.channel.send(iAmNotFound)
            }
        }


    }
}

async function setRoleCommand(message, args) {

    //console.log("got here")
    if (args === undefined || args.length == 0) {
        message.channel.send(setRoleInvalidFormat)
    }

    else if (args.length > 1) {
        message.channel.send(setRoleInvalidFormat)
    }

    else {

        var roleName = (args[0])

        if (roles.includes(roleName)) {
            const guildMember = message.member
            let role = message.guild.roles.find(r => r.name === roleName)
            if (message.member.roles.find(r => r.name === roleName)) {
                message.channel.send(setRoleAlreadyError)
            }
            else {
                // console.log('didnt fail yet')
                try {
                    await guildMember.addRole(role)
                    if (roleName in roleAnnouncementChannels) {
                        //console.log('i got here')
                        message.channel.send(`Success! You have been granted the ${roleName} role. Check out the <#${roleAnnouncementChannels[roleName]}> channel for more information, and post in the <#${roleChatChannels[roleName]}> channel for an in-game invite. Don't forget to check the pins in each text channel.`)
                    }
                    else if (!(roleName in roleAnnouncementChannels) && roleName in roleChatChannels) {
                        //console.log('im also here')
                        message.channel.send(`Success! You have been granted the ${roleName} role. Check out the <#${roleChatChannels[roleName]}> channel for more information.`)
                    }
                    else {
                        //console.log('am i here?')
                        message.channel.send(`Success! You have been granted the ${roleName} role. Check out the ${roleName} discord section for more information.`)
                    }
                }
                catch (err) {
                    message.channel.send(setRoleError)
                }
            }
        }
        else {
            message.channel.send(setRoleError)
        }
    }
}

async function removeRoleCommand(message, args) {
    //console.log("got here")
    if (args === undefined || args.length == 0) {
        message.channel.send(removeRoleInvalidFormat)
    }

    else if (args.length > 1) {
        message.channel.send(removeRoleInvalidFormat)
    }
    else {

        var roleName = (args[0])

        if (roles.includes(roleName)) {
            const guildMember = message.member
            let role = message.guild.roles.find(r => r.name === roleName)
            if (message.member.roles.find(r => r.name === roleName)) {
                //console.log('didnt fail yet')
                try {
                    await guildMember.removeRole(role)
                    message.channel.send(`Success! You have been removed from the ${roleName} role.`)
                }
                catch (err) {
                    message.channel.send(removeRoleError)
                }

            }
            else {
                message.channel.send(removeRoleAlreadyRemoved)
            }
        }
        else {
            message.channel.send(removeRoleError)
        }
    }
}

async function roleListCommand(message, args) {

    var responseString = '**Members may self-select from the following...\r\n'
    responseString += '```asciidoc\r\n'
    responseString += 'Valid Roles:\r\n'
    responseString += '===============\r\n'
    
    roles.forEach(role => {
        responseString += '- ' + role + '\r\n'
    });
    responseString += '```'
    responseString += 'Roles are Case Sensitive.**'

    message.channel.send(responseString)

}

async function helpCommand(message, args) {

    //message.channel.send('Work in progress...')

    if (args === undefined || args.length == 0) {
        message.channel.send('Valid commands are \'.iam [Forum Username]\', \'.setRole [Role]\', \'.removeRole [Role]\', \'.roleList\'. Type \'.help [command]\' for more info on each command. Make sure you\'re registered on our website at <https://evolvedgaming.org/>')
    }

    else if (args[0] === '.iam' || args[0] === 'iam') {
        message.channel.send('The .iam command verifies your membership on the forums. If verified, you will be granted the Member role and your discord nickname on the server will be updated to match your forum username.')
        message.channel.send('Proper usage: `.iam [Forum Username]`')
    }

    else if (args[0] === '.setRole' || args[0] === 'setRole' || args[0] === '.setrole' || args[0] === 'setrole') {
        message.channel.send('The .setRole command grants you a role specifically correlating to a game. See list of valid roles with \'.rolelist\'.')
        message.channel.send('Proper usage: `.setRole [Role Name]`')
    }

    else if (args[0] === '.removeRole' || args[0] === 'removeRole' || args[0] === '.removerole' || args[0] === 'removerole') {
        message.channel.send('The .removeRole command removes you from a role specifically correlating to a game. See list of valid roles with \'.rolelist\'.')
        message.channel.send('Proper usage: `.removeRole [Role Name]`')
    }

    else if (args[0] === '.roleList' || args[0] === '.rolelist' || args[0] === 'roleList' || args[0] === 'rolelist') {
        message.channel.send('The .rolelist command displays a list of roles you can assign to yourself.')
    }

    else { message.channel.send('Valid commands are \'.iam [Forum Username]\', \'.setRole [Role]\', \'.removeRole [Role]\', \'.roleList\'. Type \'.help [command]\' for more info on each command.') }

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