async function detectOS() {
    let os = null;
    let userAgent = navigator.userAgent;
    let data = navigator.userAgentData;

    // Mobile OS first (more specific)
    if (userAgent.indexOf("iPad") > -1 || (userAgent.indexOf("Macintosh") > -1 && navigator.maxTouchPoints > 1)) {
        os = "iPadOS";
    }
    else if (userAgent.indexOf("iPhone") > -1) os = "iOS";
    else if (userAgent.indexOf("Android") > -1) os = "Android";
    
    // Desktop OS
    else if (userAgent.indexOf("CrOS") > -1) os = "Chrome OS";
    else if (userAgent.indexOf("Macintosh") > -1) os = "macOS";
    else if (userAgent.indexOf("Linux") > -1) os = "Linux";
    
    // Windows versions
    else if (userAgent.indexOf("Windows NT 6.1") > -1) os = "Windows 7";
    else if (userAgent.indexOf("Windows NT 6.2") > -1) os = "Windows 8";
    else if (userAgent.indexOf("Windows NT 6.3") > -1) os = "Windows 8.1";
    
    // Windows 10/11 detection using High Entropy API
    if (!os && data && data.getHighEntropyValues) {
        try {
            const ua = await data.getHighEntropyValues(['platformVersion']);
            if (ua.platformVersion) {
                const majorVersion = Number(ua.platformVersion.split('.')[0]);
                if (majorVersion >= 13) os = "Windows 11";
                else if (majorVersion >= 1) os = "Windows 10";
            }
        } catch (e) {
            throw(e);
        }
    }

    // Fallback for Windows
    if (!os) {
        if (userAgent.indexOf("Windows NT 10.0") > -1) os = "Windows 10/11";
        else if (userAgent.includes("Win")) os = "Windows";
    }

    return os;
}

async function detectPlatform() {
    let userAgent = navigator.userAgent;
    let data = navigator.userAgentData;

    let os = await detectOS();
    let platform = 'Desktop';
    let browser = 'Unknown';
    let confidence = 'high';
    
    // Method 1: Check if mobile OS
    const mobileOS = ['iOS', 'iPadOS', 'Android'].includes(os);
    
    // Method 2: Check User Agent for mobile indicators
    const mobileUA = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    // Method 3: Check touch capability + screen size
    const hasTouchScreen = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
    const smallScreen = window.screen.width <= 768 || window.screen.height <= 768;
    
    // Method 4: Use User Agent Client Hints if available
    let mobileFromHints = false;
    if (data && data.mobile !== undefined) {
        mobileFromHints = data.mobile;
    }

    // Decision logic - prioritize multiple signals
    if (mobileOS || mobileFromHints) {
        platform = 'Mobile';
    } else if (mobileUA && hasTouchScreen && smallScreen) {
        platform = 'Mobile';
        confidence = 'medium'; // Less certain without OS confirmation
    } else if (mobileUA && !hasTouchScreen) {
        platform = 'Desktop'; // Mobile UA but no touch = likely spoofed
        confidence = 'low';
    } else {
        platform = 'Desktop';
    }
    
    if (data && data.brands) {
        // Parse User Agent Client Hints brands
        for (let brand of data.brands) {
            if (!brand.brand.includes("Chromium") && 
                !brand.brand.includes("Not") && 
                brand.brand !== "Unknown") {
                browser = brand.brand;
                break;
            }
        }
        if (browser === 'Unknown') browser = 'Chromium'; // Chromium-based fallback
    }
    // Fallback to UA string parsing
    else if (userAgent.includes('Firefox') || userAgent.includes('FxiOS')) {
        browser = 'Firefox';
    }
    else if (userAgent.includes('Edg/')) {
        browser = 'Edge';
    }
    else if (userAgent.includes('OPR/') || userAgent.includes('Opera')) {
        browser = 'Opera';
    }
    else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        browser = 'Safari'; // Safari must be checked AFTER Chrome check
    }
    else if (userAgent.includes('Chrome')) {
        browser = 'Chrome';
    }
    
    let language = navigator.language || navigator.userLanguage;
    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Try to get country from timezone (with more complete mapping)
    let country = getCountryFromTimezone(timeZone);
    
    // Fallback: Try to infer from language code
    if (!country && language) {
        const countryCode = language.split('-')[1];
        if (countryCode) {
            country = `Inferred: ${countryCode}`;
            confidence = 'low';
        }
    }
    
    sessionStorage.setItem('OS', os || 'Unknown');
    sessionStorage.setItem('platform', platform);
    sessionStorage.setItem('browser', browser);
    sessionStorage.setItem('detectionConfidence', confidence);
    
    sessionStorage.setItem('language', language);
    sessionStorage.setItem('timeZone', timeZone);
    sessionStorage.setItem('country', country || 'Unknown');
}

