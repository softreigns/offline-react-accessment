"use client";

import React from 'react';

import styles from './entryForm.css';
import {getLocations,isNameValid} from '../mock-api/apis.js';

function EntryForm(
) {

    const [name, setName] = React.useState("");
    const [nameError, setNameError] = React.useState(0);
    const [selectedLocation, setSelectedLocation] = React.useState("");
    const [locations, setLocations] = React.useState([]);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        getLocations().then((val) => {
            setLocations(val);
        });
    }, []);
    
    
    function onChange(event) {
        let name = event.target.value;
        isNameValid(name).then((val) => {
            if(val) {
                console.log(name);
                setName(name);
                setNameError(0);
            } else {
                setNameError(1);
            }
        });
    }


    function handleSelection(event) {
        console.log(event.target.value);
        if (event.target.selectedIndex > 0) {
            console.log(selectedLocation);
            setSelectedLocation(event.target.value);
            console.log(selectedLocation);
        } else {
            setSelectedLocation("none");
        }
    }

    function clearData() {
        console.log(data);
        setData([]);
        console.log(data);
    }


    function addData(event) {

        if(selectedLocation == "") {
            setSelectedLocation("none");
            return;
        }
        if(name == "") {
            setNameError(1);
            return;
        }
        let item = {
            "name": name,
            "location": selectedLocation
        }
        setData([...data, item]);
        console.log(data);
        
        document.getElementsByTagName("select")[0].selectedIndex = 0;
        document.getElementsByTagName("input")[0].value = "";
        setSelectedLocation("");
        setName("");
    }

    return (
        <div className='entryDiv'>
            <div className='entryForm, border'>
                <div  className='input' >
                    <div className='leftColumn'>
                        <label  >Name</label>
                    </div>
                    <div className='rightColumn'>
                        <input type='text' className='border  rightColumnField' onChange={onChange}></input>
                        <span className={ (nameError == 0 ?  'rightColumnField, errorField, hideField' : 'rightColumnField, errorField')}>This name has already been taken</span>
                    </div>
                    <div className='leftColumn'>
                        <label >Location</label>
                    </div>
                    <div className='rightColumn'>
                        <select className='border rightColumnField' onChange={handleSelection}> 
                            <option > -- Select -- </option>
                                    {/* Mapping through each fruit object in our fruits array
                                and returning an option element with the appropriate attributes / values.
                                */}
                            { 
                             locations.map((country, i) => {
                                return <option key={i} value={country}>{country} 
                                       </option>;
                              })
                            }                            
                        </select>
                        <span className={ (selectedLocation != "none" ?  'rightColumnField, errorField, hideField' : 'rightColumnField, errorField')}>Select a location</span>
                    </div>
                </div>
                <div>
                    <div className='leftColumn'></div>
                    <div className='rightColumn rightAlign'>
                        <button className='border rightAlign' onClick={clearData}>Clear</button>
                        <button className='border rightAlign'  onClick={addData}>Add</button>
                    </div>
                </div>
                <div className='list'>
                    <div>
                        <div>
                    <table className='border'>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Location</th>
                            </tr>
                            {data.map((item, i) => (
                                <tr key={i} className={(i%2==0) ? 'trShade': 'trWhite'}>
                                <td>{item.name}</td>
                                <td>{item.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div></div>
                    {/* <div>
                        {JSON.stringify(data)}
                    </div> */}
                </div>
            </div>
        </div>
    )
};


export default EntryForm;