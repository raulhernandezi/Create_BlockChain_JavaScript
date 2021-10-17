const Block = require('./classes/Block')
const Blockchain = require('./classes/Blockchain')

//Creating the blockchain with random info due to create the genesis block and setting the mining difficulty
let testCoin = new Blockchain('Genesis Block Info', '00');

//Adding 2 blocks with some data
testCoin.addBlock('10 testCoin sent from User to Raul')
testCoin.addBlock('5 testCoin sent from Raul to User')

console.log("---BLOCKCHAIN---")
console.log(JSON.stringify(testCoin.blocks, null, 2))

//If the blockchain is not modified, all the validations must be succesful
console.log(`Is valid? ${testCoin.isValid() ? 'YES' : 'NO'}`);

//If we modify a block which has been already mined and added to the blockchain, 
//the validation will fail because the block's hash does not match with the hash generated with the new fake data
testCoin.blocks[1].data = 'fake data';
console.log(`Is valid? ${testCoin.isValid() ? 'YES' : 'NO'}`);