// More complete timezone to country mapping
function getCountryFromTimezone(timezone) {
    const countries = {
        // North America
        "America/New_York": "United States",
        "America/Los_Angeles": "United States",
        "America/Chicago": "United States",
        "America/Denver": "United States",
        "America/Phoenix": "United States",
        "America/Anchorage": "United States",
        "America/Honolulu": "United States",
        "America/Toronto": "Canada",
        "America/Vancouver": "Canada",
        "America/Edmonton": "Canada",
        "America/Winnipeg": "Canada",
        "America/Halifax": "Canada",
        "America/Mexico_City": "Mexico",
        "America/Cancun": "Mexico",
        "America/Monterrey": "Mexico",
        
        // South America
        "America/Sao_Paulo": "Brazil",
        "America/Buenos_Aires": "Argentina",
        "America/Lima": "Peru",
        "America/Bogota": "Colombia",
        "America/Santiago": "Chile",
        "America/Caracas": "Venezuela",
        
        // Europe
        "Europe/London": "United Kingdom",
        "Europe/Paris": "France",
        "Europe/Berlin": "Germany",
        "Europe/Madrid": "Spain",
        "Europe/Rome": "Italy",
        "Europe/Moscow": "Russia",
        "Europe/Istanbul": "Turkey",
        "Europe/Amsterdam": "Netherlands",
        "Europe/Stockholm": "Sweden",
        "Europe/Zurich": "Switzerland",
        "Europe/Warsaw": "Poland",
        "Europe/Helsinki": "Finland",
        "Europe/Dublin": "Ireland",
        "Europe/Lisbon": "Portugal",
        "Europe/Vienna": "Austria",
        "Europe/Brussels": "Belgium",
        "Europe/Copenhagen": "Denmark",
        "Europe/Oslo": "Norway",
        "Europe/Prague": "Czech Republic",
        "Europe/Athens": "Greece",
        "Europe/Bucharest": "Romania",
        "Europe/Budapest": "Hungary",
        
        // Asia
        "Asia/Tokyo": "Japan",
        "Asia/Shanghai": "China",
        "Asia/Hong_Kong": "Hong Kong",
        "Asia/Singapore": "Singapore",
        "Asia/Seoul": "South Korea",
        "Asia/Dubai": "United Arab Emirates",
        "Asia/Kolkata": "India",
        "Asia/Bangkok": "Thailand",
        "Asia/Jakarta": "Indonesia",
        "Asia/Manila": "Philippines",
        "Asia/Kuala_Lumpur": "Malaysia",
        "Asia/Taipei": "Taiwan",
        "Asia/Riyadh": "Saudi Arabia",
        "Asia/Karachi": "Pakistan",
        "Asia/Tehran": "Iran",
        "Asia/Baghdad": "Iraq",
        "Asia/Kabul": "Afghanistan",
        "Asia/Ho_Chi_Minh": "Vietnam",
        
        // Oceania
        "Australia/Sydney": "Australia",
        "Australia/Melbourne": "Australia",
        "Australia/Brisbane": "Australia",
        "Australia/Perth": "Australia",
        "Pacific/Auckland": "New Zealand",
        "Pacific/Fiji": "Fiji",
        
        // Africa
        "Africa/Cairo": "Egypt",
        "Africa/Johannesburg": "South Africa",
        "Africa/Lagos": "Nigeria",
        "Africa/Nairobi": "Kenya",
        "Africa/Casablanca": "Morocco",
        
        // Other
        "Atlantic/Reykjavik": "Iceland",
        "Etc/GMT": "UTC",
        "UTC": "UTC"
    };
    
    return countries[timezone];
}

async function onStart() {
    const detectionResult = await detectPlatform();
    
    // Log results for debugging
    console.log("Detection Results:", detectionResult);
    
    // Clean up script element if it exists
    const scriptEl = document.getElementById('script-browser-compatibility');

    if (scriptEl) scriptEl.remove();
}