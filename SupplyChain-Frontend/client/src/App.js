import 'antd/dist/reset.css';
import React, { useEffect, useState } from 'react';
//import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
//import { Layout, Menu } from 'antd';
import {CONTRACT_ADDRESS,SUPPLYCHAIN_ABI} from './components/config'
import SupplierScreen from './components/SupplierScreen';
import ManufacturerScreen from './components/ManufacturerScreen';
import WholesalerScreen from './components/WholesalerScreen';
import DistributorScreen from './components/DistributorScreen';
import PharmacistScreen from './components/PharmacistScreen';
import DefaultScreen from './components/DefaultScreen';
import DRAScreen from './components/DRAScreen';

import Web3 from 'web3';

//const { Header, Content } = Layout;

const App = () => {
  const [contract, setContract] = useState('');
  const [account, setAccount] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      console.log("initiliazing web3");
      if (window.ethereum) {
        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        })
        window.ethereum.on('accountsChanged', () => {
          window.location.reload();
        })
        console.log("Wallet found");
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        // Instantiate contract
        //const abi = []; // ABI of your contract
        //const address = ''; // Address of your deployed contract
        const contract = new web3.eth.Contract(SUPPLYCHAIN_ABI, CONTRACT_ADDRESS);
        setContract(contract);

        // Get user's role
        await contract.methods.getRole(accounts[0]).call()
                .then(function(userRole){
                  console.log("Role received : "+userRole);
                  setRole(userRole);
              }).catch(function(err) {
                  console.log("Error fetching role: "+err);
              });
        //setRole("SUPPLIER");
      } else {
        console.error('Please install MetaMask extension');
      }
    };
    initWeb3();
  }, []);

  if(role == 'DRA')
    return <DRAScreen contract={contract} account={account} />;
  else if(role ==  'SUPPLIER')
    return <SupplierScreen contract={contract} account={account} />;
  else if(role ==  'MANUFACTURER')
    return <ManufacturerScreen contract={contract} account={account} />;
  else if(role ==  'WHOLESALER')
    return <WholesalerScreen contract={contract} account={account} />;
  else if(role ==  'DISTRIBUTOR')
    return <DistributorScreen contract={contract} account={account} />;
  else if(role ==  'PHARMACIST')
    return <PharmacistScreen contract={contract} account={account} />;
  else if(role == 'DEFAULT')
    return <DefaultScreen contract={contract} account={account} />;
  return (
              <div>
                <h2>Role Not Found</h2>
                <p>Please connect with a valid account.</p>
              </div>
              
     );
};
export default App;