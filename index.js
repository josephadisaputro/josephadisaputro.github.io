const express = require('express');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // You need to install jsonwebtoken package
require('dotenv').config(); // You need to install dotenv package

const app = express();
app.use(cors());
app.use(express.json()); // This middleware is used to parse JSON bodies

async function generateHRDToken() {
    const timestamp = Math.floor(Date.now() / 1000);
    const payload = { timestamp };
    const secret = process.env.JWT_SECRET_HRD_ACCESS;
    const token = jwt.sign(payload, secret);
    return token;
}

async function validateHRDToken(token) {
    try {
        const secret = process.env.JWT_SECRET_HRD_ACCESS;
        const decoded = jwt.verify(token, secret);
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (currentTimestamp - decoded.timestamp > 600) {
            return false;
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function validateAndRefreshHRDToken(token) {
    try {
        const isValid = await validateHRDToken(token);
        if (!isValid) {
            return false;
        }
        const newToken = await generateHRDToken();
        return newToken;
    } catch (error) {
        console.error(error);
        return false;
    }
}

app.get('/', (req, res) => {
    let filePath = path.join(__dirname, './view/index.html');
    res.sendFile(filePath);
});

app.get('/html/:param', async (req, res) => {
    let baseDir = path.resolve(__dirname, './view/');
    let filePath = path.resolve(baseDir, req.params.param);
    if (filePath.startsWith(baseDir)) {
        res.sendFile(filePath);
    } else {
        res.status(403).send('Forbidden');
    }
});

app.get('/png/:param', async (req, res) => {
    let baseDir = path.resolve(__dirname, './db/');
    let filePath = path.resolve(baseDir, req.params.param);
    if (filePath.startsWith(baseDir)) {
        res.sendFile(filePath);
    } else {
        res.status(403).send('Forbidden');
    }
});

app.get('/pdf/:param', async (req, res) => {
    const token = req.query.token;
    const isValid = await validateHRDToken(token);
    if (isValid) {
        let baseDir = path.resolve(__dirname, './db/');
        let filePath = path.resolve(baseDir, req.params.param);
        if (filePath.startsWith(baseDir)) {
            res.sendFile(filePath);
        } else {
            res.status(403).send('Forbidden');
        }
    } else {
        res.sendStatus(403);
    }
});

app.get('/partial/html/:param', async (req, res) => {
    const token = req.query.token;
    const isValid = await validateHRDToken(token);
    if (isValid) {
        let baseDir = path.resolve(__dirname, './view/');
        let filePath = path.resolve(baseDir, req.params.param);
        if (filePath.startsWith(baseDir)) {
            res.sendFile(filePath);
        } else {
            res.status(403).send('Forbidden');
        }
    } else {
        res.sendStatus(403);
    }
});

app.post('/api/hrd/request-access', async (req, res) => {
    try {
        const { pin } = req.body;
        if (!pin || pin.length !== 4) {
            return res.status(400).json({ message: 'Invalid pin format. Pin should be a string of length 4.' });
        }
        if (pin !== process.env.HRD_PIN_ACCESS) {
            return res.status(403).json({ message: 'Invalid pin.' });
        }
        const token = await generateHRDToken();
        return res.status(200).json({ message: 'Pin is valid.', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred.' });
    }
});

app.post('/api/hrd/refresh-session-request', async (req, res) => {
    try {
        const { token } = req.body;
        const newToken = await validateAndRefreshHRDToken(token);
        if (!newToken) {
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }
        return res.status(200).json({ message: 'Token is valid.', token: newToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred.' });
    }
});

app.post('/api/hrd/validate-token', async (req, res) => {
    try {
        const token = req.body.token;
        const isValid = await validateHRDToken(token);
        if (isValid) {
            res.status(200).json({ message: 'Token is valid' });
        } else {
            res.status(401).json({ message: 'Token is invalid or expired' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
