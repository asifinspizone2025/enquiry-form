const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); 
const helmet = require('helmet'); 
const rateLimit = require('express-rate-limit'); 
const mysql = require('mysql2'); 
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const geoip = require('geoip-lite');

const app = express();
const PORT = 3000;

// Nonce Middleware
app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('base64');
    next();
});

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "default-src": ["'self'"],
                frameAncestors: ["*"],
                "script-src": [
                    "'self'", 
                    (req, res) => `'nonce-${res.locals.nonce}'`,
                    "https://www.google.com",
                    "https://www.gstatic.com",
                    "https://cdnjs.cloudflare.com"
                ],
                "style-src": [
                    "'self'",
                    "'unsafe-inline'",
                    "https://cdnjs.cloudflare.com"
                ],
                "img-src": ["'self'", "data:"],
                "connect-src": ["'self'", "https://cdnjs.cloudflare.com"]
            },
        },
        frameguard: false,
    })
);
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOWALL"); 
  res.setHeader("Content-Security-Policy", "frame-ancestors *");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('trust proxy', true); // Trusted proxies support

// IP Extraction Function
function getClientIp(req) {
    const forwardedIps = req.headers['x-forwarded-for'];
    if (forwardedIps) {
        return forwardedIps.split(',')[0].trim(); // Client ka real IP
    }
    return req.connection.remoteAddress.includes(':')
        ? req.connection.remoteAddress.split(':').pop()
        : req.connection.remoteAddress;
}

const transporter = nodemailer.createTransport({
    host: 'da400.is.cc', // Change this to your SMTP server
    port: 587,
    secure: false,
    auth: {
        user: 'mail@inspizone.com.sg',
        pass: 'aUfKH4CRsM9dwLAhEVhj'
    }
});

// Rate Limiting
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5,
    message: "Too many requests, please try again later."
});
app.use(limiter);

// Database Configuration
const db = mysql.createConnection({
    host: '46.202.137.220',
    user: 'u212758487_leadsinpizone',
    password: '6]76>!b/lGw',
    database: 'u212758487_leadsinpizone',
});


db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL Database!');
});

const RECAPTCHA_SECRET_KEY = '6Ld5fOIoAAAAAM0jPt6YL5oH8KQi7yaOKtLa1gvX';

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit', async (req, res) => {
    const { name, email, mobile, course, message, 'g-recaptcha-response': recaptchaToken } = req.body;

    if (!name || !email || !mobile || !course || !message) {
        return res.status(400).send('All fields are required.');
    }

        const userIp = getClientIp(req);
    const geo = geoip.lookup(userIp);
    const location = geo
        ? `${geo.city || 'Unknown'}, ${geo.country || 'Unknown'}`
        : 'Unknown Location';

    const referenceUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    try {
        const recaptchaResponse = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
        );

        if (!recaptchaResponse.data.success) {
            return res.status(403).send('Captcha verification failed!');
        }
       
        const sql = `INSERT INTO leads1 (name, email, mobile, course, message, ip, location, ref_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(sql, [name, email, mobile, course, message, userIp, location, referenceUrl], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).send('Error saving data. Please try again.');
            }

            const mailOptions = {
                from: 'mail@inspizone.com.sg',
                to: ['mohd.nisar@inspizone.in', 'nisar@avitron.com.sg', 'mohammad.asif@inspizone.in'].join(','),
                subject: `New Enquiry from ${name}`,
                html: `
                    <h3>New Enquiry Details</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Mobile:</strong> ${mobile}</p>
                    <p><strong>Course:</strong> ${course}</p>
                    <p><strong>Message:</strong> ${message}</p>
                    <p><strong>IP Address:</strong> ${userIp}</p>
                    <p><strong>Location:</strong> ${location}</p>
                    <p><strong>Reference URL:</strong> ${referenceUrl}</p>
                `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });

            res.send(`Thank you, ${name}! Your form was submitted successfully.`);
        });
    } catch (error) {
        res.status(500).send('Error verifying captcha. Please try again.');
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
