// Hooklink Mockup - App Logic

// ============ MOCK DATA ============
const mockHooks = [
    {
        uuid: "1",
        title: "GitHub - hooklink/hooklink: Universal link management",
        address: "https://github.com/hooklink/hooklink",
        originAddress: "https://github.com/hooklink/hooklink",
        app: "Chrome",
        tags: ["dev", "github"],
        useCount: 42,
        userWeight: 3,
        createdAt: "2025-01-08"
    },
    {
        uuid: "2",
        title: "Figma - Design System v3.0",
        address: "https://figma.com/file/design-system",
        originAddress: "https://figma.com/file/design-system",
        app: "Figma",
        tags: ["design", "ui"],
        useCount: 28,
        userWeight: 2,
        createdAt: "2025-01-07"
    },
    {
        uuid: "3",
        title: "Notion - Product Roadmap 2025",
        address: "https://notion.so/roadmap-2025",
        originAddress: "https://notion.so/roadmap-2025",
        app: "Arc",
        tags: ["planning"],
        useCount: 15,
        userWeight: 1,
        createdAt: "2025-01-06"
    },
    {
        uuid: "4",
        title: "Slack - #dev-frontend 채널",
        address: "https://slack.com/archives/C01234567",
        originAddress: "https://slack.com/archives/C01234567",
        app: "Slack",
        tags: ["team", "dev"],
        useCount: 56,
        userWeight: 4,
        createdAt: "2025-01-05"
    },
    {
        uuid: "5",
        title: "VS Code - SvelteKit Project",
        address: "vscode://file/Users/dev/projects/hooklink",
        originAddress: "vscode://file/Users/dev/projects/hooklink",
        app: "VS Code",
        tags: ["code", "dev"],
        useCount: 120,
        userWeight: 5,
        createdAt: "2025-01-04"
    },
    {
        uuid: "6",
        title: "Terminal - ~/projects/hooklink",
        address: "terminal://~/projects/hooklink",
        originAddress: "terminal://~/projects/hooklink",
        app: "Terminal",
        tags: ["code"],
        useCount: 89,
        userWeight: 3,
        createdAt: "2025-01-03"
    },
    {
        uuid: "7",
        title: "TailwindCSS Documentation - Utility Classes",
        address: "https://tailwindcss.com/docs/utility-first",
        originAddress: "https://tailwindcss.com/docs/utility-first",
        app: "Safari",
        tags: ["docs", "css"],
        useCount: 33,
        userWeight: 2,
        createdAt: "2025-01-02"
    }
];

// ============ STATE ============
let state = {
    query: "",
    selectedIndex: 0,
    filteredHooks: [...mockHooks],
    showCaptureCard: true
};

// ============ DOM ELEMENTS ============
const searchInput = document.getElementById("search-input");
const searchOverlay = document.getElementById("search-overlay");
const hookList = document.getElementById("hook-list");
const sectionTitle = document.getElementById("section-title");
const captureCardContainer = document.getElementById("capture-card-container");
const emptyState = document.getElementById("empty-state");

// ============ UTILITY FUNCTIONS ============
function getAppIconClass(app) {
    const appLower = (app || "").toLowerCase();
    if (appLower.includes("chrome")) return "chrome";
    if (appLower.includes("safari")) return "safari";
    if (appLower.includes("figma")) return "figma";
    if (appLower.includes("slack")) return "slack";
    if (appLower.includes("notion")) return "notion";
    if (appLower.includes("vs code") || appLower.includes("vscode")) return "vscode";
    if (appLower.includes("terminal")) return "terminal";
    if (appLower.includes("arc")) return "arc";
    return "default";
}

function getAppInitial(app) {
    return (app || "A").charAt(0).toUpperCase();
}

