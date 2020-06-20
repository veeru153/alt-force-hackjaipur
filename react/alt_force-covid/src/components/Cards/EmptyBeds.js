import React, { useState } from 'react';
import Card from './Card';

const EmptyBeds = (props) => {
    const [beds, setBeds] = useState(0);

    const handleChange = (val) => {
        if(val == "") {
            setBeds(0);
        } else {
            setBeds(parseInt(val))
        }
    }
    
    return (
        <Card title="Empty Beds" value={beds} changeVal={(val) => handleChange(val)}/>
    )
}

export default EmptyBeds;