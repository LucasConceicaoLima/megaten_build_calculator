import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routesConfig } from "./routes.config";
import { MainLayout } from "../shared/layouts/MainLayout";

export const AppRoutes = () => {
  return (
    <Suspense fallback={null}>
      <Routes>

        <Route element={<MainLayout />}>
          <Route index element={<Navigate to="/player" replace />} />
          {routesConfig.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route path="*" element={<Navigate to="/player" replace />} />
      </Routes>
    </Suspense>
  );
};