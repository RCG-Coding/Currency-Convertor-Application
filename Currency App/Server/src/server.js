const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.get("/get-all-currencies", async(req,res) => {
    const url = "https://openexchangerates.org/api/currencies.json?id=1ae32ce9e5e447d49a7a4cb379773550";
  
    try{
        const result = await axios.get(url);
        const response = result.data;
        return res.json(response);
    }catch(err){
        console.error(err);
    }
});

app.get("/get-time-currency", async(req,res) => {  
    const {date,sourceCurrency,targetCurrency,amountInSourceCurrency} = req.query;
    
    const url = `https://openexchangerates.org/api/historical/${date}.json?app_id=1ae32ce9e5e447d49a7a4cb379773550`;
  
    try{
        const result = await axios.get(url);
        const rates = result.data.rates;

        const target = rates[targetCurrency];
        const source = rates[sourceCurrency]

        const targetAmount = (target/source)*amountInSourceCurrency;

        return res.json(targetAmount);
    }catch(err){
        console.error(err);
    }
});

app.listen(5000,() => {
    console.log("Server is running on port 5000");
});