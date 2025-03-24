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

    // reCAPTCHA script dynamically load karo
    if (typeof grecaptcha === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        script.onload = loadForm;
        script.onerror = function() {
            console.log("reCAPTCHA script load fail hui");
            container.innerHTML = "<p>Form Not Found</p>";
        };
        document.head.appendChild(script);
        console.log("reCAPTCHA script dynamically add ki");
    } else {
        loadForm();
    }

    // Form load karne ka function
    function loadForm() {
        if (typeof grecaptcha === 'undefined') {
            console.log("reCAPTCHA script abhi load nahi hui");
            setTimeout(loadForm, 100);
            return;
        }

        console.log("reCAPTCHA script load ho gayi");
        grecaptcha.ready(function() {
            console.log("reCAPTCHA ready hai, form dikha raha hu");

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
                <select name="course" required>
                    <option value="">--Select Course--</option>
                    <option value="accounting_non_finance">Accounting For Non-Finance Professionals</option>
                    <option value="bookkeeping_fundamentals">Bookkeeping Fundamentals</option>
                    <option value="corporate_tax">Corporate Tax Training</option>
                    <option value="personal_income_tax">Personal Income Tax</option>
                    <option value="lcci">LCCI</option>
                    <option value="lcci_l1">LCCI L1</option>
                    <option value="lcci_l2">LCCI L2</option>
                    <option value="lcci_l3_abc">LCCI L3 ABC</option>
                    <option value="lcci_l3_acc">LCCI L3 ACC</option>
                    <option value="lcci_l3_cma">LCCI L3 CMA</option>
                    <option value="myob_abss">Myob/ Abss Training</option>
                    <option value="quickbooks_cloud">Quickbooks (Cloud) Training</option>
                    <option value="xero_accounting">Xero Accounting</option>
                    <option value="adobe_photoshop">Adobe Photoshop</option>
                    <option value="photography_course">Photography Course</option>
                    <option value="smartphone_videography">Smartphone Videography</option>
                    <option value="videography_editing">Videography & Video Editing</option>
                    <option value="excel">Excel</option>
                    <option value="excel_basic">Excel Basic</option>
                    <option value="excel_intermediate">Excel Intermediate</option>
                    <option value="excel_advanced">Excel Advanced</option>
                    <option value="master_excel">Master Excel</option>
                    <option value="dashboard_report">Dashboard Report</option>
                    <option value="power_bi">Power Bi</option>
                    <option value="power_bi_dax">Power Bi DAX</option>
                    <option value="power_query_pivot">Power Query & Power Pivot</option>
                    <option value="power_automate">Power Automate</option>
                    <option value="power_apps">Power Apps</option>
                    <option value="vba_macro">Vba Macro Programming</option>
                    <option value="microsoft_access">Microsoft Access</option>
                    <option value="microsoft_office">Microsoft Office</option>
                    <option value="microsoft_outlook">Microsoft Outlook</option>
                    <option value="microsoft_powerpoint">Microsoft PowerPoint</option>
                    <option value="microsoft_project">Microsoft Project</option>
                    <option value="microsoft_sharepoint">Microsoft SharePoint</option>
                    <option value="microsoft_visio">Microsoft Visio</option>
                    <option value="microsoft_word">Microsoft Word</option>
                    <option value="g_suite">G Suite</option>
                    <option value="chatgpt">ChatGPT</option>
                    <option value="python_programming">Python Programming</option>
                    <option value="python_ml">Python For Machine Learning</option>
                    <option value="business_writing">Effective Business Writing</option>
                    <option value="communication_skills">Effective Communication Skills</option>
                    <option value="facilitation_skills">Effective Facilitation Skills</option>
                    <option value="presentation_skills">Effective Presentation Skill</option>
                    <option value="digital_marketing">Digital Marketing</option>
                    <option value="email_marketing">Email Marketing</option>
                    <option value="facebook_marketing">Facebook Marketing</option>
                    <option value="wordpress_design">WordPress Website Design</option>
                    <option value="artificial_intelligence">Artificial Intelligence</option>
                    <option value="aws_training">AWS Training</option>
                    <option value="azure_ml">Azure Machine Learning Course</option>
                    <option value="big_data">Big Data</option>
                    <option value="blockchain_foundation">Blockchain Foundation</option>
                    <option value="data_science">Data Science</option>
                    <option value="rpa">Robotics Process Automation</option>
                </select>
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
                    .node-form-button { background: #007bff; color: white; border: none; padding: 10px; width: 100%; border-radius: 8px; }
                    label { display: block; margin-top: 10px; font-weight: 600; }
                    input, textarea, select { width: 100%; padding: 10px; margin-top: 5px; border: 2px solid #ced4da; border-radius: 8px; box-sizing: border-box; }
                </style>
            `;

            container.innerHTML = styleSheet + formHTML;
            console.log("Form set ho gaya");

            // VPN/Bot detection check
            setTimeout(() => {
                const captchaElement = document.querySelector('.g-recaptcha');
                // Agar captcha nahi dikhta ya display none hai, to form hide karo
                if (!captchaElement || window.getComputedStyle(captchaElement).display === 'none') {
                    console.log("VPN ya bot detect hua, form hide kar raha hu");
                    container.innerHTML = "<p>Form Not Found</p>";
                } else {
                    console.log("Captcha dikhta hai, form visible rahega");
                }
            }, 2000);
        });
    }
})();
