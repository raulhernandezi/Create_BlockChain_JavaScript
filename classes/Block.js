const SHA256 = require('crypto-js/sha256');

class Block {
    constructor( index, data, previousHash = '') {
        this.index = index;
        this.date = new Date()
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.createHash();
        this.nonce = 0; //This parameter is used to modify the has generated when mining a block until the hash generated is valid due to the blockchain's difficulty
    }


    createHash() {
        //Generating new block's hash using its own params and the previous block hash
        return SHA256(this.index + this.date + this.data + this.previousHash + this.nonce).toString();
    }

    mineBlock(difficulty) {
        console.log("DIFF: " + difficulty)
        //Te blockchain's difficulty sets the beggining of the block's hash, so a block can't be mined until the hash generated starts but that difficulty
        while(!this.hash.startsWith(difficulty)) {
            this.nonce++; //Nonce is modified every while iteration to generate a new hash(the rest of params used to generate a hash does not change so we need something different)
            this.hash = this.createHash()
        }
    }
}

module.exports = Block;
