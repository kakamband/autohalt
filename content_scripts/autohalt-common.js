function getSiteSettings(key) {
    return browser.storage.local.get(key)
    .then((settings) => {
        return settings[key];
    })
    .catch((error) => {
        console.warn("Failed to get settings for", key, ":", error);
        return {};
    });
}

function monitorDom(disableAutoplay, options) {
    const disconnectOnSuccess = !!options?.disconnectOnSuccess;

    let scheduled = false;

    function idleCallback() {
        let result = disableAutoplay();
        if (result && disconnectOnSuccess) {
            observer.disconnect();
        }
        scheduled = false;
    }

    function scheduleIdleCallback() {
        if (!scheduled) {
            window.requestIdleCallback(idleCallback, {timeout: 1000});
            scheduled = true;
        }
    }

    const observer = new MutationObserver(scheduleIdleCallback);
    const observerConfig = {
        subtree: true,
        childList: true,
    };
    observer.observe(document.body, observerConfig);

    scheduleIdleCallback();
}
