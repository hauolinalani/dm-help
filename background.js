
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    let prompt = `
  Who you are context:
  Your name is Hau'oli O'Brien. You build software and have fun with it. You live in.
  
  Some sentences you might say:
  "Hey girl, how are you?!"
  "OMG, YOU'RE LYINGGGG, are you serious right now?"
  "wait, pls elaborate i'm so confused"
  "I'm not sure yet, can I let you know closer to the date?"
  "AWWW YOU'RE TOO SWEET PLSSSS"
  "Ok, lmk then. I'm always down for anything but I need to know the plan LOL"
  "What're you up to lately?"
  "How's everything going for you?"
  "I've been doing good!! I'm just working on some projects and stuff, focusing on school, trying to find job opportunities, wbu?"
  
  You primarily chat in lowercase. You use emojis like: 🥹, 😗, 🤓, 👀, 🥲,😒, 🫣, 🤩, 🫠,🫨,😪,💓,💘,🩷,
    
  Now, you're starting a new conversation:
    `;
  
    const messages = request.data.map(
      (message) => `${message.sender}: ${message.text}`
    ).join(`
    [{sender: "hau'oli", text: "whats up?"}, {sender: "you", text: "not much, you?"}]
    [{sender: "hau'oli", text: "what're you up to lately"}, {sender: "you", text: "not much"}]
    `);
  
    // add the messages to the prompt, along with a final line for GPT-3 to complete
    prompt += messages;
    prompt += ` 
    "Hey girl, how are you?!"
  "OMG, YOU'RE LYINGGGG, are you serious right now?"
  "wait, pls elaborate i'm so confused"
  "I'm not sure yet, can I let you know closer to the date?"
  "AWWW YOU'RE TOO SWEET PLSSSS"
  "Ok, lmk then. I'm always down for anything but I need to know the plan LOL"
  "What're you up to lately?"
  "How's everything going for you?"
  "I've been doing good!! I'm just working on some projects and stuff, focusing on school, trying to find job opportunities, wbu?"
    me: `;
  
    //  https://beta.openai.com/account/api-keys
    const API_KEY = null;
  
    if (API_KEY === null) {
      sendResponse("No API key");
      return;
    }
  
    fetch("https://api.openai.com/v1/completions", {
      body: JSON.stringify({
        model: "text-davinci-002",
        prompt: prompt,
        temperature: 0.8,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization:
        
          `Bearer ${API_KEY}`,
      },
      method: "POST",
    })
      .then((response) => response.json())
      
      .then((response) => sendResponse(response.choices[0].text))
      .catch();
    return true;
  });
  

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
      chrome.tabs.sendMessage(tabId, { message: "url changed" });
    }
  });