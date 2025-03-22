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
                    <option value="">Select Course</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Graphic Design">Graphic Design</option>
                </select>
                <textarea name="message" rows="4" required placeholder="Message"></textarea>
                <div class="g-recaptcha" data-sitekey="6Ld5fOIoAAAAAB2iweCfZmfPB2Q3UuWHDmfT4rni"></div>
                <button type="submit">Submit</button>
            </form>
        </div>
    `;

    const container = document.createElement('div');
    container.innerHTML = formHTML;
    document.body.appendChild(container);
})();
