const express = require("express");
const route = express.Router();
const dotenv = require("dotenv");

dotenv.config();

const BASE_URL = process.env.BASE_URL;

route.get("/productswithpriority", async (req, res) => {
  const { topN } = req.body;
  const headers = req.headers.authorization;
  if (!headers) {
    res.status(400).json({
      message: "NO TOKEN FOUND",
    });
  }
  const token = headers.split(" ")[1];
  try {
    const response = await fetch(`${BASE_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
// console.log(data);
    const typeOrder = {
      Placement: 1,
      Result: 2,
      Event: 3,
    };

    const orderedData = data.notifications.sort((a, b) => {
      const typeDiff = (typeOrder[a.Type] || 999) - (typeOrder[b.Type] || 999);

      if (typeDiff !== 0) return typeDiff;

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const output = orderedData.slice(0, topN);

    res.status(200).json({
      output
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
module.exports = route;
