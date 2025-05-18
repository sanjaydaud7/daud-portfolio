// ========== HAMBURGER MENU TOGGLE ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// ========== PARALLAX EFFECT FOR HERO IMAGE ==========
const heroImage = document.querySelector('.intro-section .image-container');
if (heroImage) {
    window.addEventListener('scroll', function () {
        const scrollValue = window.scrollY;
        heroImage.style.transform = `translateY(${scrollValue * 0.3}px)`; // Parallax depth
    });
}

// ========== PARTICLE BACKGROUND FOR HERO SECTION ==========
function createParticles() {
    const container = document.querySelector('.intro-section'); // Targeting hero section
    if (!container) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 10 + 12;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;

        container.appendChild(particle);
    }
}
createParticles();
// Add CSS dynamically
        const style = document.createElement('style');
        style.textContent = `
            /* Active nav link */
            .header ul li.active {
                color: rgb(58, 225, 244) !important;
                text-decoration: underline;
            }
            
            /* Skill bars */
            .skill-bar-container {
                background: #444;
                border-radius: 5px;
            }
            
            .skill-bar {
                background: linear-gradient(90deg, #f4a261, #e76f51);
                border-radius: 5px;
            }
            
            .skill-name {
                color: #b0b0b0;
            }
            
            .skill-percent {
                color: #f4a261;
            }
        `;
        document.head.appendChild(style);

        // Animate skill bars
        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            const skillsList = document.querySelector('.skill ol');
            if (skillsList) {
                skillsList.innerHTML = '';
                
                const skillsData = [
                    { name: 'C Programming', level: '90%' },
                    { name: 'C++ Programming', level: '85%' },
                    { name: 'Python Programming', level: '80%' },
                    { name: 'Java Development', level: '75%' },
                    { name: 'Java Development', level: '75%' },
                    { name: 'Java Development', level: '75%' },
                    { name: 'Java Development', level: '75%' },
                    { name: 'Java Development', level: '75%' },
                    { name: 'Java Development', level: '75%' },
                    { name: 'Frontend Development', level: '70%' }
                ];
                
                skillsData.forEach(skill => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span class="skill-name">${skill.name}</span>
                        <div class="skill-bar-container">
                            <div class="skill-bar" data-level="${skill.level}"></div>
                        </div>
                        <span class="skill-percent">${skill.level}</span>
                    `;
                    skillsList.appendChild(li);
                });
            }

            function animateSkillBars() {
                const skillBars = document.querySelectorAll('.skill-bar');
                const sectionTop = skillsSection.offsetTop;
                const sectionHeight = skillsSection.offsetHeight;
                const scrollPosition = window.scrollY + window.innerHeight;
                
                if (scrollPosition > sectionTop + 200) {
                    skillBars.forEach(bar => {
                        const level = bar.getAttribute('data-level');
                        bar.style.width = level;
                        bar.style.opacity = '1';
                    });
                }
            }

            window.addEventListener('scroll', animateSkillBars);
        }




document.querySelectorAll('.view-details-btn').forEach(button => {
    button.addEventListener('click', () => {
        alert('More details coming soon!');
        // OR redirect: window.location.href = 'details.html';
    });
});

// script.js
// Debounce function to limit event frequency
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Popup functionality
const certificateCards = document.querySelectorAll('.certificate-card');
const popup = document.querySelector('.certificate-popup');
const popupOverlay = document.querySelector('.popup-overlay');
const popupImage = popup.querySelector('img');
const popupTitle = popup.querySelector('h2');
const popupIssuer = popup.querySelector('h4');
const popupDescription = popup.querySelector('.description');
const popupDate = popup.querySelector('.date');
// Add a variable for the verification link in the popup
const popupVerificationLink = popup.querySelector('.verification-link') || document.createElement('p');
popupVerificationLink.classList.add('verification-link');
popup.appendChild(popupVerificationLink); // Append it to the popup if it doesn't exist

certificateCards.forEach(card => {
    const showPopup = debounce(() => {
        // Get data attributes
        const image = card.getAttribute('data-image');
        const title = card.getAttribute('data-title');
        const issuer = card.getAttribute('data-issuer');
        const description = card.getAttribute('data-description');
        const date = card.getAttribute('data-date');
        const certificateVerification = card.getAttribute('data-certificate-verification');

        // Populate popup
        popupImage.src = image;
        popupTitle.textContent = title;
        popupIssuer.textContent = issuer;
        popupDescription.textContent = description;
        popupDate.textContent = date;

        // Handle certificate verification link
        if (certificateVerification) {
            popupVerificationLink.innerHTML = `<a href="${certificateVerification}" target="_blank">Verify Certificate</a>`;
        } else {
            popupVerificationLink.innerHTML = ''; // Clear the link if no verification is available
        }

        // Show popup and overlay
        popup.classList.add('active');
        popupOverlay.classList.add('active');
    }, 1000); // Reduced to 300ms for better responsiveness

    const hidePopup = debounce(() => {
        // Hide popup and overlay
        popup.classList.remove('active');
        popupOverlay.classList.remove('active');
    }, 4000); // Reduced to 1000ms for a quicker hide

    card.addEventListener('mouseenter', showPopup);
    card.addEventListener('mouseleave', hidePopup);
});

// Close popup when clicking on overlay
popupOverlay.addEventListener('click', () => {
    popup.classList.remove('active');
    popupOverlay.classList.remove('active');
});