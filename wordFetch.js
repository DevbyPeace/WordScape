export async function wordGetter() {
  try {
    const response = await fetch(`./words.json`);
    const data = await response.json();
    const wordList = data.words
    // console.log(wordList)
    const randWord = wordList[Math.trunc(Math.random() * wordList.length)];
    // console.log(randWord)
    return randWord;
  } catch (err) {
    console.log(`Something Went Wrong : ${err}`);
  }
}
