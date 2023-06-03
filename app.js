// NOTE: Include .js in imports and indicate type="module" in script tag
import {
    createProjectHeader,
    createProjectMainContent,
    createProjectFooter,
} from "./initialPageLoad.js";
import { createDesktopNav, createMobileNav } from "./loadMenus.js";
import { createImageCarousel } from "./loadImageCarousel.js";

// Module that keeps track of the state of things such as the active tab or the active slide index.
const elementStateModule = {
    activeTabID: "Home",
    activeSlideIndex: 0,
};

// Module for containing important dom elements that we may want to use
const DOMModule = (() => {
    // Get the page that acts as a root container for everything
    const contentPage = document.querySelector(".content");

    // Get container that contains most elements for the project (header, main-content, footer)
    const projectContainer = document.getElementById("project-container");

    // Header elements
    const header = createProjectHeader();
    projectContainer.appendChild(header);

    const desktopNav = createDesktopNav();
    const mobileNav = createMobileNav();

    const mainContentSection = createProjectMainContent();
    projectContainer.appendChild(mainContentSection);

    const footer = createProjectFooter();
    projectContainer.appendChild(footer);

    // return important dom elements
    return {
        header,
        desktopNav,
        mobileNav,
        mainContentSection,
        footer,
    };
})();

// Visual and rendering side

// Updates the slide dots to show which slide dot is active or which one slide hte user is currently viewing
// NOTE: We use a function since the active slide can be changed both by the dots but by the buttons too
function updateSlideDots() {
    const slideDots = document.querySelectorAll("div.slide-dot");
    slideDots.forEach((slideDot) => {
        const slideIndex = slideDot.dataset.slideIndex;
        if (slideIndex == elementStateModule.activeSlideIndex) {
            slideDot.setAttribute("data-active", "true");
        } else {
            slideDot.removeAttribute("data-active");
        }
    });
}

/*
Updates image for the image carousel; accepts newSlideIndex as the next slide position that the carousel will need to navigate to
NOTE: The technique is to have the slide-container position relative and the slides positioned absolute
Then performing transform: translateX() can move the children elements around in the container
*/
function updateImageCarousel(newSlideIndex) {
    // Get the inner container for the slides and its width, which equals the slide's width
    // Apply a transform on the inner container so it moves exactly the width of one slide, allowing us to show different images

    const slidesInnerContainer = document.querySelector(
        ".slides-inner-container"
    );
    const slideWidth = slidesInnerContainer.clientWidth;

    // SlidesContainer does the transform at one fixed point, so it looks at that one point and translates left accordingly
    slidesInnerContainer.style.transform = `translateX(-${
        slideWidth * newSlideIndex
    }px)`;

    // Update the active slide index
    elementStateModule.activeSlideIndex = newSlideIndex;

    // Update the Slide dots
    updateSlideDots();
}

// Adds section to main-content to display the messsages for users who enter empty tabs
function renderEmptyTabContent() {
    // Create section to display content for the empty tab and nest it in the main-content section
    const emptyTabSection = document.createElement("div");
    emptyTabSection.classList.add("empty-tab-section");
    DOMModule.mainContentSection.appendChild(emptyTabSection);

    const mainTabMessageEl = document.createElement("h2");
    mainTabMessageEl.textContent = `Sorry no content in the '${elementStateModule.activeTabID}' tab yet!`;
    emptyTabSection.appendChild(mainTabMessageEl);

    const secondaryTabMessageEl = document.createElement("p");
    secondaryTabMessageEl.textContent = `Please visit the 'Home' tab rather than the '${elementStateModule.activeTabID}' since the main focus is on the image carousel`;
    emptyTabSection.appendChild(secondaryTabMessageEl);
}

// load the image carousel on the main content section and then adds logic to its components
function renderImageCarousel() {
    const imageCarouselSection = createImageCarousel();

    // Append content of the image carousel onto the main content section
    DOMModule.mainContentSection.appendChild(imageCarouselSection);

    // Get amount of slides on the image carousel
    const numSlides = document.querySelectorAll("div.slide").length;

    // Check if they already have event listeners, if not then add them
    // BOOK MARK: Duplication of event listeners

    // Get the previous image btn and create an event listener for it
    const prevImageBtn = document.getElementById("prev-image-btn");
    prevImageBtn.addEventListener("click", () => {
        let newSlideIndex = elementStateModule.activeSlideIndex - 1;
        if (newSlideIndex < 0) {
            newSlideIndex = numSlides - 1;
        }
        updateImageCarousel(newSlideIndex);
    });

    // Get the next image button and make logic so it increments slide index
    const nextImageBtn = document.getElementById("next-image-btn");
    nextImageBtn.addEventListener("click", () => {
        let newSlideIndex = elementStateModule.activeSlideIndex + 1;
        if (newSlideIndex > numSlides - 1) {
            newSlideIndex = 0;
        }
        updateImageCarousel(newSlideIndex);
    });

    // Get the slide dots and add event listeners to them so that clicking on them can update the image carousel
    const slideDots = document.querySelectorAll("div.slide-dot");
    slideDots.forEach((slideDot) => {
        // Add event listener so slide dots can't share data-active, and they call updateImageCarousel
        slideDot.addEventListener("click", () => {
            // Get slide index from the slide dot element
            updateImageCarousel(parseInt(slideDot.dataset.slideIndex));
        });
    });
}

