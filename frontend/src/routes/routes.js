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
        path: '/company/:companySymbol*',
        sidebar: () => <div>company!</div>,
        main: require('../containers/Pages/CompanyPage').default,
        name: 'Company',
    },
    // {
    //     path: '*',
    //     // TODO: Replace ths with a proper page
    //     name: 'Page Not Found',
    //     main: () => <div>Page not found</div>
    // },
]