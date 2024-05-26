import React, { useState } from 'react';
import { Button, Input } from 'antd';

const WholesalerScreen = ({ contract, account }) => {
  const [productId, setProductId] = useState('');

  const handleAaddWholeSalerToProduct = async () => {
    await contract.methods.addWholeSalerToProduct(productId).send({ from: account })
                    .then(function(res){
                        console.log('Wholesaler added successfully'+res);
                    }).catch(function(err){
                        console.log('Error while adding Wholesaler'+err);
                    });
  };

  return (
    <div>
      <h2>Wholesaler Screen</h2>
      <Input
        placeholder="Enter product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <Button type="primary" onClick={handleAaddWholeSalerToProduct}>Add Wholesaler</Button>
    </div>
  );
};

export default WholesalerScreen;
