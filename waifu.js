const Discord = require('discord.js')
const client = new Discord.Client()


client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    if (primaryCommand == "waifu") {
        waifuCommand(arguments, receivedMessage)
    }
}

function waifuCommand(arguments, receivedMessage) {
    var min = 0
    var max = waifus.length - 1
    var maxMessage = messages.length - 1
    var data = {};
    let waifu = new Discord.RichEmbed(data)
    var random = Math.floor(Math.random() * (+max - +min)) + min
    var randomMessage = Math.floor(Math.random() * (+maxMessage - +min)) + min
    waifu.setImage(waifus[random])
    receivedMessage.channel.send(messages[randomMessage])
    receivedMessage.channel.send(waifu)
}

client.login("NDM5OTg2Mzg2MzI2NjUwODgx.XPh3sQ.gid6F7oe7bHrMGb3o_qXPQKsb0A") // Replace XXXXX with your bot token
console.log('Logged in.')

var waifus = ['https://cdn.discordapp.com/attachments/430815211155357700/459266508116459542/Akeno.jpg',
 'https://cdn.discordapp.com/attachments/430815211155357700/459262851421437952/90df91e192e7ed70d7c00a131e01448a.gif',
  'https://scontent-lga3-1.cdninstagram.com/vp/1d7e95a3565e55f9d1b00a448ab1b733/5D9367CD/t51.2885-15/e35/52034034_293248474704943_1485527501027303626_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com',
   'https://scontent-frt3-1.cdninstagram.com/vp/067a7bb68f5c5ec55b0d56dc4a133ba9/5D79E551/t51.2885-15/e35/53402123_271034577131221_4503311068922072239_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpx9t6BLJCODwQcDKN3in2k9umYolVZr9q6T721jZ4X5uV52IZ', 'https://thumbs.gfycat.com/IdioticLavishAfricanmolesnake-max-1mb.gif',
    'https://instagram.fhel5-1.fna.fbcdn.net/vp/44822cc08d246d0ffdba3e832f4d5380/5D7985B0/t51.2885-15/e35/60636464_150517246001704_5842911570387616344_n.jpg?_nc_ht=instagram.fhel5-1.fna.fbcdn.net&ig_cache_key=MjA1MTE0Njg4NjExNDgyNjA1OA%3D%3D.2',
    'https://cdn.discordapp.com/attachments/430815211155357700/459260107684053001/spring_has_come_by_armenci-d60d6o5.png',
    'https://cdn.discordapp.com/attachments/430815211155357700/459260000695746563/fuwa_aika___zetsuen_no_tempest_by_ergh3-d5zjot7.png',
    'https://cdn.discordapp.com/attachments/430815211155357700/453458169642090506/9e8d96fd73cfa7f61b26e2dcbf2672ff.png',
    'https://cdn.discordapp.com/attachments/430815211155357700/453458125966540810/clannad___nagisa_by_hoshicchi-d9speya.png',
    'https://cdn.discordapp.com/attachments/430815211155357700/453457628010512385/d46a8c72b19d2dd5b420c1c7877d817f.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/453456972013109270/51vXksn2mqL._SX355_.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441470897497571328/Sinon_GGO.png',
    'https://cdn.discordapp.com/attachments/430815211155357700/441470894041202688/flat800x800075t.u1.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441466215362199552/beautiful-anime-girl-wallpaper-hd-16-a-e-anime-girls-wallpaper.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441466142725373952/anime-girl-blue-beutiful-wallpaper-hd-for-android-19-r-anime-girls-wallpapers-wallpaper-cave.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441466003193462784/Date-A-Live.Origami-Tobiichi-Samsung-Galaxy-Mega-6.3-wallpaper.720x1280.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441465977910198272/Light_novel_Tenshi.png',
    'https://cdn.discordapp.com/attachments/430815211155357700/441465909706620948/51b08eadd4d94baef7d7be7cb7b465bb.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441463498543988747/36fd5af921aaf290ff72109445b3f81e--eye-images-ninja-girl.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441463346986876938/c93c81247638186433e0ad7af5c5da52.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441463314279563264/kurumi_tokisaki___by_kazenokaze-d5yuyp0.png',
    'https://cdn.discordapp.com/attachments/430815211155357700/441463310936834058/Ab_character_yui_image.png',
    'https://cdn.discordapp.com/attachments/430815211155357700/441463308021923841/rinoof.png',
    'https://cdn.discordapp.com/attachments/430815211155357700/441463288660754432/waifu1.png',
    'https://cdn.discordapp.com/attachments/430815211155357700/441463286853009408/kokoro07_by_messenger_lame-dbbmmwm.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441463265286029313/teemo_by_adelfa3-d5xse3x.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441463261980786698/rinoof2.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441463259607072768/flat800x800075f.u1.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441463258134872074/s-l300.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441463211691343872/065ee1f1f1432e3e3fe97ce0e1345f51.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441463209237544960/oofmordred.png',
    'https://cdn.discordapp.com/attachments/430815211155357700/441463193965953024/a476d717b9c0ab87bcc6927d4d1cc020.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441463173673910272/yn5gvxe.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441460905608478720/ccfddf89ac1d1eac67475f0f868eb5c3.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441355107314171904/hatsune_miku_by_edusu1994-d60od7k.png',
    'https://cdn.discordapp.com/attachments/430815211155357700/441354961289478164/anime-girls-hd-wallpaper-27-8-k-of-anime-girl.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/441354877726359552/girl-brunette-library-books-anime-1.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/440081223348649984/kill-la-kill-high-end-wall-scroll-matoi-ryuko.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/440078200660557824/leisure_by_perverted_dan_hibiki-d5zu8zw.png',
    'https://cdn.discordapp.com/attachments/430815211155357700/440078148089151488/commission__kiki_s_delivery_service_by_chaoz14-d5yui3z.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlyPYjZk9Ba76rQmUo4tKO5OLEMCl4oDAAPYV3wCWQN6hv1hFn',
    'https://scontent-yyz1-1.cdninstagram.com/vp/2bc40566512e0b5afa1328e4fdcd1c11/5D957386/t51.2885-15/e35/42003397_297909687466433_3482164655290318848_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com',
    'https://thicc.mywaifulist.moe/waifus/1804/fa6d78862528a462bc8452fb6ed799f02a574549f73a785db0af6e117c699989_thumb.jpeg',
    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/352870b9-3eb2-4131-ab8f-59c8bf443460/dbrvt7h-b1c207a0-b65b-4fb6-94c9-20f5718eebe7.png/v1/fill/w_746,h_1072,q_70,strp/sayori_by_nam_namii_dbrvt7h-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjMwMCIsInBhdGgiOiJcL2ZcLzM1Mjg3MGI5LTNlYjItNDEzMS1hYjhmLTU5YzhiZjQ0MzQ2MFwvZGJydnQ3aC1iMWMyMDdhMC1iNjViLTRmYjYtOTRjOS0yMGY1NzE4ZWViZTcucG5nIiwid2lkdGgiOiI8PTE2MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Enx5c-RYle5Y9-F-BH9GVXZGK4eSy3PA5rpa0YM0wjE',
    'https://cdn.discordapp.com/attachments/430815211155357700/431174794004922379/9.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/431173379392012289/3.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/431173207790190602/2.jpg',
    'https://i.pinimg.com/originals/c3/d3/ed/c3d3ed7338d8b34dbe202d507d0806a0.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/431173136185163776/5.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/431173118254383114/4.jpg',
    'https://cdn.discordapp.com/attachments/430815211155357700/431173088156057600/6.jpg',
    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7faa7cb2-c8c9-4d56-a4f3-54eb2b540d3e/dbwnjfb-9021d89e-b323-47b8-b10d-6ede302e55a4.png/v1/fill/w_628,h_1272,strp/knife_waifu_by_miragecomet_dbwnjfb-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjA3MiIsInBhdGgiOiJcL2ZcLzdmYWE3Y2IyLWM4YzktNGQ1Ni1hNGYzLTU0ZWIyYjU0MGQzZVwvZGJ3bmpmYi05MDIxZDg5ZS1iMzIzLTQ3YjgtYjEwZC02ZWRlMzAyZTU1YTQucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.-LoGeG6mpKuoH61mrg__Xf3DRLM7keSWF7RD96XVU8s',
    'https://pm1.narvii.com/6758/ed3c9b89cc9188bfac5a4a3f1a9b30431f2bc91bv2_hq.jpg',
    'https://i.imgur.com/K1rI70o.png',
    'https://i.ytimg.com/vi/FpfPpDVIYcA/maxresdefault.jpg',
    'https://i.kym-cdn.com/photos/images/facebook/001/251/981/cb3.jpg',
    'https://cdn.britannica.com/s:300x300/58/129958-004-C9B8B89D.jpg',
    'https://i.redd.it/9zs4vt2g9x9z.png',
    'https://i.pinimg.com/736x/c2/f5/e8/c2f5e80250a725f1b145799fe8c506a4.jpg',
    'https://scontent.cdninstagram.com/vp/4280c192e056fe7b31e468944b4b4791/5D929840/t51.2885-15/e35/c0.1.882.882a/s480x480/53020519_160467581620591_5843848470187908205_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com'
            ]

var messages = ['KYLE LOVES THIS', 'What a cutie ;)', 'OMG that... personality', 'OOF', 'I\'m in love...', 'Here\'s a real treat ;)', 'Beautiful!', 'Gorgeous!', '...lemme smash..', 'Another waifu just for you!', 'What a nice PERSONALITY!', 'Dayummmm', 'Perfection.']