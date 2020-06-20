import React, { useState } from 'react';
import Card from './Card';

const CovidPatients = (props) => {
    const [covidPatients, setCovidPatients] = useState(0);

    const handleChange = (val) => {
        if(val == "") {
            setCovidPatients(0);
        } else {
            setCovidPatients(parseInt(val))
        }
    }

    return (
        <Card title="COVID-19 Patients" value={covidPatients} changeVal={(val) => handleChange(val)} />
    )
}

export default CovidPatients;