import React, { useEffect, useState } from 'react'
import { Table} from 'antd'
import axios from 'axios';
import cryptoData from './data'

import { LineChart, Line } from "recharts";    

const CryptoList = () => {

const [data, setData] = useState()


const getAllCrypto = async() => {
  try{
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&locale=en')
    setData(response.data)
  }catch(err){
    console.log(err)
  }
   
}

const fetchDataPeriodically = () => {
  setInterval(() => {
    getAllCrypto();
  }, 60000); // Fetch data every 1 minute
};

useEffect(() => {
  getAllCrypto(); 
  fetchDataPeriodically(); 
  return () => {
      clearInterval(fetchDataPeriodically); // Cleanup function to clear interval
  };
}, []);

    function internationalValueFormator(value){
        return new Intl.NumberFormat('en-US', 
    { style: 'decimal' }).format(value);
    }
   
    const DemoTinyLine = (values) => {
        
        
        return <LineChart width={150} height={30} data={values.map((value, index) => ({ name: index, value }))}>
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={1} dot={false} />
      </LineChart>;
      };

    
      

    const columns = [
        { title: "#",  key: "", render: (record, i, id) => (<div className='flex items-center gap-4'>{id+1} </div>) },
        { title: "Coin",  key: "",  render: (record) => (<div className='flex items-center gap-4'><img src={record.image} alt={record.name} width={'32'} /> <span className='text-lg font-medium'>{record.name}</span> <span className='text-base font-bold text-slate-400 text-end'> {record.symbol.toUpperCase()}</span></div>) },
        { title: "Price",  key: "", render: (record) => (<div className='text-lg'>${internationalValueFormator(record.current_price.toFixed(2))} </div>) },
        { title: "24h",  key: "",render: (record) => (<div className={`text-lg ${record.price_change_percentage_24h < 0 ? 'text-[red]' : 'text-[green]'}`}>${record.price_change_percentage_24h.toFixed(2)}% </div>)  },
        { title: "24h Volume",  key: "" ,render: (record) => (<div className='text-lg'>${internationalValueFormator(record.total_volume)} </div>) },
        { title: "Total Market Cap",  key: "",render: (record) => (<div className='text-lg'>${internationalValueFormator(record.market_cap)} </div>)  },
        { title: "24h Market Cap",  key: "",render: (record) => (<div className={`text-lg ${record.market_cap_change_percentage_24h < 0 ? 'text-[red]' : 'text-[green]'}`}>${record.market_cap_change_percentage_24h.toFixed(2)}% </div>)  },
        { title: "Last 7 Days", key: "" ,render: (record) => (<div className='text-lg'>{DemoTinyLine(record.sparkline_in_7d.price)}</div>) },
        
      ];

  return (
    <div>
        <div className='text-[24px] text-grey-300 p-6'>List of Crypto</div>
        <Table
          columns={columns}
          dataSource={data || cryptoData}
        />
    </div>
  )
}

export default CryptoList;
