import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/dashboard";
import { Bd22Nd } from "./pages/birthday/bd22nd";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
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
    element: <Bd22Nd />,
  },
]);
