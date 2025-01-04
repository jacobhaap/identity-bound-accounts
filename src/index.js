const getEntropySeed = require('./entropySeed');
const generateMnemonic = require('./mnemonic');

function identityBoundAccount(input, phraseLength, chain, returnSeed = null, returnEntropy = null) {
    const entropySeed = getEntropySeed(input);

    const mnemonic = generateMnemonic(entropySeed, phraseLength, chain);

    let result = {
        mnemonic: mnemonic.phrase
    }

    if (returnSeed) {
        result.seed = entropySeed;
    } if (returnEntropy) {
        result.entropy = mnemonic.entropy;
    }

    return result;
}

module.exports = identityBoundAccount;
