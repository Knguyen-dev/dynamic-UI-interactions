// File where we create the main elements of the page

// Create the main header for the project
function createProjectHeader() {
    // Create the header
    const header = document.createElement("header");
    header.id = "project-header";

    // Create the logo container which is a component of the header
    const logoContainer = document.createElement("div");
    logoContainer.classList.add("logo-container");
    logoContainer.innerHTML = `<img
                            src="./assets/icons/camera_logo.svg"
                            class="site-logo"
                        />
                        <h2 class="header-site-name">Photografia</h2>`;
    header.appendChild(logoContainer);

    // Create the container for the search bar
    const searchBarContainer = document.createElement("div");
    searchBarContainer.classList.add("search-bar-container");
    searchBarContainer.innerHTML = `<input
                            type="search"
                            placeholder="Search"
                            class="header-search-bar"
                        />
                        <button class="search-button">Search</button>`;
    header.appendChild(searchBarContainer);

    // Create the nav for the header; which different menus will be loaded in depending on the size of the screen
    const headerNav = document.createElement("nav");
    headerNav.classList.add("header-nav");
    header.appendChild(headerNav);

    // Return the header
    return header;
}

// Create the main content section for the project; section where content from the tabs will be loaded
function createProjectMainContent() {
    // Make the section and return it
    const mainContentSection = document.createElement("section");
    mainContentSection.id = "project-main-content";
    return mainContentSection;
}

// Creates the main footer for the project
function createProjectFooter() {
    // Create a footer element
    const footer = document.createElement("footer");
    footer.id = "project-footer";

    // Create text element representing the main message of the ofoter
    const footerMainMessage = document.createElement("h2");
    footerMainMessage.id = "footer-main-message";
    footerMainMessage.textContent = "Thank you for your support";
    footer.appendChild(footerMainMessage);

    // Create the secondary text element that has a dynamic date
    const currentYear = new Date().getFullYear();
    const footerSecondaryMessage = document.createElement("p");
    footerSecondaryMessage.id = "footer-secondary-message";
    footerSecondaryMessage.textContent = `Always moving forward, and some rights reserved. ${currentYear}`;
    footer.appendChild(footerSecondaryMessage);

    // Then return the footer
    return footer;
}

// Creates content for tabs with no content
function createEmptyTabContent() {}

export { createProjectHeader, createProjectMainContent, createProjectFooter };
