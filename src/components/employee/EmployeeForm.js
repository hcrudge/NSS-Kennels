import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import "./Employee.css"
import { useHistory } from "react-router-dom";
import { EmployeeContext } from "./EmployeeProvider";


export const EmployeeForm = () => {
    const { addEmployee } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)
    const history = useHistory();

    const [employee, setEmployee] = useState({
     name:"",
     locationId:0
    });
    /*
     Reach out to the world and get customers state
     and locations state on initialization.
      */
    useEffect(() => {
        getLocations()
    },[])

  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
    const handleControlledInputChange = (event) => {
        const newEmployee = {...employee }

        newEmployee[event.target.id] = event.target.value

        setEmployee(newEmployee)
    }

    const handleClickSaveEmployee = (event) => {
        event.preventDefault()
        
        const locationId = parseInt(employee.locationId)

        if (locationId === 0 ) {
            window.alert("Please select a location")
        } else {
            const newEmployee = {
                name: employee.name,
                locationId: locationId
            }
            addEmployee(newEmployee)
            .then(() => history.push("/employees"))
        }
    }

    return(
        <form className="employeeForm">
      <h2 className="employeeForm__title">New Employee</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Employee Full Name:</label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Employee name" value={employee.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
     
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to location: </label>
          <select name="locationId" id="locationId" className="form-control" value={employee.locationId} onChange={handleControlledInputChange}>
            <option value="0">Select a location</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      
      <button className="btn btn-primary" onClick={handleClickSaveEmployee}>
        Save Employee
          </button>
    </form>
    )
}
