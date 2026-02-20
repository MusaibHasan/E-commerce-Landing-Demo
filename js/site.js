// ===============================
// 1. THEME TOGGLE LOGIC (Cleaned for Boxicons)
// ===============================

const themeBtns = document.querySelectorAll('.theme-btn');

themeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();

        // 1. Add the animation class ONLY on click
        btn.classList.add('animate-toggle');

        // 2. Toggle the theme
        document.body.classList.toggle("dark-mode");
        document.documentElement.classList.toggle("dark-mode");

        // 3. Save Preference
        const isDark = document.body.classList.contains("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");

        // 4. Remove the animation class after it finishes (400ms)
        // This ensures it doesn't stay on the element during a refresh
        setTimeout(() => {
            btn.classList.remove('animate-toggle');
        }, 400);
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

// ===============================
// 4. SEARCH INPUT CLEAR BUTTON LOGIC (Updated for Multiple Bars)
// ===============================

document.addEventListener("DOMContentLoaded", function () {
    // Find ALL search wrappers on the page
    const searchWrappers = document.querySelectorAll(".search-wrapper");

    searchWrappers.forEach(wrapper => {
        // Use class instead of ID
        const searchInput = wrapper.querySelector(".search-input");
        const clearBtn = wrapper.querySelector(".clear-search-btn");

        if (searchInput && clearBtn) {

            // Reusable function to toggle X
            const toggleClearButton = () => {
                clearBtn.style.display = searchInput.value.length > 0 ? "block" : "none";
            };

            // 1. Run immediately on load (fixes autofill issue)
            toggleClearButton();

            // 2. Show/Hide 'X' on typing
            searchInput.addEventListener("input", toggleClearButton);

            // 3. Clear text on click
            clearBtn.addEventListener("click", function () {
                searchInput.value = "";
                toggleClearButton();
                searchInput.focus();
            });
        }
    });
});

// ===============================
// 5. SCROLL EFFECTS (Header & Back to Top)
// ===============================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
    const header = document.querySelector('header.sticky-top');

    // 1. Sticky Header Shadow logic
    if (window.scrollY > 10) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }

    // 2. Back to Top Button Visibility logic
    if (backToTopBtn) {
        if (window.scrollY > 400) { // Shows button after scrolling 400px
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

// 3. Smooth Scroll to Top Click event
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