// Renders in content for the main content section depending on the tab that is active
function renderMainContent() {
    // Clear the main content
    DOMModule.mainContentSection.innerHTML = "";

    // Depending on the tab, render some content
    if (elementStateModule.activeTabID === "Home") {
        renderImageCarousel();
    } else {
        // The other tabs are for fluff/filler since the focus is the image carousel, so print this instead.
        renderEmptyTabContent();
    }
}

// Collapses or compresses the mobile nav
function toggleDropDownMenu(e) {
    const toggleDropDownBtn = e.currentTarget;
    const menuCollapsed = e.currentTarget.dataset.menuCollapsed;

    // Get the list of nav items that we will manipulate
    const navItemsList = document.querySelector(".nav-items-list");

    // Reassign the data-attrbute property since user is changing the drop down's state
    if (menuCollapsed === "true") {
        toggleDropDownBtn.setAttribute("data-menu-collapsed", "false");
        toggleDropDownBtn.textContent = "Drop Down";
        navItemsList.classList.add("drop-down-hidden");
    } else {
        toggleDropDownBtn.setAttribute("data-menu-collapsed", "true");
        toggleDropDownBtn.textContent = "Compress";
        navItemsList.classList.remove("drop-down-hidden");
    }
}

// Renders the header nav menu, and depending on the size of the window it loads either a mobile or desktop nav
function renderMenu(e) {
    const window = e.currentTarget;
    const screenWidth = window.outerWidth;
    const currentNav = document.querySelector(".header-nav");
    let newNav;

    // Depending on the size of the screen, get our new
    if (screenWidth <= 1100) {
        newNav = DOMModule.mobileNav;
    } else {
        newNav = DOMModule.desktopNav;
    }

    // If the currentNav and the newNav are the same navigation. For example if user goes from 1130px to 1145px the nav isn't going to change
    // so we aren't going to do a replacement since that's unnecessary.
    if (currentNav == newNav) {
        return;
    }

    // Beyond means that resizing lead to a different nav, so we do replacement and set up the tabs for the nav
    DOMModule.header.replaceChild(newNav, currentNav);
    // Check if the newly set nav is our mobile one and add our toggling button
    if (newNav == DOMModule.mobileNav) {
        const toggleDropDownBtn = document.getElementById(
            "toggle-drop-down-btn"
        );
        toggleDropDownBtn.addEventListener("click", toggleDropDownMenu);
    }

    // Then set up the nav items as interactive tabs to have event listeners
    const headerNavItems = document.querySelectorAll(".header-nav li.nav-item");
    headerNavItems.forEach((navItem) => {
        // User may have resized screen, so we should maintain the tab that they were on after the resize
        // Check the activeTabID with the tab ID of the nav items to persist tab, and remove data-active from all others to prevent duplication
        if (elementStateModule.activeTabID === navItem.dataset.tabId) {
            navItem.setAttribute("data-active", "true");
        } else {
            navItem.removeAttribute("data-active");
        }
        navItem.addEventListener("click", handleNavItemClick);
    });
}

// Application Side: More application logic

// Creates event listeners for a group of nav-items in the header, making it so that when clicked it lets the user
// see which tab they're on.
function handleNavItemClick(e) {
    // Get the nav item that was clicked and then all possible nav items
    const clickedNavItem = e.currentTarget;
    const allNavItems = document.querySelectorAll(".header-nav li.nav-item");

    // First put the data-active on the clicked nav item and remove it from all others
    allNavItems.forEach((navItem) => {
        if (navItem == clickedNavItem) {
            navItem.setAttribute("data-active", "true");
        } else {
            navItem.removeAttribute("data-active");
        }
    });
    elementStateModule.activeTabID = clickedNavItem.dataset.tabId;
    renderMainContent();
}

// If user resizes the page we make sure to check to render a different menu if necessary;
window.addEventListener("resize", (e) => {
    renderMenu(e);
});

// Detect size of screen and check whether the width is 1100px or less
window.addEventListener("DOMContentLoaded", (e) => {
    // Planning to add another render functions like render carousel
    // Then adding render
    renderMenu(e);
    renderMainContent();
});
