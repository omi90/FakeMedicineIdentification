import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { ClipLoader } from 'react-spinners';


const DefaultScreen = ({ contract, account }) => {
  const [productId, setProductId] = useState('');
  const [supplier, setSupplier] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [wholesaler, setWholesaler] = useState('');
  const [distributor, setDistributor] = useState('');
  const [pharmacist, setPharmacist] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearchProductId = async () => {
    setSupplier('');
    setManufacturer('');
    setWholesaler('');
    setDistributor('');
    setPharmacist('');
    setLoading(true);
      contract.methods.getProduct(productId).call()
      .then(function(res){
          console.log("Product List received : "+res);
          setSupplier(/^0x0+$/.test(res.rawMaterial.supplier)? '':res.rawMaterial.supplier);
          setManufacturer(/^0x0+$/.test(res.product.manufacturer)? '':res.product.manufacturer);
          setWholesaler(/^0x0+$/.test(res.product.wholesaler)? '':res.product.wholesaler);
          setDistributor(/^0x0+$/.test(res.product.distributor)? '':res.product.distributor);
          setPharmacist(/^0x0+$/.test(res.product.pharmacist)? '':res.product.pharmacist);
      }).catch(function(err) {
          console.log("Error fetching products: "+err);
      })
      setLoading(false);
  };

  return (
    <div>
      <h2>Default Screen</h2>
      <Input
        placeholder="Search for a Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <Button type="primary" onClick={handleSearchProductId} disabled={loading}>
      {loading ? <ClipLoader size={20} /> : 'Search'}
      </Button>
      <div>
        <h4>Supplier: {supplier}</h4>
        <h4>Manufacturer: {manufacturer}</h4>
        <h4>Wholesaler: {wholesaler}</h4>
        <h4>Distributor: {distributor}</h4>
        <h4>Pharmacist: {pharmacist}</h4>
      </div>
    </div>
  );
};

export default DefaultScreen;
