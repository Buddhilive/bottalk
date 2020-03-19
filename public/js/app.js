var sendBtn = document.getElementById('buddhi-chat-send-btn');
var txtMsg = document.getElementById('buddhi-chat-msg');
var chatDisplay = document.getElementById('buddhi-chat-display');
var botReply = "Error";

/* if (!document.cookie) {
    botReply = "Error";
} else {
    var getCookie = document.cookie;
    botReply = getCookie.replace("msgHistory=", "");
    chatDisplay.innerHTML += botReply;
    chatDisplay.scrollTo(0, chatDisplay.scrollHeight);
} */

sendBtn.onclick = function() { sendMsg() };

function sendMsg() {
    var theMsg = txtMsg.value;
    var userUtter = "<div align='right'><div id='userutter'>" + theMsg + "</div></div>";

    if (theMsg != "") {
        chatDisplay.innerHTML += userUtter;
        const getReply = new XMLHttpRequest();
        let theResponse = 'Oops';

        getReply.open("GET", "answer/" + theMsg);
        getReply.send();
        getReply.onload = () => {
            theResponse = JSON.parse(getReply.response);
            console.log(theResponse.response[2]);
            chatDisplay.innerHTML += "<div align='left'><div id='botreply'>" + theResponse.response[0] + "</div></div>";
            //setCookie('msgHistory', chatDisplay.innerHTML, 30);
            chatDisplay.scrollTo(0, chatDisplay.scrollHeight);
        };

        txtMsg.value = "";
        txtMsg.focus();
    }
}

txtMsg.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendMsg();
    }
});

/* function setCookie(cname, cvalue, exdays) {
    console.log("cookie start");
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
} */