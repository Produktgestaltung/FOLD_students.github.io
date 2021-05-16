// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// You need to create the file 'base-url.js' in this folder       //
// with the content (replace some.server.url with your server):   //
// const baseURL="https://some.server.url"                        //
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //

let loadedMessages = {};

// on script start -> load messages and fill input fields
fillInputFields();

// call loadMessages() on starting of the app to see what's in the database
setInterval(() => {
  loadMessages();
}, 1000);

$("input#channel").on("input", fillInputFields);

// button to clear one channel
// $("#clear-button").click(() => {
//   let channel = $("input#channel").val();
//   let submitURL = baseURL + channel + "/clear";
//   $.get(submitURL);
// });

// attach an event handler for pressing the submit button
$("form").submit(function (event) {
  event.preventDefault();

  // get values from the input fields
  let channel = $("input#channel").val();
  let user = $("input#user").val();
  let message1 = $("input#message1").val();
  let message2 = $("input#message2").val();
  let message3 = $("input#message3").val();
  let message4 = $("input#message4").val();
  let message5 = $("input#message5").val();

  // delete all messages from channel
  $.get(baseURL + channel + "/clear", function () {
    // send the data to the server.
    $.post(
      baseURL +
        channel +
        "?" +
        $.param({
          user: user,
          messages: [message1, message2, message3, message4, message5],
        })
    );
  });
});

// loads all entries from the database and creates list items in the html document
function loadMessages() {
  let channel = $("input#channel").val();
  $.get(baseURL + channel, function (messages) {
    // console.log(messages);
    loadedMessages = messages;

    // clear list when the data is loaded from the server
    $("ul#messages li").remove();

    // create a list item for each entry in the json object
    messages.forEach(function (message) {
      $("<li></li>").text(JSON.stringify(message)).appendTo("ul#messages");
    });
  });
}

function fillInputFields() {
  console.log("fill input fields");
  let channel = $("input#channel").val();
  $.get(baseURL + channel, function (messages) {
    console.log(messages[0]);
    let message = messages[0];
    // console.log(message);
    if (message == undefined) {
      message = { messages: ["", "", "", "", ""] };
    }
    $("input#message1").val(message.messages[0]);
    $("input#message2").val(message.messages[1]);
    $("input#message3").val(message.messages[2]);
    $("input#message4").val(message.messages[3]);
    $("input#message5").val(message.messages[4]);
  });
}

let channel = "polygon";

$("polygon").mouseover(function (event) {
  console.log($(event.target).index());

  if ($(event.target).hasClass("hovered")) {
    $(event.target).removeClass("hovered");
  } else {
    $(event.target).addClass("hovered");
  }

  let polys = $("polygon");
  let hovered1 = $(polys[0]).hasClass("hovered");
  let hovered2 = $(polys[1]).hasClass("hovered");
  let hovered3 = $(polys[2]).hasClass("hovered");
  let hovered4 = $(polys[3]).hasClass("hovered");
  let hovered5 = $(polys[4]).hasClass("hovered");

  if (hovered1 && hovered2 && hovered3 && hovered4 && !hovered5) {
    console.log(loadedMessages[0].messages[3]);
    $("#info").text(loadedMessages[0].messages[0]);
  }

  if (!hovered1 && hovered2 && hovered3 && hovered4 && !hovered5) {
    console.log(loadedMessages[0].messages[3]);
    $("#info").text(loadedMessages[0].messages[1]);
  }

  if (!hovered1 && !hovered2 && !hovered3 && hovered4 && hovered5) {
    console.log(loadedMessages[0].messages[3]);
    $("#info").text(loadedMessages[0].messages[2]);
  }

  if (!hovered1 && !hovered2 && hovered3 && hovered4 && !hovered5) {
    console.log(loadedMessages[0].messages[3]);
    $("#info").text(loadedMessages[0].messages[3]);
  }

  if (hovered4 && !hovered2 && !hovered3 && !hovered1 && !hovered5) {
    console.log(loadedMessages[0].messages[3]);
    $("#info").text(loadedMessages[0].messages[4]);
  }

  if (!hovered1 && !hovered2 && !hovered3 && !hovered4 && !hovered5) {
    $("#info").text("Hover your pattern");
  }
});
