const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());

let users = [];

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname,'views','index.html'));
});

// Endpoint pro aktualizaci polohy uživatele
app.post('/update-location', (req, res) => {
    const { userId, latitude, longitude } = req.body;

    // Aktualizace polohy uživatele nebo přidání nového uživatele
    const userIndex = users.findIndex(user => user.userId === userId);
    if (userIndex !== -1) {
        users[userIndex].latitude = latitude;
        users[userIndex].longitude = longitude;
        users[userIndex].lastUpdated = new Date();
    } else {
        users.push({ userId, latitude, longitude, lastUpdated: new Date() });
    }

    res.sendStatus(200);
});

// Endpoint pro získání seznamu uživatelů
app.get('/users', (req, res) => {
    res.json(users);
});

// Spuštění serveru
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("http://localhost:" + PORT);
});
