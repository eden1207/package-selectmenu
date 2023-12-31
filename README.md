## A npm package to create a select menu list of elements

This is a package to create a select menu list thanks to a collection of elements.
This collection must be an array of objects, which are containing a name and an abbreviation as
you can see here on this example.

```jsx
export const states = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
];
```

### Install

If you want to use this package, please, create your own react app and install the package in the
root of your project,

```
npm i package-select-menu
```

### Usage 

In a React app, if you want to create a select menu in your component, import the select menu  

```
import SelectMenu from 'package-select-menu';
```

#### SelectMenu props

When you are using the component SelectMenu, there are five props values available:

| Name                         | Description      
| -----------                  | -----------                  
| options                      | arrayOfObjects
| setData                      | function             
| btnListWidthValue (optional) | number        
| listWidthValue (optional)    | number  
| isDisableValue (optional)    | boolean 

The first one, is the options, containing the array of objets described on the beginning.
Then, the purpose of this list is to click on one element. When you do this, the value abbreviation
will be saved in a state. That is why you have to create a hook useState and call the function in the
props setData. The props btnListWidthValue and listWidthValue are used optionally to enter the list button width and the list width value. The option isDisableValue is a boolean to make the select menu available (false) or not (true). There is down here an example of how you can use the SelectMenu:

```jsx
import React, { useState } from 'react';
import SelectMenu from 'package-select-menu';

export default function YourComponent() {
    const fruits = [
        {
            "name": "Strawberry",
            "abbreviation": "ST"
        },
        {
            "name": "Lemon",
            "abbreviation": "LE"
        },
        {
            "name": "Banana",
            "abbreviation": "BA"
        }
    ];
    const [fruit, setFruit] = useState(fruits[0].abbreviation);
    return(
        <React.Fragment>
            <SelectMenu 
                options={fruits}
                setData={setFruit}
            />
        </React.Fragment>
    )
}
```