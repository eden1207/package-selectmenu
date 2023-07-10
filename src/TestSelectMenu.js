import React, { useState } from 'react';
import { states } from './data/states.js'
//import '../styles/Home/Home.css'
import SelectMenu from './lib/components/SelectMenu.js';


/**
 * Function associate to the home page of the web site
 * There are many fields whose values are saved in states and send to the store after the user click
 * on the save button
 */
export default function TestSelectMenu() {
    const [state, setState] = useState(states[0].abbreviation);
    return(
        <React.Fragment>
            <h1>Your element selected: {state}</h1>
            <div className="container">
                <label htmlFor="state">State</label>
                <SelectMenu 
                    options={states}
                    SelectMenuID={"state"}
                    setData={setState}
                />
            </div>
        </React.Fragment>
    )
}