-- Stored procedure to delete a customer by CustomerID

DROP PROCEDURE IF EXISTS sp_delete_customer;

DELIMITER //

CREATE PROCEDURE sp_delete_customer(IN p_CustomerID INT)
BEGIN
  DELETE FROM `Customers`
  WHERE `CustomerID` = p_CustomerID;
END //

DELIMITER ;


