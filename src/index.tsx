import './index.css';

import { createRouter, RouterProvider } from '@tanstack/react-router';
import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import invariant from 'tiny-invariant';

import { routeTree } from './routeTree.gen';
import { createAppStore } from './store/create';
import { StoreProvider } from './store/react';

const rootEl = document.getElementById('app');
invariant(rootEl);

const store = createAppStore();

const router = createRouter({
  basepath: import.meta.env.BASE_URL,
  context: { store },
  routeTree,
});

store.subscribe((state, prevState) => {
  if (state.credentials === prevState.credentials) return;

  router.invalidate();
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const RouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
        import('@tanstack/router-devtools').then(mod => ({
          default: mod.TanStackRouterDevtools,
        })),
      );

createRoot(rootEl).render(
  <StrictMode>
    <StoreProvider store={store}>
      <RouterProvider router={router} />
    </StoreProvider>

    <RouterDevtools position="top-left" router={router} />
  </StrictMode>,
);
