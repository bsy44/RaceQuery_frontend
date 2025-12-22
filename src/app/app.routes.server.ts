import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'home',
    renderMode: RenderMode.Server
  },
  {
    path: 'driver/standings',
    renderMode: RenderMode.Server
  },
  {
    path: 'team/standings',
    renderMode: RenderMode.Server
  },
  {
    path: 'pilotes',
    renderMode: RenderMode.Server
  },
  {
    path: 'pilotes/:season/:driverId',
    renderMode: RenderMode.Server
  },
  {
    path: 'teams',
    renderMode: RenderMode.Server
  },
  {
    path: 'teams/:season/:teamId',
    renderMode: RenderMode.Server
  },
  {
    path: 'races',
    renderMode: RenderMode.Server
  },
  {
    path: 'races/:season/:gpName/results',
    renderMode: RenderMode.Server
  },
  {
    path: 'races/:season/:gpName/details',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
