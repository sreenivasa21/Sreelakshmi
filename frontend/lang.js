const LANG = {
  en: { title: "Customer Login", dashboard: "Your Bills" },
  te: { title: "కస్టమర్ లాగిన్", dashboard: "మీ బిల్లులు" }
};
function setLang(l) {
  document.getElementById("title")?.innerText = LANG[l].title;
  document.getElementById("dashboard")?.innerText = LANG[l].dashboard;
}
