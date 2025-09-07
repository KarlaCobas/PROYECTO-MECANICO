const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    const icon = hamburger.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

document.addEventListener('DOMContentLoaded', function () {
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    const testimonialDotsContainer = document.querySelector('.testimonial-dots');

    let currentIndex = 0;
    let slideWidth = testimonialSlides[0].offsetWidth;
    let slidesToShow = getSlidesToShow();
    let maxIndex = Math.max(0, testimonialSlides.length - slidesToShow);

    testimonialSlides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        testimonialDotsContainer.appendChild(dot);
    });

    const testimonialDots = document.querySelectorAll('.testimonial-dot');

    window.addEventListener('resize', () => {
        slideWidth = testimonialSlides[0].offsetWidth;
        slidesToShow = getSlidesToShow();
        maxIndex = Math.max(0, testimonialSlides.length - slidesToShow);

        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
            updateSlider();
        }
    });

    testimonialPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    testimonialNext.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    function goToSlide(index) {
        currentIndex = Math.min(Math.max(0, index), maxIndex);
        updateSlider();
    }

    function updateSlider() {
        const translateX = -currentIndex * slideWidth;
        testimonialTrack.style.transform = `translateX(${translateX}px)`;

        testimonialDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        testimonialPrev.style.opacity = currentIndex === 0 ? '0.5' : '1';
        testimonialNext.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
    }

    function getSlidesToShow() {
        if (window.innerWidth <= 576) return 1;
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 1;
        return 1;
    }

    updateSlider();

    let touchStartX = 0;
    let touchEndX = 0;

    testimonialTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    testimonialTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        }

        if (touchEndX > touchStartX + 50) {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        }
    }

    let autoplayInterval;

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    startAutoplay();

    testimonialTrack.addEventListener('mouseenter', stopAutoplay);
    testimonialTrack.addEventListener('touchstart', stopAutoplay);

    testimonialTrack.addEventListener('mouseleave', startAutoplay);
    testimonialTrack.addEventListener('touchend', startAutoplay);
});

function typeWriter() {
    const titleElement = document.getElementById('main-title');
    const text = 'Taller <span>AutoPro</span>';
    let index = 0;

    function type() {
        if (index < text.length) {
            if (text.substring(index, index + 6) === '<span>') {
                titleElement.innerHTML += '<span>';
                index += 6;
            }
            else if (text.substring(index, index + 7) === '</span>') {
                titleElement.innerHTML += '</span>';
                index += 7;
            }
            else {
                titleElement.innerHTML += text.charAt(index);
                index++;
            }

            const speed = Math.random() * 100 + 50; // Entre 50 y 150 ms
            setTimeout(type, speed);
        }
    }

    type();
}

window.addEventListener('load', typeWriter);

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;

        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;

        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }
}

window.addEventListener('load', createParticles);

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);
