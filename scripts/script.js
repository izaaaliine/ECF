// affichage menu burger déroulant

const menuBurger = document.querySelector('.menuBurger');
const menuMobile = document.querySelector('.menuMobile');
menuMobile.style.display = 'none';
menuBurger.addEventListener('click', function () {
  this.classList.toggle('active');

  if (this.classList.contains('active')) {
    menuMobile.style.display = 'block';
  } else {
    menuMobile.style.display = 'none';
  }
});
// navBar qui apparait et disparaît au scroll
document.addEventListener('DOMContentLoaded', () => {
  let navBar = document.querySelector('.navBar');
  let ScrollValue = 0;

  document.addEventListener('scroll', () => {
    let top = document.documentElement.scrollTop;

    if (top > ScrollValue) {
      // Ajoute la classe seulement si la page n'est pas #home1
      if (!document.location.href.endsWith('#home1')) {
        navBar.classList.add('hidden');
      }
    } else {
      navBar.classList.remove('hidden');
    }

    // Ajoute la classe 'fixed' si la page n'est pas #home1 et le défilement est vers le haut
    if (!document.location.href.endsWith('#home1') && top === 0) {
      navBar.classList.add('fixed');
    } else {
      navBar.classList.remove('fixed');
    }

    ScrollValue = top;
  });
});

// Textes et titres des div
document.addEventListener('DOMContentLoaded', function () {
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

  // Afficher des photos de l'API dans le carrousel de chaque div correspondante
  const apiKey = '0RhzzrDsA7bYL2bY1yDvzYHS5WMpoquHNtNTWZHKmkswxJGb7Nu5NidL';

  function rechercheApi(term) {
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
        afficherResult(data.photos, term);
      })
      .catch((error) =>
        console.error(`Erreur lors de la requête pour ${term}:`, error)
      );
  }

  function afficherResult(photos, term) {
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
  rechercheApi('seychelles');
  rechercheApi('polynesie');
  rechercheApi('fidji');
  rechercheApi('hawaii');
  rechercheApi('cuba');

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
// Météo
const coordonnees = {
  seychelles: {
    latitude: -4.6232085,
    longitude: 55.452359,
  },
  polynesie: {
    latitude: -17.5373835,
    longitude: -149.5659964,
  },
  fidji: {
    latitude: -18.1415884,
    longitude: 178.4421662,
  },
  hawaii: {
    latitude: 21.304547,
    longitude: -157.855676,
  },
  cuba: {
    latitude: 23.135305,
    longitude: -82.3589631,
  },
};

document.addEventListener('DOMContentLoaded', function () {
  function fetchMeteo(latitude, longitude, city) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        afficherMeteo(data, city);
      })
      .catch((error) =>
        console.error('Erreur lors de la requête météo:', error)
      );
  }
  // affichage météo dans chaque modal correspondant
  function afficherMeteo(weatherData, city) {
    let temperature = weatherData.current.temperature_2m;
    let meteoContainer = document.querySelectorAll(
      `.meteoContainer[data-city="${city}"]`
    );

    if (meteoContainer.length > 0) {
      let phrase = `La température actuelle est de ${temperature} °C.`;
      meteoContainer[0].innerHTML = phrase;
    }
  }

  Object.keys(coordonnees).forEach(function (ville) {
    let latitude = coordonnees[ville].latitude;
    let longitude = coordonnees[ville].longitude;
    fetchMeteo(latitude, longitude, ville);
  });
});

// affichage map dernière page

let map = L.map('maCarte', {
  center: [46.6031, 1.7369],
  zoom: 2.5,
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© contributeurs OpenStreetMap',
}).addTo(map);
const locations = [
  { name: 'Dubai', coordinates: [25.276987, 55.296249] },
  { name: 'Egypte', coordinates: [26.820553, 30.802498] },
  { name: 'Seychelles', coordinates: [-4.679574, 55.491977] },
  { name: 'Cap Vert', coordinates: [16.5388, -23.0418] },
  { name: 'Espagne', coordinates: [40.463667, -3.74922] },
  { name: 'Italie', coordinates: [41.87194, 12.56738] },
  { name: 'Suisse', coordinates: [46.8182, 8.2275] },
  { name: 'Algérie', coordinates: [28.0339, 1.6596] },
];

locations.forEach((location) => {
  const marker = L.marker(location.coordinates).addTo(map);
  marker.bindPopup(location.name);
});
