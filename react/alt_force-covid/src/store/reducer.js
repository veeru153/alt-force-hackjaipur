const initState = {
    registered: false,
    name: "",
    email: "",
    coords: "",
    govtHospital: false,
    ambulance: false,
    covidExclusive: false,
    data: {
        accepting: true,
        emptyBeds: 0,
        emptyVentilators: 0,
        covidPatients: 0,
        covidBeds: 0,
        lastUpdated: "Now",
    }
}

const reducer = (state = initState, actions) => {
    const d = new Date();
    let hr = d.getHours() <= 9 ? `0${d.getHours()}` : d.getHours();
    let min = d.getMinutes() <= 9 ? `0${d.getMinutes()}` : d.getMinutes();
    let timeLabel = d.getHours() < 12 ? "AM" : "PM";
    let updateTime = `at ${hr}:${min}${timeLabel}`;
    // let updateTime = `at ${hr}:${min}${timeLabel}, ${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

    switch(actions.type) {
        case 'UPDATE_VALUE':
            return {
                ...state,
                data: {
                    ...state.data,
                    [actions.valType]: actions.value,
                    lastUpdated: updateTime
                }
            }
        
        case 'TOGGLE_STATUS':
            return {
                ...state,
                data: {
                    ...state.data,
                    [actions.toggleLabel]: actions.toggleResult,
                    lastUpdated: updateTime
                },
            }
        
        case 'INIT_DASHBOARD':
            return {
                ...state,
                registered: true,
                name: actions.hospital.name,
                email: actions.hospital.email,
                govtHospital: actions.hospital.govtHospital,
                ambulance: actions.hospital.ambulance,
                covidExclusive: actions.hospital.covidExclusive,
                coords: actions.coords,
                data: {
                    ...state.data,
                    lastUpdated: updateTime
                }
            }

        default:
            return state;
    }
}

export default reducer;