const initState = {
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
    switch(actions.type) {
        case 'UPDATE_VALUE':
            return {
                ...state,
                data: {
                    ...state.data,
                    [actions.valType]: actions.value,
                    lastUpdated: actions.time
                }
            }
        
        case 'TOGGLE_STATUS':
            return {
                ...state,
                data: {
                    ...state.data,
                    [actions.toggleLabel]: actions.toggleResult,
                    lastUpdated: actions.time
                },
            }
        
        case 'INIT_DASHBOARD':
            return {
                ...state,
                name: actions.hospital.name,
                email: actions.hospital.email,
                govtHospital: actions.hospital.govtHospital,
                ambulance: actions.hospital.ambulance,
                covidExclusive: actions.hospital.covidExclusive,
                coords: actions.coords,
            }

        default:
            return state;
    }
}

export default reducer;