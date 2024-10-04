export const common = {
    getRandomIntInclusive : ({ min, max }) => {
        const minProcessed = Math.ceil(min);
        const maxProcessed = Math.floor(max);
        return Math.floor(Math.random() * (maxProcessed - minProcessed + 1) + minProcessed);
    },
    dataRandom : (data) => {
        type Data = { [key : string] : string };
        const Array: Data[] = data.hashes();
        const array: Data = Array[common.getRandomIntInclusive({ min: 0, max: Array.length - 1 })];
        const arrayValue = Object.values(array);
        return arrayValue;
    }
}