const keccak = require('keccak');
const crypto = require('crypto');
const { bip39, wordlists } = require('@iacobus/bip39');

const wordlist = wordlists.english;

function generateMnemonic(input, phraseLength, chain) {
    let hash;
    if (chain === 'ETH') {
        hash = keccak('keccak256').update(input).digest('hex');
    } else if (chain === 'BTC') {
        hash = crypto.createHash('sha256').update(input).digest('hex');
    } else if (chain === 'SOL') {
        hash = crypto.createHash('sha512').update(input).digest('hex');
    } else {
        throw new Error(`Invalid chain, available options: ETH, BTC, SOL.`);
    }

    const ent = bip39.ent.fromHex(hash);
    let entropyLength;
    if (phraseLength === 12 || phraseLength === 18 || phraseLength === 24) {
        entropyLength = phraseLength === 12 ? 128 : phraseLength === 18 ? 192 : 256;
    } if (phraseLength !== 12 && phraseLength !== 18 && phraseLength !== 24) {
        throw new Error(`Invalid Mnemonic Phrase Length! Must be 12, 18, or 24.`)
    }

    const entropy = ent.slice(0, entropyLength);
    const mnemonic = bip39.core.toMnemonic(wordlist, entropy);

    const result = {
        phrase: mnemonic,
        entropy: hash
    }

    const valid = bip39.core.validate(wordlist, mnemonic);
    if (!valid) {
        throw new Error(`Invalid Mnemonic Phrase Generated.`);
    } if (valid) {
        return result;
    }
}

module.exports = generateMnemonic;
