// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

//import "truffle/console.sol";

contract Owner{
    address owner; 
    address dra_address;
    mapping(address => uint8) actors_mapping;
    mapping(uint => Product) products_mapping;
    mapping(uint => RawMaterial) rawmaterial_mapping;
    uint8 constant DRA = 100;
    uint8 constant SUPPLIER = 1;
    uint8 constant MANUFACTURER = 2;
    uint8 constant WHOLESALER = 3;
    uint8 constant DISTRIBUTOR = 4;
    uint8 constant PHARMACIST = 5; 

    event ACTOR_ADDED(address actor_address, string role, string actor_name);
    event PRODUCT_ADDED(uint productid, uint rawmaterialid ,string product_name, address manufacturer_address);
    event WHOLESALER_UPDATED(uint productid, address wholesaler_address);
    event DISTRIBUTOR_UPDATED(uint productid, address distributor_address);
    event PHARMACIST_UPDATED(uint productid, address pharmacist_address);
    event RAWMATERIAL_ADDED(uint rawmaterialid, string rawmaterialname, address supplier_address);

    constructor(){
        owner = msg.sender;
        dra_address = msg.sender;
    }

    modifier onlyValidAddress{
        require(
            msg.sender != address(0),
            "Zero address not allowed"
        );
        _;
    }
    modifier onlyValidActorAddress(address actor_address){
        require(
            actor_address != address(0),
            "Zero address not allowed"
        );
        _;
    }
    modifier onlyOwner{
        require(
            msg.sender != owner,
            "Only owner can call this function."
        );
        _;
    }
    modifier onlyDRA{
        require(
          msg.sender == dra_address,
          "Only DRA can call this function."  
        );
        _;
    }
    modifier onlySupplier{
        require(
            actors_mapping[msg.sender] == SUPPLIER,
            "Only Supplier can call this function."
        );
        _;
    }
    modifier onlyManufacturer{
        require(
            actors_mapping[msg.sender] == MANUFACTURER,
            "Only Manufacturer can call this function."
        );
        _;
    }
    modifier onlyWholesaler{
        require(
            actors_mapping[msg.sender] == WHOLESALER,
            "Only Wholesaler can call this function."
        );
        _;
    }
    modifier onlyDistributor{
        require(
            actors_mapping[msg.sender] == DISTRIBUTOR,
            "Only Distributor can call this function."
        );
        _;
    }
    modifier onlyPharmacist{
        require(
            actors_mapping[msg.sender] == PHARMACIST,
            "Only Pharmacist can call this function."
        );
        _;
    }
    modifier onlyValidRoles(string memory role){
        require(
            compareStrings(role,"SUPPLIER") || 
            compareStrings(role,"MANUFACTURER") ||
            compareStrings(role,"WHOLESALER") ||
            compareStrings(role,"DISTRIBUTOR") ||
            compareStrings(role,"PHARMACIST"),
            "Not a valid role"
        );
        _;
    }
    function compareStrings(string memory _a, string memory _b) public pure returns(bool) {
        return keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
    }
    function getRole(address actor_address) public view returns (string memory role) {
        if(dra_address == actor_address)
            return "DRA";
        if(actors_mapping[actor_address] == SUPPLIER)
                return "SUPPLIER";
        else if(actors_mapping[actor_address] == MANUFACTURER)
                return "MANUFACTURER";
        else if(actors_mapping[actor_address] == WHOLESALER)
                return "WHOLESALER";
        else if(actors_mapping[actor_address] == DISTRIBUTOR)
                return "DISTRIBUTOR";
        else if(actors_mapping[actor_address] == PHARMACIST)
                return "PHARMACIST";
        else
                return "DEFAULT";
    }
    function getInternalRole(string memory role) private pure returns (uint8 internalrole) {
        if(compareStrings(role, "SUPPLIER"))
                return SUPPLIER;
        else if(compareStrings(role, "MANUFACTURER"))
                return MANUFACTURER;
        else if(compareStrings(role, "WHOLESALER"))
                return WHOLESALER;
        else if(compareStrings(role, "DISTRIBUTOR"))
                return DISTRIBUTOR;
        else if(compareStrings(role, "PHARMACIST"))
                return PHARMACIST;
        else
                return 0;
    }

    function addActor(address actor_address, string memory role, string memory actor_name) public 
            onlyDRA 
            onlyValidAddress 
            onlyValidActorAddress(actor_address)
            onlyValidRoles(role){
        actors_mapping[actor_address] = getInternalRole(role);
        emit ACTOR_ADDED(actor_address, role, actor_name);
    }

    function addRawMaterial(uint rawmaterialid, string memory rawmaterialname) public 
        onlyValidAddress
        onlySupplier{
        rawmaterial_mapping[rawmaterialid] = RawMaterial(rawmaterialid,msg.sender);
        emit RAWMATERIAL_ADDED(rawmaterialid, rawmaterialname, msg.sender);
    }

    function addProduct(uint productid,uint rawmaterialid, string memory product_name) public 
        onlyValidAddress
        onlyManufacturer{
        products_mapping[productid] = Product(productid,rawmaterialid,msg.sender,address(0),address(0),address(0));
        emit PRODUCT_ADDED(productid, rawmaterialid, product_name, msg.sender);
    }

    function addWholeSalerToProduct(uint productid) public 
        onlyValidAddress
        onlyWholesaler{
        Product storage productObj = products_mapping[productid];
        products_mapping[productid] = Product(productid,
                                        productObj.rawmaterialid,
                                        productObj.manufacturer,
                                        msg.sender,
                                        address(0),
                                        address(0));
        emit WHOLESALER_UPDATED(productid, msg.sender);
    }
    function addDistributorToProduct(uint productid) public 
        onlyValidAddress
        onlyDistributor{
        Product storage productObj = products_mapping[productid];
        products_mapping[productid] = Product(productid,
                                        productObj.rawmaterialid,
                                        productObj.manufacturer,
                                        productObj.wholesaler,
                                        msg.sender,
                                        address(0));
        emit DISTRIBUTOR_UPDATED(productid, msg.sender);
    }

    function addPharmacistToProduct(uint productid) public 
        onlyValidAddress
        onlyPharmacist{
        Product storage productObj = products_mapping[productid];
        products_mapping[productid] = Product(productid,
                                        productObj.rawmaterialid,
                                        productObj.manufacturer,
                                        productObj.wholesaler,
                                        productObj.distributor,
                                        msg.sender);
        emit PHARMACIST_UPDATED(productid, msg.sender);
    }
    function getProduct(uint productId) public view returns(Product memory product,RawMaterial memory rawMaterial){
        return (products_mapping[productId], rawmaterial_mapping[products_mapping[productId].rawmaterialid]);
    }
}

struct Product{
    uint id;
    uint rawmaterialid;
    address manufacturer;
    address wholesaler;
    address distributor;
    address pharmacist;
}
struct RawMaterial{
    uint rawmaterialid;
    address supplier;
}