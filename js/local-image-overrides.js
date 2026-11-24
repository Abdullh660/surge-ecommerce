// Localize uploaded images in the storefront without changing the catalog's image IDs.
(() => {
  const imagePaths = {
    hero: 'assets/images/unnamed.jpg',
    techHero: 'assets/images/unnamed (8).jpg',
    smartPromo: 'assets/images/unnamed (6).jpg',
    coffee: 'assets/images/unnamed (10).jpg',
    shoes: 'assets/images/unnamed (9).jpg',
    serum: 'assets/images/unnamed (5).jpg',
    chair: 'assets/images/unnamed (4).jpg',
    techStore: 'assets/images/unnamed (3).jpg',
    perfumeStore: 'assets/images/unnamed (2).jpg',
    homeStore: 'assets/images/unnamed (1).jpg',
  };

  function applyLocalImage(img) {
    if (!(img instanceof HTMLImageElement)) return;
    const slide = img.closest('.hero-slide');
    if (slide) {
      const index = Number(slide.dataset.slide);
      if (index === 0) img.src = imagePaths.hero;
      if (index === 2) img.src = imagePaths.techHero;
      return;
    }

    const alt = img.alt || '';
    if (alt.includes('ماكينة تحضير الإسبريسو بضغط 15 بار')) img.src = imagePaths.coffee;
    else if (alt.includes('حذاء جري رياضي مريح بنعل مزدوج')) img.src = imagePaths.shoes;
    else if (alt.includes('مجموعة العناية اليومية: سيروم فيتامين C')) img.src = imagePaths.serum;
    else if (alt.includes('كرسي استرخاء عصري من خشب البلوط')) img.src = imagePaths.chair;
    else if (alt === 'غلاف عالم التقنية') img.src = imagePaths.techStore;
    else if (alt === 'غلاف لمسة للعطور') img.src = imagePaths.perfumeStore;
    else if (alt === 'غلاف بيتي للأثاث') img.src = imagePaths.homeStore;
    else if (img.closest('.promo') && img.closest('.promo').textContent.includes('أجهزة ذكية')) img.src = imagePaths.smartPromo;
  }

  function scan(node) {
    if (node instanceof HTMLImageElement) applyLocalImage(node);
    node.querySelectorAll?.('img').forEach(applyLocalImage);
  }

  scan(document);
  new MutationObserver((records) => {
    for (const record of records) record.addedNodes.forEach(scan);
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
