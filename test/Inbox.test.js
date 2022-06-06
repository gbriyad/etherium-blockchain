// contract test code will go here
const assert = require('assert')
const Web3 = require('web3')
const ganache = require('ganache-cli')

const web3 = new Web3(ganache.provider());

let accounts;
beforeEach(async()=> {
    accounts = await web3.eth.getAccounts();
})

it('fetches account', ()=> {
    console.log(accounts);
})