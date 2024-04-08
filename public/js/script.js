document.addEventListener("DOMContentLoaded", function() {
    // Simulovaná data uživatelů
    let users = [
        { id: 1, name: "Matej", latitude: 40.7128, longitude: -74.0060, lastActive: new Date() },
        // další uživatelé...
    ];

    // Funkce pro zobrazení uživatelů na mapě
    function displayUsersOnMap() {
        // Implementace zobrazení uživatelů na mapě
        // Tento kód bude obsahovat logiku pro zobrazení značek uživatelů na mapě
    }

    // Funkce pro zobrazení seznamu uživatelů
    function displayUserList() {
        const userList = document.getElementById("users");
        userList.innerHTML = ""; // Vymažeme předchozí obsah seznamu

        users.forEach(user => {
            const listItem = document.createElement("li");
            listItem.textContent = user.name + " - " + user.lastActive.toLocaleTimeString();

            // Zvýraznění uživatelů, kteří dlouho nebyli aktivní
            const currentTime = new Date();
            const timeDifference = currentTime - user.lastActive;
            const inactiveThreshold = 10 * 60 * 1000; // 10 minut v milisekundách
            if (timeDifference > inactiveThreshold) {
                listItem.classList.add("highlighted");
            }

            userList.appendChild(listItem);
        });
    }

    // Simulovaná aktualizace polohy uživatele po stisknutí tlačítka "Žiju"
    const liveButton = document.getElementById("liveButton");
    liveButton.addEventListener("click", function() {
        // Simulace aktualizace polohy uživatele
        users.forEach(user => {
            user.latitude += Math.random() * 0.01 - 0.005; // Simulovaná změna polohy
            user.longitude += Math.random() * 0.01 - 0.005; // Simulovaná změna polohy
            user.lastActive = new Date(); // Aktualizace času poslední aktivity
        });

        // Aktualizace zobrazení uživatelů
        displayUsersOnMap();
        displayUserList();
    });
    // Inicializace mapy
    var map = L.map('map').setView([51.505, -0.09], 13);

    // Přidání mapových podkladů z OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Přidání markeru na mapu
    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('Ahoj! Jsem zde.')
        .openPopup();

    // Zobrazení uživatelů po načtení stránky
    displayUsersOnMap();
    displayUserList();
});
