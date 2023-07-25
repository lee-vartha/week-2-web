const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function getRandomDelay(minDelay, maxDelay) {
  return Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
}

function delayPrint(text, delay) {
  return new Promise(resolve => {
    for (const char of text) {
      setTimeout(() => {
        process.stdout.write(char);
      }, delay);
      delay += getRandomDelay(10, 30); // Decreased random delay between each character
    }
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

async function askQuestion(question, minDelay, maxDelay) {
  return new Promise(resolve => {
    readline.question(question, async (answer) => {
      await delayPrint('\n', getRandomDelay(minDelay, maxDelay)); // Add a new line before the response
      resolve(answer);
    });
  });
}

async function hesitantResponse(response, minDelay, maxDelay) {
  for (const char of response) {
    await delayPrint(char, getRandomDelay(minDelay, maxDelay));
  }
}

(async () => {
  const name = await askQuestion('What is your name?? ', 200, 300);
  if (name === 'lee') {
    await hesitantResponse('Hello Lee! My name is Bot.', 50, 100);
    await delayPrint('\n', 300);
    await hesitantResponse('I am a "robot" that is learning to be human.', 50, 100);
    await delayPrint('\n', 300);
  }

  const favoriteThing = await askQuestion('So... What is your favourite thing?', 100, 200);
  await hesitantResponse(`Oh yeah sure, ${favoriteThing} sounds pretty okay.. I guess I could learn to enjoy that??`, 20, 40);
  await delayPrint('\n', 300);

  const lifeQuest = await askQuestion('Okay.. What is your quest in life?', 100, 200);
  await hesitantResponse(`Hmm okay, ${lifeQuest} sounds alright.. are you sure though?`, 30, 70);
  await delayPrint('\n', 300);
  await hesitantResponse('I mean, you could do a bit better... but I guess it is your life..', 30, 70);
  await delayPrint('\n', 300);
  await hesitantResponse('I am just a robot after all..', 30, 70);

  readline.close();
})();
