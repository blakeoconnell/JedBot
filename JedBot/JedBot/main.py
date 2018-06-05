import discord
import config
import random

client = discord.Client()

commandsString = 'All available commands:\n' \
                 '!roll [number of dice]d[sides] (ex: !roll 2d6) - Roll dice.\n' \
                 '!bot - Calls the bot\n' \
                 '!hello - Say hello to the bot'

@client.event
async def on_message(message):

    messageStr = message.content.split(' ')

    # we do not want the bot to reply to itself
    if message.author == client.user:
        return

    if message.content.startswith('!hello'):
        msg = 'Hello {0.author.mention}'.format(message)
        await client.send_message(message.channel, msg)
    elif message.content.startswith('!bot'):
        await client.send_message(message.channel, 'You rang?')
    elif message.content.startswith('!roll'):
        result = await rollDice(messageStr)
        await client.send_message(message.channel, result)
    elif message.content.startswith('!commands'):
        await client.send_message(message.channel, commandsString)


async def rollDice(messageStr):
    if len(messageStr) < 2:
        return 'To roll, use proper formatting: **!roll [number of dice]d[sides of dice] example: !roll 2d6**'
    diceStr = messageStr[1].split('d')
    print(diceStr)
    if len(diceStr) < 2:
        return '**Error:** Please use proper formatting. **(!roll [number of dice]d[sides of dice] example: !roll 2d6)**'
    if diceStr[1] == '' or not diceStr[1].isdigit() or not diceStr[0].isdigit():  # sides of dice is blank
        return '**Error:** Please use proper formatting. **(!roll [number of dice]d[sides of dice] example: !roll 2d6)**'
    numOfDice = 1
    if not diceStr[0] == '':  # if number of dice is blank, assume 1 die. else, set num
        numOfDice = int(diceStr[0])
    sidesOfDice = int(diceStr[1])
    rollTotal = 0
    if numOfDice > 10000 or sidesOfDice > 100000:
        return 'Really bruh.. enter a realistic number.'
    for roll in range(numOfDice):
        rollTotal += random.randrange(1, sidesOfDice + 1)
    result = f'You rolled **{numOfDice}d{sidesOfDice}** for a total of: **{rollTotal}**'
    return result


@client.event
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------')

client.run(config.TOKEN)