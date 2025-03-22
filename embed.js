(function() {
    const parentUrl = window.location !== window.parent.location 
        ? document.referrer || 'Unknown'
        : window.location.href;

    const formHTML = `
        <div class="form-container">
            <h2>Send Enquiry Now</h2>
            <form method="POST" action="https://enquiry-form-koaw.onrender.com/submit">
                <input type="hidden" name="parent_url" value="${parentUrl}">
                <input type="text" name="name" required placeholder="Name*">
                <input type="email" name="email" required placeholder="Email">
                <input type="tel" name="mobile" required placeholder="Mobile">
                <select name="course" required>
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
                <div class="g-recaptcha" data-sitekey="6Ld5fOIoAAAAAB2iweCfZmfPB2Q3UuWHDmfT4rni"></div>
                <button type="submit" class="node-form-button">Submit</button>
            </form>
        </div>
    `;

    const container = document.createElement('div');
    container.innerHTML = formHTML;
    document.body.appendChild(container);
})();
