# Feature matrix

| Feature | View | Status and simulation |
|---|---|---|
| Theme, location, search suggestions, recent searches | Shared | Implemented and persisted; native datalist provides keyboard selection. |
| Catalog filters, sort, pagination | Products | Implemented against the eight-product catalog; sales ranking uses review count as mock metric. |
| Store directory and store sections | Stores/store | Search, categories, verified filter, follow, share and sections implemented; store content is illustrative. Popularity sort currently preserves source order. |
| Product variants and shopping actions | Product | Headphones have selectable color and edition, unavailable silver, quantity, favorite and buy; gallery uses embedded and original remote source views. |
| Favorites | Shared | Persistent modal with product links and quick add. |
| Multi-vendor cart | Cart | Grouped lines, quantities and shared integer-hundredth totals displayed in Yemeni rials; 10% `SURGE10` and shipping are mock rules. |
| Checkout and confirmation | Checkout | Local validation, simulated success/failure, duplicate-submit guard and persistent order reference; no real transaction. |
| Presenter controls | `?demo=1` | Scenarios, reset, draft fill, event log and explanatory tour highlighting controls where present. |
| Images | All | Four embedded source images and original remote references; blocked remote images fall back to neutral placeholders. |

The customer-facing views are responsive, but some original mobile and desktop component details differ. This is a frontend prototype and has no authentication, payment, inventory reservation, shipping, or vendor order backend.
