import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { AnimalCard } from "./AnimalCard"
import "./Animal.css"

export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
    const { animals, getAnimals } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)


  //useEffect - reach out to the world for something
    useEffect(() => {
        console.log("AnimalList: Initial render before data")
        getLocations()
        .then(getCustomers)
        .then(getAnimals)
    }, [])

    const history = useHistory() 
  
    return (
        <>
           <h2>Animals</h2>
            <button onClick={() => {history.push("/animals/create")}}>
                Add Animal
            </button>
            <div className="animals">
        {animals.map(animal => {
            const owner = customers.find(customer => customer.id === animal.customerId)
            const office = locations.find(location => location.id === animal.locationId)
        
            return <AnimalCard key={animal.id} 
                               location={office}
                               customer={owner}
                               animal={animal} />
            })
        }
            </div>
        </>
  )
}
