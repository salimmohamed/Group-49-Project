const db = require("../database/config");

const resetDatabase = async (req, res) => {
  try {
    await db.query("CALL sp_reset_techrus()");

    res.status(200).json({
      success: true,
      message: "Database has been reset successfully.",
    });
  } catch (error) {
    console.error("Error resetting database:", error);

    if (error.code === 'ER_SP_DOES_NOT_EXIST') {
      return res.status(404).json({
        success: false,
        error: "Stored procedure not found. Please ensure it exists in the database.",
      });
    }

    res.status(500).json({
      success: false,
      error: "An error occurred while resetting the database.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

module.exports = {
  resetDatabase,
};
