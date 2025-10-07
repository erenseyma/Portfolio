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
        displayTerms(data);
    } catch (error) {
        console.error('Hata:', error);
        const slider = document.getElementById('termsSlider');
        // Slider'ın var olduğundan emin ol
        if (slider) {
            slider.innerHTML = '<p style="color: var(--main-color); font-size: 1.6rem;">Terimler yüklenirken hata oluştu</p>';
        }
    }
}

// Terimleri slider'a ekle
function displayTerms(terms) {
    const slider = document.getElementById('termsSlider');
    
    // Slider elementini kontrol et
    if (!slider) {
        console.warn('Slider elementi bulunamadı');
        return;
    }
    
    slider.innerHTML = ''; 
    
    // terms'in dizi olduğundan emin ol
    if (!Array.isArray(terms)) {
        console.error('Terimler bir dizi değil:', terms);
        slider.innerHTML = '<p style="color: var(--main-color);">Geçersiz veri formatı</p>';
        return;
    }
    
    terms.forEach(term => {
        const termCard = document.createElement('div');
        termCard.className = 'term-card';
        termCard.innerHTML = `
            <i class='${term.icon || "bx bx-book"}'></i>
            <h3>${term.title || "Başlıksız"}</h3>
            <p>${term.description || "Açıklama yok"}</p>
        `;
        
        // Link kontrolü - eğer link yoksa tıklanabilir yapma
        if (term.link) {
            termCard.style.cursor = 'pointer';
            termCard.addEventListener('click', () => {
                window.location.href = term.link;
            });
        }
        
        slider.appendChild(termCard);
    });
    
    console.log(`${terms.length} terim eklendi`);
}

// Slider fonksiyonları
function slideLeft() {
    const slider = document.getElementById('termsSlider');
    if (slider) {
        slider.scrollLeft -= 300;
    }
}

function slideRight() {
    const slider = document.getElementById('termsSlider');
    if (slider) {
        slider.scrollLeft += 300;
    }
}

// Navbar toggle fonksiyonu
function setupNavbar() {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', function() {
            navbar.classList.toggle('active');
            menuIcon.classList.toggle('bx-x');
        });
    } else {
        console.warn('Menu icon veya navbar bulunamadı');
    }
}

// Sayfa yüklendiğinde tüm fonksiyonları başlat
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM hazır, fonksiyonlar başlatılıyor...');
    
    // Önce navbar'ı kur
    setupNavbar();
    
    // Sonra terimleri yükle
    loadTerms();
});