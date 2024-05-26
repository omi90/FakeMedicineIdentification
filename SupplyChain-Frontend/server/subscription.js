const constants = require('./constants');
const fs = require('fs');
const wb = require('web3');
const Product = require('./models/product');
const Actor = require('./models/actor');
const RawMaterial = require('./models/rawmaterial');
const Event = require('./models/event');

var contract;
// Connect to Ethereum node
const initWeb3Listeners = async ()=>{
  console.log("Starting web3")
  const web3 = new wb.Web3(new wb.Web3.providers.HttpProvider(constants.LOCALSERVER_RPC_URL)); // Update with your Ethereum node URL
  const netid = await web3.eth.net.getId();
  console.log("Network>"+netid);  
  //console.log(contractABI);
const contractAddress = constants.CONTRACT_ADDRESS; // Address of your deployed contract
try{
  contract = await new web3.eth.Contract(constants.CONTRACT_ABI, contractAddress);
}catch(error){
  console.log("error>"+error);
}
}
//event ACTOR_ADDED(address actor_address, string role, string actor_name);
//event PRODUCT_ADDED(uint productid, uint rawmaterialid ,string product_name, address manufacturer_address);
//event WHOLESALER_UPDATED(uint productid, address wholesaler_address);
//event DISTRIBUTOR_UPDATED(uint productid, address distributor_address);
//event PHARMACIST_UPDATED(uint productid, address pharmacist_address);
//event RAWMATERIAL_ADDED(uint rawmaterialid, string rawmaterialname, address supplier_address);

