import axios from 'axios';

export function getFact() {
    return (dispatch, prevState) => {
        axios.get('https://cat-fact.herokuapp.com/facts/random?amount=15')
            .then(response =>{
                 dispatch({ type: 'GET_FACT', newFact: response.data})
            })
           // .catch(err => console.error("Error in getFact: " + err));
    };
}

export default function reducer(state = { facts: [] }, action) {
    switch(action.type) {
        case 'GET_FACT':
            return {
                facts: [...action.newFact]
            };
        default:
            return state;
    }
}
