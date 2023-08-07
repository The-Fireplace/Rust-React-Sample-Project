import React from 'react';
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';

const Index = () => {
    const router = createBrowserRouter(
        [
            {
                path: '/',
                element: <Outlet/>,
                errorElement: <>Error</>,
                children: [
                    {
                        index: true,
                        element: <React.Suspense fallback={<>...</>}>
                            <>This is the main page.</>
                        </React.Suspense>,
                    },
                    {
                        path: 'some_other_page',
                        element: <React.Suspense fallback={<>...</>}>
                            <>This is another page.</>
                        </React.Suspense>,
                    },
                ],
            }
        ],
    );

    return (
        <RouterProvider router={router}/>
    );
}

export default Index;