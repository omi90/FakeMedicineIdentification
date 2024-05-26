module.exports = {
    LOCALSERVER_RPC_URL : 'HTTP://127.0.0.1:9545',
    CONTRACT_ADDRESS : '0x7036ad9a8f27f2e62BEa5F6AA0D4b2CB754F05De',
    DBCONNECTIONURL : 'mongodb://localhost:27017/Supplychain',
    CONTRACT_ABI: [
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
      ]
};