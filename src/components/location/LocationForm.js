import React, { useContext, useState } from "react"
import "./Location.css"
import { useHistory } from "react-router-dom";
import { LocationContext } from "./LocationProvider";



export const LocationForm = () => {
    const { addLocation } = useContext(LocationContext)
    const history = useHistory();

    const [location, setLocation] = useState({
     name:"",
     address:""
    });

  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
    const handleControlledInputChange = (event) => {
        const newLocation = {...location }

        newLocation[event.target.id] = event.target.value

        setLocation(newLocation)
    }

    const handleClickSaveLocation = (event) => {
        event.preventDefault()

            const newLocation = {
                name: location.name,
                address: location.address
            }
            addLocation(newLocation)
            .then(() => history.push("/locations"))
        }
    

    return(
        <form className="LocationForm">
      <h2 className="employeeForm__title">New Location</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Location Name:</label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Location name" value={location.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
     
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Location Address: </label>
          <input type="text" id="address" required autoFocus className="form-control" placeholder="Location address" value={location.address} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      
      <button className="btn btn-primary" onClick={handleClickSaveLocation}>
        Save Location
          </button>
    </form>
    )
}

