const issueInput = document.getElementById("issue");
const goButton = document.getElementById("go");
const urlTextBox = document.getElementById("url");
const saveUrl = document.getElementById("saveUrl");
const openConfig = document.getElementById("openConfig");

let baseUrl = null;

function openConfigPage(){
    document.getElementById("setUrl").style.display = "block";
    document.getElementById("openIssue").style.display = "none";
    document.getElementById("url").focus();
    if( document.getElementById("url").value ){
      document.getElementById("configSubtitleNoUrl").style.display = "none"; 
      document.getElementById("configSubtitleHasUrl").style.display = "block";
    }else{
      document.getElementById("configSubtitleNoUrl").style.display = "block"; 
      document.getElementById("configSubtitleHasUrl").style.display = "none";
    }
}

function openMainPage(){
  document.getElementById("setUrl").style.display = "none";
  document.getElementById("openIssue").style.display = "block";  
  document.getElementById("issue").focus();
}

function guardarBaseUrl() {
  let url = document.getElementById("url").value;
  chrome.storage.local.set({ baseUrl: url });
  baseUrl = url;
  openMainPage();
}

function abrirIssue() {
  const numero = issueInput.value.trim();
  if (!numero) return;

  const url = `${baseUrl}-${encodeURIComponent(numero)}`;
  chrome.tabs.create({ url });
}

document.addEventListener("DOMContentLoaded", makeTranslations );

goButton.addEventListener("click", abrirIssue);
saveUrl.addEventListener("click", guardarBaseUrl);
openConfig.addEventListener("click", openConfigPage );

issueInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    abrirIssue();
  }
});

function makeTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = chrome.i18n.getMessage(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    element.setAttribute("placeholder", chrome.i18n.getMessage(key));
  });

  document.documentElement.lang = chrome.i18n.getUILanguage();
}

/**
 * main program
 */
chrome.storage.local.get(["baseUrl"], (result) => {
  baseUrl = result.baseUrl || null;

  // si no existe, pedirla
  if (!baseUrl) {
    document.getElementById("url").value = "";
    openConfigPage();
  }else{
    document.getElementById("url").value = result.baseUrl;
    openMainPage();
  }
});


