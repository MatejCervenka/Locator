document.addEventListener("DOMContentLoaded", function() {
    // Simulovaná data uživatelů
    let users = [
        { id: 1, name: "John", latitude: 40.7128, longitude: -74.0060, lastActive: new Date() },
        { id: 2, name: "Alice", latitude: 34.0522, longitude: -118.2437, lastActive: new Date() },
        // další uživatelé...
    ];

    // Funkce pro zobrazení uživatelů na mapě
    function displayUsersOnMap() {
        // Pro každého uživatele v poli vytvoříme značku na mapě
        users.forEach(user => {
            // Vytvoříme novou značku na základě polohy uživatele
            const marker = L.marker([user.latitude, user.longitude]).addTo(map);

            // Přidáme popisek značky s jménem uživatele
            marker.bindPopup(user.name);
        });
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
        displayUserList();
        displayUsersOnMap();
    });

    // Inicializace mapy
    var map = L.map('map').setView([0, 0], 10);

    // Přidání mapových podkladů z OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Prompt user for geolocation
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latlng = [position.coords.latitude, position.coords.longitude];
            map.setView(latlng, 13); // Set map view to user's location
            L.marker(latlng).addTo(map) // Add marker at user's location
                .bindPopup('Ahoj! Jsem zde.')
                .openPopup();
        });
    } else {
        alert("Geolocation is not supported by your browser");
    }

    // Zobrazení uživatelů po načtení stránky
    displayUserList();
    displayUsersOnMap();
});
