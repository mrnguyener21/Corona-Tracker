import axios from 'axios'

const url = 'https://covid19.mathdro.id/api';

// why do we export the const this way instead of using export default at the bottom? 
export const fetchData = async (country) => {
    let changeableURL = url;

    if(country) {
        changeableURL = `${url}/countries/${country}`
    }
    
    try{
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableURL);

         return {confirmed,recovered,deaths,lastUpdate}
        
    }catch(error){
        console.log(error)
    }
}
export default fetchData;

export const fetchDailyData = async() => {
    try{
        const {data} = await axios.get(`${url}/daily`)
        
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))
        return modifiedData;
    }catch(error){
        console.log(error)
        return error;
    }
}

export const fetchCountries = async() => {
    try{
        const {data: {countries}} = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    }catch(error){
        console.log(error)
    }
}