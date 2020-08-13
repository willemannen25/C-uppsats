import { FileSystemWallet, Gateway } from 'fabric-network';
import * as path from 'path';


async function stressTest(){
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'Org1Wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        const connectionProfile = path.resolve(__dirname, '..', 'connection.json');
        let connectionOptions = { wallet, identity: 'org1Admin', discovery: { enabled: true, asLocalhost: true }};
        await gateway.connect(connectionProfile, connectionOptions);

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('IBM_tut');
        
        
            const result1132 = await contract.evaluateTransaction('createMyAsset','4567','kebabab');
            console.log(`Transactions has been evaluated, result is:`+ result1132);
            const result1131 = await contract.evaluateTransaction('createMyAsset','4568','kebabab');
            console.log(`Transactions has been evaluated, result is:`+ result1131);
            const result1111 = await contract.evaluateTransaction('createMyAsset','4569','kebabab');
            console.log(`Transactions has been evaluated, result is:`+ result1111);
            
            
            const asd = await contract.evaluateTransaction('ReadKeyWord','kebabab')
            console.log(`Transactions has been evaluated, result is:`+ asd);
        
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

async function main() {
   
        /*
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'Org1Wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        const connectionProfile = path.resolve(__dirname, '..', 'connection.json');
        let connectionOptions = { wallet, identity: 'org1Admin', discovery: { enabled: true, asLocalhost: true }};
        await gateway.connect(connectionProfile, connectionOptions);

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('IBM_tut');
        */
       
        stressTest();
        
        // Evaluate the specified transaction.
        /*
        for(var i=0;i<100;i++){
            const result = await contract.evaluateTransaction('ReadTwoKeyWords','night','nights');
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`); 
        }
        */
        // Disconnect from the gateway.
        //await gateway.disconnect();

  
}
main();