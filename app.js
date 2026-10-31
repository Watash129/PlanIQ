const themeSwitch = document.getElementById('theme-switch');
const settingsButton = document.getElementById('settings-button');
const accountButton = document.getElementById('account-button');
const settingsPanel = document.getElementById('settings');
const accountPanel = document.getElementById('account');
const root = document.documentElement;
const planIqLogo = document.getElementById('plan-iq-logo');

const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    if (planIqLogo) {
        planIqLogo.src = theme === 'light' ? 'PlanIQlight.png' : 'PlanIQ.png';
    }
    if (themeSwitch) {
        themeSwitch.checked = theme === 'dark';
        themeSwitch.setAttribute('aria-checked', theme === 'dark' ? 'true' : 'false');
    }
};

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

if (themeSwitch) {
    themeSwitch.addEventListener('change', (e) => {
        const theme = e.target.checked ? 'dark' : 'light';
        applyTheme(theme);
        localStorage.setItem('theme', theme);
    });
}

if (settingsButton) {
    settingsButton.addEventListener('click', () => {
        if (settingsPanel) {
            settingsPanel.classList.toggle('open');
        }
    });
}

if (accountButton) {
    accountButton.addEventListener('click', () => {
        if (accountPanel) {
            accountPanel.classList.toggle('open');
        }
    });
}


const noteForm = document.getElementById("note-form");
const draftNotes = document.getElementById("draft-notes");
const draftsStorageKey = "planIqDrafts";

function getDrafts() {
    try {
        return JSON.parse(localStorage.getItem(draftsStorageKey) || "[]");
    } catch {
        return [];
    }
}

function renderDrafts() {
    if (!draftNotes) return;

    const drafts = getDrafts();
    draftNotes.replaceChildren();
    if (drafts.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-state";
        emptyMessage.textContent = "No drafts saved yet. Select New to add one.";
        draftNotes.append(emptyMessage);
        return;
    }

    drafts.forEach((draft) => {
        const card = document.createElement("article");
        card.className = "note-card";
        const heading = document.createElement("h2");
        heading.textContent = draft.title || "Untitled note";
        const content = document.createElement("p");
        content.textContent = draft.content;
        card.append(heading, content);
        draftNotes.append(card);
    });
}

if (noteForm) {
    noteForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(noteForm);
        const drafts = getDrafts();
        drafts.unshift({
            title: formData.get("title").trim() || "Untitled note",
            content: formData.get("content").trim(),
            createdAt: new Date().toISOString()
        });
        localStorage.setItem(draftsStorageKey, JSON.stringify(drafts));
        window.location.href = "notes.html";
    });
}

renderDrafts();
