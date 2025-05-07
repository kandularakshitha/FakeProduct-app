// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductRegistry {

    struct Product {
        string productId;
        string productName;
        string manufacturer;
        string date;  // Format: dd-mm-yy
        string batchNo;
        bool exists;
    }

    // Mapping to store products by their ID
    mapping(string => Product) private products;

    // Array to store the product IDs for easy retrieval
    string[] public productIds;

    // Event to be emitted when a product is successfully added
    event ProductAdded(string productId, string name, string manufacturer, string date, string batchNo);

    // Function to add a product
    function addProduct(
        string memory _productId,
        string memory _name,
        string memory _manufacturer,
        string memory _date,  // Format: dd-mm-yy
        string memory _batchNo
    ) public {
        products[_productId] = Product({
            productId: _productId,
            productName: _name,
            manufacturer: _manufacturer,
            date: _date,  // Store date as dd-mm-yy
            batchNo: _batchNo,
            exists: true
        });

        // Push productId into productIds array
        productIds.push(_productId);

        // Emit the event with the updated product info
        emit ProductAdded(_productId, _name, _manufacturer, _date, _batchNo);  
    }

    // Function to retrieve product details by product ID
    function getProduct(string memory productId) public view returns (
        string memory, // productId
        string memory, // productName
        string memory, // manufacturer
        string memory, // date (dd-mm-yy)
        string memory, // batchNo
        bool           // exists
    ) {
        Product memory product = products[productId];

        // Ensure the product exists
        require(product.exists, "Product does not exist");

        return (
            product.productId,
            product.productName,
            product.manufacturer,
            product.date,  // Return date in dd-mm-yy format
            product.batchNo,
            product.exists
        );
    }

    // Function to get all product IDs
    function getAllProductIds() public view returns (string[] memory) {
        return productIds;
    }
}
