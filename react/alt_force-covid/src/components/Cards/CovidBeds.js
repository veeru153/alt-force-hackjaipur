import React, { useState } from 'react';
import Card from './Card';

const CovidBeds = (props) => {
    const [covidBeds, setCovidBeds] = useState(0);

    const handleChange = (val) => {
        if(val == "") {
            setCovidBeds(0);
        } else {
            setCovidBeds(parseInt(val))
        }
    }

    return (
        <Card title="Beds for COVID-19 Patients" value={covidBeds} changeVal={(val) => handleChange(val)} />
    )
}

export default CovidBeds;