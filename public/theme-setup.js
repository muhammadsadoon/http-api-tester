(function() {
  try {
    var theme = localStorage.getItem('mantine-color-scheme') || 'light';
    document.documentElement.setAttribute('data-mantine-color-scheme', theme);
  } catch (e) {}
})();
