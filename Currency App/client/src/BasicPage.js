import React,{useEffect, useState} from 'react';
import axios from 'axios';

function BasicPage() {

  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const[currencyNames, setCurrencyNames] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const url = "http://localhost:5000/get-time-currency";
      const result = await axios.get(url, {
        params:{
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency
        }
      });

      setAmountInTargetCurrency(result.data);
      console.log(date,sourceCurrency,targetCurrency,amountInSourceCurrency);

    }catch(err){
      console.error(err);
    }

  }

  useEffect(() => {
    const getCurrencyNames = async() => {
      try{
        const result = await axios.get(
          "http://localhost:5000/get-all-currencies"
        );
  
        setCurrencyNames(result.data);

      }catch(err){
        console.error(err);
      }  
    }
    getCurrencyNames();

  }, []);

  return (
    <div>
      <h1 className='lg:mx-32 text-5xl text-orange-600 font-bold text-center'>
        Currency Convertor
      </h1>

      <p className='lg:mx-32 opacity-40 py-10 text-gray-100'>
        Welcome to Our application,This application allows you to easily 
        compare your currency with other currency 
        based on the latest exchange rates 
      </p>

      <div className="mt-5 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor={date} 
              className="block mb-2 text-sm font-medium
               text-white">Date :</label>
              
              <input onChange={(e) => setDate(e.target.value)}
              type="date"  
              id={date}  
              name={date}  
              className="bg-gray-400 
               border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-green-500 focus:border-green-500 block w-full 
                p-2.5 dark:bg-gray-700 dark:border-gray-600
               dark:placeholder-gray-400 dark:text-white
                dark:focus:ring-green-500 dark:focus:border-green-500" 
                required />   
            </div>

            <div className="mb-5">
              <label htmlFor={sourceCurrency} 
              className="block mb-2 text-sm font-medium
               text-white">Source Currency :</label>
            
              <select onChange={(e) => setSourceCurrency(e.target.value)}
              id={sourceCurrency}
              name={sourceCurrency}
              value={sourceCurrency}
              className="bg-gray-400  
              border-gray-300 text-gray-900 text-sm rounded-lg
               focus:ring-green-500 focus:border-green-500 block w-full 
               p-2.5 dark:bg-gray-700 dark:border-gray-600
              dark:placeholder-gray-400 dark:text-white
               dark:focus:ring-green-500 dark:focus:border-green-500">  
              
                <option value="">Select Source Currency</option>
                {Object.keys(currencyNames).map((cur) =>( 
                  <option className='p-1' key={cur} value={cur}>
                    {currencyNames[cur]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label htmlFor={targetCurrency} 
              className="block mb-2 text-sm font-medium
               text-white">Target Currency :</label>
            
              <select onChange={(e) => setTargetCurrency(e.target.value)}
              id={targetCurrency}
              name={targetCurrency}
              value={targetCurrency}
              className="bg-gray-400  
              border-gray-300 text-gray-900 text-sm rounded-lg
               focus:ring-green-500 focus:border-green-500 block w-full 
               p-2.5 dark:bg-gray-700 dark:border-gray-600
              dark:placeholder-gray-400 dark:text-white
               dark:focus:ring-green-500 dark:focus:border-green-500">  
              
                <option value="">Select Target Currency</option>
                {Object.keys(currencyNames).map((cur) =>( 
                  <option className='p-1' key={cur} value={cur}>
                    {currencyNames[cur]}
                  </option>
                ))}
              </select>
           </div>

           <div className="mb-5">
              <label htmlFor={amountInSourceCurrency} 
              className="block mb-2 text-sm font-medium
               text-white">Amount In Source Currency :</label>
              
              <input onChange={(e) => setAmountInSourceCurrency(e.target.value)}
              type="text" 
              id={amountInSourceCurrency}
              name={amountInSourceCurrency}
              className="bg-gray-400 
              border-gray-300 text-gray-900 text-sm rounded-lg
               focus:ring-green-500 focus:border-green-500 block w-full 
               p-2.5 dark:bg-gray-700 dark:border-gray-600
              dark:placeholder-gray-400 dark:text-white
               dark:focus:ring-green-500 dark:focus:border-green-500" 
               placeholder="Ammount In Source Currency" 
                required />   
            </div>

            <button className="bg-blue-700 hover:bg-blue-900 text-white
            font-medium py-2 px-4 rounded-lg my-3">
              Converte</button>

          </form>
        </section>
      </div>
      {amountInTargetCurrency}

    </div>
  );
}

export default BasicPage;