function highlightWWWwithDomain() {
  let subdomain = document.querySelector(".UrlFragment--Lowlight.UrlFragment-HostFragment-Subdomain");

  function markSubdomain() {
    let text = subdomain.textContent;
    subdomain.setAttribute("data-subdomain", text);
  }

  const observer12 = new MutationObserver(markSubdomain);

  const config = {
    childList: true,
    characterData: true,
  };

  observer12.observe(subdomain, config);
}
