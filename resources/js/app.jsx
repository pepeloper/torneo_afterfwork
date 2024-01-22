import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { hotjar } from "react-hotjar";
import { Cookies } from "react-cookie-consent";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    const cookie = Cookies.get('torneospadel');

    if (cookie == 'true') {
      hotjar.initialize(3836237);
    }

    root.render(<App {...props} />);
  },
  progress: {
    color: '#4B5563',
  },
});