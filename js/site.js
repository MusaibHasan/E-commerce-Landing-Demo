// ===============================
// 1. THEME TOGGLE LOGIC (Cleaned for Boxicons)
// ===============================

const themeBtns = document.querySelectorAll('.theme-btn');

// Event: Click listener for toggle buttons
themeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();

        // Toggle class on both for consistency
        document.body.classList.toggle("dark-mode");
        document.documentElement.classList.toggle("dark-mode");

        // Save Preference
        const isDark = document.body.classList.contains("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
});


// ===============================
// 2. MOBILE ACCORDION LOGIC (UPDATED)
// ===============================

document.querySelectorAll('.dropdown-toggle-mobile').forEach(toggle => {
    toggle.addEventListener('click', function (e) {
        // Desktop check: Ignore clicks if screen is wider than 992px
        if (window.innerWidth >= 992) return;

        e.preventDefault();

        const navItem = this.closest('.nav-item');
        const dropdown = navItem.querySelector('.nav-dropdown');

        // Safety check: If no dropdown exists, stop here
        if (!dropdown) return;

        // Prevent spam-clicking while animation is running
        if (dropdown.classList.contains('animating')) return;

        // 1. Add Animation Lock
        // This corresponds to your CSS .nav-dropdown.animating { pointer-events: none; }
        dropdown.classList.add('animating');

        // 2. Accordion Pattern: Close other open items
        document.querySelectorAll('.nav-item.open').forEach(item => {
            if (item !== navItem) {
                item.classList.remove('open');
            }
        });

        // 3. Toggle Current Item
        // This triggers the CSS Grid Transition (grid-template-rows: 0fr -> 1fr)
        navItem.classList.toggle('open');

        // 4. Remove Lock after CSS transition completes
        // Your CSS transition is 0.35s (350ms), so we wait 360ms to be safe.
        setTimeout(() => {
            dropdown.classList.remove('animating');
        }, 360);
    });
});

// ===============================
// 3. CLEANUP ON CLOSE
// ===============================

// Close all accordions when the main offcanvas menu closes
const offcanvasEl = document.getElementById('offcanvasNavbar');

if (offcanvasEl) {
    offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
        // Remove .open class from all items to reset state
        document.querySelectorAll('.nav-item.open').forEach(item => {
            item.classList.remove('open');
        });
    });
}