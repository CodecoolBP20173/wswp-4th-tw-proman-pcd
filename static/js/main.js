// This function is to initialize the application
function init() {
    dom.loadBoards();
    // it uses the dom.js to show boards
    window.addEventListener("load", dom.adaptSize);
    window.addEventListener("resize", dom.adaptSize);
}

init();
