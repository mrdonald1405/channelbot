module.exports = [{
    name: "ticketpanel",
    code: `
    $title[1;Ticket System]
    $description[1;Click in the button for open ticket.]
    $color[1;BLUE]
    $addButton[1;Open;2;support]
    $onlyIF[$getServerVar[setup]>false;❌ Setup not concluded.]
    `
},{
    name: "support",
    type: "interaction",
    prototype: "button",
    code: `
    $editChannel[$channelID[creating-$authorID];{"name":"support-$authorID"}]
    $wait[1s]
    $setChannelVar[user;$authorID;$channelID[creating-$authorID]]
    $setChannelVar[id;$channelID[creating-$authorID];$channelID[creating-$authorID]]
    $interactionReply[✅ | Ticket opened sucessfull, <@$authorID>!;;;;;yes]
    $wait[1s]
    $newTicket[creating-$authorID;{
        "embeds": "{newEmbed:{title:✉ | Ticket}{description:Wait for receive support.}{color:BLUE}}",
        "components": "{actionRow:{button:🔒 Close:danger:cmdclose:no}}"
        };$getServerVar[category]]
        $onlyIF[$channelExists[$channelID[support-$authorID]]<true;{
    "content": "You already have an open ticket.",
    "ephemeral": "true",
"options":{"interaction":true}
  }]    
`
},{
    name: "cmdclose",
    type: "interaction",
    prototype: "button",
    code: `
    $closeTicket[]
    $wait[5s]
    $channelSendMessage[$getServerVar[channel];**$channelName[$getChannelVar[id]] - <@$getChannelVar[user]>** {attachment::./transcripts/$getChannelVar[user].txt}]
    $interactionEdit[✅  Success, this ticket in a fell seconds is closed.]
    $wait[3s]
    $writeFile[./transcripts/$getChannelVar[user].txt;$getChannelVar[msg]]
    $interactionReply[🌐  Generating transcript, wait...]
    `
}]
