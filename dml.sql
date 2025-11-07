-- CS340 Project Step 3 - Group 49
-- Team: Salim Mohamed & Ky Veney
-- Purpose: Data Manipulation Language (DML) queries for Tech R Us Sales Management System
-- :[name] used to denote placeholder variables for data from the backend

-- SELECT Queries

-- get all Customers to populate the Customers page
SELECT `CustomerID`, `FirstName`, `LastName`, `Email`, `PhoneNumber`, `Address` 
FROM `Customers` 
ORDER BY `LastName`, `FirstName`;

-- get all SalesAssociates to populate the SalesAssociates page
SELECT `AssociateID`, `FirstName`, `LastName` 
FROM `SalesAssociates` 
ORDER BY `LastName`, `FirstName`;

-- get all Manufacturers to populate the Manufacturers page
SELECT `ManufacturerID`, `ManufacturerName`, `ContactEmail` 
FROM `Manufacturers` 
ORDER BY `ManufacturerName`;

-- get all Products to populate the Products page
SELECT `ProductID`, `ProductName`, `ProductDescription`, `Price`, `StockQty`, `Type`, `ManufacturerID` 
FROM `Products` 
ORDER BY `ProductName`;

-- get all Sales to populate the Sales page
SELECT `SaleID`, `CustomerID`, `OrderDate`, `Status`, `AssociateID` 
FROM `Sales` 
ORDER BY `OrderDate` DESC;

-- get all SalesDetails to populate the SalesDetails page (M:M relationship)
SELECT `SalesItemID`, `SaleID`, `ProductID`, `ItemPrice`, `Quantity` 
FROM `SalesDetails` 
ORDER BY `SaleID`, `SalesItemID`;

-- Dropdown Queries for Foreign Key Selection

-- get all Customer IDs and Names to populate the Customer dropdown
SELECT `CustomerID`, CONCAT(`FirstName`, ' ', `LastName`) AS `FullName` 
FROM `Customers` 
ORDER BY `LastName`, `FirstName`;

-- get all SalesAssociate IDs and Names to populate the SalesAssociate dropdown
SELECT `AssociateID`, CONCAT(`FirstName`, ' ', `LastName`) AS `FullName` 
FROM `SalesAssociates` 
ORDER BY `LastName`, `FirstName`;

-- get all Manufacturer IDs and Names to populate the Manufacturer dropdown
SELECT `ManufacturerID`, `ManufacturerName` 
FROM `Manufacturers` 
ORDER BY `ManufacturerName`;

-- get all Product IDs and Names to populate the Product dropdown
SELECT `ProductID`, `ProductName` 
FROM `Products` 
ORDER BY `ProductName`;

-- get all Sale IDs with Customer names to populate the Sale dropdown
SELECT s.`SaleID`, CONCAT(c.`FirstName`, ' ', c.`LastName`) AS `CustomerName`, s.`OrderDate` 
FROM `Sales` s 
INNER JOIN `Customers` c ON s.`CustomerID` = c.`CustomerID` 
ORDER BY s.`OrderDate` DESC;

-- Display Queries with Joins

-- get all SalesDetails with joined information for display (shows Customer and Product names)
SELECT sd.`SalesItemID`, sd.`SaleID`, CONCAT(c.`FirstName`, ' ', c.`LastName`) AS `CustomerName`, 
       sd.`ProductID`, p.`ProductName`, sd.`ItemPrice`, sd.`Quantity`, 
       (sd.`ItemPrice` * sd.`Quantity`) AS `TotalPrice`
FROM `SalesDetails` sd
INNER JOIN `Sales` s ON sd.`SaleID` = s.`SaleID`
INNER JOIN `Customers` c ON s.`CustomerID` = c.`CustomerID`
INNER JOIN `Products` p ON sd.`ProductID` = p.`ProductID`
ORDER BY sd.`SaleID`, sd.`SalesItemID`;

-- get all Products with their Manufacturer names for display
SELECT p.`ProductID`, p.`ProductName`, p.`ProductDescription`, p.`Price`, p.`StockQty`, 
       p.`Type`, p.`ManufacturerID`, m.`ManufacturerName`
FROM `Products` p
INNER JOIN `Manufacturers` m ON p.`ManufacturerID` = m.`ManufacturerID`
ORDER BY p.`ProductName`;

-- get all Sales with Customer and SalesAssociate names for display
SELECT s.`SaleID`, s.`CustomerID`, CONCAT(c.`FirstName`, ' ', c.`LastName`) AS `CustomerName`,
       s.`OrderDate`, s.`Status`, s.`AssociateID`, 
       CONCAT(sa.`FirstName`, ' ', sa.`LastName`) AS `AssociateName`
FROM `Sales` s
INNER JOIN `Customers` c ON s.`CustomerID` = c.`CustomerID`
INNER JOIN `SalesAssociates` sa ON s.`AssociateID` = sa.`AssociateID`
ORDER BY s.`OrderDate` DESC;

-- Single Record Queries (for Update forms)

-- get a single Customer's data for the Update Customer form
SELECT `CustomerID`, `FirstName`, `LastName`, `Email`, `PhoneNumber`, `Address` 
FROM `Customers` 
WHERE `CustomerID` = :CustomerID_selected_from_browse_customer_page;

-- get a single SalesAssociate's data for the Update SalesAssociate form
SELECT `AssociateID`, `FirstName`, `LastName` 
FROM `SalesAssociates` 
WHERE `AssociateID` = :AssociateID_selected_from_browse_salesassociate_page;

-- get a single Manufacturer's data for the Update Manufacturer form
SELECT `ManufacturerID`, `ManufacturerName`, `ContactEmail` 
FROM `Manufacturers` 
WHERE `ManufacturerID` = :ManufacturerID_selected_from_browse_manufacturer_page;

