/**
 * WorkItemManager.js - Manages work/portfolio items for Interactive Nature website
 * Updated with horizontal gallery layout, interactive features, and NDA project protection
 */

import { PasswordModal } from './PasswordModal.js';
import { isAuthenticated } from '../auth.js';

export class WorkItemManager {
    /**
     * Create a new work item manager
     * @param {Object} options - Configuration options
     */
    constructor(options = {}) {
        this.options = {
            selector: '.work-grid',

            // Edge scroll (mouse position controls scroll direction/speed)
            edgeScrollEnabled: true,
            edgeScrollThreshold: 150,
            edgeScrollSpeed: 5,

            // Auto-scroll (continuous left loop)
            autoScrollEnabled: true,
            autoScrollSpeed: 0.6, // px per frame (~36px/s @ 60fps)
            pauseOnHover: true,

            hoverInteractionEnabled: true,
            bounceAnimationEnabled: true,

            maxMomentumVelocity: 4,
            momentumScaleFactor: 15,
            ...options
        };
        
        this.element = document.querySelector(this.options.selector);
        this.workItems = [];
        this.mouseX = 0;
        this.mouseY = 0;

        // Edge scrolling state
        this.isScrolling = false;
        this.scrollDirection = 0; // -1 for left, 1 for right

        // Auto scrolling state
        this.isAutoScrolling = false;
        this.autoScrollPaused = false;

        this.reachedStart = false;
        this.reachedEnd = false;
        this.initialized = false;
        this.animationFrame = null;
        this.momentumRAF = null; // For momentum scrolling animation
        this.isMobile = false; // Removed mobile check to enable horizontal scrolling on all devices

        // Bound handlers (so removeEventListener works)
        this._handleMouseMove = this.handleMouseMove.bind(this);
        this._handleResize = this.handleResize.bind(this);
        this._handleGridEnter = this.handleGridEnter.bind(this);
        this._handleGridLeave = this.handleGridLeave.bind(this);

        // Create password modal for NDA projects
        this.passwordModal = new PasswordModal();
    }
    
    /**
     * Initialize the work item manager
     * @returns {WorkItemManager} - For chaining
     */
    init() {
        if (this.initialized) return this;
        if (!this.element) {
            console.warn('Work grid element not found');
            return this;
        }
        
        this.initialized = true;
        this.setupEventListeners();
        
        // Prepare seamless looping content for auto-scroll
        if (this.options.autoScrollEnabled) {
            this.ensureLoopingItems();
            this.isAutoScrolling = true;
        }

        // Initialize edge scrolling if enabled (for all devices)
        if (this.options.edgeScrollEnabled) {
            this.initializeEdgeScrolling();
        }
        
        return this;
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Track mouse position for hover and edge scrolling effects
        document.addEventListener('mousemove', this._handleMouseMove, { passive: true });
        
        // Handle window resize
        window.addEventListener('resize', this._handleResize, { passive: true });

        // Pause auto-scroll while the user is interacting with the gallery
        if (this.element) {
            this.element.addEventListener('mouseenter', this._handleGridEnter, { passive: true });
            this.element.addEventListener('mouseleave', this._handleGridLeave, { passive: true });
            this.element.addEventListener('touchstart', this._handleGridEnter, { passive: true });
            this.element.addEventListener('touchend', this._handleGridLeave, { passive: true });
            this.element.addEventListener('touchcancel', this._handleGridLeave, { passive: true });
        }
        
        // Add intersection observer for scroll animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add fade-in animation when visible
                    entry.target.classList.add('animate-in');
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe the work grid
        if (this.element) {
            observer.observe(this.element);
        }
    }
    
    /**
     * Handle mouse movement
     * @param {MouseEvent} e - Mouse event
     */
    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        if (!this.element) return;

        const rect = this.element.getBoundingClientRect();

        // Expanded detection area - check if mouse is within or near the gallery bounds
        const expandedTop = rect.top - 50;
        const expandedBottom = rect.bottom + 50;
        const expandedLeft = rect.left - 100;
        const expandedRight = rect.right + 100;

