(function() {
    console.log("Script shuru hua"); // Yeh dikhega toh pata chalega script chal rahi hai

    const container = document.getElementById('node-form');
    if (!container) {
        console.log("Error: node-form ID wala div nahi mila");
        return; // Agar div nahi hai toh ruk jao
    }

    // Loader dikhao
    container.innerHTML = `
        <div class="loader-container">
            <style>
                .loader-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 200px;
                }
                .loader {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #007bff;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
            <div class="loader"></div>
        </div>
    `;
    console.log("Loader set ho gaya");

    // reCAPTCHA ke load hone ka wait karo
    function checkRecaptcha() {
        if (typeof grecaptcha === 'undefined') {
            console.log("reCAPTCHA abhi load nahi hui, wait kar raha hu");
            setTimeout(checkRecaptcha, 100);
            return;
        }

        console.log("reCAPTCHA load ho gayi, form dikha raha hu");
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
                .node-form-container {
                    background: #ffffff;
                    border: 4px solid #007bff;
                    border-radius: 20px;
                    max-width: 400px;
                    padding: 15px;
                }
                .g-recaptcha {
                    margin-top: 10px;
                    display: block !important;
                }
            </style>
        `;

        container.innerHTML = styleSheet + formHTML;
        console.log("Form set ho gaya");
    }

    checkRecaptcha();
})();