-- get a single Product's data for the Update Product form
SELECT `ProductID`, `ProductName`, `ProductDescription`, `Price`, `StockQty`, `Type`, `ManufacturerID` 
FROM `Products` 
WHERE `ProductID` = :ProductID_selected_from_browse_product_page;

-- get a single Sale's data for the Update Sale form
SELECT `SaleID`, `CustomerID`, `OrderDate`, `Status`, `AssociateID` 
FROM `Sales` 
WHERE `SaleID` = :SaleID_selected_from_browse_sale_page;

-- get a single SalesDetail's data for the Update SalesDetail form
SELECT `SalesItemID`, `SaleID`, `ProductID`, `ItemPrice`, `Quantity` 
FROM `SalesDetails` 
WHERE `SalesItemID` = :SalesItemID_selected_from_browse_salesdetail_page;

-- INSERT Queries

-- add a new Customer
INSERT INTO `Customers` (`FirstName`, `LastName`, `Email`, `PhoneNumber`, `Address`) 
VALUES (:FirstNameInput, :LastNameInput, :EmailInput, :PhoneNumberInput, :AddressInput);

-- add a new SalesAssociate
INSERT INTO `SalesAssociates` (`FirstName`, `LastName`) 
VALUES (:FirstNameInput, :LastNameInput);

-- add a new Manufacturer
INSERT INTO `Manufacturers` (`ManufacturerName`, `ContactEmail`) 
VALUES (:ManufacturerNameInput, :ContactEmailInput);

-- add a new Product
INSERT INTO `Products` (`ProductName`, `ProductDescription`, `Price`, `StockQty`, `Type`, `ManufacturerID`) 
VALUES (:ProductNameInput, :ProductDescriptionInput, :PriceInput, :StockQtyInput, :TypeInput, :ManufacturerID_from_dropdown_Input);

-- add a new Sale
INSERT INTO `Sales` (`CustomerID`, `OrderDate`, `Status`, `AssociateID`) 
VALUES (:CustomerID_from_dropdown_Input, :OrderDateInput, :StatusInput, :AssociateID_from_dropdown_Input);

-- associate a Product with a Sale (M-to-M relationship addition)
INSERT INTO `SalesDetails` (`SaleID`, `ProductID`, `ItemPrice`, `Quantity`) 
VALUES (:SaleID_from_dropdown_Input, :ProductID_from_dropdown_Input, :ItemPriceInput, :QuantityInput);

-- UPDATE Queries

-- update a Customer's data based on submission of the Update Customer form
UPDATE `Customers` 
SET `FirstName` = :FirstNameInput, `LastName` = :LastNameInput, `Email` = :EmailInput, 
    `PhoneNumber` = :PhoneNumberInput, `Address` = :AddressInput 
WHERE `CustomerID` = :CustomerID_from_the_update_form;

-- update a SalesAssociate's data based on submission of the Update SalesAssociate form
UPDATE `SalesAssociates` 
SET `FirstName` = :FirstNameInput, `LastName` = :LastNameInput 
WHERE `AssociateID` = :AssociateID_from_the_update_form;

-- update a Manufacturer's data based on submission of the Update Manufacturer form
UPDATE `Manufacturers` 
SET `ManufacturerName` = :ManufacturerNameInput, `ContactEmail` = :ContactEmailInput 
WHERE `ManufacturerID` = :ManufacturerID_from_the_update_form;

-- update a Product's data based on submission of the Update Product form
UPDATE `Products` 
SET `ProductName` = :ProductNameInput, `ProductDescription` = :ProductDescriptionInput, 
    `Price` = :PriceInput, `StockQty` = :StockQtyInput, `Type` = :TypeInput, 
    `ManufacturerID` = :ManufacturerID_from_dropdown_Input 
WHERE `ProductID` = :ProductID_from_the_update_form;

-- update a Sale's data based on submission of the Update Sale form
UPDATE `Sales` 
SET `CustomerID` = :CustomerID_from_dropdown_Input, `OrderDate` = :OrderDateInput, 
    `Status` = :StatusInput, `AssociateID` = :AssociateID_from_dropdown_Input 
WHERE `SaleID` = :SaleID_from_the_update_form;

-- update a SalesDetail (M-to-M relationship update - changes which Product is associated with a Sale)
UPDATE `SalesDetails` 
SET `SaleID` = :SaleID_from_dropdown_Input, `ProductID` = :ProductID_from_dropdown_Input, 
    `ItemPrice` = :ItemPriceInput, `Quantity` = :QuantityInput 
WHERE `SalesItemID` = :SalesItemID_from_the_update_form;

-- DELETE Queries

-- delete a Customer
DELETE FROM `Customers` 
WHERE `CustomerID` = :CustomerID_selected_from_browse_customer_page;

-- delete a SalesAssociate
DELETE FROM `SalesAssociates` 
WHERE `AssociateID` = :AssociateID_selected_from_browse_salesassociate_page;

-- delete a Manufacturer
DELETE FROM `Manufacturers` 
WHERE `ManufacturerID` = :ManufacturerID_selected_from_browse_manufacturer_page;

-- delete a Product
DELETE FROM `Products` 
WHERE `ProductID` = :ProductID_selected_from_browse_product_page;

-- delete a Sale
DELETE FROM `Sales` 
WHERE `SaleID` = :SaleID_selected_from_browse_sale_page;

-- dis-associate a Product from a Sale (M-to-M relationship deletion)
DELETE FROM `SalesDetails` 
WHERE `SalesItemID` = :SalesItemID_selected_from_salesdetail_list;

