import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import {SERVER_URL} from './config';
import axios from 'axios';

const DRAScreen = ({ contract, account }) => {
  const [actor, setActor] = useState('');
  const [role, setRole] = useState('');
  const [actorName, setActorName] = useState('');
  const [actorCount, setActorCount] = useState('');
  const [productCount, setProductCount] = useState('');
  const [rawMaterialCount, setRawMaterialCount] = useState('');

  const handleAddActor = async () => {
    await contract.methods.addActor(actor,role,actorName).send({ from: account })
                    .then(function(res){
                        console.log('Actor added successfully'+res);
                    }).catch(function(err){
                        console.log('Error while adding actor'+err);
                    });
  };
  const fetchActorCount = async () => {
    await axios.get(SERVER_URL+'/actor/count') 
    .then((response) => setActorCount(response.data.count));
    await axios.get(SERVER_URL+'/product/count') 
    .then((response) => setProductCount(response.data.count));
    await axios.get(SERVER_URL+'/rawmaterial/count') 
    .then((response) => setRawMaterialCount(response.data.count));
  };
  useEffect(() => {
    fetchActorCount();
  }, []);
  return (
    <div>
      <h2>DRA Screen</h2>
      <Input
        placeholder="Enter Actor address"
        value={actor}
        onChange={(e) => setActor(e.target.value)}
      />
      <Input
        placeholder="Enter Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <Input
        placeholder="Enter Name"
        value={actorName}
        onChange={(e) => setActorName(e.target.value)}
      />
      <Button type="primary" onClick={handleAddActor}>Add Actor</Button>
      <br/>
      <h4 >Actors Count: {actorCount}</h4>
      <h4 >Products Count: {productCount}</h4>
      <h4 >Raw Material Count: {rawMaterialCount}</h4>
    </div>
    
  );
};

export default DRAScreen;
