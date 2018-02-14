import React from 'react';

export default [
    {
        path: '/',
        exact: true,
        sidebar: () => <div>home!</div>,
        main: require('src/containers/Pages/MainPage').default,
        name: 'Home',
    },
    {
        path: '/sentiment-analysis',
        sidebar: () => <div>bubblegum!</div>,
        main: () => <h2>Bubblegum</h2>,
        name: 'Sentiment Analysis',
    },
    {
        path: '/company/:companySymbol/',
        sidebar: () => <div>company!</div>,
        main: require('src/containers/Pages/CompanyPage').default,
        name: 'Stocks',
    },
    // {
    //     path: '*',
    //     // TODO: Replace ths with a proper page
    //     name: 'Page Not Found',
    //     main: () => <div>Page not found</div>
    // },
]