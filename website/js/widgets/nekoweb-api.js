
async function getSiteInfo() {
    try {
        const response = await fetch("https://nekoweb.org/api/site/info/ulon.dev");
        const url = "https://corsproxy.io/?" + encodeURIComponent(response);

        if (!response.ok) {
            throw new Error(`HTTPS error! Status: ${response.status}`);
        }

        const data = await response.json();
        const statusElement = document.getElementById("visitor-counter-label");
        if (statusElement) {
            statusElement.innerHTML = data.views;
        }
        
    } catch (error) {
        console.error("Failed to fetch site info:", error);
    }
}

getSiteInfo();