import { createHashRouter } from "react-router";

export const router = createHashRouter([
    {
        path: "/",
        lazy: async () => {
            const { Dashboard } = await import("./pages/dashboard.tsx");
            return {
                Component: Dashboard,
            };
        },
    },
    {
        path: "/galery",
        element: <div>Galery</div>,
    },
    {
        path: "/mnj",
        element: <div>Mnj</div>,
    },
    {
        path: "/letters",
        element: <div>Can&apos;t Sleep</div>,
    },
    {
        path: "/bd/22",
        lazy: async () => {
            const { Bd22Nd } = await import("./pages/birthday/bd22nd.tsx");
            return {
                Component: Bd22Nd,
            };
        },
    },
]);
