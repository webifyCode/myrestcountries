# Where in the World? (REST Countries App)

A React + Vite app for browsing countries of the world. Search by name, filter by region, open a country to see its details and jump between neighbouring countries, and switch between light and dark themes. Country data is a bundled copy of the [REST Countries](https://restcountries.com/) dataset, so it works without any external API.

Live demo: [webifyCode.github.io/myrestcountries](https://webifyCode.github.io/myrestcountries)

## Tech Stack

- [React 19](https://react.dev/) is the UI library. It uses function components and hooks (`useState`, `useEffect`) with `StrictMode` enabled.
- [Vite 7](https://vite.dev/) is the dev server and bundler, with HMR.
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh.
- Plain CSS (`src/styles/`) handles styling, with one stylesheet per component and a shared `index.css`.
- Static JSON (`public/data.json`) holds the 250-country dataset, with flag images loaded from [flagcdn.com](https://flagcdn.com/).
- Browser `localStorage` stores the chosen theme.
- [ESLint 9](https://eslint.org/) with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` handles linting.
- [gh-pages](https://github.com/tschaub/gh-pages) publishes the build to [GitHub Pages](https://pages.github.com/).

## Getting Started

```bash
npm install
npm run dev        # start the dev server
npm run build      # production build into dist/
npm run preview    # preview the production build
npm run lint       # run ESLint
npm run deploy     # build and publish dist/ to the gh-pages branch
```

## Project Structure

```
src/
├── main.jsx                  # entry point, mounts <App /> in StrictMode
├── App.jsx                   # root component: owns state, loads data, filters countries
├── components/
│   ├── TitleBar.jsx          # page title and light/dark toggle
│   ├── SearchBar.jsx         # search input
│   ├── Filter.jsx            # region dropdown
│   ├── CountryCard.jsx       # card shown in the grid
│   └── DetailsPage.jsx       # full details and border-country navigation
├── styles/                   # index.css plus one stylesheet per component
└── assets/                   # SVG icons
public/
└── data.json                 # country dataset, fetched at runtime
```

## Architecture Decisions

### Client-only app with a bundled dataset
The data lives in `public/data.json` and is fetched once on load, instead of calling the live REST Countries API. This keeps the app static, fast, free of rate limits and API changes, and easy to host on GitHub Pages. The trade-off is that the data does not update on its own. The URL is built from `import.meta.env.BASE_URL` so it works under the `/myrestcountries/` sub-path.

### State lifted to `App`
`App.jsx` owns the countries list, search query, region filter, selected country, theme, and the loading and error flags. Child components are presentational and receive state and setters as props. For five small components this is simpler than Context or a state library. If the app grows, Context or a reducer would be the first thing to add.

### Derived data instead of stored data
The visible list is computed on every render from `countries`, `searchQuery` and `filter`, rather than being stored in state. This avoids keeping two copies of the data in sync. Search matches both the English and native country names.

### Conditional views instead of a router
Selecting a country swaps the list view for `DetailsPage` using a `detailCountry` state value, with no routing library. This keeps dependencies low. The trade-off is that details pages have no shareable URL and the browser Back button does not return to the list. React Router with `/country/:code` would be the upgrade if that matters.

### Border countries resolved by code
Each country lists its neighbours as `alpha3Code` values. `DetailsPage` looks them up in the full list, so clicking a neighbour opens its details page directly. Countries with no borders (islands) show "None".

### Theming
The theme starts from the saved `localStorage` value, falling back to the OS `prefers-color-scheme` setting. An effect saves the choice and toggles a `dark-container` class on `body` and `#root`. Components add `dark-element` classes for cards and controls. Storage access is wrapped in `try/catch`, because it can be unavailable in private or restricted browsing.

### Loading and error states
The data fetch checks the HTTP status, is aborted on unmount, and sets `loading` and `error` flags. The list area shows "Loading countries...", a load-failure message, or "No countries found." as appropriate.

### Accessibility
Clickable cards and the theme toggle have `role="button"`, are focusable, and respond to Enter and Space. Flag images have descriptive alt text, and decorative icons have empty alt text.

### Styling
Plain CSS was chosen over a framework or CSS-in-JS to avoid extra dependencies. Each component has its own stylesheet, and shared layout and theme rules live in `index.css`.

## Deployment

The app is deployed to GitHub Pages with `npm run deploy`, which runs a build (`predeploy`) and then publishes `dist` with `gh-pages`. `vite.config.js` sets `base: '/myrestcountries/'` so assets resolve under the Pages sub-path. If you rename the repo or host elsewhere, update `base` (use `'/'` for a root domain) and `homepage` in `package.json`.

## Future Improvements

- Remove the unused `@fortawesome/*` dependencies (`npm uninstall @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome`). Nothing imports them.
- Add routing so country pages have shareable URLs.
- Add tests (for example Vitest and React Testing Library) and consider TypeScript.
- Add the Polar and Antarctic regions to the filter. Those countries currently appear only under "All Countries".
- Try the [React Compiler](https://react.dev/learn/react-compiler/installation). It is not enabled because of its impact on dev and build performance.
