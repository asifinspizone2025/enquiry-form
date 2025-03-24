(function() {
    console.log("Script shuru hua");

    const container = document.getElementById('node-form');
    if (!container) {
        console.log("Error: node-form ID wala div nahi mila");
        return;
    }

    // Loader dikhao
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

    // reCAPTCHA ke ready hone ka wait karo
    function checkRecaptcha() {
        if (typeof grecaptcha === 'undefined') {
            console.log("reCAPTCHA script abhi load nahi hui");
            setTimeout(checkRecaptcha, 100);
            return;
        }

        console.log("reCAPTCHA script load ho gayi, rendering check kar raha hu");
        grecaptcha.ready(function() {
            console.log("reCAPTCHA fully ready hai, form dikha raha hu");

            const parentUrl = window.location !== window.parent.location 
                ? document.referrer || 'Unknown'
                : window.location.href;

            const formHTML = `
                <div class="node-form-container">
                    <h2>Send Enquiry Now</h2>
                    <form method="POST" action="https://enquiry-form-koaw.onrender.com/submit">
                        <input type="hidden" name="parent_url" value="${parentUrl}">
                        <input type="text" name="name" required placeholder="Name*">
                        <input type="email" name="email" required placeholder="Email">
                        <input type="tel" name="mobile" required placeholder="Mobile">
                        <textarea name="message" rows="4" required placeholder="Message"></textarea>
                        <div class="g-recaptcha" data-sitekey="6LdpZOsqAAAAAPgfo-01sSqp_TDwXAXzeBTUc0BO"></div>
                        <button type="submit" class="node-form-button">Submit</button>
                    </form>
                </div>
            `;

            const styleSheet = `
                <style>
                    .node-form-container { background: #ffffff; border: 4px solid #007bff; border-radius: 20px; max-width: 400px; padding: 15px; }
                    .g-recaptcha { margin-top: 10px; display: block !important; }
                </style>
            `;

            container.innerHTML = styleSheet + formHTML;
            console.log("Form set ho gaya");

            // Check karo ki captcha render hua ya nahi
            setTimeout(() => {
                const captchaElement = document.querySelector('.g-recaptcha iframe');
                if (!captchaElement) {
                    console.log("Captcha render nahi hua, error dikha raha hu");
                    container.innerHTML += `<p style="color: red;">Captcha load hone mein dikkat hai, page refresh karo.</p>`;
                } else {
                    console.log("Captcha successfully render ho gaya");
                }
            }, 2000); // 2 second wait karo rendering ke liye
        });
    }

    checkRecaptcha();
})();
