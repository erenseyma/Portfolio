// JSON'dan terimleri yükle
async function loadTerms() {
    try {
        console.log('JSON yükleniyor...');
        const response = await fetch('terms.json');
        
        if (!response.ok) {
            throw new Error('JSON dosyası bulunamadı');
        }
        
        const data = await response.json();
        console.log('JSON yüklendi:', data);
        displayTerms(data); // çünkü JSON doğrudan dizi
    } catch (error) {
        console.error('Hata:', error);
        const slider = document.getElementById('termsSlider');
        slider.innerHTML = '<p style="color: var(--main-color); font-size: 1.6rem;">Terimler yüklenirken hata oluştu</p>';
    }
}

// Terimleri slider'a ekle
function displayTerms(terms) {
    const slider = document.getElementById('termsSlider');
    slider.innerHTML = ''; 
    
    terms.forEach(term => {
        const termCard = document.createElement('div');
        termCard.className = 'term-card';
        termCard.innerHTML = `
            <i class='${term.icon || "bx bx-book"}'></i>
            <h3>${term.title}</h3>
            <p>${term.description}</p>
        `;
        termCard.addEventListener('click', () => {
            window.location.href = `${term.link}`;
        });
        slider.appendChild(termCard);
    });
    
    console.log(`${terms.length} terim eklendi`);
}

// Slider fonksiyonları
function slideLeft() {
    const slider = document.getElementById('termsSlider');
    slider.scrollLeft -= 300;
}

function slideRight() {
    const slider = document.getElementById('termsSlider');
    slider.scrollLeft += 300;
}

// Sayfa yüklendiğinde terimleri yükle
document.addEventListener('DOMContentLoaded', loadTerms);


document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', function() {
            navbar.classList.toggle('active');
            menuIcon.classList.toggle('bx-x');
        });
    }
});