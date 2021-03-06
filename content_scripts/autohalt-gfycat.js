var userEnabled = null;
function checkboxListener(event) {
    userEnabled = event.target.checked;
    // console.debug("Autoplay checkbox changed:", userEnabled);
}

function findAutoplayCheckbox() {
    return document.querySelector('.upnext-control input[type=checkbox]');
}

function disableAutoplay() {
    const autoplayCheckbox = findAutoplayCheckbox();
    if (!autoplayCheckbox) {
        // console.debug("Autoplay checkbox not found");
        return false;
    }
    // console.debug("Found autoplay checkbox:", autoplayCheckbox);

    if (autoplayCheckbox.checked && !userEnabled) {
        console.info("Clicking autoplay checkbox");
        autoplayCheckbox.click();
    }

    // Listen and remember if the user manually enables autoplay
    autoplayCheckbox.addEventListener('change', checkboxListener);

    return true;
}

getSiteSettings('gfycat')
.then((settings) => {
    if (! settings?.disabled) {
        // Gfycat does not preserve the state of the autoplay toggle if the
        // user navigates away from the video player, so keep watching the DOM
        // indefinitely.
        monitorDom(disableAutoplay);
    }
})
.catch((error) => {
    console.error(error);
});
