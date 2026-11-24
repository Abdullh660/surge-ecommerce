# Design audit

## Source mapping

| View | Light desktop/mobile | Dark desktop/mobile |
|---|---|---|
| Home | 1 / 2 | 10 / 14 |
| Products | 5 / 6 | 11 / 13 |
| Stores | 7 / 8 | 8 / 3 |
| Store | 9 / 10 | 4 / 5 |
| Product | 3 / 4 | 7 / 12 |
| Cart | 11 / 12 | 9 / 6 |
| Checkout | 13 / 14 | 2 / 1 |

Each number refers to `surge_N/code.html` in the corresponding unmodified archive extraction. All 28 HTML files were parsed for interface text and images; the complete supplied design system was read. The source inventory is stored in `../inventory.txt`.

## Decisions and deviations

The implementation follows the source's Arabic RTL structure, green/yellow identity, IBM Plex Arabic type, light/dark tokens, product cards, vendor groups, and two-column mobile product grid. Seven page types are consolidated as hash-routed views; order confirmation, favorites, dialogs, filter drawer and presenter panels are supporting states. Several layouts, icons and mobile-specific details are approximations rather than pixel-identical reproductions. The tour highlights controls available on the current view. Mobile product actions are not sticky. Store categories are simplified.

The 28 source HTML files contain 20 distinct remote image URLs and four distinct embedded images. Their original references are recorded in `assets/source-image-inventory.json`. The application uses the four embedded originals (headphone front and side, perfume, and dates) and original remote references for other corresponding demo content. Some remote images may require access to the authorized Google account; an unavailable image falls back to a neutral SVG placeholder. At the user's request, the earlier replacement photographs are no longer used by the application. Fonts are locally bundled.

At the user's request, light mode now adds restrained green card borders, tinted category tiles, and pale green summary panels. These light-mode accents are an intentional departure from the original white-heavy source; the dark-mode color rules were retained.

The subsequent user-requested presentation update adds inline header and mobile navigation icons, card hover feedback, illustrated category tiles, and carousels for the hero and categories. Category photos are representative and saved locally. The home-decor hero and promotional banner share the original image URL and use the same local interior fallback if the original is unavailable.

Later user-directed changes add a full-image tint to category tiles and softer carousel transitions. The light header and footer have a subtle green wash, while dark-mode surfaces remain unchanged. Prices are displayed as illustrative Yemeni rials, and the default delivery location is Mukalla; numeric prices were not converted from the original Saudi values.

The dark theme was subsequently adjusted at the user's request: page, header, footer, cards, borders, and inputs now use layered dark forest-green tones instead of near-black surfaces. Light-mode tokens remain unchanged.

A further user-directed adjustment deepens the page background and gives the header and footer separate dark-green tones, with cards layered between them.

The latest user-provided dark-mode reference supersedes those experimental dark colors. Its exact design-system values are now used for the dark page, header, announcement bar, hero, cards, text, and borders. The added image-based categories retain their layout with a dark full-image overlay.

The hero now moves as a horizontal RTL carousel, following the category carousel's direction and gentle motion. It supports previous/next controls, automatic advance, touch swipes, and reduced-motion preferences.

## Interaction inventory

Shared: logo, search, location, theme, favorites, account, navigation, cart counter, footer and mobile navigation. Home: categories, product and store links, offers, quick add, newsletter. Catalog: search, category, vendor, price, rating, shipping, discount, availability, sort, pagination. Store discovery: search, category, verified and sort. Store: follow, share, tabs, search and products. Product: gallery, variant, quantity, add/buy, favorites, share, information tabs. Cart: grouped vendors, quantity, removal, coupon, totals. Checkout: contact/address validation, simulated payment, confirmation. Supporting: presenter scenarios, events and tour.
