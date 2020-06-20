import React, { useState } from 'react'
// import CustomBtn from '../UI/CustomBtn/CustomBtn'
import CustomBtn from '../UI/CustomBtn/CustomBtn';

import styles from './Card.module.css';

const Card = (props) => {
    const [update, setUpdate] = useState(false);

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
                <CustomBtn title="UPDATE" bgColor="#25CEDE" click={() => setUpdate(!update)}/> :
                <CustomBtn title="SAVE" bgColor="#25CEDE" click={() => setUpdate(!update)}/>
            }
        </div>
    )
}

export default Card;