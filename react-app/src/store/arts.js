const GET_ALL_ART = '/arts'

const setArt = (art) => ({
    type: GET_ALL_ART,
    payload: art
})

export const getArt = () => async dispatch => {
    try {
        const response = await fetch('/api/art/')
        if(!response.ok) throw response;
        const data = await response.json();
        dispatch(setArt(data))
    } catch (error) {
        console.error('Error fetching art: ', error);
    }
}


const initialState = []

const artReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_ALL_ART:
            return [
                ...state,
                ...action.payload
            ]
        default:
            return state;
    }
}

export default artReducer
