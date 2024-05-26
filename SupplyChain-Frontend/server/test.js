const express = require('express');
const wb = require('web3');

// Replace with your provider URL (e.g., Alchemy, Infura)
const provider = new wb.Web3.providers.HttpProvider('HTTP://127.0.0.1:9545');

// Replace with your smart contract address
const contractAddress = '0x7036ad9a8f27f2e62BEa5F6AA0D4b2CB754F05De';

// Replace with your smart contract ABI (Application Binary Interface)
const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "actor_address",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "role",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "actor_name",
          "type": "string"
        }
      ],
      "name": "ACTOR_ADDED",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "productid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "distributor_address",
          "type": "address"
        }
      ],
      "name": "DISTRIBUTOR_UPDATED",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "productid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "pharmacist_address",
          "type": "address"
        }
      ],
      "name": "PHARMACIST_UPDATED",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "productid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "rawmaterialid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "product_name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "manufacturer_address",
          "type": "address"
        }
      ],
      "name": "PRODUCT_ADDED",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "rawmaterialid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "rawmaterialname",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "supplier_address",
          "type": "address"
        }
      ],
      "name": "RAWMATERIAL_ADDED",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "productid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "wholesaler_address",
          "type": "address"
        }
      ],
      "name": "WHOLESALER_UPDATED",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_a",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_b",
          "type": "string"
        }
      ],
      "name": "compareStrings",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "actor_address",
          "type": "address"
        }
      ],
      "name": "getRole",
      "outputs": [
        {
          "internalType": "string",
          "name": "role",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "actor_address",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "role",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "actor_name",
          "type": "string"
        }
      ],
      "name": "addActor",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "rawmaterialid",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "rawmaterialname",
          "type": "string"
        }
      ],
      "name": "addRawMaterial",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "productid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rawmaterialid",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "product_name",
          "type": "string"
        }
      ],
      "name": "addProduct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "productid",
          "type": "uint256"
        }
      ],
      "name": "addWholeSalerToProduct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "productid",
          "type": "uint256"
        }
      ],
      "name": "addDistributorToProduct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "productid",
          "type": "uint256"
        }
      ],
      "name": "addPharmacistToProduct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        }
      ],
      "name": "getProduct",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rawmaterialid",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "manufacturer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "wholesaler",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "distributor",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "pharmacist",
              "type": "address"
            }
          ],
          "internalType": "struct Product",
          "name": "product",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "rawmaterialid",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "supplier",
              "type": "address"
            }
          ],
          "internalType": "struct RawMaterial",
          "name": "rawMaterial",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

const app = express();
var contract;
async function listenForEvents() {
  const web3 = new wb.Web3(provider);
  contract = new web3.eth.Contract(abi, contractAddress);
  /*const allEventsListener = contract.events["allEvents"]();
  console.log('dadsad'+allEventsListener);
  allEventsListener.on('connected', subscriptionId => {
    console.log('SubID:', subscriptionId);
    });

    allEventsListener.on('data', event => {
        console.log(JSON.stringify({ event })); // cannot json.stringify BigInt...
    });

    allEventsListener.on('changed', event => {
        // Remove event from local database
    });

    allEventsListener.on('error', error => {
        console.error(' error:', error);
    });*/
}
async function getPastEvents() {
    await listenForEvents();
    const events = await contract.getPastEvents('ACTOR_ADDED', {
        fromBlock: 9,
        toBlock: 'latest'
    });

    console.log(events[0]);
}

getPastEvents();
// Your Express.js routes and app logic here

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
