# Surge Marketplace — static interactive demo

Arabic RTL marketplace prototype built with semantic HTML, CSS, and vanilla JavaScript. The `surge-demo` directory itself is the deployment-ready static output; no backend, payment gateway, server, or installation is required to run it.

## Run locally

Open `index.html` directly in a browser. For presentation controls, add `?demo=1` to the file URL before the `#` fragment. The hash identifies the current view, so the same files can also be deployed beneath a static host subdirectory. A static HTTP server is optional, not required.

## Presenter controls

Open **أدوات العرض** in presenter mode. The panel can prepare a single- or multi-vendor cart, coupon, delivery draft, payment failure, empty search, stock-limit scenario, workflow event log, and explanatory tour. After a simulated payment failure, retry succeeds. Reset asks for confirmation and clears only the Surge state and its checkout draft. Customer state is stored under `surge.demo.v1`; checkout draft is stored in session storage as `surge.checkout`. Card numbers and wallet credentials are never requested or stored.

## Structure

- `index.html`: application shell and initial theme.
- `css/style.css`: design tokens, components, themes, and responsive layouts.
- `js/data.js`: catalog, stores, and image mapping; `js/source-images.js` keeps original image URLs.
- `js/state.js`: persistent state and integer-hundredth price calculations.
- `js/app.js`: views and interactions.
- `js/bundle.js`: ready-to-run bundle of the source modules, allowing direct `file://` use. If the source modules change, run `node build-bundle.cjs` to regenerate it; Node is not needed to view the demo.
- `assets/`: locally bundled original images, neutral placeholders, and IBM Plex Sans Arabic fonts.
- `screenshots/`: browser captures of the seven views at desktop/mobile in both themes.
- `tests/`: browser checks used during development. They require Playwright, a running server on port 8000, and Chrome at the Windows path shown in the scripts; they are not runtime dependencies.

## Mock data and assumptions

The catalog uses the source's named products and store associations when available. At the user's request, prices are displayed in Yemeni rials and delivery defaults to Mukalla; the original numeric amounts were retained as illustrative demo prices, without applying an exchange rate. Stock counts, sales ranking, reviews, shipping rules and extra supporting descriptions are demonstration data. To make totals deterministic, `SURGE10` deducts 10% of product subtotal; a vendor group ships free when all its products are marked free-shipping, otherwise it costs 25 Yemeni rials. The standard headphone edition is simulated at 50 Yemeni rials below the featured Pro edition. No tax is modeled. These are illustrative assumptions, not verified policies.

Checkout simulates all payment options and records an order locally; it does not send data or fulfill orders. Status, tracking, newsletter, store reviews and support are simulated. Orders do not contain delivery details. The source archives are preserved separately in `../reference-light` and `../reference-dark`.

## Known limitations

The demo uses four embedded original images and original remote links from the supplied interfaces. Some remote links may require access to the authorized Google account; a neutral placeholder appears if an image cannot load. The home-decor campaign instead falls back to a locally stored representative interior image. New illustrated category tiles use local representative photos; credits are in `assets/PHOTO-CREDITS.md`. The headphone gallery includes embedded and remote source views. Original source URLs remain listed in `assets/source-image-inventory.json`. The tour highlights controls available in the current view; some steps have no matching control on every page. Some original page-specific styling and mobile differences are approximated, and the demo has a deliberately small catalog. See `DESIGN-AUDIT.md`, `FEATURES.md`, and `TEST-REPORT.md` for details.
