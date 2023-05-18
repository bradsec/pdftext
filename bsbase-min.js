const body = document.body;
const wrapperEl = document.querySelector(".wrapper");
const headerEl = document.getElementById('header');
const mainEl = document.getElementById('main');
const footerEl = document.getElementById('footer');
const footerCopyrightEl = document.getElementById('footer-copyright');
const footerRepoEl = document.getElementById('footer-repo');
const brandingEl = document.getElementById('branding');
const themeSwitcher = document.getElementById('theme-switcher');

// Theme switcher
document.addEventListener('DOMContentLoaded', () => {

    function setTheme(theme) {
        const body = document.body;
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            themeSwitcher.innerText = "LIGHT";
            themeColorMeta.content = "#202020";
        } else {
            body.removeAttribute('data-theme');
            themeSwitcher.innerText = "DARK";
            themeColorMeta.content = "#FFFFFF";
        }
    }
  
    // Load saved theme from local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  
    themeSwitcher.addEventListener('click', () => {
      const body = document.body;
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });

    // Get the author meta tag content and current year
    const repoMetaTag = document.querySelector('meta[name="repo"]');
    const authorMetaTag = document.querySelector('meta[name="author"]');
    const authorName = authorMetaTag ? authorMetaTag.content : '';
    const repoURL = repoMetaTag ? repoMetaTag.content : '';
    const currentYear = new Date().getFullYear();

    // Set the footer content
    footerRepoEl.innerHTML = `<a href="https://${repoURL}">${repoURL}</a>`
    footerCopyrightEl.innerHTML = `${authorName} ${currentYear}`;
});  