/* ===== CONFIG ===== */
const API = '/api';

/* ===== i18n ===== */
const TRANSLATIONS = {
  en: {
    hero_title: "Design Your Dream Home",
    hero_subtitle: "Visualize, furnish, and perfect your interior spaces with our professional virtual design studio.",
    start_designing: "Start Designing",
    login: "Log In", signup: "Sign Up", logout: "Log Out",
    dashboard: "Dashboard", my_designs: "My Designs",
    new_design: "New Design", save: "Save", download: "Download",
    wall_color: "Wall Color", floor_color: "Floor Tint",
    brightness: "Brightness", warmth: "Warmth",
    furniture: "Furniture", upload_room: "Upload Room Photo",
    features: "Features", delete: "Delete", edit: "Edit",
    welcome: "Welcome", total_designs: "Total Designs",
    no_designs: "No designs yet", create_first: "Create your first design",
    loading: "Loading...", saving: "Saving...",
  },
  hi: {
    hero_title: "अपने सपनों का घर डिज़ाइन करें",
    hero_subtitle: "हमारे पेशेवर वर्चुअल स्टूडियो के साथ अपने इंटीरियर की कल्पना करें।",
    start_designing: "डिज़ाइनिंग शुरू करें",
    login: "लॉग इन", signup: "साइन अप", logout: "लॉग आउट",
    dashboard: "डैशबोर्ड", my_designs: "मेरे डिज़ाइन",
    new_design: "नया डिज़ाइन", save: "सहेजें", download: "डाउनलोड",
    wall_color: "दीवार का रंग", floor_color: "फर्श का रंग",
    brightness: "चमक", warmth: "गर्मजोशी",
    furniture: "फर्नीचर", upload_room: "कमरे की फोटो अपलोड करें",
    features: "विशेषताएं", delete: "हटाएं", edit: "संपादित करें",
    welcome: "स्वागत", total_designs: "कुल डिज़ाइन",
    no_designs: "अभी तक कोई डिज़ाइन नहीं", create_first: "अपना पहला डिज़ाइन बनाएं",
    loading: "लोड हो रहा है...", saving: "सहेजा जा रहा है...",
  },
  es: {
    hero_title: "Diseña la casa de tus sueños",
    hero_subtitle: "Visualiza, amuebla y perfecciona tus espacios con nuestro estudio virtual.",
    start_designing: "Empezar a diseñar",
    login: "Iniciar sesión", signup: "Regístrate", logout: "Cerrar sesión",
    dashboard: "Panel", my_designs: "Mis diseños",
    new_design: "Nuevo diseño", save: "Guardar", download: "Descargar",
    wall_color: "Color de pared", floor_color: "Color de suelo",
    brightness: "Brillo", warmth: "Calidez",
    furniture: "Muebles", upload_room: "Subir foto de habitación",
    features: "Características", delete: "Eliminar", edit: "Editar",
    welcome: "Bienvenido", total_designs: "Total diseños",
    no_designs: "Aún no hay diseños", create_first: "Crea tu primer diseño",
    loading: "Cargando...", saving: "Guardando...",
  },
  fr: {
    hero_title: "Concevez la maison de vos rêves",
    hero_subtitle: "Visualisez, meublez et perfectionnez vos espaces intérieurs.",
    start_designing: "Commencer", login: "Connexion", signup: "S'inscrire", logout: "Déconnexion",
    dashboard: "Tableau de bord", my_designs: "Mes créations",
    new_design: "Nouveau design", save: "Sauvegarder", download: "Télécharger",
    wall_color: "Couleur du mur", floor_color: "Couleur du sol",
    brightness: "Luminosité", warmth: "Chaleur",
    furniture: "Meubles", upload_room: "Charger photo",
    features: "Fonctionnalités", delete: "Supprimer", edit: "Modifier",
    welcome: "Bienvenue", total_designs: "Total designs",
    no_designs: "Pas encore de designs", create_first: "Créez votre premier design",
    loading: "Chargement...", saving: "Sauvegarde...",
  },
  de: {
    hero_title: "Entwerfen Sie Ihr Traumhaus",
    hero_subtitle: "Visualisieren Sie Ihre Innenräume mit unserem virtuellen Designstudio.",
    start_designing: "Design starten", login: "Anmelden", signup: "Registrieren", logout: "Abmelden",
    dashboard: "Dashboard", my_designs: "Meine Designs",
    new_design: "Neues Design", save: "Speichern", download: "Herunterladen",
    wall_color: "Wandfarbe", floor_color: "Bodenfarbe",
    brightness: "Helligkeit", warmth: "Wärme",
    furniture: "Möbel", upload_room: "Zimmerfoto hochladen",
    features: "Funktionen", delete: "Löschen", edit: "Bearbeiten",
    welcome: "Willkommen", total_designs: "Designs gesamt",
    no_designs: "Noch keine Designs", create_first: "Erstes Design erstellen",
    loading: "Laden...", saving: "Speichern...",
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key])
    || TRANSLATIONS.en[key] || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
}

/* ===== AUTH ===== */
let currentUser = null;

async function checkAuth() {
  try {
    const res = await fetch(`${API}/auth/me`, { credentials: 'include' });
    if (res.ok) {
      currentUser = await res.json();
      return currentUser;
    }
  } catch (e) {}
  currentUser = null;
  return null;
}

async function loginUser(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST', credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  currentUser = data.user;
  return data;
}

async function registerUser(name, email, password) {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST', credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  currentUser = data.user;
  return data;
}

async function logoutUser() {
  await fetch(`${API}/auth/logout`, { method: 'POST', credentials: 'include' });
  currentUser = null;
  window.location.href = '/';
}

function requireAuth() {
  if (!currentUser) window.location.href = '/login.html';
}

/* ===== TOAST ===== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  if (type === 'error') toast.style.background = '#c0392b';
  if (type === 'success') toast.style.background = '#27ae60';
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

/* ===== DESIGNS API ===== */
async function getDesigns() {
  const res = await fetch(`${API}/designs`, { credentials: 'include' });
  if (!res.ok) return [];
  return res.json();
}

async function saveDesign(data, id = null) {
  const url = id ? `${API}/designs/${id}` : `${API}/designs`;
  const method = id ? 'PUT' : 'POST';
  const res = await fetch(url, {
    method, credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || 'Save failed');
  return result;
}

async function deleteDesign(id) {
  const res = await fetch(`${API}/designs/${id}`, { method: 'DELETE', credentials: 'include' });
  if (!res.ok) throw new Error('Delete failed');
}

async function getDesign(id) {
  const res = await fetch(`${API}/designs/${id}`, { credentials: 'include' });
  if (!res.ok) return null;
  return res.json();
}

async function getFurniture() {
  const res = await fetch(`${API}/furniture`);
  if (!res.ok) return [];
  return res.json();
}

/* ===== LANGUAGE SELECTOR HELPER ===== */
function renderLangSelector(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.value = currentLang;
  sel.addEventListener('change', () => setLang(sel.value));
}

/* ===== ON LOAD ===== */
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  const langSelects = document.querySelectorAll('.lang-select');
  langSelects.forEach(sel => {
    sel.value = currentLang;
    sel.addEventListener('change', () => setLang(sel.value));
  });
});