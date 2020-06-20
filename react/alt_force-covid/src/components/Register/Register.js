import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomBtn from '../UI/CustomBtn/CustomBtn'
import { withRouter } from 'react-router-dom';


import styles from './Register.module.css'

// Setup redirect

const RegistrationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    govtHospital: yup.bool().required(),
    covidExclusive: yup.bool().required(),
    ambulance: yup.bool().required(),
})

const Register = (props) => {
    const store = useSelector(state => state)
    const dispatch = useDispatch();
    const initValues = {
        name: store.name,
        email: store.email,
        govtHospital: store.govtHospital,
        ambulance: store.ambulance,
        covidExclusive: store.covidExclusive,
    }

    return (
        <div className={["d-flex flex-column align-items-center text-center", styles.Register].join(' ')}>
            <Formik
                initialValues={initValues}
                validationSchema={RegistrationSchema}
                onSubmit={async (values, actions) => {
                    // let currCoords = new Array(2);
                    navigator.geolocation.getCurrentPosition( (pos) => {
                        dispatch({ type: 'INIT_DASHBOARD', hospital: values, coords: [pos.coords.latitude, pos.coords.longitude]})
                        props.history.push("/dashboard");
                    })
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit} className={styles.formContainer}>
                        <div className={styles.formHeader}>
                            <p>Alt-Force COVID-19 Dashboard</p>
                            <p>Register</p>
                        </div>
                        <div className={styles.formInputContainer}>
                            <label>Name: </label>
                            <input 
                                name="name"
                                type="text"
                                placeholder="Hospital Name"
                                autoComplete="off"
                                onChange={props.handleChange('name')}
                                value={props.values.name}
                            />
                        </div>

                        <div className={styles.formInputContainer}>
                            <label>Email: </label>
                            <input 
                                name="email"
                                type="email"
                                placeholder="Email ID"
                                autoComplete="off"
                                onChange={props.handleChange('email')}
                                value={props.values.email}
                            />
                        </div> 

                        <div className={styles.checkboxContainer}>
                            <div className={styles.checkboxInputs}>
                                <label className={styles.checkboxLabel}>Government Hospital?</label>
                                <label className={styles.switch}>
                                    <input 
                                        name="govtHospital"
                                        type="checkbox"
                                        checked={props.values.govtHospital}
                                        onChange={props.handleChange('govtHospital')}
                                        value={props.values.govtHospital}
                                    />
                                    <span className={[styles.slider, styles.round].join(' ')}></span>
                                </label>
                            </div>
                            
                            <div className={styles.checkboxInputs}>
                                <label className={styles.checkboxLabel}>COVID-19 Exclusive?</label>
                                <label className={styles.switch}>
                                    <input 
                                        name="covidExclusive"
                                        type="checkbox"
                                        checked={props.values.covidExclusive}
                                        onChange={props.handleChange('covidExclusive')}
                                        value={props.values.covidExclusive}
                                    />
                                    <span className={[styles.slider, styles.round].join(' ')}></span>
                                </label>
                            </div>

                            <div className={styles.checkboxInputs}>
                                <label className={styles.checkboxLabel}>Ambulance Facility?</label>
                                <label className={styles.switch}>
                                    <input 
                                        name="ambulance"
                                        type="checkbox"
                                        checked={props.values.ambulance}
                                        onChange={props.handleChange('ambulance')}
                                        value={props.values.ambulance}
                                    />
                                    <span className={[styles.slider, styles.round].join(' ')}></span>
                                </label>
                            </div>
                        </div>
                        <CustomBtn title="NEXT" bgColor="#25CEDE" click={props.submitForm}/>
                    </form>
                )}

            </Formik>

        </div>
    )
}

export default withRouter(Register);