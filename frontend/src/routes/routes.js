import React from 'react';
export default [
    {
        path: '/',
        exact: true,
        sidebar: () => <div>home!</div>,
        main: () => <h2>Home</h2>,
        name: 'Home',
    },
    {
        path: '/stocks',
        sidebar: () => <div>bubblegum!</div>,
        main: () => <h2>Bubblegum</h2>,
        name: 'Stocks',
    },
    {
        path: '*',
        name: 'Page Not Found'
    },
]