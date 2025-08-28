import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PUBLIC_ROUTES } from "./routes";
import Loader from "../components/Loader/Loader";

const NavigationRoutes = () => {
  const Characters = lazy(() => import("../pages/Characters/Characters"));
  const Favorites = lazy(() => import("../pages/Favorites/Favorites"));
  const PageNotFound = lazy(() => import("../pages/NotFound404/NotFound404"));
  const CharacterDetail = lazy(
    () => import("../pages/CharacterDetail/CharacterDetail")
  );

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={PUBLIC_ROUTES.HOME} element={<Characters />} />
        <Route path={PUBLIC_ROUTES.FAVORITES} element={<Favorites />} />
        <Route
          path={PUBLIC_ROUTES.CHARACTER_DETAIL}
          element={<CharacterDetail />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default NavigationRoutes;
