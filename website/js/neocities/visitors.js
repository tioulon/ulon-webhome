const user = "ulon";

async function getNeocitiesViews() {
    const el = document.getElementById("visitor-count");
    if (!el) {
        console.error('Element "visitor-count" not found in the HTML. Check the id.');
        return;
    }

    const neocitiesUrl = `https://neocities.org/api/info?sitename=${user}`;

    const proxies = [
        (target) => `https://neocities-proxy.ulonness.workers.dev/?url=${encodeURIComponent(target)}`,
        (target) => `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`,
        (target) => `https://corsproxy.io/?url=${encodeURIComponent(target)}`,
        (target) => `https://thingproxy.freeboard.io/fetch/${target}`,
    ];

    for (const buildProxyUrl of proxies) {
        try {
            const response = await fetch(buildProxyUrl(neocitiesUrl));

            if (!response.ok) throw new Error(`Proxy responded with status ${response.status}`);

            const siteInfo = await response.json();

            if (siteInfo && siteInfo.info) {
                const viewsCount = siteInfo.info.views;
                const formattedViews = Number(viewsCount).toLocaleString();
                el.innerText = `Neocities: ${formattedViews}`;
                return; // success, no need to try the next proxy
            }
        } catch (error) {
            console.warn("Proxy failed, trying the next one:", error);
            // fall through to the next proxy in the list
        }
    }

    // If we get here, every proxy in the list failed
    console.error("All proxies failed to fetch Neocities stats.");
    el.innerText = "Neocities: Error";
}

// Wait for the DOM to be ready before running
document.addEventListener("DOMContentLoaded", getNeocitiesViews);