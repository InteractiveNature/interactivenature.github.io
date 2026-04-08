/**
 * work-page.js - Renders the Work page (2-column grid of all projects)
 */

import { Cursor } from './effects/cursor.js';
import { Background } from './effects/background.js';
import { workConfig, effectsConfig } from './config.js';
import { PasswordModal } from './components/PasswordModal.js';
import { isAuthenticated } from './auth.js';

function initEffects() {
    if (effectsConfig.cursor?.enabled) {
        const cursor = new Cursor(effectsConfig.cursor);
        cursor.init();
    }

    if (effectsConfig.backgroundGrid?.enabled) {
        const background = new Background(effectsConfig.backgroundGrid);
        background.init();
    }
}

function renderWorkGrid() {
    const grid = document.getElementById('work-grid-page');
    if (!grid) return;

    grid.innerHTML = '';

    const passwordModal = new PasswordModal();

    workConfig.projects.forEach((project) => {
        const { title, imageSrc, imageAlt, projectUrl, isNDA } = project;
        const projectId = title.toLowerCase().replace(/\s+/g, '-');
        const url = projectUrl || `projects/${projectId}.html`;

        const card = document.createElement('a');
        card.className = 'work-grid-card';
        card.href = url;
        card.dataset.projectId = projectId;
        if (isNDA) card.dataset.nda = 'true';

        const lockIcon = isNDA
            ? `
                <span class="work-grid-card-lock" title="Password required" aria-label="Password required">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <rect x="5" y="11" width="14" height="10" rx="2"></rect>
                        <path d="M8 11V8a4 4 0 0 1 8 0v3"></path>
                    </svg>
                </span>
            `
            : '';

        card.innerHTML = `
            <div class="work-grid-card-media">
                <img src="${imageSrc}" alt="${imageAlt || title}" loading="lazy" />
                <div class="work-grid-card-title">
                    <span>${title}</span>
                </div>
                ${lockIcon}
            </div>
        `;

        if (isNDA) {
            card.addEventListener('click', (e) => {
                e.preventDefault();

                if (isAuthenticated(projectId)) {
                    window.location.href = url;
                    return;
                }

                passwordModal.show(projectId, url);
            });
        }

        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initEffects();
    renderWorkGrid();
});
