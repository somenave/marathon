function showVerticalMessage(message) {
    if (message && message.length > 0) {
        message = message.toLowerCase();
        message = message[0].toUpperCase() + message.slice(1, 10);


        for (let char in message) {
            console.log(message[char]);
        }
    }
}

showVerticalMessage("marathon");