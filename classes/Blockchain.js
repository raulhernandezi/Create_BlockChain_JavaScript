const Block = require('./Block')

class Blockchain {
    constructor(genesisData, difficulty = '00') {
        this.blocks = [this.createFirstBlock(genesisData)]
        this.difficulty = difficulty; //this parameter sets the start of the block's hashes, used to set the difficulty of mining the blocks in the blockchain(see mineBlock())
    }

    //Creating the first block to start the blockchain(first block has no previousHash)
    createFirstBlock(genesisData) {
        return new Block(0, genesisData);
    }

    //Returns the last block
    getLastBlock() {
        return this.blocks[this.blocks.length - 1];
    }

    addBlock(data) {
        let prevBlock = this.getLastBlock();
        let newBlock = new Block(prevBlock.index + 1, data, prevBlock.hash);
        newBlock.mineBlock(this.difficulty)
        console.log(`Block Mined ${newBlock.hash} by nonce ${newBlock.nonce}`)
        this.blocks.push(newBlock);
    }

    //Validating
    isValid() {
        for(let i = 1; i < this.blocks.length; i++) {
            let prevBlock = this.blocks[i-1]
            let currentBlock = this.blocks[i]

            if(currentBlock.previousHash != prevBlock.hash){
                console.log('Not matching block hashes')
                return false;
            }

            if(currentBlock.createHash() != currentBlock.hash){
                console.log("Invalid hash")
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;