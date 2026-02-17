import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import SearchPage from '@/components/pages/SearchPage';
import LibraryPage from '@/components/pages/LibraryPage';
import SongDetailPage from '@/components/pages/SongDetailPage';
import ArtistDetailPage from '@/components/pages/ArtistDetailPage';
import PlaylistDetailPage from '@/components/pages/PlaylistDetailPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
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
        path: "search",
        element: <SearchPage />,
        routeMetadata: {
          pageIdentifier: 'search',
        },
      },
      {
        path: "library",
        element: <LibraryPage />,
        routeMetadata: {
          pageIdentifier: 'library',
        },
      },
      {
        path: "songs/:id",
        element: <SongDetailPage />,
        routeMetadata: {
          pageIdentifier: 'song-detail',
        },
      },
      {
        path: "artists/:id",
        element: <ArtistDetailPage />,
        routeMetadata: {
          pageIdentifier: 'artist-detail',
        },
      },
      {
        path: "playlists/:id",
        element: <PlaylistDetailPage />,
        routeMetadata: {
          pageIdentifier: 'playlist-detail',
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
