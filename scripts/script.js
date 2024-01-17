document.addEventListener('DOMContentLoaded', function () {
  // Textes et titres
  const descriptions = {
    seychelles: {
      text: "Les Seychelles, perles de l'océan Indien, offrent une évasion paradisiaque avec leurs plages de sable fin et leurs eaux cristallines. Explorez des fonds marins spectaculaires, des jungles luxuriantes, et vivez l'hospitalité créole. Une destination où la nature, la culture et la gastronomie se rencontrent pour créer une expérience inoubliable.",
      title: 'LES SEYCHELLES',
    },
    polynesie: {
      text: 'La Polynésie française, joyau du Pacifique, séduit avec ses lagons turquoises et ses îles de rêve. Explorez récifs coralliens, nature exubérante, et plongez dans la culture polynésienne.',
      title: 'POLYNÉSIE FRANÇAISE',
    },
    fidji: {
      text: 'Les îles Fidji, perles du Pacifique Sud, attirent avec plages de sable blanc, eaux azur, récifs coralliens époustouflants, nature luxuriante, et culture fidjienne accueillante.',
      title: 'LES ÎLES FIDJI',
    },
    hawaii: {
      text: 'Hawaï, joyau du Pacifique, séduit par plages de sable noir, vagues spectaculaires, volcans majestueux, nature luxuriante, et culture hawaïenne.',
      title: 'HAWAII',
    },
    cuba: {
      text: 'Cuba, trésor des Caraïbes, charme avec plages de sable doré, eaux cristallines, villes historiques, culture vibrante, et passion cubaine.',
      title: 'CUBA',
    },
  };

  // Récupérer les informations de chaque destination
  const seychelles = descriptions.seychelles;
  const polynesie = descriptions.polynesie;
  const fidji = descriptions.fidji;
  const hawaii = descriptions.hawaii;
  const cuba = descriptions.cuba;

  // Ajouter texte et description dans le HTML
  document.querySelector('#titreSeychelles').innerHTML = seychelles.title;
  document.querySelector('#descriptionSeychelles').innerHTML = seychelles.text;

  document.querySelector('#titrePolynesie').innerHTML = polynesie.title;
  document.querySelector('#descriptionPolynesie').innerHTML = polynesie.text;

  document.querySelector('#titreFidji').innerHTML = fidji.title;
  document.querySelector('#descriptionFidji').innerHTML = fidji.text;

  document.querySelector('#titreHawai').innerHTML = hawaii.title;
  document.querySelector('#descriptionHawai').innerHTML = hawaii.text;

  document.querySelector('#titreCuba').innerHTML = cuba.title;
  document.querySelector('#descriptionCuba').innerHTML = cuba.text;

  // Afficher des photos de l'API dans le carrousel
  const apiKey = '0RhzzrDsA7bYL2bY1yDvzYHS5WMpoquHNtNTWZHKmkswxJGb7Nu5NidL';

  function performSearch(term) {
    fetch(`https://api.pexels.com/v1/search?query=${term}&per_page=5`, {
      method: 'GET',
      headers: {
        Authorization: apiKey,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        displayResults(data.photos, term);
      })
      .catch((error) =>
        console.error(`Erreur lors de la requête pour ${term}:`, error)
      );
  }

  function displayResults(photos, term) {
    const cards = document.querySelectorAll(`#${term} .card`);

    photos.forEach((photo, index) => {
      const card = cards[index];
      if (card) {
        card.style.backgroundImage = `url('${photo.src.medium}')`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
      }
    });
  }

  // Affichage avec les différentes villes
  performSearch('seychelles');
  performSearch('polynesie');
  performSearch('fidji');
  performSearch('hawaii');
  performSearch('cuba');

  // Initialiser le carrousel
  const centers = document.querySelectorAll('.center');
  centers.forEach((center) => {
    const carousel = center.querySelector('.inner');
    const nextButton = center.querySelector('#nextButton');

    let currentIndex = 0;

    function nextImage() {
      currentIndex = (currentIndex + 1) % carousel.children.length;
      updateCarousel();
    }

    function updateCarousel() {
      const translateValue = -currentIndex * (200 + 1);
      carousel.style.transform = `translateX(${translateValue}px)`;
    }

    nextButton.addEventListener('click', nextImage);
  });

  // Ouvrir et fermer les modals
  const moreButtons = document.querySelectorAll('.more');
  moreButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const targetModalId = button.getAttribute('data-target');
      openModal(targetModalId);
      const city = button.getAttribute('data-city');
      getCoordinates(city, targetModalId);
    });
  });

  const closeButtons = document.querySelectorAll('.close');
  closeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const targetModalId = button.getAttribute('data-target');
      closeModal(targetModalId);
    });
  });
});

// Fonction pour ouvrir le modal
function openModal(targetModalId) {
  const modal = document.getElementById(targetModalId);
  if (modal) {
    modal.style.display = 'block';
  }
}

// Fonction pour fermer le modal
function closeModal(targetModalId) {
  const modal = document.getElementById(targetModalId);
  if (modal) {
    modal.style.display = 'none';
  }
}

// récupérer latitude et longitude des villes
let map = L.map('maCarte', {
  center: [46.6031, 1.7369],
  zoom: 6,
});
function getCoordinates(city, modalId) {
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const latitude = parseFloat(data[0].lat);
        const longitude = parseFloat(data[0].lon);
        console.log(latitude, longitude);
        // Appeler la fonction pour initialiser la carte avec les coordonnées
        afficherMap(modalId, latitude, longitude);
      }
    });
}

document.addEventListener('DOMContentLoaded', function () {
  getCoordinates('Seychelles', 'myModalSeychelles');
  getCoordinates('Polynesie', 'myModalPolynesie');
  getCoordinates('Fidji', 'myModalFidji');
  getCoordinates('Hawaii', 'myModalHawai');
  getCoordinates('Cuba', 'myModalCuba');
});

// Utiliser les coordonnées pour afficher la carte dans le modal

function afficherMap(modalId, latitude, longitude) {
  const centerCoordinates = [latitude, longitude];
  const mapContainer = document.querySelector(`#${modalId} .mapContainer`);
  if (mapContainer) {
    const map = L.map(mapContainer).setView(centerCoordinates, 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      map
    );
    map.style.height = '100vw';
    const marker = L.marker([latitude, longitude]).addTo(map);
    marker
      .bindPopup(
        `<b>Coordonnées:</b><br>Latitude: ${latitude}<br>Longitude: ${longitude}<br><br>Où se situe ${cityName}?`
      )
      .openPopup();
  } else {
    console.error(`Conteneur de carte non trouvé dans le modal ${modalId}`);
  }
}
