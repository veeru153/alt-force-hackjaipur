import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CovidBeds, CovidPatients, EmptyBeds, EmptyVentilators } from '../Cards/Cards';
// import SwitchBtn from '../UI/SwitchBtn/SwitchBtn';
import SwitchBtn from '../UI/SwitchBtn/SwitchBtn';

import styles from './Dashboard.module.css';

const Dashboard = (props) => {
    const store = useSelector(state => state)
    const dispatch = useDispatch();
    const [accepting, setAccepting] = useState( store.data.accepting );
    console.log(store);

    const handleToggle = () => {
        const d = new Date();
        let hr = d.getHours() <= 9 ? `0${d.getHours()}` : d.getHours();
        let min = d.getMinutes() <= 9 ? `0${d.getMinutes()}` : d.getMinutes();
        let timeLabel = d.getHours() < 12 ? "AM" : "PM";
        let updateTime = `at ${hr}:${min}${timeLabel}`;
        // let updateTime = `at ${hr}:${min}${timeLabel}, ${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
        dispatch({ type: 'TOGGLE_STATUS', toggleLabel: "accepting", toggleResult: !accepting, time: updateTime });
        setAccepting(!accepting);
    }

    return (
        <div className={["d-flex flex-column align-items-center text-center", styles.Dashboard].join(' ')}>
            <div className={["row w-100 px-5 py-4", styles.header].join(' ')}>
                <div className={["col-6 text-left", styles.headerText].join(' ')}>Alt-Force</div>
                <div className={["col-6 text-right", styles.headerText].join(' ')}>Hospital Name</div>
            </div>
            <div className="my-3 d-flex flex-row flex-wrap text-center justify-content-around align-items-center" style={{ width: '90%' }}>
                <EmptyBeds />
                <EmptyVentilators />
                <CovidPatients />
                <CovidBeds />
            </div>
             <div className={["row w-100 px-5 py-4", styles.footer].join(' ')}>
                 <div className={["col-5 text-left ml-1", styles.footerText].join(' ')}>
                     Accepting COVID-19 Patients?
                    <SwitchBtn label={accepting} setLabel={handleToggle}/>
                 </div>
                 <div className={["col-5 offset-1 text-right mr-1", styles.footerText].join(' ')}>
                    Last Updated {store.data.lastUpdated}
                </div>
             </div>
        </div>
    )
}

export default Dashboard;