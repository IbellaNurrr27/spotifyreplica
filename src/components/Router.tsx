import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/components/pages/HomePage';
import CookingPage from '@/components/pages/CookingPage';
import BakingPage from '@/components/pages/BakingPage';
import DrinksPage from '@/components/pages/DrinksPage';

// Layout component that includes Header, Footer, and ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "cooking",
        element: <CookingPage />,
        routeMetadata: {
          pageIdentifier: 'cooking',
        },
      },
      {
        path: "baking",
        element: <BakingPage />,
        routeMetadata: {
          pageIdentifier: 'baking',
        },
      },
      {
        path: "drinks",
        element: <DrinksPage />,
        routeMetadata: {
          pageIdentifier: 'drinks',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
