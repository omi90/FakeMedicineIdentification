import React, { useState } from 'react';
import { Button, Input } from 'antd';

const DistributorScreen = ({ contract, account }) => {
  const [productId, setProductId] = useState('');

  const handleAaddDistributorToProduct = async () => {
    await contract.methods.addDistributorToProduct(productId).send({ from: account })
                    .then(function(res){
                        console.log('Distributor added successfully'+res);
                    }).catch(function(err){
                        console.log('Error while adding distributor'+err);
                    });
  };

  return (
    <div>
      <h2>Distributor Screen</h2>
      <Input
        placeholder="Enter product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <Button type="primary" onClick={handleAaddDistributorToProduct}>Add Distributor</Button>
    </div>
  );
};

export default DistributorScreen;
