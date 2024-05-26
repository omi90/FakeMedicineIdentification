import React, { useState } from 'react';
import { Button, Input } from 'antd';

const ManufacturerScreen = ({ contract, account }) => {
  const [productId, setProductId] = useState('');
  const [rawMaterialId, setRawMaterialId] = useState('');
  const [productName, setProductName] = useState('');

  const handleAddProduct = async () => {
    await contract.methods.addProduct(productId,rawMaterialId,productName).send({ from: account })
                    .then(function(res){
                        console.log('Product added successfully'+res);
                    }).catch(function(err){
                        console.log('Error while adding product'+err);
                    });
  };

  return (
    <div>
      <h2>Manufacturer Screen</h2>
      <Input
        placeholder="Enter product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <Input
        placeholder="Enter raw material ID"
        value={rawMaterialId}
        onChange={(e) => setRawMaterialId(e.target.value)}
      />
      <Input
        placeholder="Enter Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <Button type="primary" onClick={handleAddProduct}>Add Product</Button>
    </div>
  );
};

export default ManufacturerScreen;
