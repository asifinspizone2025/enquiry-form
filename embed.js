(function() {
    console.log("Script shuru hua");

    const container = document.getElementById('node-form');
    if (!container) {
        console.log("Error: node-form div nahi mila");
        return;
    }

    // Loader set karo
    container.innerHTML = `
        <div class="loader-container">
            <style>
                .loader-container { display: flex; justify-content: center; align-items: center; height: 200px; }
                .loader { border: 4px solid #f3f3f3; border-top: 4px solid #007bff; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            </style>
            <div class="loader"></div>
        </div>
    `;
    console.log("Loader set ho gaya");

    // VPN/Bot/Automation detection function
    function isSuspiciousUser() {
        const ua = navigator.userAgent.toLowerCase();
        console.log("User Agent:", ua);
        const isBot = /bot|crawl|spider|headless|selenium|scrapy/i.test(ua);
        console.log("Is Bot:", isBot);
        const isAutomationTool = /phantomjs|puppeteer|playwright/i.test(ua);
        console.log("Is Automation Tool:", isAutomationTool);

        const hasWebRTCLeak = () => {
            return new Promise(resolve => {
                const rtc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
                rtc.createDataChannel('');
                rtc.createOffer()
                    .then(offer => rtc.setLocalDescription(offer))
                    .then(() => {
                        const sdp = rtc.localDescription.sdp;
                        console.log("WebRTC SDP:", sdp);
                        const leakDetected = /192\.168|10\.0|172\.(1[6-9]|2[0-9]|3[0-1])/.test(sdp);
                        console.log("WebRTC Leak Detected:", leakDetected);
                        resolve(leakDetected);
                        rtc.close();
                    })
                    .catch(err => {
                        console.log("WebRTC Error:", err);
                        resolve(false);
                    });
            });
        };

        const checkIPMismatch = () => {
            return fetch('https://ipapi.co/json/')
                .then(response => response.json())
                .then(data => {
                    console.log("IP API Response:", data);
                    const isVpnLikely = data.vpn || data.proxy || data.tor;
                    console.log("VPN/Proxy/Tor Detected (IP API):", isVpnLikely);
                    return isVpnLikely;
                })
                .catch(err => {
                    console.log("IP API Error:", err);
                    return false;
                });
        };

        return new Promise(resolve => {
            Promise.all([
                hasWebRTCLeak(),
                checkIPMismatch()
            ]).then(([webRTCLeak, ipMismatch]) => {
                const suspicious = isBot || isAutomationTool || webRTCLeak || ipMismatch;
                console.log("All Checks:", { isBot, isAutomationTool, webRTCLeak, ipMismatch });
                console.log("Final Suspicious Result:", suspicious);
                resolve(suspicious);
            }).catch(err => {
                console.log("Detection Error:", err);
                resolve(false);
            });
        });
    }

    // reCAPTCHA script load karo
    if (typeof grecaptcha === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        console.log("reCAPTCHA script dynamically add ki");
    }

    // Main logic
    isSuspiciousUser().then(isSuspicious => {
        if (isSuspicious) {
            console.log("VPN/Bot/Automation detect hua, form hide kar raha hu");
            container.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #dc3545;">
                    <h3>Form Not Found</h3>
                    <p>Sorry, this form is not available due to security restrictions.</p>
                </div>
            `;
            return;
        }

        console.log("Koi suspicious activity nahi, form dikha raha hu");
        loadForm();
    });

    function loadForm() {
        if (typeof grecaptcha === 'undefined') {
            console.log("reCAPTCHA script abhi load nahi hui");
            setTimeout(loadForm, 100);
            return;
        }

        console.log("reCAPTCHA script load ho gayi");
        grecaptcha.ready(function() {
            console.log("reCAPTCHA ready hai, form dikha raha hu");
            container.innerHTML = `
                <div class="node-form-container">
                    <h2>Send Enquiry Now</h2>
                    <form method="POST" action="https://enquiry-form-koaw.onrender.com/submit">
                        <input type="text" name="name" required placeholder="Name*">
                        <input type="email" name="email" required placeholder="Email">
                        <input type="tel" name="mobile" required placeholder="Mobile">
                        <select name="service" required>
                            <option value="web_design">Web Design</option>
                            <option value="seo">SEO Services</option>
                            <option value="digital_marketing">Digital Marketing</option>
                        </select>
                        <div class="g-recaptcha" data-sitekey="6LdpZOsqAAAAAPgfo-01sSqp_TDwXAXzeBTUc0BO"></div>
                        <button type="submit" class="node-form-button">Submit</button>
                    </form>
                </div>
            `;
        });
    }
})();
