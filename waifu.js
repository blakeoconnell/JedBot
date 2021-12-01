const Discord = require('discord.js')
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const MessageEmbed = require('discord.js')
const fetch = require('node-fetch')
const auth = require('./config/auth.json')

//prefix for bot commands
const prefix = '.'

var debug = false

//discord welcome channel
var welcomeChannelID = '<#485565633099071509>'

//bot spam channel
var botChannel = '482491530935009280'

//roles channel
var rolesChannel = '815068643930538004'

//set channels for debug
if (debug) {
    botChannel = '585994441957965824' //test server 
    rolesChannel = '592417117132029965' //test server
    console.log("Debugging: ON")
}

//CHANGEABLE VARIABLES

//roles array - add additional roles to this
var roles = ["Among-Us", "Book-Club", "Classic-A", "COD", "Diablo-3", "FFXIV", "Get-Together", "Motivation", "New World", "Overwatch", "Phasmophobia", "Spoilers", "WoW-A", "WoW-H"]

let charteredGameRoles = ["Classic-A", "WoW-A", "WoW-H"]

let chapterGameRoles = ["FFXIV", "New World"]

let sideGameRoles = ["Among-Us", "COD", "Diablo-3", "Overwatch", "Phasmophobia"]

let communityRoles = ["Book-Club", "Get-Together", "Motivation", "Spoilers"]

//role announcement channel dict
var roleAnnouncementChannels = {
    'Diablo-3': '526564744430223360', 'WoW-A': '497199207937998850', 'WoW-H': '512248600663818240', 'Overwatch': '526564744430223360', 'Phasmophobia': '526564744430223360', 'Among-Us': '526564744430223360', 'COD': '526564744430223360', 'Classic-A': '814306648218271775', 'FFXIV': '814307065798590474', 'New World': '868960555476586516'
};

//role chat channel dict
var roleChatChannels = {
    "Among-Us": '485266848598982677', "Diablo-3": '485266848598982677', "FFXIV": '554729746240503820', "Get-Together": '754450241033601036', "Motivation": '600288881904058407',
    "Spoilers": '601070038761340967', "WoW-A": '483029202979782666', "Classic-A": '814300119914643477', "WoW-H": '512249205280997380', "COD": "485266848598982677", "Overwatch": "485266848598982677", "Phasmophobia": "485266848598982677", "New World": "868961932235915294"
};

//ERROR MESSAGES - Edit this as you like.

//On DM Message - Error. Bot doesn't do DM commands as of now.
var dmError = `This bot does not accept DM commands. Please use the <#${botChannel}> channel.`

//on iAm, if member already has Member role
var iAmAlreadySet = `You already have the Member Role. Are you trying to get a specific game role? Please go to the following channel to select roles: <#${rolesChannel}>.`

//on iAm, if account is unapproved or suspended
var iAmUnapprovedError = 'Your account has not been approved yet, or is suspended. Please contact a leader for help.'

//iAm failed to set discord nickname
var iAmFailedToSetDiscord = 'I was unable to change your discord nickname on the server. Please change your nickname to match your forum username. Thank you!'

//on iAm, failed to set role for unknown reason
var iAmFailedToSetRole = 'Failed to set role to Member. Please contact a leader for assistance.'

//iAm no account found
var iAmNotFound = 'An account for the supplied username was not found. Have you checked for your activation email? It might be in your Trash or Spam folder.\n\nIf no, please find and activate your account so an admin can approve it via forums. \n\nIf yes, please be patient. It might not have been approved by an admin on our forums yet. Please try again later. \n\nHave you registered with our website yet? Registering with the website grants access to forums and full access to our Discord server. <https://evolvedgaming.org/>'

//set role error
var setRoleError = 'Error: Failed to set role. Did you type it correctly? See list of valid roles with \'.rolelist\'.'

//set role invalid format
var setRoleInvalidFormat = 'Invalid format. Correct format is \'.setRole Role\'. See list of valid roles with \'.rolelist\'.'

//set role already error
var setRoleAlreadyError = 'You already have this role.'

//remove role invalid format
var removeRoleInvalidFormat = 'Invalid format. Correct format is \'.removeRole Role\'. See list of valid roles with \'.rolelist\'.'

