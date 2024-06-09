import { Account } from "../dashboard/account/Account";
import { AudioAnalisis } from "../dashboard/audio-analisis/AudioAnalisis";
import { Favorites } from "../dashboard/favorites/Favorites";
import { Recomendations } from "../dashboard/recomendations/Recomendations";
import { Search } from "../dashboard/search/Search";
import { MainLayout } from "../layout/MainLayout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout>
          <Search />
        </MainLayout>
      ),
    },
    {
      path: "/audio-analisis",
      element: (
        <MainLayout>
          <AudioAnalisis />
        </MainLayout>
      ),
    },
    {
      path: "/favorites",
      element: (
        <MainLayout>
          <Favorites />
        </MainLayout>
      ),
    },
    {
      path: "/recomendations",
      element: (
        <MainLayout>
          <Recomendations />
        </MainLayout>
      ),
    },
    {
      path: "/account",
      element: (
        <MainLayout>
          <Account />
        </MainLayout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};