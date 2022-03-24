//fisher yates shuffle to give unbias random order
const arrayShuffler = (data) => {
    let chosenArray = data;
    let shuffle = [...chosenArray];
    const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i);
    shuffle.forEach( (elem, i, arr, j = getRandomValue(i, arr.length)) => [arr[i], arr[j]] = [arr[j], arr[i]] );
    let finalOrder = shuffle;
    return finalOrder;
}

module.exports = arrayShuffler;