//remove role error
var removeRoleError = 'Error: Failed to remove role. Did you type it correctly? See list of valid roles with \'.rolelist\'.'

//remove roled but doesn't have role
var removeRoleAlreadyRemoved = 'You don\'t have this role.'

//Invalid Command
var invalidCommand = 'Unknown command. Valid command is \'.iam Forum Username\'. Type \'.help\' for assistance.'


client.once('ready', () => {
    console.log('Ready!');
    client.channels.cache.get(rolesChannel)
        .send(".reactionrole")
});

client.on('message', async message => {

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (message.channel.type === 'dm' && !message.author.bot) {
        message.author.send(dmError)
        return
    }

    //Reaction roles
    if (command === 'reactionrole' && message.channel.id === rolesChannel) {
        reactionRoleCommand(message, args, Discord, client)
        return;
    }

    if (!message.content.startsWith(prefix) || message.author.bot || message.channel.id != botChannel) return;

    // console.log(command)

    if (command === 'iam') {
        iamCommand(message, args)
    }

    //Set Role Command
    // else if (command === 'setrole') {
    //     setRoleCommand(message, args)
    // }

    // //Remove Role Command
    // else if (command === 'removerole') {
    //     removeRoleCommand(message, args)
    // }

    // //Role List Command
    // else if (command === 'rolelist') {
    //     roleListCommand(message, args)
    // }

     //Name Help Command
     else if (command === 'namehelp') {
        nameHelpCommand(message, args)
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
        jedCommand(message, args)
    }

    else if (command === 'turnsleft') {
        message.channel.send('https://www.twitch.tv/jed_live')
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
        cataCommand(message, args)
    }

    else if (command === 'cataclysm') {
        cataclysmCommand(message, args)
    }

    else if (command === 'isilaura') {
        isilauraCommand(message, args)
    }

    else if (command === 'star') {
        starCommand(message, args)
    }

    else if (command === 'grimmie') {
        grimmieCommand(message, args)
    }

    else if (command === 'taevarth') {
        taevarthCommand(message, args)
    }

    else if (command === 'board') {
        boardCommand(message, args)
    }

    else if (command === 'nefarious'){
        message.channel.send('That dude is a pretty good guitar player.')
    }

    else if (command === 'hiddencommands'){
        message.channel.send('https://tenor.com/view/magic-word-jurassic-park-gif-11397484')
    }

    else if (command === 'welcome') {
        message.channel.send(`(If you are here for a pug or pickup group, please disregard this message. You will be dragged to the appropriate channel when you join the Evolved General voice channel.)

Hello and welcome to Evolved Gaming.
        
I am **Jedbot**, Evolved's Personal Assistant. I will be assisting you with setting up your roles on our Evolved Discord server. If you are not yet registered on our forums, please start there: <https://evolvedgaming.org/>. Once you're registered, please use the following info to continue:
        
In the <#${botChannel}>, use the following commands:
        
**Start here:**
**.iam** - The .iam command verifies your membership on the Evolved Forums. If verified, you will be granted the Member role and your Discord Name on the server will be updated to match your Forum username. 
If your Discord Name on the forums is not correct, you will receive an error message with instructions on how to update your Discord Name on the forums. 
Proper usage: .iam <Forum Username>
        
**Looking for roles so you can be @mentioned**            
You can set your preferred game role by going to this channel: <#${rolesChannel}>
        
**Having trouble? Use the .help command.**
            
If you need any additional help or assistance please first **read the pins** and if still having trouble, contact any Officer or Above. Thanks and have a great day!`)
    }

    else {
        message.channel.send(invalidCommand)
    }


})