// Subscribe to the event
const addContractListener = async ()=> {
  await initWeb3Listeners();
  console.log('Initializing Contract Listeners'+contract.events);
  /*contract.events.allEvents({}, (error, event) => {
    if (error) {
      console.log('Error listening for events:', error);
      return;
    }
    console.log('Event detected:', event.returnValues);
    // Process the event data here (e.g., send notification, update database)
  });*/

  /*contract.events.ACTOR_ADDED({}, async (error, event) => {
    if (error) {
      console.error('Error listening to event:', error);
    } else {
      console.log('Event:', event.returnValues);
      try{
          console.log('Event:', event.returnValues);
          const { actor_address, role, actor_name } = event.returnValues;
          const actor = new Actor({
              actor_address,
              role,
              actor_name
            });
            await actor.save();
            console.error('Data saved to database');
          // You can emit the event data or send it to connected clients
      }catch(err){
          console.error('Error saving data to database:'+err);
      }
    }
  });

  contract.events.PRODUCT_ADDED({}, async (error, event) => {
    if (error) {
      console.error('Error listening to event:', error);
    } else {
      console.log('Event:', event.returnValues);
      try{
        console.log('Event:', event.returnValues);
        const {productid, rawmaterialid , product_name, manufacturer_address} = event.returnValues;
        const product = new Product({
            productid,
            rawmaterialid,
            product_name,
            manufacturer_address
          });
          await product.save();
          console.error('Data saved to database');
        // You can emit the event data or send it to connected clients
    }catch(err){
        console.error('Error saving data to database:'+err);
    }
    }
  });

  contract.events.WHOLESALER_UPDATED({}, async (error, event) => {
    if (error) {
      console.error('Error listening to event:', error);
    } else {
      console.log('Event:', event.returnValues);
      try{
        console.log('Event:', event.returnValues);
        const {productid, wholesaler_address} = event.returnValues;
        const updatedProduct = await Product.findOneAndUpdate(
            {productid},
            {wholesaler_address},
            { new: true, upsert: true }
        );
        console.error('Data saved to database'+updatedProduct);
        // You can emit the event data or send it to connected clients
    }catch(err){
        console.error('Error saving data to database:'+err);
    }
    }
  });

  contract.events.DISTRIBUTOR_UPDATED({}, async (error, event) => {
    if (error) {
      console.error('Error listening to event:', error);
    } else {
      console.log('Event:', event.returnValues);
      try{
        console.log('Event:', event.returnValues);
        const {productid, distributor_address} = event.returnValues;
        const updatedProduct = await Product.findOneAndUpdate(
            {productid},
            {distributor_address},
            { new: true, upsert: true }
        );
        console.error('Data saved to database'+updatedProduct);
        // You can emit the event data or send it to connected clients
    }catch(err){
        console.error('Error saving data to database:'+err);
    }
    }
  });

  contract.events.PHARMACIST_UPDATED({}, async (error, event) => {
    if (error) {
      console.error('Error listening to event:', error);
    } else {
      console.log('Event:', event.returnValues);
      try{
        console.log('Event:', event.returnValues);
        const {productid, pharmacist_address} = event.returnValues;
        const updatedProduct = await Product.findOneAndUpdate(
            {productid},
            {pharmacist_address},
            { new: true, upsert: true }
        );
        console.error('Data saved to database'+updatedProduct);
        // You can emit the event data or send it to connected clients
    }catch(err){
        console.error('Error saving data to database:'+err);
    }
    }
  });

  contract.events.RAWMATERIAL_ADDED({}, async (error, event) => {
    if (error) {
      console.error('Error listening to event:', error);
    } else {
        try{
            console.log('Event:', event.returnValues);
            const {rawmaterialid, rawmaterialname, supplier_address} = event.returnValues;
            const rawMaterial = new RawMaterial({
                rawmaterialid,
                rawmaterialname,
                supplier_address
              });
              await rawMaterial.save();
              console.error('Data saved to database');
            // You can emit the event data or send it to connected clients
        }catch(err){
            console.error('Error saving data to database:'+err);
        }
    }
  });*/
};
async function fetchActors(){
    const event = 'ACTOR_ADDED';
    const latestEventFromDb = await Event.findOne({event},{}, {sort: {'blockNumber': -1}});
    console.log("Fetched BlockNumber"+(latestEventFromDb? latestEventFromDb.blockNumber: 0));
    const lastFetchBlockNumber = latestEventFromDb? latestEventFromDb.blockNumber+1n: 0;
    const events = await contract.getPastEvents('ACTOR_ADDED', {
      fromBlock: lastFetchBlockNumber,
      toBlock: 'latest'
    });
    events.forEach(async (eventI) => {
      const eventDb = new Event(eventI);
      await eventDb.save();
      if(eventDb.returnValues){
        const { actor_address, role, actor_name } = eventDb.returnValues;
        const actor = new Actor({
            actor_address,
            role,
            actor_name
          });
          await actor.save();
          console.error('Actor saved to database');
      }
      console.error('Data saved to database');
    });
}
async function fetchRawMaterial(){
  const event = 'RAWMATERIAL_ADDED';
  const latestEventFromDb = await Event.findOne({event},{}, {sort: {'blockNumber': -1}});
  console.log("Fetched BlockNumber"+(latestEventFromDb? latestEventFromDb.blockNumber: 0));
  const lastFetchBlockNumber = latestEventFromDb? latestEventFromDb.blockNumber+1n: 0;
  const events = await contract.getPastEvents('RAWMATERIAL_ADDED', {
    fromBlock: lastFetchBlockNumber,
    toBlock: 'latest'
  });
  events.forEach(async (eventI) => {
    const eventDb = new Event(eventI);
    await eventDb.save();
    if(eventDb.returnValues){
      const {rawmaterialid, rawmaterialname, supplier_address} = eventDb.returnValues;
      const rawMaterial = new RawMaterial({
          rawmaterialid,
          rawmaterialname,
          supplier_address
        });
        await rawMaterial.save();
        console.error('Rawmaterial saved to database');
    }
    console.error('Data saved to database');
  });
}
async function fetchProducts(){
  let event = 'PRODUCT_ADDED';
  let latestEventFromDb = await Event.findOne({event},{}, {sort: {'blockNumber': -1}});
  console.log("Fetched BlockNumber"+(latestEventFromDb? latestEventFromDb.blockNumber: 0));
  let lastFetchBlockNumber = latestEventFromDb? latestEventFromDb.blockNumber+1n: 0;
  let events = await contract.getPastEvents('PRODUCT_ADDED', {
    fromBlock: lastFetchBlockNumber,
    toBlock: 'latest'
  });
  events.forEach(async (eventI) => {
    const eventDb = new Event(eventI);
    await eventDb.save();
    if(eventDb.returnValues){
      const {productid, rawmaterialid , product_name, manufacturer_address} = eventDb.returnValues;
        const product = new Product({
            productid,
            rawmaterialid,
            product_name,
            manufacturer_address
          });
          await product.save();
          console.error('Product saved to database');

    }
    console.error('Data saved to database');
  });


  event = 'WHOLESALER_UPDATED';
  latestEventFromDb = await Event.findOne({event},{}, {sort: {'blockNumber': -1}});
  console.log("Fetched BlockNumber"+(latestEventFromDb? latestEventFromDb.blockNumber: 0));
  lastFetchBlockNumber = latestEventFromDb? latestEventFromDb.blockNumber+1n: 0;
  events = await contract.getPastEvents('WHOLESALER_UPDATED', {
    fromBlock: lastFetchBlockNumber,
    toBlock: 'latest'
  });
  events.forEach(async (eventI) => {
    const eventDb = new Event(eventI);
    await eventDb.save();
    if(eventDb.returnValues){
      const {productid, wholesaler_address} = eventDb.returnValues;
        const updatedProduct = await Product.findOneAndUpdate(
            {productid},
            {wholesaler_address},
            { new: true, upsert: true }
        );
        console.error('Wholesaler saved to database'+updatedProduct);
    }
    console.error('Data saved to database');
  });

  event = 'DISTRIBUTOR_UPDATED';
  latestEventFromDb = await Event.findOne({event},{}, {sort: {'blockNumber': -1}});
  console.log("Fetched BlockNumber"+(latestEventFromDb? latestEventFromDb.blockNumber: 0));
  lastFetchBlockNumber = latestEventFromDb? latestEventFromDb.blockNumber+1n: 0;
  events = await contract.getPastEvents('DISTRIBUTOR_UPDATED', {
    fromBlock: lastFetchBlockNumber,
    toBlock: 'latest'
  });
  events.forEach(async (eventI) => {
    const eventDb = new Event(eventI);
    await eventDb.save();
    if(eventDb.returnValues){
      const {productid, distributor_address} = eventDb.returnValues;
        const updatedProduct = await Product.findOneAndUpdate(
            {productid},
            {distributor_address},
            { new: true, upsert: true }
        );
        console.error('Distributor saved to database'+updatedProduct);
    }
    console.error('Data saved to database');
  });

  event = 'PHARMACIST_UPDATED';
  latestEventFromDb = await Event.findOne({event},{}, {sort: {'blockNumber': -1}});
  console.log("Fetched BlockNumber"+(latestEventFromDb? latestEventFromDb.blockNumber: 0));
  lastFetchBlockNumber = latestEventFromDb? latestEventFromDb.blockNumber+1n: 0;
  events = await contract.getPastEvents('PHARMACIST_UPDATED', {
    fromBlock: lastFetchBlockNumber,
    toBlock: 'latest'
  });
  events.forEach(async (eventI) => {
    const eventDb = new Event(eventI);
    await eventDb.save();
    if(eventDb.returnValues){
      const {productid, pharmacist_address} = eventDb.returnValues;
      const updatedProduct = await Product.findOneAndUpdate(
          {productid},
          {pharmacist_address},
          { new: true, upsert: true }
      );
      console.error('Pharmacist saved to database'+updatedProduct);

    }
    console.error('Data saved to database');
  });
}


async function fetchEvents() {
  console.log("fetching latest events");
  await fetchActors();
  await fetchRawMaterial();
  await fetchProducts();
  console.log("End fetching latest events");
}
addContractListener();
fetchEvents();
setInterval(fetchEvents,2000);

// Export the initialized contract instance
module.exports = contract;