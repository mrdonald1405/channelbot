module.exports = [{
    name: "welcome-msg",
    code: `
    😁 | Success, <@$authorID>!
    $setServerVar[welcomemsg;$message]
    $argsCheck[>1;❌ | ERROR: Write the welcome message.]
    `
},{
    name: "welcome-channel",
    code: `
    😁 | Success, <@$authorID>!
    $setServerVar[welcomechannel;$message[1]]
    $onlyIf[$channelExists[$message[1]]>false;❌ | ERROR: This channel don't exists.]
    $argsCheck[1;❌ | ERROR: Write the channel ID.]
    `
}]