// ===== Certificate Data =====
const certificates = [
    { file: 'cert-01.jpg', name: '2023-2024 "三好学生"证书' },
    { file: 'cert-02.jpg', name: '2023-2024 "优秀学生干部"证书' },
    { file: 'cert-03.jpg', name: '2023-2024 "国家励志奖学金"证书' },
    { file: 'cert-04.jpg', name: '2023-2024 校二等奖学金证书' },
    { file: 'cert-05.jpg', name: '2024-2025 "三好学生"证书' },
    { file: 'cert-06.jpg', name: '2024-2025 "优秀学生干部"证书' },
    { file: 'cert-07.jpg', name: '2024-2025 "国家励志奖学金"证书' },
    { file: 'cert-08.jpg', name: '2024-2025 校一等奖学金证书' },
    { file: 'cert-09.jpg', name: '2024年5月 "厚生杯"建模大赛证书' },
    { file: 'cert-10.jpg', name: '2025年9月 市级"优秀志愿者"证书' },
    { file: 'cert-11.jpg', name: '"挑战杯"优胜奖证书' },
    { file: 'cert-12.jpg', name: '优秀团员' },
    { file: 'cert-13.jpg', name: '全国大学英语四级证书' },
    { file: 'cert-14.jpg', name: '征文比赛一等奖证书' },
    { file: 'cert-15.jpg', name: '征文比赛二等奖证书' },
    { file: 'cert-16.jpg', name: '新邵县"杨帆计划"返家乡证书' },
    { file: 'cert-17.jpg', name: '职业规划大赛证书' },
    { file: 'cert-18.jpg', name: '计算机二级证书' },
    { file: 'cert-19.jpg', name: '返家乡社会实践证书' }
];

// ===== Render Certificate Grid =====
const certGrid = document.getElementById('certGrid');

certificates.forEach((cert, index) => {
    const card = document.createElement('div');
    card.className = 'cert-card fade-in';
    card.style.transitionDelay = `${Math.min(index * 40, 400)}ms`;

    const img = document.createElement('img');
    img.src = `assets/certs/${cert.file}`;
    img.alt = cert.name;
    img.loading = 'lazy';
    img.onerror = function() {
        this.style.display = 'none';
        card.style.background = '#f0f0f0';
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.justifyContent = 'center';
        card.textContent = cert.name;
    };

    const caption = document.createElement('div');
    caption.className = 'cert-name';
    caption.textContent = cert.name;

    card.appendChild(img);
    card.appendChild(caption);

    card.addEventListener('click', () => {
        openLightboxImg(img.src, cert.name);
    });

    certGrid.appendChild(card);
});

// ===== Lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightboxImg(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openLightbox(element) {
    const img = element.previousElementSibling;
    if (img && img.tagName === 'IMG') {
        openLightboxImg(img.src, img.alt);
    }
}

function closeLightbox(e) {
    if (e && e.target !== lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
}, { passive: true });

// ===== Fade-in on Scroll =====
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(el => observer.observe(el));

// ===== Smooth scroll for nav links =====
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