        const isInGalleryArea =
            this.mouseX >= expandedLeft &&
            this.mouseX <= expandedRight &&
            this.mouseY >= expandedTop &&
            this.mouseY <= expandedBottom;

        if (!isInGalleryArea) {
            this.stopScrolling();
            return;
        }

        // Cursor-position-based scroll direction (smoothly)
        if (!this.options.edgeScrollEnabled) return;

        // Convert cursor X into a normalized value in [-1, 1], where 0 is center.
        const t = (this.mouseX - rect.left) / rect.width; // 0..1
        const centered = (t - 0.5) * 2; // -1..1

        // Dead zone in the center so it doesn't constantly drift
        const deadZone = 0.12;
        if (Math.abs(centered) < deadZone) {
            this.stopScrolling();
            return;
        }

        // Direction is sign; magnitude controls speed via updateScroll
        this.startScrolling(Math.sign(centered));

        // Scale scroll speed based on distance from center (0..1)
        this._edgeIntensity = Math.min(1, (Math.abs(centered) - deadZone) / (1 - deadZone));
    }
    
    /**
     * Handle window resize
     */
    handleResize() {
        // Keep edge scrolling enabled on all devices
        // Just update dimensions and layout as needed
        if (this.element) {
            // Recalculate dimensions if needed
            const maxScrollLeft = this.element.scrollWidth - this.element.clientWidth;
            
            // Reset scroll position if we're at the end and resize makes content shorter
            if (this.element.scrollLeft > maxScrollLeft) {
                this.element.scrollLeft = maxScrollLeft > 0 ? maxScrollLeft : 0;
            }
        }
    }
    
    /**
     * Initialize edge scrolling functionality
     */
    initializeEdgeScrolling() {
        // Set up animation frame for smooth scrolling
        this.animationFrame = requestAnimationFrame(this.updateScroll.bind(this));
        
        // Add scroll event listener to detect manual scrolling
        this.element.addEventListener('scroll', () => {
            // Check if we've reached the start or end of the gallery
            const maxScrollLeft = this.element.scrollWidth - this.element.clientWidth;
            
            if (this.element.scrollLeft <= 0) {
                this.reachedStart = true;
            } else if (this.element.scrollLeft >= maxScrollLeft) {
                this.reachedEnd = true;
            } else {
                this.reachedStart = false;
                this.reachedEnd = false;
            }
        });
        
        // Add touch event support for mobile devices
        this.initializeTouchScrolling();
    }
    
    /**
     * Initialize touch scrolling for mobile devices with improved responsiveness
     */
    initializeTouchScrolling() {
        if (!this.element) return;

        let startX = 0;
        let startScrollLeft = 0;
        let isDragging = false;

        let lastX = 0;
        let lastTimestamp = 0;
        let velocity = 0;

        // If the carousel is looping / auto-scrolling, snapping feels bad.
        // We'll temporarily disable auto-scroll + edge scroll during direct touch interaction.
        const pauseDuringTouch = () => {
            this.autoScrollPaused = true;
            this.stopScrolling();
            if (this.momentumRAF) {
                cancelAnimationFrame(this.momentumRAF);
                this.momentumRAF = null;
            }
        };

        const resumeAfterTouch = () => {
            this.autoScrollPaused = false;
        };

        // Touch start
        this.element.addEventListener('touchstart', (e) => {
            if (e.touches.length !== 1) return;

            pauseDuringTouch();

            startX = e.touches[0].pageX;
            lastX = startX;
            lastTimestamp = Date.now();
            startScrollLeft = this.element.scrollLeft;
            isDragging = true;
            velocity = 0;
        }, { passive: true });

        // Touch move
        this.element.addEventListener('touchmove', (e) => {
            if (!isDragging || e.touches.length !== 1) return;

            const x = e.touches[0].pageX;

            // Natural 1:1 scroll (avoid the 1.2 multiplier which makes it feel "slippery")
            const distance = (startX - x);

            const now = Date.now();
            const elapsed = now - lastTimestamp;
            if (elapsed > 0) {
                velocity = (lastX - x) / elapsed; // px/ms
            }

            lastX = x;
            lastTimestamp = now;

            this.element.scrollLeft = startScrollLeft + distance;
        }, { passive: true });

        // Touch end: snap to nearest item center
        this.element.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;

            // If looping is enabled, don't try to snap (it will fight the wrap logic)
            if (this.options.autoScrollEnabled) {
                resumeAfterTouch();
                return;
            }

            this.snapToNearestItem();
            resumeAfterTouch();
        }, { passive: true });

        this.element.addEventListener('touchcancel', () => {
            isDragging = false;
            resumeAfterTouch();
            if (this.momentumRAF) {
                cancelAnimationFrame(this.momentumRAF);
                this.momentumRAF = null;
            }
        }, { passive: true });
    }
    
    /**
     * Apply momentum scrolling after touch end
     * @param {number} initialVelocity - Initial velocity in pixels per millisecond
     */
    applyMomentumScrolling(initialVelocity) {
        if (!this.element) return;
        
        // Scale the velocity but cap it at the maximum value
        let velocity = Math.min(
            Math.abs(initialVelocity * this.options.momentumScaleFactor), 
            this.options.maxMomentumVelocity
        ) * Math.sign(initialVelocity);
        
        let timestamp = Date.now();
        const friction = 0.95; // Friction coefficient (lower = more friction)
        
        const animate = () => {
            const now = Date.now();
            const elapsed = now - timestamp;
            timestamp = now;
            
            // Apply friction to slow down over time
            velocity *= friction;
            
            // Calculate distance to scroll
            const delta = velocity * elapsed;
            
            // Apply scroll
            this.element.scrollLeft += delta;
            
            // Continue animation if velocity is still significant
            if (Math.abs(velocity) > 0.05) {
                this.momentumRAF = requestAnimationFrame(animate);
            }
        };
        
        this.momentumRAF = requestAnimationFrame(animate);
    }
    
    /**
     * Set the maximum momentum velocity
     * @param {number} value - Maximum velocity value
     * @returns {WorkItemManager} - For chaining
     */
    setMaxMomentumVelocity(value) {
        this.options.maxMomentumVelocity = value;
        console.log(`Maximum momentum velocity set to: ${value}`);
        return this;
    }
    
    /**
     * Set the momentum scale factor
     * @param {number} value - Scale factor for initial momentum
     * @returns {WorkItemManager} - For chaining
     */
    setMomentumScaleFactor(value) {
        this.options.momentumScaleFactor = value;
        console.log(`Momentum scale factor set to: ${value}`);
        return this;
    }
    
    /**
     * Start scrolling in a direction
     * @param {number} direction - Direction to scroll (-1 for left, 1 for right)
     */
    startScrolling(direction) {
        this.isScrolling = true;
        this.scrollDirection = direction;
    }
    
    /**
     * Stop scrolling
     */
    stopScrolling() {
        this.isScrolling = false;
        this.scrollDirection = 0;
    }
    
    /**
     * Update scroll position based on current scroll direction
     */
    updateScroll() {
        if (!this.element) {
            this.animationFrame = requestAnimationFrame(this.updateScroll.bind(this));
            return;
        }

        // Loop point (we clone items once, so midpoint is a safe wrap)
        const maxScrollLeft = this.element.scrollWidth - this.element.clientWidth;
        const loopPoint = Math.max(0, maxScrollLeft / 2);

        // 1) Continuous auto-scroll (to the left)
        if (this.options.autoScrollEnabled && this.isAutoScrolling && !this.autoScrollPaused) {
            this.element.scrollLeft += this.options.autoScrollSpeed;
        }

        // 2) Cursor-position-driven scroll overrides (when active)
        if (this.isScrolling) {
            const intensity = this._edgeIntensity ?? 1;
            const scrollSpeed = this.options.edgeScrollSpeed * 2 * intensity;
            this.element.scrollLeft += this.scrollDirection * scrollSpeed;
        }

        // 3) Wrap-around for seamless looping
        if (loopPoint > 0) {
            if (this.element.scrollLeft >= loopPoint) {
                this.element.scrollLeft -= loopPoint;
            } else if (this.element.scrollLeft < 0) {
                this.element.scrollLeft += loopPoint;
            }
        }

        // Continue animation loop
        this.animationFrame = requestAnimationFrame(this.updateScroll.bind(this));
    }
    
    /**
     * Trigger bounce animation at gallery ends
     * @param {string} direction - Direction of bounce ('left' or 'right')
     */
    triggerBounceAnimation(direction) {
        // Find the first or last work item
        const itemIndex = direction === 'left' ? 0 : this.workItems.length - 1;
        const item = this.workItems[itemIndex];
        
        if (item && item.element) {
            // Remove any existing bounce animations
            item.element.classList.remove('bounce-animation-left');
            item.element.classList.remove('bounce-animation-right');
            
            // Force reflow to restart animation
            void item.element.offsetWidth;
            
            // Add appropriate bounce animation based on direction
            if (direction === 'left') {
                item.element.classList.add('bounce-animation-left');
            } else {
                item.element.classList.add('bounce-animation-right');
            }
            
            // Remove classes after animation completes
            setTimeout(() => {
                if (item.element) {
                    item.element.classList.remove('bounce-animation-left');
                    item.element.classList.remove('bounce-animation-right');
                }
            }, 600); // Animation duration
        }
    }
    
    /**
     * Add a new work item with a link to its project page
     * @param {Object} workConfig - Work item configuration
     * @returns {HTMLElement} - The created work item element
     */
    addWorkItem(workConfig) {
        if (!this.element) return null;
    
        const { title, description, imageSrc, imageAlt, projectUrl, isNDA } = workConfig;
    
        // Generate a unique ID for the project based on title
        const projectId = title.toLowerCase().replace(/\s+/g, '-');
    
        // Default project URL if not provided
        const url = projectUrl || `projects/${projectId}.html`;
    
        // Create work item HTML with link to project page
        const itemHTML = `
            <a href="${url}" class="work-item-link" data-project-id="${projectId}" ${isNDA ? 'data-nda="true"' : ''}>
                <div class="work-item ${isNDA ? 'nda-project' : ''}">
                    <img src="${imageSrc}" alt="${imageAlt || title}">
                    <div class="work-overlay">
                        <h3>${title}</h3>
                        <p>${description}</p>
                        <span class="view-project">${isNDA ? '🔒 Password Required' : 'View Project'}</span>
                    </div>
                </div>
            </a>
        `;
    
        // Add item to the grid
        this.element.insertAdjacentHTML('beforeend', itemHTML);
    
        // Get the added item element
        const itemElement = this.element.lastElementChild;
    
        // Add click handler for NDA projects
        if (isNDA) {
            itemElement.addEventListener('click', (e) => {
                // Prevent default navigation
                e.preventDefault();
                
                // Check if already authenticated
                if (isAuthenticated(projectId)) {
                    // Allow navigation if authenticated
                    window.location.href = url;
                } else {
                    // Show password modal with onAuthenticated callback
                    this.passwordModal = new PasswordModal({
                        onAuthenticated: (authenticatedProjectId) => {
                            // Also authenticate with the URL-based project ID to ensure compatibility
                            const urlProjectId = url.substring(url.lastIndexOf('/') + 1).replace('.html', '');
                            if (authenticatedProjectId !== urlProjectId) {
                                sessionStorage.setItem(`auth_${urlProjectId}`, 'true');
                            }
                            
                            // Navigate to the project after authentication
                            window.location.href = url;
                        }
                    });
                    this.passwordModal.show(projectId, url);
                }
            });
        }
    
        // Add to work items array
        this.workItems.push({
            config: workConfig,
            element: itemElement,
            projectId: projectId,
            isNDA: !!isNDA
        });
        
        return itemElement;
    }
    
    /**
     * Remove a work item
     * @param {number} index - Index of the work item to remove
     * @returns {boolean} - True if removed successfully, false otherwise
     */
    removeWorkItem(index) {
        if (index < 0 || index >= this.workItems.length) return false;
        
        const item = this.workItems[index];
        
        // Remove element from DOM
        if (item.element && item.element.parentNode) {
            item.element.parentNode.removeChild(item.element);
        }
        
        // Remove from work items array
        this.workItems.splice(index, 1);
        
        return true;
    }
    
    /**
     * Update an existing work item
     * @param {number} index - Index of the work item to update
     * @param {Object} workConfig - New work item configuration
     * @returns {HTMLElement} - The updated work item element
     */
    updateWorkItem(index, workConfig) {
        if (index < 0 || index >= this.workItems.length) return null;
        
        const item = this.workItems[index];
        const { title, description, imageSrc, imageAlt } = workConfig;
        
        // Update element content
        if (item.element) {
            const imgEl = item.element.querySelector('img');
            const titleEl = item.element.querySelector('h3');
            const descEl = item.element.querySelector('p');
            
            if (imgEl) {
                imgEl.src = imageSrc;
                imgEl.alt = imageAlt || title;
            }
            
            if (titleEl) titleEl.textContent = title;
            if (descEl) descEl.textContent = description;
            
            // Update config
            item.config = { ...item.config, ...workConfig };
        }
        
        return item.element;
    }
    
    /**
     * Destroy the work item manager
     */
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        if (this.momentumRAF) {
            cancelAnimationFrame(this.momentumRAF);
        }
        
        // Remove event listeners
        document.removeEventListener('mousemove', this._handleMouseMove);
        window.removeEventListener('resize', this._handleResize);

        if (this.element) {
            this.element.removeEventListener('mouseenter', this._handleGridEnter);
            this.element.removeEventListener('mouseleave', this._handleGridLeave);
            this.element.removeEventListener('touchstart', this._handleGridEnter);
            this.element.removeEventListener('touchend', this._handleGridLeave);
            this.element.removeEventListener('touchcancel', this._handleGridLeave);
        }
        
        // Destroy password modal
        if (this.passwordModal) {
            this.passwordModal.destroy();
        }
        
        this.initialized = false;
    }
    
    handleGridEnter() {
        if (this.options.pauseOnHover) {
            this.autoScrollPaused = true;
        }
    }

    handleGridLeave() {
        if (this.options.pauseOnHover) {
            this.autoScrollPaused = false;
        }
    }

    /**
     * Duplicate items to allow seamless looping.
     * Keeps the original set in-place and appends one clone set.
     */
    ensureLoopingItems() {
        if (!this.element) return;
        if (this.element.dataset.loopingInitialized === 'true') return;

        // If there are no items, nothing to clone
        const children = Array.from(this.element.children);
        if (children.length === 0) return;

        // Clone all current children once
        const clones = children.map((el) => el.cloneNode(true));
        clones.forEach((clone) => {
            // Prevent duplicate NDA click handlers by removing any dataset flags.
            // (NDA click handling is attached on the original item element in addWorkItem.)
            clone.removeAttribute('data-nda');
            this.element.appendChild(clone);
        });

        this.element.dataset.loopingInitialized = 'true';
    }

    snapToNearestItem() {
        if (!this.element) return;

        const items = Array.from(this.element.querySelectorAll('.work-item-link'));
        if (items.length === 0) return;

        const gridRect = this.element.getBoundingClientRect();
        const targetCenter = gridRect.left + gridRect.width / 2;

        let best = null;
        let bestDistance = Infinity;

        for (const item of items) {
            const r = item.getBoundingClientRect();
            const itemCenter = r.left + r.width / 2;
            const d = Math.abs(itemCenter - targetCenter);
            if (d < bestDistance) {
                bestDistance = d;
                best = item;
            }
        }

        if (best) {
            // Smoothly center the item
            best.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }
}