client.on('guildMemberAdd', member => {
    member.send(`(If you are here for a pug or pickup group, please disregard this message. You will be dragged to the appropriate channel when you join the Evolved General voice channel.)

    Hello and welcome to Evolved Gaming.
            
    I am **Jedbot**, Evolved's Personal Assistant. I will be assisting you with setting up your roles on our Evolved Discord server. If you are not yet registered on our forums, please start there: <https://evolvedgaming.org/>. Once you're registered, please use the following info to continue:
            
    In the <#${botChannel}> channel, use the following commands:
            
    **Start here:**
    **.iam** - The .iam command verifies your membership on the Evolved Forums. If verified, you will be granted the Member role and your Discord Name on the server will be updated to match your Forum username. 
    If your Discord Name on the forums is not correct, you will receive an error message with instructions on how to update your Discord Name on the forums. 
    Proper usage: .iam <Forum Username>
            
    **Looking for roles so you can be @mentioned**            
    You can set your preferred game role by going to this channel: <#${rolesChannel}>
            
    **Having trouble? Use the .help command.**
                
    If you need any additional help or assistance please first **read the pins** and if still having trouble, contact any Officer or Above. Thanks and have a great day!`)
})


async function iamCommand(message, args) {

    var myHeaders = new fetch.Headers()

    myHeaders.append('Api-Key', auth.ApiKey)
    myHeaders.append('Api-Username', auth.ApiUsername)

    var myInit = {
        headers: myHeaders
    }

    if (args === undefined || args.length == 0) {
        message.channel.send('Invalid format. Correct format is \'.iam <Forum Username>\'')
    }

    else if (args.length > 1) {
        message.channel.send('Invalid format. Correct format is \'.iam <Forum Username>\'')
    }

    else if (args[0].includes('#')) {
        message.channel.send('It looks like you might be inputting your discord username. Please use your **forum username** instead.')
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

                //console.log('got here')
                request = new fetch.Request(`https://community.evolvedgaming.org/admin/users/${id}.json`, myInit)

                body = await fetch(request).then(response => response.json());

                // console.log('still here')
                // console.log(body.approved)
                // console.log(body.full_suspend_reason !== null)
                if (body.approved === false || body.full_suspend_reason !== null) {
                    message.channel.send(iAmUnapprovedError)
                }

                
                else if (body.approved === true && body.full_suspend_reason === null) {
                    //console.log("I made it.")

                    var webDiscordUsername = body.user_fields[15]
                    var messageSenderUsername = message.author.tag

                    //does discord match forum?
                    if (webDiscordUsername != messageSenderUsername) {
                        //message.channel.send(`Your Discord Name does not match the one you provided when signing up on the forums. Please click this link - <https://community.evolvedgaming.org/u/${body.username}/preferences/profile> - and update your Discord Name (needs to match the Discord Name in the bottom left of your Discord screen - Example Discord Name: Jed#6293) and click Save Changes. Once you have done so, use the \'.iam FORUM NAME\' again.`)
                        message.channel.send(`Your Discord Account Name does not match the Discord Name you provided when signing up on the website. Please do the following.\n- Click this link to bring you to your profile page.  <https://community.evolvedgaming.org/u/${body.username}/preferences/profile>\n- Find where it says Discord Name\n- Change to match your Discord Account Name\n-- Your account name is located in lower left hand side of Discord\n-- Example Discord Name: Jed#6293\n- Save Changes\n\nCome back to Discord and type: .iam ${body.username}\nExample: .iam Jedbot\n\nStill having problems? Type .namehelp`)
                    }
                    else {
                        //Update member roles
                        //console.log('Time to update member roles!')
                        const guildMember = message.member
                        let role = message.guild.roles.cache.find(r => r.name === 'Member')
                        if (message.member.roles.cache.find(r => r.name === 'Member')) {
                            //console.log('help')
                            message.channel.send(iAmAlreadySet)
                        }
                        else {
                            try {
                                await guildMember.roles.add(role)

                                if (message.guild.members.cache.get(client.user.id).hasPermission("CHANGE_NICKNAME")) {
                                    try {
                                        await message.member.setNickname(body.username)
                                        message.channel.send(`Welcome to Evolved, <@${message.author.id}>! You've been given the 'Member' role and can now see all of the channels! You can now assign yourself roles pertaining to specific games within our community.\n\nPlease go to the following channel to select roles: <#${rolesChannel}>.`)
                                        //roleListCommand(message, args)
                                        //reactionRoleCommand(message, args, Discord, client)
                                    }
                                    catch (err) {
                                            message.channel.send(`Welcome to Evolved, <@${message.author.id}>! You\'ve been given the \'Member\' role and can now see all of the channels! You can now assign yourself roles pertaining to specific games within our community.\n\nPlease go to the following channel to select roles: <#${rolesChannel}>.`)
                                            if (body.username != message.member.nickname) {
                                            message.channel.send(iAmFailedToSetDiscord)
                                        }
                                    }

                                }
                            }
                            catch (err) {
                                message.channel.send(iAmFailedToSetRole)
                                console.log(err)
                            }

                        }
                    }
                }

                else {
                    message.channel.send('An unexpected error occurred. Please contact leadership for assistance.')
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

    else if (!message.member.roles.cache.find(r => r.name === "Member")){
        message.channel.send("Error. You do not have the 'Member' role yet. You need to do '.iam <Forum Username>' before setting any additional roles.")
    }

    else {

        var roleName = (args[0])
        var properRole = ""

        roles.forEach(function (role, index) {
            if (role.toLowerCase() === roleName.toLowerCase()){
                properRole = role;
            }
        });

        roleName = properRole

        if (roles.includes(roleName)) {
            const guildMember = message.member
            let role = message.guild.roles.cache.find(r => r.name === roleName)
            //console.log(role)
            if (message.member.roles.cache.find(r => r.name === roleName)) {
                message.channel.send(setRoleAlreadyError)
            }
            else {
                // console.log('didnt fail yet')
                try {
                    await guildMember.roles.add(role)
                    //console.log('i added it')
                    //console.log(roleName)
                    //console.log(roleAnnouncementChannels)
                    if (roleName.toLowerCase() === 'Book-Club'.toLowerCase()){
                        message.channel.send(`Success! You have been granted the Book-Club role. Get in contact with Star by @ mentioning her for more information.`)
                    }
                    else if (roleName in roleAnnouncementChannels) {
                        //console.log('i got here')
                        message.channel.send(`Success! You have been granted the ${roleName} role. Check out the <#${roleAnnouncementChannels[roleName]}> channel for more information, and post in the <#${roleChatChannels[roleName]}> channel for an in-game invite. **Don't forget to check the pins in each text channel.**`)
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

//outdated with reaction role implementation
// async function removeRoleCommand(message, args) {
//     //console.log("got here")
//     if (args === undefined || args.length == 0) {
//         message.channel.send(removeRoleInvalidFormat)
//     }

//     else if (args.length > 1) {
//         message.channel.send(removeRoleInvalidFormat)
//     }
//     else {

//         var roleName = (args[0])

//         var properRole = ""

//         roles.forEach(function (role, index) {
//             if (role.toLowerCase() === roleName.toLowerCase()){
//                 properRole = role;
//             }
//         });

//         roleName = properRole

//         if (roles.includes(roleName)) {
//             const guildMember = message.member
//             let role = message.guild.roles.cache.find(r => r.name === roleName)
//             if (message.member.roles.cache.find(r => r.name === roleName)) {
//                 //console.log('didnt fail yet')
//                 try {
//                     await guildMember.roles.remove(role)
//                     message.channel.send(`Success! You have been removed from the ${roleName} role.`)
//                 }
//                 catch (err) {
//                     message.channel.send(removeRoleError)
//                 }

//             }
//             else {
//                 message.channel.send(removeRoleAlreadyRemoved)
//             }
//         }
//         else {
//             message.channel.send(removeRoleError)
//         }
//     }
// }

//outdated as of reactionrole implementation
// async function roleListCommand(message, args) {

//     var responseString = '**Members may self-select from the following...\r\n'
//     responseString += '```asciidoc\r\n'
//     responseString += 'Chartered Game Roles:\r\n'
//     responseString += '===============\r\n'
    
//     charteredGameRoles.forEach(role => {
//         roleObj = message.guild.roles.cache.find(r => r.name === role)
//         responseString += '- ' + roleObj.name + '\r\n'
//     });

//     responseString += '\nChapter Game Roles:\r\n'
//     responseString += '===============\r\n'
    
//     chapterGameRoles.forEach(role => {
//         roleObj = message.guild.roles.cache.find(r => r.name === role)
//         responseString += '- ' + roleObj.name + '\r\n'
//     });

//     responseString += '\nSide Game Roles:\r\n'
//     responseString += '===============\r\n'
    
//     sideGameRoles.forEach(role => {
//         roleObj = message.guild.roles.cache.find(r => r.name === role)
//         responseString += '- ' + roleObj.name + '\r\n'
//     });

//     responseString += '\nCommunity Roles:\r\n'
//     responseString += '===============\r\n'
    
//     communityRoles.forEach(role => {
//         roleObj = message.guild.roles.cache.find(r => r.name === role)
//         responseString += '- ' + roleObj.name + '\r\n'
//     });

//     responseString += '```'
//     responseString +='Type .setRole RoleName to select a role. Type .removeRole RoleName to remove a role.'
//     responseString += '**'

//     message.channel.send(responseString)

// }

async function helpCommand(message, args) {

        message.channel.send(`Hello there, I see you are requesting some assistance. Jedbot hopes it can help you by giving a list of bot commands for what you are looking for. Any questions you might have feel free to ask. Make sure you're registered on our website at <https://evolvedgaming.org>

**.iam** - The .iam command verifies your membership on the Evolved Forums. If verified, you will be granted the Member role and your Discord Name on the server will be updated to match your Forum username. 
        
**.namehelp** - Just cant get the .iam to work? Check out this command to further assist you with making sure your discord name field in the forums is correct.

**.hiddencommands** - All the various hidden commands that you don't know about.

Looking for a specific game role? Once you're authenticated in this channel, you'll have access to <#${rolesChannel}> where you can react to the message to receive a role.
        
Still need help? or have questions? Please contact specific Leadership or Officers by @ mentioning them. See the Member list on the right side of Discord.`)


}

async function nameHelpCommand(message, args) {

    message.channel.send(`I see you are having problems with your Discord Name field on forums. Let's take a look. Here is an in depth guide for Jedbot to better understand what might be going on.
<https://community.evolvedgaming.org/t/jedbot-feedback-and-suggestions-welcome/2522>
    
But maybe it's one of the following options.
    
- Jed
-- Missing # and numbers
    
- Jed 6293
-- This is missing the # between name and numbers
   
- Jed # 6293
-- Has spacing between name and # or the # and numbers.
   
- Jed#6239
-- The numbers are incorrect/transposed.
    
- Jde#6293
-- Misspelled their name.
    
- jed#6293
-- Capitalization is incorrect.
    
Still having problems? Contact an Officer or Above, Check member list on Discord and DM or @mention them in channel. (Right Click Name and select Mention)`)
}

async function reactionRoleCommand(message, args, Discord, client) {

    //channel set by debug at top
    const channel = rolesChannel
    const wowARole = message.guild.roles.cache.find(role => role.name === "WoW-A")
    const wowHRole = message.guild.roles.cache.find(role => role.name === "WoW-H")
    const classicARole = message.guild.roles.cache.find(role => role.name === "Classic-A")
    const ffxivRole = message.guild.roles.cache.find(role => role.name === "FFXIV")
    const amongUsRole = message.guild.roles.cache.find(role => role.name === "Among-Us")
    const codRole = message.guild.roles.cache.find(role => role.name === "COD")
    const diablo3Role = message.guild.roles.cache.find(role => role.name === "Diablo-3")
    const newWorldRole = message.guild.roles.cache.find(role => role.name === "New World")
    const overwatchRole = message.guild.roles.cache.find(role => role.name === "Overwatch")
    const phasmophobiaRole = message.guild.roles.cache.find(role => role.name === "Phasmophobia")
    const bookClubRole = message.guild.roles.cache.find(role => role.name === "Book-Club")
    const getTogetherRole = message.guild.roles.cache.find(role => role.name === "Get-Together")
    const motivationRole = message.guild.roles.cache.find(role => role.name === "Motivation")
    const spoilersRole = message.guild.roles.cache.find(role => role.name === "Spoilers")

    //live server emojis
    var wowAEmoji = '547304559408578560'
    var wowHEmoji = '815080538766704690'
    var classicAEmoji = '815239205231263764'
    var ffxivEmoji = '815194148776181790'
    var amongUsEmoji = '815070050171748372'
    var codEmoji = '815196211921289266'
    var diablo3Emoji = '815083296496680970'
    var newWorldEmoji = '868959699083616348'
    var overwatchEmoji = '815081632955367444'
    var phasmophobiaEmoji = '👻'
    var bookClubEmoji = '📚'
    var getTogetherEmoji = '🤝'
    var motivationEmoji = '815085552990552074'
    var spoilersEmoji = '⚠️'

    //test server emojis
    if (debug) {
        wowAEmoji = '815295205166678077'
        wowHEmoji = '815294583239344188'
        classicAEmoji = '815294472467906600'
        ffxivEmoji = '815294522279198760'
        amongUsEmoji = '815038214607601675'
        codEmoji = '815294843509145611'
        diablo3Emoji = '815294536728444968'
        newWorldEmoji = '868959253141028964'
        overwatchEmoji = '815294505115975721'
        phasmophobiaEmoji = '👻'
        bookClubEmoji = '📚'
        getTogetherEmoji = '🤝'
        motivationEmoji = '815294631134756912'
        spoilersEmoji = '⚠️'        
    }

    if (args.length > 0){
    let embed = new Discord.MessageEmbed()
        .setColor('#06f0ed')
        .setTitle('Welcome to Evolved! Let\'s get you some roles.')
        .setDescription('Clicking on an emoji will give you that role. Clicking again will remove you from the role. Role announcement and chat channel links are provided. Check announcement sections for relevant information, and hop into the chat channel to discuss your role or ask for in-game invite (when applicable).\r\n\n'
            + `Chartered Game Roles:\r\n`
            + `===============\r\n`
            + `<:ClassicA:${classicAEmoji}> - Classic-A | <#${roleAnnouncementChannels["Classic-A"]}> | <#${roleChatChannels["Classic-A"]}> \r\n`
            + `<:WoWA:${wowAEmoji}> - WoW-A | <#${roleAnnouncementChannels["WoW-A"]}> | <#${roleChatChannels["WoW-A"]}> \r\n`
            + `<:WoWH:${wowHEmoji}> - WoW-H | <#${roleAnnouncementChannels["WoW-H"]}> | <#${roleChatChannels["WoW-H"]}> \r\n\n`
            + `Chapter Game Roles:\r\n`
            + `===============\r\n`
            + `<:FFXIV:${ffxivEmoji}> - FFXIV | <#${roleAnnouncementChannels["FFXIV"]}> | <#${roleChatChannels["FFXIV"]}> \r\n`
            + `<:NewWorld:${newWorldEmoji}> - New World | <#${roleAnnouncementChannels["New World"]}> | <#${roleChatChannels["New World"]}> \r\n\n`
            + `Side Game Roles:<#${roleAnnouncementChannels["Among-Us"]}> | <#${roleChatChannels["Among-Us"]}>\r\n`
            + `===============\r\n`
            + `<:AmongUs:${amongUsEmoji}> - Among-Us\r\n`
            + `<:COD:${codEmoji}> - COD\r\n`
            + `<:Diablo:${diablo3Emoji}> - Diablo-3\r\n`
            + `<:Overwatch:${overwatchEmoji}> - Overwatch\r\n`
            + `${phasmophobiaEmoji} - Phasmophobia\r\n\n`
            + `Community Roles:\r\n`
            + `===============\r\n`
            + `${bookClubEmoji} - Book-Club | <#784138656457687101>\r\n`
            + `${getTogetherEmoji} - Get-Together | <#${roleChatChannels["Get-Together"]}> \r\n`
            + `<:Motivation:${motivationEmoji}> - Motivation | <#${roleChatChannels["Motivation"]}> \r\n`
            + `${spoilersEmoji} - Spoilers | <#${roleChatChannels["Spoilers"]}> \r\n`)

    let messageEmbed = await message.channel.send(embed)
    messageEmbed.react (classicAEmoji)
    messageEmbed.react (wowAEmoji)
    messageEmbed.react (wowHEmoji)
    messageEmbed.react (ffxivEmoji)
    messageEmbed.react (amongUsEmoji)
    messageEmbed.react (codEmoji)
    messageEmbed.react (diablo3Emoji)
    messageEmbed.react (newWorldEmoji)
    messageEmbed.react (overwatchEmoji)
    messageEmbed.react (phasmophobiaEmoji)
    messageEmbed.react (bookClubEmoji)
    messageEmbed.react (getTogetherEmoji)
    messageEmbed.react (motivationEmoji)
    messageEmbed.react (spoilersEmoji)

    }
    else {
        message.reply('Bot Initializing...')
  .then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(console.error);
    }

    message.delete();

    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.id === wowAEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(wowARole);
            }
            if (reaction.emoji.id === wowHEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(wowHRole);
            }
            if (reaction.emoji.id === classicAEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(classicARole);
            }
            if (reaction.emoji.id === ffxivEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(ffxivRole);
            }
            if (reaction.emoji.id === amongUsEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(amongUsRole);
            }
            if (reaction.emoji.id === codEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(codRole);
            }
            if (reaction.emoji.id === diablo3Emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(diablo3Role);
            }
            if (reaction.emoji.id === newWorldEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(newWorldRole);
            }
            if (reaction.emoji.id === overwatchEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(overwatchRole);
            }
            if (reaction.emoji.name === phasmophobiaEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(phasmophobiaRole);
            }
            if (reaction.emoji.name === bookClubEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(bookClubRole);
            }
            if (reaction.emoji.name === getTogetherEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(getTogetherRole);
            }
            if (reaction.emoji.id === motivationEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(motivationRole);
            }
            if (reaction.emoji.name === spoilersEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(spoilersRole);
            }
        } else {
            return;
        }
    })

    client.on('messageReactionRemove', async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.id === wowAEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(wowARole);
            }
            if (reaction.emoji.id === wowHEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(wowHRole);
            }
            if (reaction.emoji.id === classicAEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(classicARole);
            }
            if (reaction.emoji.id === ffxivEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(ffxivRole);
            }
            if (reaction.emoji.id === amongUsEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(amongUsRole);
            }
            if (reaction.emoji.id === codEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(codRole);
            }
            if (reaction.emoji.id === diablo3Emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(diablo3Role);
            }
            if (reaction.emoji.id === newWorldEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(newWorldRole);
            }
            if (reaction.emoji.id === overwatchEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(overwatchRole);
            }
            if (reaction.emoji.name === phasmophobiaEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(phasmophobiaRole);
            }
            if (reaction.emoji.name === bookClubEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(bookClubRole);
            }
            if (reaction.emoji.name === getTogetherEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(getTogetherRole);
            }
            if (reaction.emoji.id === motivationEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(motivationRole);
            }
            if (reaction.emoji.name === spoilersEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(spoilersRole);
            }
        } else {
            return;
        }
    })

}

async function motherCommand(message, args) {
    message.channel.send('Mom is always watching...', {
        files: [
            'https://cdn.discordapp.com/attachments/527617314321858596/591722355483607265/Isi_Death_Stare.jpg'
        ]
    })
}

async function cataclysmCommand(message, args) {
    message.channel.send('', {
        files: [
            'https://cdn.discordapp.com/attachments/585994441957965824/753377899108892792/Cataclysm.jpg'
        ]
    })
    await new Promise(r => setTimeout(r, 2000));
    message.channel.send('**Triumvirate - Cataclysm**\n\nCataclysm works with his fellow Triumvirate members and the Board to help keep pushing Evolved to grow and become the best community possible for all of us. Cata is constantly trying to find new and exciting ways to help drive Evolved forward via new member growth by always recruiting, looking for new ways to expand, or just finding better ways to word things on the forums and Discord. As a Triumvirate member, Cataclysm is always reaching out to the Evolved members, the different guilds leadership, and the Board and other Triumvirate members to chat and get feedback on ways to help better the Evolved Community.')
}

async function isilauraCommand(message, args) {
    message.channel.send('', {
        files: [
            'https://cdn.discordapp.com/attachments/585994441957965824/753377911980949565/Isilaura.jpg'
        ]
    })
    await new Promise(r => setTimeout(r, 2000));
    message.channel.send('**Triumvirate - Isilaura**\n\nIsilaura works closely with the other Triumvirate members and the Board to help keep Evolved running smoothly. As a Triumvirate member, Isilaura does a bit of everything in the Evolved Community ranging from meeting with the other Board/Tri members, keeping up to date on what is going on the various guilds and guild leadership, talking with our various members to get a feel for what is going on in our community, helping with the day to day running of Evolved, and assisting with keeping the forums and Discord information for the whole community up to date.')
}

async function starCommand(message, args) {
    message.channel.send('', {
        files: [
            'https://cdn.discordapp.com/attachments/585994441957965824/753377930977214594/Star.jpg'
        ]
    })
    await new Promise(r => setTimeout(r, 2000));
    message.channel.send('**Triumvirate - Star**\n\nStar continues to work closely with our Community Guides, filling in for our lack of a named Community Manager. While doing this, she organizes Community wide activities - Evolved Secret Santa, Evolved Trivia Nights, and Evolved Game Nights - to name a few. Star works with the other Tri members to keep Evolved running - dealing with issues as they arise, providing feedback on new projects, and everything else that running this crazy place can involve.')
}

async function grimmieCommand(message, args) {
    message.channel.send('', {
        files: [
            'https://cdn.discordapp.com/attachments/527617314321858596/753362102667837450/Grimmie.jpg'
        ]
    })
    await new Promise(r => setTimeout(r, 2000));
    message.channel.send('**Vice-President - Grimmie**\n\nCompile new thoughts and ideas from our members across all of our Guilds, Chapters and Casual games to present them to our Triumvirate and Board to brainstorm on how we can tailor it to benefit our community as a whole and not one individual game.')
}

async function taevarthCommand(message, args) {
    message.channel.send('', {
        files: [
            'https://cdn.discordapp.com/attachments/585994441957965824/753377952162644036/Taevarth.jpg'
        ]
    })
    await new Promise(r => setTimeout(r, 2000));
    message.channel.send('**President - Taevarth**\n\nSetting up our community and leadership meetings to ensure that there are no problems, issues or concerns that are festeting with in our community. To give our members new information on the changes that will be happening within our community.')
}

async function boardCommand(message, args) {
    message.channel.send('', {
        files: [
            'https://cdn.discordapp.com/attachments/585994441957965824/753378013877633134/Evolved_Board_Avatar_Post_CArd.jpg'
        ]
    })
    await new Promise(r => setTimeout(r, 2000));
    message.channel.send('**TRIUMVIRATE: CATACLYSM, ISILAURA, AND STAR**\nThe ultimate authority of the Evolved Gaming Community. They are responsible for the advancement of the Community as a whole and actively oversee the continued growth and success of Evolved in all aspects. They work with the Board of Directors and must unanimously agree upon all decisions.  As with all members, the Triumvirate Members adhere to the Charter and work within its bounds when exercising their authority.\n\n**BOARD OF DIRECTORS**\n**PRESIDENT: TAEVARTH**\nleads the Board by creating agendas for discussion and keeping those discussions on track as needed, including the recognition of speakers. Meeting agendas must be posted on the forums a minimum 24 hours prior to a scheduled meeting.  While any Board Member may propose a motion, only the President may initiate a vote by the Board.\n\n**VICE-PRESIDENT: GRIMMIE**\ntakes the role of President if the President is absent. Records the official minutes for all meetings and ensures they are published for members in a timely manner.  Acceptable methods of publication include posting on the forums or newsletters.')
}

async function cataCommand(message, args) {
    message.channel.send('', {
        files: [
            'https://cdn.discordapp.com/attachments/483065153504411668/600102640440967178/unknown.png'
        ]
    })
}

async function jedCommand(message, args) {

    files = ['https://tenor.com/view/mr-bean-weird-face-raised-eyebrow-smiling-gif-14339432', 'https://tenor.com/view/tall-im-so-tall-silly-comedy-shoulders-gif-4953558',
     'https://tenor.com/view/long-hair-lol-gif-5673926', 'https://tenor.com/view/man-gif-7779614', 'https://tenor.com/view/type-computer-keyboard-gif-12222046',
     'https://tenor.com/view/the-fairly-odd-parents-timmy-video-game-pissed-mad-gif-4709934', 'https://tenor.com/view/vegas-vegasbaby-lasvegas-gif-5017477', 'https://tenor.com/view/wtf-what-do-you-mean-obama-huh-what-gif-12344531']

    var min = 0
    var max = files.length-1
    var random = Math.floor(Math.random() * max) + min
    //console.log(random)
    message.channel.send(files[random])
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

client.login(auth.clientKey)
console.log('Logged in.')