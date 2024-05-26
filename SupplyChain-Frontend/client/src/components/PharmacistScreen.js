import React, { useState } from 'react';
import { Button, Input } from 'antd';

const PharmacistScreen = ({ contract, account }) => {
  const [productId, setProductId] = useState('');

  const handleAddPharmacistToProduct = async () => {
    await contract.methods.addPharmacistToProduct(productId).send({ from: account })
                    .then(function(res){
                        console.log('Pharmacist added successfully'+res);
                    }).catch(function(err){
                        console.log('Error while adding Pharmacist'+err);
                    });
  };

  return (
    <div>
      <h2>Pharmacist Screen</h2>
      <Input
        placeholder="Enter product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <Button type="primary" onClick={handleAddPharmacistToProduct}>Add Pharmacist</Button>
    </div>
  );
};

export default PharmacistScreen;
