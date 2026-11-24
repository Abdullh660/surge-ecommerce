# Test report

Browser checks used Playwright with installed Google Chrome against a local Python static server. JavaScript syntax checks passed for the application modules. The captures in `screenshots/` cover the seven original view types at 1440 × 900 and 390 × 844 in light and dark themes (28 captures). They are implementation screenshots, not a completed pixel-by-pixel comparison with all 28 originals. Desktop and mobile home captures were visually inspected. The source layout differences and missing assets are recorded in `DESIGN-AUDIT.md`.

After adding the static JavaScript bundle, a separate Chrome test opened `index.html` directly using `file://` without a server. It passed homepage rendering, product navigation, add-to-cart, theme switching, and cart/theme persistence after refresh. The server is optional and does not provide application logic.

The original image references were subsequently restored. Browser tests intercepted the original image URLs to simulate a valid image response and a failed request; both the original URL path and fallback path passed. The embedded headphone side-view thumbnail was verified. These are controlled tests, not evidence that Google currently grants access to the remote images: the real original links redirected to Google sign-in during inspection.

After the user requested substitute images and light-mode accents, a Chrome `file://` test checked the home, catalog, store directory, store and product views in both themes at widths of 390 and 1440 pixels. All image elements completed with local, non-placeholder images; there were no JavaScript exceptions or document-level horizontal overflow. The test checked the light green card border and confirmed that the dark card border retains its previous color. The home page was visually inspected in both desktop and mobile light layouts. The direct-file product/cart/theme persistence check was rerun successfully.

The user subsequently requested restoration of the earlier images. The application again uses the original embedded and remote references, keeping the light-mode accents. The image/theme test now intercepts original remote requests to verify the restored mapping; it does not establish that Google permits access to those images in every browser.

The later homepage update was checked in Chrome at 390, 768 and 1440 pixels across both themes. Tests cover the hero previous/next controls and slide destination, the matching home-decor hero/banner image including its local fallback, the category slider control and category destination, inline header icons, and document overflow. Remote image requests were intentionally blocked in this test to exercise fallback behavior.

The subsequent softer hero crossfade and category scrolling were tested with normal and reduced-motion preferences, rapid slide changes, and both themes. After localizing the demo for Yemen, Chrome tests verified currency labels across the product, cart, checkout, and confirmation views; matching cart/checkout totals; migration of the previous delivery location to Mukalla without losing cart items; a change to another Yemeni location and its persistence; visible location and no horizontal overflow at 320 pixels; local and international Yemeni mobile-number input, including Arabic digits; and the light-only header/footer tints. The phone validation is intentionally a simple demo check informed by the [ITU Yemen numbering plan](https://www.itu.int/oth/T02020000E7/en).

The dark-green color update was checked in Chrome in both themes at mobile, tablet, and desktop sizes. The homepage was visually inspected at 768 and 1440 pixels; the existing carousel, cart, currency, location, and responsive tests passed.

The darker follow-up was checked at 390, 768, and 1440 pixels. The page, header, and footer were confirmed to use three distinct dark colors, and the existing responsive, carousel, cart, and checkout checks passed.

After the user supplied a new dark-mode HTML reference, its palette and relevant component surfaces were restored and tested at 390 and 1440 pixels. The browser check verifies the reference token values and the body, header, announcement bar, hero, card, and footer colors; responsive, carousel, currency, and checkout checks were also rerun.

After replacing the hero crossfade with horizontal sliding, Chrome tests at 390 and 1440 pixels verified intermediate motion and alignment, forward/backward looping, rapid navigation, inactive-slide accessibility, and mobile touch swiping. Reduced-motion, automatic movement, theme, cart, and checkout checks were rerun successfully.

## Executed checks

| Check | Result |
|---|---|
| Home catalog rendering and headphone detail/edition/quantity | Passed |
| Add headphones and perfume from separate stores; two cart groups | Passed |
| Apply `SURGE10`; missing checkout information shows inline error | Passed |
| Submit simulated order; confirmation survives refresh | Passed |
| Category filter, favorite modal, theme persistence | Passed |
| Presenter payment-failure scenario, failure feedback and successful retry | Passed |
| Presenter workflow panel opens | Passed |
| Malformed stored cart/theme and tour highlight/close | Passed |
| Widths 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920 across seven views | No document-level horizontal overflow detected |
| Seven views in both themes at 1440 and 390 | Captured; no page exceptions, failed HTTP responses or completed broken images reported by the automated sweep |

The first visual inspection found that remote source URLs returned HTML rather than valid image bytes. Those files were replaced with neutral placeholders and embedded source images where available, and the sweep was rerun. A mobile footer sizing issue and an incorrect dark-theme screenshot setup were also corrected.

## Remaining verification

The complete requested 28-reference visual comparison and all nine detailed end-to-end journeys have not been individually verified. Not every combination of filters, keyboard interaction, browser back/forward, corrupted storage, demo scenario, or accessibility requirement has been tested. Captures use seeded demo cart data where needed. The tour and recent-search changes after the main screenshot sweep have not been exhaustively retested. Source-image availability and visual fidelity remain material limitations; this prototype should not be presented as a pixel-identical or production-ready implementation.
