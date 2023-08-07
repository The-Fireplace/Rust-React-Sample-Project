import React from 'react';
import ReactDOM from 'react-dom/client';

const Index = React.lazy(() => import('./spa/index'));

const container = document.getElementById('app');

if (container != null) {
    const root = ReactDOM.createRoot(container);

    root.render(
        <React.StrictMode>
            <Index/>
        </React.StrictMode>
    );
}
