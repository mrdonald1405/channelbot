module.exports = [{
    name: "captcharole",
    code: `
    ✅ | Setup successful.
    $setServerVar[captcharole;$mentionedRoles[1]]
    $onlyIf[$rolePosition[$highestRole[$clientID]]<=$rolePosition[$get[role]];❌ | This position is superior to mine.]
    $let[role;$mentionedRoles[1]]
    `
  },{
    name: "captchapanel",
    code: `🔒 | Captcha System
    Check yourself by clicking the button below, to allow full access to the server.
  $addButton[1; | Verify;success;c1;no;👾]
  $onlyIF[$getServerVar[captcharole]<undefined;❌ | Verification role is undefined.]
  `
  },{
    name: "c1",
    type: "interaction",
    prototype: "button",
    code:`
    $interactionModal[Are you a robot?;c2;
     {actionRow:
       {textInput:Type the number#COLON# $getUserVar[captchacode]:1:captchacode:yes:Verification System:3:30}
     }
     ]
     $wait[1s]
     $setUserVar[captchacode;$random[1;99999]]
     $onlyIF[$getUserVar[captchastatus]<true;{
      "content": "❌ | You are already verified.",
      "ephemeral": "true",
  "options":{"interaction":true}
    }]
     `
  },{
   name: "c2",
   type: "interaction",
   prototype: 'modal',
   $if: "v4",
   code: `$if[$checkContains[$textInputValue[captchacode];$getUserVar[captchacode;$interactionData[user.id]]]==true]
   $setUserVar[captchastatus;true]
   $giveRoles[$guildID;$authorID;$getServerVar[captcharole]]
   $interactionReply[✅ | The verification as successful.;;;;;yes]
  $else
   $interactionReply[❌ | The verification as un-successful.;;;;;yes]
  $endif
  $log[$textInputValue[captchacode] $getUserVar[captchacode;$interactionData[user.id]] $checkContains[$textInputValue[captchacode];$getUserVar[captchacode;$interactionData[user.id]]]]
   `
  }]