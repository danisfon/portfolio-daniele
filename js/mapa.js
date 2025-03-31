const map = L.map('map').setView([-23.0542324,-52.4548079], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([-23.0542324,-52.4548079]).addTo(map).bindPopup("1583 Av. José Felipe Tequinha, Paranavaí - PR, Brasil").openPopup();