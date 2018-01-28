import Relay from 'react-relay/classic'


const {
    Environment,
    Network,
    RecordSource,
    Store,
} = require('relay-runtime');


const  store = new Store(new RecordSource());

const network = Network.create((operation, variables) => {
    return fetch('http://127.0.0.1:8000/graphql/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    }).then(response => {
        return response.json()
    });
})

const environment = new Environment({
    handleProvider: null,
    network,
    store
})

export  default environment
