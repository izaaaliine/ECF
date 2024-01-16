// textes et titres
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

  // ajouter texte et description dans html
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
});

// afficher photos de l'API dans carroussel

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
      // Définir l'image en tant que fond de la carte
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

// carrousel
document.addEventListener('DOMContentLoaded', function () {
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
});

//Ouvrir et fermer les modals

document.addEventListener('DOMContentLoaded', function () {
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
  // Attachez un gestionnaire d'événements à chaque bouton "Plus d'informations"
  const moreButtons = document.querySelectorAll('.more');
  moreButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      // Récupérez l'ID du modal à partir de l'attribut data-target
      const targetModalId = button.getAttribute('data-target');
      // Ouvrez le modal correspondant
      openModal(targetModalId);
    });
  });

  // Attachez un gestionnaire d'événements à tous les boutons "Close"
  const closeButtons = document.querySelectorAll('.close');
  closeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      // Récupérez l'ID du modal à partir de l'attribut data-target
      const targetModalId = button.getAttribute('data-target');
      // Fermez le modal correspondant
      closeModal(targetModalId);
    });
  });
});
