import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import CustomBtn from '../UI/CustomBtn/CustomBtn';

import styles from './Card.module.css';

const Card = (props) => {
    const store = useSelector(state => state);
    const dispatch = useDispatch();
    const [update, setUpdate] = useState(false);

    const handleClick = () => {
        if(update == true) {
            const d = new Date();
            let hr = d.getHours() <= 9 ? `0${d.getHours()}` : d.getHours();
            let min = d.getMinutes() <= 9 ? `0${d.getMinutes()}` : d.getMinutes();
            let timeLabel = d.getHours() < 12 ? "AM" : "PM";
            let updateTime = `at ${hr}:${min}${timeLabel}`;
            dispatch({ type: 'UPDATE_VALUE', valType: props.valType, value: props.value, time: updateTime });
        }
        setUpdate(!update);
    }

    return (
        <div className={styles.Card}>
            <div className={styles.cardTitleContainer}>
                <p className={styles.cardTitle}>{props.title}</p>
            </div>
            <div className={styles.cardValue}>
                <input 
                    type="text" 
                    name="cardValue" 
                    value={props.value} 
                    onChange={(e) => props.changeVal(e.target.value)} 
                    readOnly={!update} />
            </div>
            {
                update ? 
                <CustomBtn title="SAVE" bgColor="#25CEDE" click={handleClick}/> :
                <CustomBtn title="UPDATE" bgColor="#25CEDE" click={handleClick}/>
            }
        </div>
    )
}

export default Card;