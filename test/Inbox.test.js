// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode} = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async()=> {
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hello']})
    .send({from: accounts[0], gas: '1000000'});
})

it('deploys a Inbox contract', ()=> {
    console.log(inbox._address);
    console.log(inbox.options.address);
    assert.ok(inbox.options.address);
})