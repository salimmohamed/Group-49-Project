-- Disable foreign key checks temporarily
SET foreign_key_checks = 0;

-- Manufacturers table
DROP TABLE IF EXISTS `Manufacturers`;

CREATE TABLE `Manufacturers` (
    `ManufacturerID` INT(11) NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `ContactEmail` VARCHAR(255) DEFAULT NULL,
    `PhoneNumber` VARCHAR(50) DEFAULT NULL,
    `Address` VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`ManufacturerID`)
);

INSERT INTO `Manufacturers` (`ManufacturerID`, `Name`, `ContactEmail`, `PhoneNumber`, `Address`)
VALUES
    (1, 'TechCorp Industries', 'contact@techcorp.com', '555-0101', '123 Tech Street, San Francisco, CA'),
    (2, 'Digital Solutions Inc', 'info@digitalsolutions.com', '555-0202', '456 Digital Ave, Seattle, WA'),
    (3, 'ElectroMax Systems', 'sales@electromax.com', '555-0303', '789 Electronics Blvd, Austin, TX');

-- SalesAssociates table
DROP TABLE IF EXISTS `SalesAssociates`;

CREATE TABLE `SalesAssociates` (
    `AssociateID` INT(11) NOT NULL AUTO_INCREMENT,
    `FirstName` VARCHAR(255) NOT NULL,
    `LastName` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(255) DEFAULT NULL,
    `PhoneNumber` VARCHAR(50) DEFAULT NULL,
    `Type` VARCHAR(50) DEFAULT NULL,
    PRIMARY KEY (`AssociateID`)
);

INSERT INTO `SalesAssociates` (`AssociateID`, `FirstName`, `LastName`, `Email`, `PhoneNumber`, `Type`)
VALUES
    (1, 'John', 'Smith', 'john.smith@techrus.com', '555-1001', 'Full-time'),
    (2, 'Sarah', 'Johnson', 'sarah.johnson@techrus.com', '555-1002', 'Part-time'),
    (3, 'Michael', 'Brown', 'michael.brown@techrus.com', '555-1003', 'Full-time');

-- Customers table
DROP TABLE IF EXISTS `Customers`;

CREATE TABLE `Customers` (
    `CustomerID` INT(11) NOT NULL AUTO_INCREMENT,
    `FirstName` VARCHAR(255) NOT NULL,
    `LastName` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(255) DEFAULT NULL,
    `PhoneNumber` VARCHAR(50) DEFAULT NULL,
    `Address` VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`CustomerID`)
);

INSERT INTO `Customers` (`CustomerID`, `FirstName`, `LastName`, `Email`, `PhoneNumber`, `Address`)
VALUES
    (1, 'Alice', 'Williams', 'alice.williams@email.com', '555-2001', '100 Main St, Portland, OR'),
    (2, 'Bob', 'Davis', 'bob.davis@email.com', '555-2002', '200 Oak Ave, Portland, OR'),
    (3, 'Carol', 'Miller', 'carol.miller@email.com', '555-2003', '300 Pine Rd, Portland, OR');

-- Products table
DROP TABLE IF EXISTS `Products`;

CREATE TABLE `Products` (
    `ProductID` INT(11) NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `Description` TEXT DEFAULT NULL,
    `Price` DECIMAL(10, 2) NOT NULL,
    `Stock` INT(11) DEFAULT 0,
    `ManufacturerID` INT(11) DEFAULT NULL,
    PRIMARY KEY (`ProductID`),
    KEY `ManufacturerID` (`ManufacturerID`),
    CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`ManufacturerID`) REFERENCES `Manufacturers` (`ManufacturerID`) ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO `Products` (`ProductID`, `Name`, `Description`, `Price`, `Stock`, `ManufacturerID`)
VALUES
    (1, 'Laptop Pro 15', 'High-performance laptop with 16GB RAM', 1299.99, 25, 1),
    (2, 'Wireless Mouse', 'Ergonomic wireless mouse', 29.99, 150, 2),
    (3, 'USB-C Cable', 'Fast charging USB-C cable', 19.99, 200, 3),
    (4, 'Keyboard Elite', 'Mechanical keyboard with RGB lighting', 89.99, 50, 1);

-- Sales table
DROP TABLE IF EXISTS `Sales`;

CREATE TABLE `Sales` (
    `SaleID` INT(11) NOT NULL AUTO_INCREMENT,
    `CustomerID` INT(11) NOT NULL,
    `AssociateID` INT(11) NOT NULL,
    `OrderDate` DATE NOT NULL,
    `Status` VARCHAR(50) DEFAULT 'Pending',
    PRIMARY KEY (`SaleID`),
    KEY `CustomerID` (`CustomerID`),
    KEY `AssociateID` (`AssociateID`),
    CONSTRAINT `Sales_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `Customers` (`CustomerID`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `Sales_ibfk_2` FOREIGN KEY (`AssociateID`) REFERENCES `SalesAssociates` (`AssociateID`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `Sales` (`SaleID`, `CustomerID`, `AssociateID`, `OrderDate`, `Status`)
VALUES
    (1, 1, 1, '2024-01-15', 'Completed'),
    (2, 2, 2, '2024-01-16', 'Pending'),
    (3, 1, 1, '2024-01-17', 'Completed');

-- SalesDetails table
DROP TABLE IF EXISTS `SalesDetails`;

CREATE TABLE `SalesDetails` (
    `SalesDetailID` INT(11) NOT NULL AUTO_INCREMENT,
    `SaleID` INT(11) NOT NULL,
    `ProductID` INT(11) NOT NULL,
    `Quantity` INT(11) NOT NULL,
    `ItemPrice` DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (`SalesDetailID`),
    KEY `SaleID` (`SaleID`),
    KEY `ProductID` (`ProductID`),
    CONSTRAINT `SalesDetails_ibfk_1` FOREIGN KEY (`SaleID`) REFERENCES `Sales` (`SaleID`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `SalesDetails_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `Products` (`ProductID`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `SalesDetails` (`SalesDetailID`, `SaleID`, `ProductID`, `Quantity`, `ItemPrice`)
VALUES
    (1, 1, 1, 1, 1299.99),
    (2, 1, 2, 2, 29.99),
    (3, 2, 3, 5, 19.99),
    (4, 3, 4, 1, 89.99);

-- Re-enable foreign key checks
SET foreign_key_checks = 1;
