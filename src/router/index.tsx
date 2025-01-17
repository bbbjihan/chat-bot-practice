import MainPage from "@/pages/MainPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainPage />,
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
