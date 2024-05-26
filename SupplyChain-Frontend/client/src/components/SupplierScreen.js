import React, { useState } from 'react';
import { Button, Input } from 'antd';

const SupplierScreen = ({ contract, account }) => {
  const [rawMaterialId, setRawMaterialId] = useState('');
  const [rawMaterialName, setRawMaterialName] = useState('');

  const handleAddRawMaterial = async () => {
      await contract.methods.addRawMaterial(rawMaterialId,rawMaterialName).send({ from: account })
                    .then(function(res){
                        console.log('Raw material added successfully'+res);
                    }).catch(function(err){
                        console.log('Error while adding raw material'+err);
                    });
  };

  return (
    <div>
      <h2>Supplier Screen</h2>
      <Input
        placeholder="Enter raw material ID"
        value={rawMaterialId}
        onChange={(e) => setRawMaterialId(e.target.value)}
      />
      <Input
        placeholder="Enter raw material name"
        value={rawMaterialName}
        onChange={(e) => setRawMaterialName(e.target.value)}
      />
      <Button type="primary" onClick={handleAddRawMaterial}>Add Raw Material</Button>
    </div>
  );
};

export default SupplierScreen;
