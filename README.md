# npm-bot
This was born as a command for my main bot, [Deku](http://deku.pedrofracassi.me/), but I thought it was a good idea to make a bot only for npm.

## Installation
```bash
git clone https://github.com/pedrofracassi/npm-bot.git
cd npm-bot
npm install
```
At this point, you will need to stop and create a file named `config.json`. It should contain you discord token:
```json
{
  "discord_token": "YOUR_TOKEN_GOES_HERE"
}
```
After saving the file, all you need to do is:
```bash
node index.js
```

If you want to daemonize the bot, I recommend [pm2](https://github.com/Unitech/pm2).
