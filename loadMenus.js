// Function for creating and returning the different tabs/navItems in the header nav
function createNavItems() {
    const tabNames = ["Home", "Communities", "Chat", "Discover", "Account"];

    // Create an array containing nodes for nav items (tabs)
    const navItems = tabNames.map((tabName) => {
        // Create the nav item list item and add a data-attribute on it
        const navItem = document.createElement("li");

        navItem.setAttribute("data-tab-id", tabName);
        navItem.classList.add("nav-item");

        // Create the text element for said nav item and nest it
        const navItemTitle = document.createElement("span");
        navItemTitle.classList.add("nav-item-title");
        navItemTitle.textContent = tabName;
        navItem.appendChild(navItemTitle);

        // Return the nav item
        return navItem;
    });

    return navItems;
}

// Create the nav or menu for the desktop or wider screen versions
function createDesktopNav() {
    // Create nav
    const nav = document.createElement("nav");
    nav.classList.add("header-nav");

    // Create the list for containing nav links or the tabs and append to it nav
    const navItemsSection = document.createElement("ul");
    navItemsSection.classList.add("nav-items-list");
    nav.appendChild(navItemsSection);

    // Get the nav items and nest them in the ul element
    const navItems = createNavItems();
    navItems.forEach((navItem) => {
        navItemsSection.appendChild(navItem);
    });

    // Return the nav element
    return nav;
}

// Create nav or menu for the mobile or smaller screen version; a drop down tab menu;
// NOTE: Drop down is compressed by default, with the drop-down-hidden class hiding it, and the data-menu-collapsed attribute
// assuming that it is compressed as well.
function createMobileNav() {
    // Create nav
    const nav = document.createElement("nav");
    nav.classList.add("header-nav");

    // Create button for toggling the drop down menu; add data-attribute to indicate whether the menu is collapsed or not
    const toggleDropDownBtn = document.createElement("button");
    toggleDropDownBtn.textContent = "Drop Down";
    toggleDropDownBtn.id = "toggle-drop-down-btn";
    toggleDropDownBtn.setAttribute("data-menu-collapsed", "false");
    nav.appendChild(toggleDropDownBtn);

    // Create the ul element
    const navItemsSection = document.createElement("ul");
    navItemsSection.classList.add("nav-items-list");
    navItemsSection.classList.add("drop-down-hidden");
    nav.appendChild(navItemsSection);

    // Get the tabs or the navitems
    const navItems = createNavItems();
    navItems.forEach((navItem) => {
        navItemsSection.appendChild(navItem);
    });

    // Return the nav element now
    return nav;
}

export { createDesktopNav, createMobileNav };
