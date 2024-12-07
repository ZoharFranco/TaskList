import app from "./app";
import https from 'https';
import fs from 'fs';
import http from 'http';


const port = process.env.BC_PORT || 3000;

const sslOptions = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt'),
};

// Create an HTTPS server
https.createServer(sslOptions, app).listen(port, () => {
    console.log(`HTTPS server running on port https://localhost:${port}`);
});

// Optional: Redirect HTTP to HTTPS


http.createServer((req, res) => {
    res.writeHead(301, {Location: `https://${req.headers.host}${req.url}`});
    res.end();
}).listen(80, () => {
    console.log('HTTP server running on port 80 and redirecting to HTTPS');
});