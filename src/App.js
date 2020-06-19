import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [shoes, setShoes] = useState([])

  const fetchShoes = async () => {
    try {
      const shoeDataFetch = await fetch('http://127.0.0.1:8000/shoes/')
      const shoeData = await shoeDataFetch.json()
      fillShoeData(shoeData.results)
    } catch(err) {
      console.error(err)
    }
  }

  const fillShoeData = async (fetchData) =>{
    const fullData = await Promise.all(
      fetchData.map(async shoe => {
        const shoeColorFetch = await fetch(shoe.color)
        const shoeColorData = await shoeColorFetch.json()
        shoe.color = shoeColorData

        const shoeManufacturerFetch = await fetch(shoe.manufacturer)
        const shoeManufacturerData = await shoeManufacturerFetch.json()
        shoe.manufacturer = shoeManufacturerData

        const shoeTypeFetch = await fetch(shoe.shoe_type)
        const shoeTypeData = await shoeTypeFetch.json()
        shoe.shoe_type = shoeTypeData

        return shoe
      })
    )

    makeShoeCards(fullData)
  }

  const makeShoeCards = async (shoeData) => {
    console.log(shoeData)
    setShoes(shoeData.map(shoe => {
      return (
        <div id="card wrapper" key={Math.random()}>
          <h1>{ shoe.brand_name }</h1>
          <h3>Size: { shoe.size }</h3>
          <h3>Fastener: { shoe.fasten_type }</h3>
          <h3>Manufacturer: {shoe.manufacturer.name}</h3>
          <ul>
            <li><a href={shoe.manufacturer.website}>{shoe.manufacturer.website}</a></li>
          </ul>
          <h3>Color: {shoe.color.color_name}</h3>
          <h3>Material: {shoe.material}</h3>
          <h3>Type: {shoe.shoe_type.style}</h3>
          <h3>Fasten: {shoe.fasten_type}</h3>
        </div>
      )
    }))
  }

  if (shoes.length < 1){
    fetchShoes()
  } 

  return (
    <div className="App">
      <header className="App-header">
        { shoes }
      </header>
    </div>
  );
}

export default App;
