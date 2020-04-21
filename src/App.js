import React from 'react';
import {Cards,Chart,Country} from './Components'
//these were able to deconstructed the import thanks to the index.js within the component file
import {fetchData} from './api';
import styles from './App.module.css'

import image from './images/image.png'

class App extends React.Component{
    state = {
       data: {},
       country: '',//
  }

    async componentDidMount() {
        const fetchedData  = await fetchData();

        this.setState({ data: fetchedData });
    }
    
    handleCountryChange = async (country) => {
        const fetchedData  = await fetchData(country);

        this.setState({ data: fetchedData, country: country });//why cant i destructure country

    }

    render(){
        const {data, country} = this.state;
        return(
            <div className={styles.container}>
                <img className={styles.image} src = {image} alt='COVID-19' />
                <Cards data={data}/>
                <Country handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;
