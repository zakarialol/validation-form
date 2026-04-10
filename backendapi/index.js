const express = require("express");
const app = express();
app.get("/verify-email", async (req, res) => {
    console.log("we recive info from the front end")
  const email = req.query.email;

  try {
    const response = await fetch(
      `https://api.easyemailapi.com/verify?email=${email}&api_key=YOUR_API_KEY`,{
        headers : {
           Authorization: `bearer ${process.env.easyMailToken}`
        } 
      }
    );
    if(!response.ok){
        throw new error("something went wrong");  
    }
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => console.log("Server running"));