function highlightText(text, query) {
    if (!query || query.trim() === "") return escapeHtml(text);

    // Remove tag queries for highlighting
    const cleanQuery = query.replace(/#\w+/g, "").trim();
    if (!cleanQuery) return escapeHtml(text);

    const regex = new RegExp(`(${escapeRegex(cleanQuery)})`, "gi");
    return escapeHtml(text).replace(regex, '<span class="bg-yellow-200 dark:bg-yellow-700/50 rounded">$1</span>');
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tokenizeQuery(query) {
    const tokens = [];
    const regex = /(#\w+)|([^#]+)/g;
    let match;

    while ((match = regex.exec(query)) !== null) {
        if (match[1]) {
            tokens.push({ type: "tag", raw: match[1] });
        } else if (match[2]) {
            tokens.push({ type: "text", raw: match[2] });
        }
    }

    return tokens;
}

function renderSearchOverlay(query) {
    const tokens = tokenizeQuery(query);
    searchOverlay.innerHTML = tokens.map(token => {
        if (token.type === "tag") {
            return `<span class="search-tag">${escapeHtml(token.raw)}</span>`;
        }
        return `<span class="text-gray-900 dark:text-gray-100">${escapeHtml(token.raw)}</span>`;
    }).join("");
}

function renderWeightIndicator(weight) {
    let html = '<div class="weight-indicator">';
    for (let i = 1; i <= 5; i++) {
        html += `<div class="weight-dot ${i <= weight ? 'active' : 'inactive'}"></div>`;
    }
    html += '</div>';
    return html;
}

// ============ RENDER FUNCTIONS ============
function renderCaptureCard() {
    const isSelected = state.selectedIndex === -1;

    return `
    <div class="mb-2">
      <div class="text-[10px] font-bold text-gray-400 dark:text-zinc-500 px-2 py-1 uppercase flex justify-between items-center">
        <span>Detected Context</span>
        <span class="text-[9px] bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded">New</span>
      </div>
      <div class="capture-card relative w-full rounded-xl group outline-none isolate cursor-pointer ${isSelected ? 'selected' : ''}" data-index="-1">
        ${isSelected ? `
          <div class="glow-effect absolute -inset-1 -z-20 rounded-xl overflow-hidden blur-2xl opacity-30 dark:opacity-40 transition-opacity duration-500 pointer-events-none">
            <div class="absolute inset-[-50%] animate-gradient bg-conic-gradient"></div>
          </div>
          <div class="glow-effect-inner absolute -inset-px -z-10 rounded-xl overflow-hidden blur-sm opacity-50 dark:opacity-60 transition-opacity duration-500 pointer-events-none">
            <div class="absolute inset-[-50%] animate-gradient bg-conic-gradient-inner"></div>
          </div>
        ` : ''}

        <div class="relative z-0 flex items-center p-2.5 rounded-xl transition-all duration-200 border
          ${isSelected
            ? 'bg-white/90 dark:bg-zinc-900/90 border-blue-500/30 dark:border-blue-400/30 shadow-sm'
            : 'bg-white dark:bg-zinc-900 border-transparent hover:bg-gray-50 dark:hover:bg-zinc-800'}">
          <!-- App Icon -->
          <div class="w-10 h-10 mr-3 rounded-md bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-sm font-bold shrink-0">F</div>

          <div class="flex-1 min-w-0 mr-2">
            <div class="text-base font-semibold truncate transition-colors ${isSelected ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}">
              Figma - Design System Components
            </div>
            <div class="text-[11px] truncate transition-colors font-medium ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-zinc-500'}">
              Figma • figma.com/file/abc123
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderHookCard(hook, index) {
    const isSelected = state.selectedIndex === index;
    const appClass = getAppIconClass(hook.app);

    return `
    <div class="hook-card relative w-full rounded-xl mb-2 group outline-none isolate cursor-pointer ${isSelected ? 'selected' : ''}" data-index="${index}">
      ${isSelected ? `
        <div class="glow-effect absolute -inset-1 -z-20 rounded-xl overflow-hidden blur-2xl opacity-30 dark:opacity-40 transition-opacity duration-500 pointer-events-none">
          <div class="absolute inset-[-50%] animate-gradient bg-conic-gradient"></div>
        </div>
        <div class="glow-effect-inner absolute -inset-px -z-10 rounded-xl overflow-hidden blur-sm opacity-50 dark:opacity-60 transition-opacity duration-500 pointer-events-none">
          <div class="absolute inset-[-50%] animate-gradient bg-conic-gradient-inner"></div>
        </div>
      ` : ''}
      
      <div class="relative z-0 flex items-center p-2.5 rounded-xl transition-all duration-200 border
        ${isSelected
            ? 'bg-white/90 dark:bg-zinc-900/90 border-cyan-500/30 dark:border-cyan-400/30 shadow-sm'
            : 'bg-white dark:bg-zinc-900 border-transparent hover:bg-gray-50 dark:hover:bg-zinc-800'}">
        
        <!-- App Icon -->
        <div class="app-icon ${appClass} w-6 h-6 mr-3 rounded-md">${getAppInitial(hook.app)}</div>
        
        <div class="flex-1 min-w-0 mr-2">
          <div class="flex items-center w-full min-w-0">
            <!-- Title -->
            <div class="text-sm font-semibold truncate mr-2 flex-1
              ${isSelected ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}">
              ${highlightText(hook.title, state.query)}
            </div>
            
            <!-- Tags -->
            ${hook.tags && hook.tags.length > 0 ? `
              <div class="flex items-center gap-1 mr-2 shrink-0">
                ${hook.tags.map(tag => `
                  <span class="tag-pill ${isSelected
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-500 dark:bg-zinc-800 dark:text-zinc-500'}"
                    data-tag="${tag}">
                    #${tag}
                  </span>
                `).join('')}
              </div>
            ` : ''}
            
            <!-- App Name -->
            <div class="text-[10px] shrink-0 transition-colors font-medium
              ${isSelected ? 'text-cyan-600 dark:text-cyan-400' : 'text-gray-400 dark:text-zinc-500'}">
              ${hook.app || "System"}
            </div>
          </div>
        </div>
        
        <!-- Weight Indicator -->
        <div class="flex items-center gap-1.5 ml-auto shrink-0">
          ${renderWeightIndicator(hook.userWeight)}
        </div>
      </div>
    </div>
  `;
}

function filterHooks(query) {
    if (!query || query.trim() === "") {
        return [...mockHooks];
    }

    // Extract tags and text from query
    const tags = [];
    let textQuery = query;

    const tagRegex = /#(\w+)/g;
    let tagMatch;
    while ((tagMatch = tagRegex.exec(query)) !== null) {
        tags.push(tagMatch[1].toLowerCase());
    }

    textQuery = query.replace(/#\w+/g, "").trim().toLowerCase();

    return mockHooks.filter(hook => {
        // Check tags
        if (tags.length > 0) {
            const hookTags = (hook.tags || []).map(t => t.toLowerCase());
            const hasAllTags = tags.every(t => hookTags.some(ht => ht.includes(t)));
            if (!hasAllTags) return false;
        }

        // Check text
        if (textQuery) {
            const titleMatch = hook.title.toLowerCase().includes(textQuery);
            const appMatch = (hook.app || "").toLowerCase().includes(textQuery);
            if (!titleMatch && !appMatch) return false;
        }

        return true;
    });
}

function render() {
    // Update section title
    sectionTitle.textContent = state.query ? "Search Results" : "Recent Hooks";

    // Render capture card (only when no search query)
    if (state.showCaptureCard && !state.query) {
        captureCardContainer.innerHTML = renderCaptureCard();
    } else {
        captureCardContainer.innerHTML = "";
    }

    // Render hooks
    if (state.filteredHooks.length === 0) {
        hookList.innerHTML = "";
        emptyState.style.display = "flex";
    } else {
        emptyState.style.display = "none";
        hookList.innerHTML = state.filteredHooks.map((hook, index) => renderHookCard(hook, index)).join("");
    }

    // Update search overlay
    renderSearchOverlay(state.query);

    // Scroll selected into view
    const selectedCard = document.querySelector(".hook-card.selected, .capture-card.selected");
    if (selectedCard) {
        selectedCard.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
}

// ============ EVENT HANDLERS ============
function handleInput(e) {
    state.query = e.target.value;
    state.filteredHooks = filterHooks(state.query);
    state.selectedIndex = 0;
    render();
}

function handleKeydown(e) {
    const maxIndex = state.filteredHooks.length - 1;
    // Minimum index: -1 if capture card is visible, 0 otherwise
    const minIndex = (state.showCaptureCard && !state.query) ? -1 : 0;

    switch (e.key) {
        case "ArrowDown":
            e.preventDefault();
            state.selectedIndex = Math.min(state.selectedIndex + 1, maxIndex);
            render();
            break;
        case "ArrowUp":
            e.preventDefault();
            state.selectedIndex = Math.max(state.selectedIndex - 1, minIndex);
            render();
            break;
        case "Enter":
            e.preventDefault();
            const selectedHook = state.filteredHooks[state.selectedIndex];
            if (selectedHook) {
                console.log("Opening hook:", selectedHook.title);
                // In a real app, this would open the URL
            }
            break;
    }
}

function handleCardClick(e) {
    const card = e.target.closest(".hook-card, .capture-card");
    if (card) {
        const index = parseInt(card.dataset.index, 10);
        state.selectedIndex = index;
        render();
    }
}

function handleTagClick(e) {
    const tagEl = e.target.closest(".tag-pill");
    if (tagEl) {
        e.stopPropagation();
        const tag = tagEl.dataset.tag;
        state.query = `#${tag}`;
        searchInput.value = state.query;
        state.filteredHooks = filterHooks(state.query);
        state.selectedIndex = 0;
        render();
    }
}

// ============ INITIALIZATION ============
function init() {
    // Event listeners
    searchInput.addEventListener("input", handleInput);
    document.addEventListener("keydown", handleKeydown);
    hookList.addEventListener("click", handleCardClick);
    hookList.addEventListener("click", handleTagClick);
    captureCardContainer.addEventListener("click", handleCardClick);

    // Focus search input
    searchInput.focus();

    // Initial render
    render();
}

// Start the app
init();
