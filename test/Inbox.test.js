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
    .deploy({
        data: bytecode,
        arguments: ['Hello']
    })
    .send({
        from: accounts[0],
        gas: '1000000'
    });
})

describe('Inbox', ()=> {
    it('deploys a Inbox contract', ()=> {
        console.log(inbox._address);
        console.log(inbox.options.address);
        assert.ok(inbox.options.address);
    })
    
    it('has a default message', async ()=> {
        const message = await inbox.methods.message().call();
        assert.equal('Hello', message);
    })

    it('can change the message', async () => {
        const transaction = await inbox.methods.setMessage('byee').send({from: accounts[0]});
        console.log(transaction);
        const message = await inbox.methods.message().call();
        assert.equal('byee', message);
    })
})
