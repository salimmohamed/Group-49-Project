-- Stored procedures for Tech R Us database
-- Includes:
--   - sp_reset_techrus: reset schema + sample data
--   - sp_delete_customer: delete a customer by ID (CUD demo)

DROP PROCEDURE IF EXISTS sp_reset_techrus;
DROP PROCEDURE IF EXISTS sp_delete_customer;

DELIMITER //

-- =====================================================
-- Procedure: sp_reset_techrus
-- =====================================================
CREATE PROCEDURE sp_reset_techrus()
BEGIN
    -- Disable foreign key checks temporarily
    SET FOREIGN_KEY_CHECKS = 0;

    -- -----------------------------------------------------
    -- Table: Manufacturers
    -- -----------------------------------------------------
    DROP TABLE IF EXISTS `Manufacturers`;

    CREATE TABLE IF NOT EXISTS `Manufacturers` (
        `ManufacturerID` INT(11) NOT NULL AUTO_INCREMENT,
        `Name` VARCHAR(255) NOT NULL,
        `ContactEmail` VARCHAR(255) DEFAULT NULL,
        `PhoneNumber` VARCHAR(50) DEFAULT NULL,
        `Address` VARCHAR(255) DEFAULT NULL,
        PRIMARY KEY (`ManufacturerID`)
    ) ENGINE = InnoDB;

    -- Insert data into Manufacturers table
    INSERT INTO `Manufacturers` (`ManufacturerID`, `Name`, `ContactEmail`, `PhoneNumber`, `Address`)
    VALUES
        (1, 'TechCorp Industries', 'contact@techcorp.com', '555-0101', '123 Tech Street, San Francisco, CA'),
        (2, 'Digital Solutions Inc', 'info@digitalsolutions.com', '555-0202', '456 Digital Ave, Seattle, WA'),
        (3, 'ElectroMax Systems', 'sales@electromax.com', '555-0303', '789 Electronics Blvd, Austin, TX');

    -- -----------------------------------------------------
    -- Table: SalesAssociates
    -- -----------------------------------------------------
    DROP TABLE IF EXISTS `SalesAssociates`;

    CREATE TABLE IF NOT EXISTS `SalesAssociates` (
        `AssociateID` INT(11) NOT NULL AUTO_INCREMENT,
        `FirstName` VARCHAR(255) NOT NULL,
        `LastName` VARCHAR(255) NOT NULL,
        `Email` VARCHAR(255) DEFAULT NULL,
        `PhoneNumber` VARCHAR(50) DEFAULT NULL,
        `Type` VARCHAR(50) DEFAULT NULL,
        PRIMARY KEY (`AssociateID`)
    ) ENGINE = InnoDB;

    -- Insert data into SalesAssociates table
    INSERT INTO `SalesAssociates` (`AssociateID`, `FirstName`, `LastName`, `Email`, `PhoneNumber`, `Type`)
    VALUES
        (1, 'John', 'Smith', 'john.smith@techrus.com', '555-1001', 'Full-time'),
        (2, 'Sarah', 'Johnson', 'sarah.johnson@techrus.com', '555-1002', 'Part-time'),
        (3, 'Michael', 'Brown', 'michael.brown@techrus.com', '555-1003', 'Full-time');

    -- -----------------------------------------------------
    -- Table: Customers
    -- -----------------------------------------------------
    DROP TABLE IF EXISTS `Customers`;

    CREATE TABLE IF NOT EXISTS `Customers` (
        `CustomerID` INT(11) NOT NULL AUTO_INCREMENT,
        `FirstName` VARCHAR(255) NOT NULL,
        `LastName` VARCHAR(255) NOT NULL,
        `Email` VARCHAR(255) DEFAULT NULL,
        `PhoneNumber` VARCHAR(50) DEFAULT NULL,
        `Address` VARCHAR(255) DEFAULT NULL,
        PRIMARY KEY (`CustomerID`)
    ) ENGINE = InnoDB;

    -- Insert data into Customers table
    INSERT INTO `Customers` (`CustomerID`, `FirstName`, `LastName`, `Email`, `PhoneNumber`, `Address`)
    VALUES
        (1, 'Alice', 'Williams', 'alice.williams@email.com', '555-2001', '100 Main St, Portland, OR'),
        (2, 'Bob', 'Davis', 'bob.davis@email.com', '555-2002', '200 Oak Ave, Portland, OR'),
        (3, 'Carol', 'Miller', 'carol.miller@email.com', '555-2003', '300 Pine Rd, Portland, OR');

    -- -----------------------------------------------------
    -- Table: Products
    -- -----------------------------------------------------
    DROP TABLE IF EXISTS `Products`;

    CREATE TABLE IF NOT EXISTS `Products` (
        `ProductID` INT(11) NOT NULL AUTO_INCREMENT,
        `Name` VARCHAR(255) NOT NULL,
        `Description` TEXT DEFAULT NULL,
        `Price` DECIMAL(10, 2) NOT NULL,
        `Stock` INT(11) DEFAULT 0,
        `ManufacturerID` INT(11) DEFAULT NULL,
        PRIMARY KEY (`ProductID`),
        KEY `ManufacturerID` (`ManufacturerID`),
        CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`ManufacturerID`) 
            REFERENCES `Manufacturers` (`ManufacturerID`) 
            ON DELETE SET NULL 
            ON UPDATE CASCADE
    ) ENGINE = InnoDB;

    -- Insert data into Products table
    INSERT INTO `Products` (`ProductID`, `Name`, `Description`, `Price`, `Stock`, `ManufacturerID`)
    VALUES
        (1, 'Laptop Pro 15', 'High-performance laptop with 16GB RAM', 1299.99, 25, 1),
        (2, 'Wireless Mouse', 'Ergonomic wireless mouse', 29.99, 150, 2),
        (3, 'USB-C Cable', 'Fast charging USB-C cable', 19.99, 200, 3),
        (4, 'Keyboard Elite', 'Mechanical keyboard with RGB lighting', 89.99, 50, 1);

    -- -----------------------------------------------------
    -- Table: Sales
    -- -----------------------------------------------------
    DROP TABLE IF EXISTS `Sales`;

    CREATE TABLE IF NOT EXISTS `Sales` (
        `SaleID` INT(11) NOT NULL AUTO_INCREMENT,
        `CustomerID` INT(11) NOT NULL,
        `AssociateID` INT(11) NOT NULL,
        `OrderDate` DATE NOT NULL,
        `Status` VARCHAR(50) DEFAULT 'Pending',
        PRIMARY KEY (`SaleID`),
        KEY `CustomerID` (`CustomerID`),
        KEY `AssociateID` (`AssociateID`),
        CONSTRAINT `Sales_ibfk_1` FOREIGN KEY (`CustomerID`) 
            REFERENCES `Customers` (`CustomerID`) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE,
        CONSTRAINT `Sales_ibfk_2` FOREIGN KEY (`AssociateID`) 
            REFERENCES `SalesAssociates` (`AssociateID`) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
    ) ENGINE = InnoDB;

    -- Insert data into Sales table
    INSERT INTO `Sales` (`SaleID`, `CustomerID`, `AssociateID`, `OrderDate`, `Status`)
    VALUES
        (1, 1, 1, '2024-01-15', 'Completed'),
        (2, 2, 2, '2024-01-16', 'Pending'),
        (3, 1, 1, '2024-01-17', 'Completed');

    -- -----------------------------------------------------
    -- Table: SalesDetails
    -- -----------------------------------------------------
    DROP TABLE IF EXISTS `SalesDetails`;

    CREATE TABLE IF NOT EXISTS `SalesDetails` (
        `SalesDetailID` INT(11) NOT NULL AUTO_INCREMENT,
        `SaleID` INT(11) NOT NULL,
        `ProductID` INT(11) NOT NULL,
        `Quantity` INT(11) NOT NULL,
        `ItemPrice` DECIMAL(10, 2) NOT NULL,
        PRIMARY KEY (`SalesDetailID`),
        KEY `SaleID` (`SaleID`),
        KEY `ProductID` (`ProductID`),
        CONSTRAINT `SalesDetails_ibfk_1` FOREIGN KEY (`SaleID`) 
            REFERENCES `Sales` (`SaleID`) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE,
        CONSTRAINT `SalesDetails_ibfk_2` FOREIGN KEY (`ProductID`) 
            REFERENCES `Products` (`ProductID`) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
    ) ENGINE = InnoDB;

    -- Insert data into SalesDetails table
    INSERT INTO `SalesDetails` (`SalesDetailID`, `SaleID`, `ProductID`, `Quantity`, `ItemPrice`)
    VALUES
        (1, 1, 1, 1, 1299.99),
        (2, 1, 2, 2, 29.99),
        (3, 2, 3, 5, 19.99),
        (4, 3, 4, 1, 89.99);

    -- Re-enable foreign key checks
    SET FOREIGN_KEY_CHECKS = 1;
END //

-- =====================================================
-- Procedure: sp_delete_customer
-- =====================================================
CREATE PROCEDURE sp_delete_customer(IN p_CustomerID INT)
BEGIN
  DELETE FROM `Customers`
  WHERE `CustomerID` = p_CustomerID;
END //

DELIMITER ;


