function send(){
    let valueCheck = document.getElementById("input_type").value;
    let url = '', body = '';
    // disable the send button
    document.getElementById("submitmsg").disabled = true;
    // Get the value of the input field with id="usermsg"
    var usermessage = document.getElementById("usermsg").value;
    // write the usermessage to the div with id="chatlogs"
    document.getElementById("chatlogs").innerHTML += "<b>User: </b>" +  usermessage + "<br>";
    // check if the input with id=input_type is text or image
    if(valueCheck == "text"){
        url = 'https://openai106.p.rapidapi.com/chat/completions';
        body = '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"' +  usermessage +'"}]}';
    }else{
        url = 'https://openai106.p.rapidapi.com/images/generations';
        body = '{"prompt":"' +  usermessage +'","n":1,"size":"256x256","response_format":"url","user":"user-1234"}'
    }



    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Bearer: 'SECRET_KEY',
            'X-RapidAPI-Key': 'SECRET_KEY',
            'X-RapidAPI-Host': 'openai106.p.rapidapi.com'
        },
        body
    };
    
    fetch(url, options)
        .then(response => response.json())
        .then(response => {
            if(valueCheck == "text"){ 
            document.getElementById("chatlogs").innerHTML += "<b>ChatGPT: </b>" +  response.choices[0].message.content + "<br>";
            } else {
            document.getElementById("chatlogs").innerHTML += "<b>ChatGPT: </b>" +
            '<img src="' + response.data[0].url + '" alt="image">' + 
            "<br>";
            }
            document.getElementById("submitmsg").disabled = false;
        })
        .catch(err => console.error(err));
    // clear the input field with id="usermsg"
    document.getElementById("usermsg").value = "";
}

// add event listener to the button with id = submitmsg
document.getElementById("submitmsg").addEventListener("click", send);