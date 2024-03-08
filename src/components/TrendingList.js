import { useEffect, useState } from "react";
import axios from 'axios';

const TrendingList = () => {
    const [trendingData, setTrendingData] = useState()

    const getTrendingData = async () => {
        const response = await axios.get('https://api.coingecko.com/api/v3/search/trending');
        setTrendingData(response.data.coins)
    }
const fetchDataPeriodically = () => {
    setInterval(() => {
        getTrendingData();
    }, 60000); // Fetch data every 1 minute
};

useEffect(() => {
    getTrendingData(); 
    fetchDataPeriodically(); 
    return () => {
        clearInterval(fetchDataPeriodically); // Cleanup function to clear interval
    };
}, []);

    const fixedDecimal = (value) => {
        
        if (!isNaN(value) && typeof value === 'string') {
           
            return parseFloat(value).toFixed(2);
        } else {
           
            return value;
        }
    }

    return (
        <>
        <div className="text-[32px] text-center">Trending currencies</div>
        <div className="flex gap-4">
            
            {
                trendingData?.slice(0, 4).map((trending) => (
                    <div className="rounded-lg border shadow-sm" data-v0-t="card">
                        <div className="p-6 flex flex-row items-center justify-between pb-2 space-y-0">
                            <div className="flex flex-row items-center gap-2">
                            <img src={trending.item.thumb} alt="/" width={'24'} />
                            <h3 className="whitespace-nowrap tracking-tight text-lg font-medium">{trending.item.name}</h3>
                            </div>
                            <span className="text-sm font-normal tracking-wider"><span className="text-[green]">{fixedDecimal(trending.item.data.price)} </span></span>

                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 text-2xl font-bold">
                               
   
                            </div>
                            <p className="text-s">Market cap: {trending.item.data.market_cap} | Volume: {trending.item.data.total_volume}</p>
                        </div>
                    </div>
                ))
            }
</div>
        </>
    )


}

export default TrendingList;