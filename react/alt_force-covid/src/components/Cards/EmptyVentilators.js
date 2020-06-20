import React, { useState } from 'react';
import Card from './Card';

const EmptyVentilators = (props) => {
    const [ventilators, setVentilators] = useState(0);

    const handleChange = (val) => {
        if(val == "") {
            setVentilators(0);
        } else {
            setVentilators(parseInt(val))
        }
    }

    return (
        <Card title="Empty Ventilators" value={ventilators} changeVal={(val) => handleChange(val)}/>
    )
}

export default EmptyVentilators;