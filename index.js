const {LoadCommands, Bot } = require("aoi.js");
const aoijs = require("aoi.js")

const bot = new aoijs.Bot({
token: "TOKEN",
prefix: "!",
intents: "all",
})

bot.onMessage();
bot.onInteractionCreate();

const loader = new aoijs.LoadCommands(bot);

bot.command({
    name: "$alwaysExecute",
    code: `
    $setChannelVar[msg;$getChannelVar[msg]
    $username: $message]
    $onlyIF[$isTicket!=false;]
        `
})

bot.variables({
    msg: "",
    id: "",
    user: "",
    category: "",
    channel: "",
    setup: "false",
    captchacode: "",
    captcharole: "undefined",
    captchastatus: "false",
})

loader.load(bot.cmd,'./cmds/')