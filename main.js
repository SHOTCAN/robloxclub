// ==========================================
// ROBLOX CLUB - Ultimate JavaScript Features
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // Loading Screen
    // ==========================================
    const loadingScreen = document.getElementById('loadingScreen');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = '';
        }, 2000);
    });

    // ==========================================
    // Scroll Progress Bar
    // ==========================================
    const scrollProgress = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // ==========================================
    // Cursor Trail Effect
    // ==========================================
    const cursorTrail = document.getElementById('cursorTrail');
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        cursorTrail.style.left = trailX - 10 + 'px';
        cursorTrail.style.top = trailY - 10 + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hide cursor trail on mobile
    if (window.innerWidth <= 768) {
        cursorTrail.style.display = 'none';
    }

    // ==========================================
    // Theme Toggle
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', () => {
        body.dataset.theme = body.dataset.theme === 'light' ? '' : 'light';
        themeIcon.className = body.dataset.theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', body.dataset.theme);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.dataset.theme = savedTheme;
        themeIcon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navBar = document.getElementById('navBar');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navBar.classList.toggle('active');
    });

    // Close menu when clicking a link
    navBar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navBar.classList.remove('active');
        });
    });

    // ==========================================
    // Navbar Scroll Effect
    // ==========================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // Smooth Scroll for Navigation Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // Scroll Reveal Animation
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ==========================================
    // Stats Counter Animation
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const animateStats = () => {
        if (statsAnimated) return;

        const statsSection = document.getElementById('stats');
        if (!statsSection) return;

        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100) {
            statsAnimated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.dataset.target);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        stat.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target.toLocaleString() + '+';
                    }
                };
                updateCounter();
            });
        }
    };

    window.addEventListener('scroll', animateStats);
    animateStats();

    // ==========================================
    // Games Carousel
    // ==========================================
    const gamesCarousel = document.getElementById('gamesCarousel');
    const gamesPrev = document.getElementById('gamesPrev');
    const gamesNext = document.getElementById('gamesNext');

    if (gamesCarousel && gamesPrev && gamesNext) {
        const scrollAmount = 280;

        gamesPrev.addEventListener('click', () => {
            gamesCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        gamesNext.addEventListener('click', () => {
            gamesCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        // Auto scroll
        let autoScrollInterval = setInterval(() => {
            if (gamesCarousel.scrollLeft >= gamesCarousel.scrollWidth - gamesCarousel.clientWidth) {
                gamesCarousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                gamesCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 4000);

        // Pause on hover
        gamesCarousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
        gamesCarousel.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(() => {
                if (gamesCarousel.scrollLeft >= gamesCarousel.scrollWidth - gamesCarousel.clientWidth) {
                    gamesCarousel.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    gamesCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }, 4000);
        });
    }

    // ==========================================
    // Event Countdown Timer
    // ==========================================
    const updateCountdown = () => {
        // Set event date to New Year 2025
        const eventDate = new Date('2025-01-01T00:00:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        } else {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ==========================================
    // Testimonials Slider
    // ==========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    let currentTestimonial = 0;

    const showTestimonial = (index) => {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            testimonialDots[i]?.classList.remove('active');
        });
        testimonialCards[index]?.classList.add('active');
        testimonialDots[index]?.classList.add('active');
    };

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    // Auto slide testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // ==========================================
    // FAQ Accordion
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(i => i.classList.remove('active'));

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // Gallery Filter
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gridItems = document.querySelectorAll('.grid-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            gridItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ==========================================
    // Gallery Lightbox Enhanced
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const currentImgSpan = document.getElementById('currentImg');
    const totalImgSpan = document.getElementById('totalImg');

    let currentImageIndex = 0;
    let galleryImages = [];

    // Get all visible gallery images
    const updateGalleryImages = () => {
        galleryImages = Array.from(document.querySelectorAll('.grid-item:not(.hidden) img'));
        totalImgSpan.textContent = galleryImages.length;
    };

    updateGalleryImages();

    gridItems.forEach((item, index) => {
        const img = item.querySelector('img');
        img.addEventListener('click', () => {
            updateGalleryImages();
            currentImageIndex = galleryImages.indexOf(img);
            openLightbox(img.src);
        });
    });

    const openLightbox = (src) => {
        lightboxImg.src = src;
        currentImgSpan.textContent = currentImageIndex + 1;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    const showPrevImage = () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
        currentImgSpan.textContent = currentImageIndex + 1;
    };

    const showNextImage = () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
        currentImgSpan.textContent = currentImageIndex + 1;
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });

    // ==========================================
    // Join Form Validation
    // ==========================================
    const joinForm = document.getElementById('joinForm');

    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Reset errors
            joinForm.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });

            // Validate name
            const name = document.getElementById('name');
            if (name.value.trim().length < 3) {
                showError(name, 'Nama minimal 3 karakter');
                isValid = false;
            }

            // Validate Roblox username
            const robloxUsername = document.getElementById('robloxUsername');
            if (robloxUsername.value.trim().length < 3) {
                showError(robloxUsername, 'Username minimal 3 karakter');
                isValid = false;
            }

            // Validate email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                showError(email, 'Email tidak valid');
                isValid = false;
            }

            // Validate age
            const age = document.getElementById('age');
            if (age.value < 13 || age.value > 99) {
                showError(age, 'Umur harus antara 13-99');
                isValid = false;
            }

            // Validate game selection
            const favoriteGame = document.getElementById('favoriteGame');
            if (!favoriteGame.value) {
                showError(favoriteGame, 'Pilih game favorit');
                isValid = false;
            }

            if (isValid) {
                // Show success toast
                showToast('success', 'Pendaftaran berhasil! Kami akan menghubungi kamu segera.');
                joinForm.reset();

                // Trigger confetti
                createConfetti();
            }
        });
    }

    const showError = (input, message) => {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        formGroup.querySelector('.error-message').textContent = message;
    };

    // ==========================================
    // Toast Notifications
    // ==========================================
    const toastContainer = document.getElementById('toastContainer');

    const showToast = (type, message) => {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';

        toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 5000);
    };

    // ==========================================
    // Confetti Effect
    // ==========================================
    const confettiCanvas = document.getElementById('confettiCanvas');
    const confettiCtx = confettiCanvas.getContext('2d');

    const resizeConfettiCanvas = () => {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    };
    resizeConfettiCanvas();
    window.addEventListener('resize', resizeConfettiCanvas);

    const confettiPieces = [];
    const confettiColors = ['#00d4ff', '#a855f7', '#00ff88', '#ff00ff', '#ffd700'];

    const createConfetti = () => {
        for (let i = 0; i < 150; i++) {
            confettiPieces.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height - confettiCanvas.height,
                size: Math.random() * 10 + 5,
                color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                speed: Math.random() * 3 + 2,
                angle: Math.random() * Math.PI * 2,
                spin: Math.random() * 0.2 - 0.1
            });
        }
        animateConfetti();
    };

    const animateConfetti = () => {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        confettiPieces.forEach((piece, index) => {
            piece.y += piece.speed;
            piece.x += Math.sin(piece.angle) * 2;
            piece.angle += piece.spin;

            confettiCtx.save();
            confettiCtx.translate(piece.x, piece.y);
            confettiCtx.rotate(piece.angle);
            confettiCtx.fillStyle = piece.color;
            confettiCtx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            confettiCtx.restore();

            if (piece.y > confettiCanvas.height) {
                confettiPieces.splice(index, 1);
            }
        });

        if (confettiPieces.length > 0) {
            requestAnimationFrame(animateConfetti);
        }
    };

    // ==========================================
    // Back to Top Button
    // ==========================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // Play Roblox Buttons
    // ==========================================
    const playButtons = document.querySelectorAll('#playButton, #playButtonMain');

    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'roblox://';

            setTimeout(() => {
                if (/Android/i.test(navigator.userAgent)) {
                    window.location.href = 'https://play.google.com/store/apps/details?id=com.roblox.client';
                } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                    window.location.href = 'https://apps.apple.com/us/app/roblox/id431946152';
                }
            }, 2000);
        });
    });

    // ==========================================
    // Parallax Effect on Hero Section
    // ==========================================
    const floatingShapes = document.querySelectorAll('.floating-shape');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        floatingShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // ==========================================
    // Typing Effect for Hero Badge
    // ==========================================
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        const originalText = heroBadge.textContent;
        heroBadge.textContent = '';

        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < originalText.length) {
                heroBadge.textContent += originalText[charIndex];
                charIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
    }

    // ==========================================
    // Member Cards Tilt Effect
    // ==========================================
    const memberCards = document.querySelectorAll('.section-isi');

    memberCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 40;
            const rotateY = (centerX - x) / 40;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ==========================================
    // Particle Effect
    // ==========================================
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(0, 212, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            animation: particleFloat ${5 + Math.random() * 10}s linear forwards;
        `;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 15000);
    }

    // Add particle animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-120vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Create particles periodically
    setInterval(createParticle, 800);

    // ==========================================
    // Console Easter Egg
    // ==========================================
    console.log('%c🎮 ROBLOX CLUB 🎮', 'font-size: 32px; font-weight: bold; color: #00d4ff; text-shadow: 0 0 10px #00d4ff;');
    console.log('%cWelcome to the ultimate gaming club! 🚀', 'font-size: 16px; color: #a855f7;');
    console.log('%cJoin us: https://discord.gg/robloxclub', 'font-size: 14px; color: #00ff88;');

    // ==========================================
    // ULTRA MODERN - Matrix Rain Effect
    // ==========================================
    const matrixCanvas = document.getElementById('matrixCanvas');
    if (matrixCanvas) {
        const matrixCtx = matrixCanvas.getContext('2d');

        const resizeMatrix = () => {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        };
        resizeMatrix();
        window.addEventListener('resize', resizeMatrix);

        const chars = 'ROBLOXCLUB01アイウエオカキクケコサシスセソ';
        const fontSize = 14;
        const columns = matrixCanvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        const drawMatrix = () => {
            matrixCtx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

            matrixCtx.fillStyle = '#00d4ff';
            matrixCtx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                matrixCtx.fillText(char, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        setInterval(drawMatrix, 50);
    }

    // ==========================================
    // ULTRA MODERN - Neural Network Background
    // ==========================================
    const neuralCanvas = document.getElementById('neuralCanvas');
    if (neuralCanvas) {
        const neuralCtx = neuralCanvas.getContext('2d');

        const resizeNeural = () => {
            neuralCanvas.width = window.innerWidth;
            neuralCanvas.height = window.innerHeight;
        };
        resizeNeural();
        window.addEventListener('resize', resizeNeural);

        const nodes = [];
        const numNodes = 50;

        for (let i = 0; i < numNodes; i++) {
            nodes.push({
                x: Math.random() * neuralCanvas.width,
                y: Math.random() * neuralCanvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }

        const drawNeural = () => {
            neuralCtx.clearRect(0, 0, neuralCanvas.width, neuralCanvas.height);

            // Draw connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        neuralCtx.beginPath();
                        neuralCtx.strokeStyle = `rgba(0, 212, 255, ${1 - dist / 150})`;
                        neuralCtx.lineWidth = 0.5;
                        neuralCtx.moveTo(nodes[i].x, nodes[i].y);
                        neuralCtx.lineTo(nodes[j].x, nodes[j].y);
                        neuralCtx.stroke();
                    }
                }
            }

            // Draw and update nodes
            nodes.forEach(node => {
                neuralCtx.beginPath();
                neuralCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                neuralCtx.fillStyle = '#00d4ff';
                neuralCtx.fill();

                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > neuralCanvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > neuralCanvas.height) node.vy *= -1;
            });

            requestAnimationFrame(drawNeural);
        };

        drawNeural();
    }

    // ==========================================
    // ULTRA MODERN - Magnetic Cursor
    // ==========================================
    const magneticCursor = document.getElementById('magneticCursor');
    if (magneticCursor && window.innerWidth > 768) {
        const cursorDot = magneticCursor.querySelector('.cursor-dot');
        const cursorRing = magneticCursor.querySelector('.cursor-ring');
        let cursorX = 0, cursorY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });

        const updateMagneticCursor = () => {
            ringX += (cursorX - ringX) * 0.15;
            ringY += (cursorY - ringY) * 0.15;

            cursorDot.style.left = cursorX + 'px';
            cursorDot.style.top = cursorY + 'px';
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';

            requestAnimationFrame(updateMagneticCursor);
        };
        updateMagneticCursor();

        // Hover effect on interactive elements
        document.querySelectorAll('a, button, .game-card, .event-card, .grid-item').forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        });

        document.addEventListener('mousedown', () => cursorRing.classList.add('click'));
        document.addEventListener('mouseup', () => cursorRing.classList.remove('click'));
    }

    // ==========================================
    // ULTRA MODERN - AI Chatbot
    // ==========================================
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const typingIndicator = document.getElementById('typingIndicator');

    if (chatbotToggle && chatbotWindow) {
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.classList.toggle('active');
        });

        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });

        // AI Responses
        const aiResponses = {
            games: {
                message: "🎮 Ini game-game favorit member kami:",
                options: [
                    "• Blox Fruits - Action RPG dengan kekuatan buah iblis!",
                    "• Adopt Me - Game pet trading terpopuler!",
                    "• Murder Mystery 2 - Survival mystery yang seru!",
                    "• Bloxburg - Simulasi kehidupan & building!",
                    "• Jailbreak - Cops & Robbers yang epic!"
                ]
            },
            events: {
                message: "📅 Event yang akan datang:",
                options: [
                    "• 25 Dec - Christmas Party di Bloxburg",
                    "• 31 Dec - New Year Countdown",
                    "• 5 Jan - Murder Mystery Tournament",
                    "• 10 Jan - Blox Fruits PVP Championship",
                    "• 15 Jan - Bloxburg Build Contest"
                ]
            },
            join: {
                message: "🚀 Cara join Roblox Club:",
                options: [
                    "1. Isi form pendaftaran di bawah",
                    "2. Join Discord server kami",
                    "3. Tunggu verifikasi admin (1-24 jam)",
                    "4. Setelah diverifikasi, kamu bisa akses channel eksklusif!",
                    "💡 Syarat: Umur minimal 13 tahun & punya akun Roblox"
                ]
            },
            members: {
                message: "👥 Member elite kami:",
                options: [
                    "👑 Akbar - Founder & Pro Player",
                    "🛡️ Baldyas - Admin & Builder Master",
                    "⚡ Royan - Moderator & Speedrunner",
                    "🎯 Nabil - Trader Legend",
                    "🔥 Rafi - Roblox Addict"
                ]
            },
            default: {
                message: "🤖 Hmm, aku tidak begitu mengerti. Coba tanya tentang:",
                options: [
                    "• 'games' - Rekomendasi game",
                    "• 'events' - Event yang akan datang",
                    "• 'join' - Cara bergabung",
                    "• 'members' - Member kami"
                ]
            },
            greetings: {
                message: "Halo juga! 👋 Aku ROBO, AI Assistant Roblox Club. Ada yang bisa aku bantu?",
                options: []
            }
        };

        const processMessage = (message) => {
            const lower = message.toLowerCase();

            if (lower.includes('game') || lower.includes('main') || lower.includes('rekomendasi')) {
                return aiResponses.games;
            } else if (lower.includes('event') || lower.includes('kompetisi') || lower.includes('turnamen')) {
                return aiResponses.events;
            } else if (lower.includes('join') || lower.includes('gabung') || lower.includes('daftar')) {
                return aiResponses.join;
            } else if (lower.includes('member') || lower.includes('anggota') || lower.includes('siapa')) {
                return aiResponses.members;
            } else if (lower.includes('halo') || lower.includes('hai') || lower.includes('hi') || lower.includes('hello')) {
                return aiResponses.greetings;
            } else {
                return aiResponses.default;
            }
        };

        const addMessage = (content, isUser = false) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;

            const avatar = document.createElement('div');
            avatar.className = 'message-avatar';
            avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.innerHTML = `<p>${content}</p>`;

            messageDiv.appendChild(avatar);
            messageDiv.appendChild(contentDiv);
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        };

        const sendChatMessage = () => {
            const message = chatInput.value.trim();
            if (!message) return;

            addMessage(message, true);
            chatInput.value = '';

            typingIndicator.textContent = 'ROBO sedang mengetik...';

            setTimeout(() => {
                const response = processMessage(message);
                let fullMessage = response.message;
                if (response.options.length > 0) {
                    fullMessage += '<br><br>' + response.options.join('<br>');
                }
                addMessage(fullMessage);
                typingIndicator.textContent = 'Online • Ready to help';
            }, 1000 + Math.random() * 1000);
        };

        sendMessage.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendChatMessage();
        });

        // Quick action buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                const response = aiResponses[action];
                if (response) {
                    let fullMessage = response.message;
                    if (response.options.length > 0) {
                        fullMessage += '<br><br>' + response.options.join('<br>');
                    }
                    addMessage(fullMessage);
                }
            });
        });
    }

    // ==========================================
    // ULTRA MODERN - Floating Action Buttons
    // ==========================================
    const fabContainer = document.getElementById('fabContainer');
    const fabMain = document.getElementById('fabMain');
    const randomGameBtn = document.getElementById('randomGameBtn');

    if (fabMain) {
        fabMain.addEventListener('click', () => {
            fabContainer.classList.toggle('active');
            fabMain.classList.toggle('active');
        });
    }

    if (randomGameBtn) {
        const games = [
            { name: 'Adopt Me', url: 'https://www.roblox.com/games/920587237/' },
            { name: 'Blox Fruits', url: 'https://www.roblox.com/games/2753915549/' },
            { name: 'Murder Mystery 2', url: 'https://www.roblox.com/games/142823291/' },
            { name: 'Bloxburg', url: 'https://www.roblox.com/games/185655149/' },
            { name: 'Jailbreak', url: 'https://www.roblox.com/games/606849621/' },
            { name: 'Royale High', url: 'https://www.roblox.com/games/735030788/' },
            { name: 'Doors', url: 'https://www.roblox.com/games/6516141723/' }
        ];

        randomGameBtn.addEventListener('click', () => {
            const randomGame = games[Math.floor(Math.random() * games.length)];
            showToast('info', `🎲 Random Game: ${randomGame.name}!`);
            setTimeout(() => {
                window.open(randomGame.url, '_blank');
            }, 1500);
        });
    }

    // ==========================================
    // ULTRA MODERN - Voice Command
    // ==========================================
    const voiceCommandBtn = document.getElementById('voiceCommandBtn');

    if (voiceCommandBtn && 'webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'id-ID';

        voiceCommandBtn.addEventListener('click', () => {
            voiceCommandBtn.classList.add('listening');
            showToast('info', '🎤 Mendengarkan... Katakan sesuatu!');
            recognition.start();
        });

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            voiceCommandBtn.classList.remove('listening');

            if (command.includes('scroll') || command.includes('turun')) {
                window.scrollBy({ top: 500, behavior: 'smooth' });
                showToast('success', '⬇️ Scrolling down!');
            } else if (command.includes('atas') || command.includes('naik')) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                showToast('success', '⬆️ Back to top!');
            } else if (command.includes('play') || command.includes('main')) {
                window.location.href = 'roblox://';
                showToast('success', '🎮 Opening Roblox!');
            } else if (command.includes('discord')) {
                window.open('https://discord.gg/robloxclub', '_blank');
                showToast('success', '💬 Opening Discord!');
            } else if (command.includes('dark') || command.includes('gelap')) {
                document.body.dataset.theme = '';
                showToast('success', '🌙 Dark mode activated!');
            } else if (command.includes('light') || command.includes('terang')) {
                document.body.dataset.theme = 'light';
                showToast('success', '☀️ Light mode activated!');
            } else {
                showToast('info', `🎤 Kamu bilang: "${command}"`);
            }
        };

        recognition.onerror = () => {
            voiceCommandBtn.classList.remove('listening');
            showToast('error', '❌ Voice command error. Coba lagi!');
        };
    } else if (voiceCommandBtn) {
        voiceCommandBtn.addEventListener('click', () => {
            showToast('error', '❌ Browser tidak support voice command');
        });
    }

    // ==========================================
    // ULTRA MODERN - Sound Toggle
    // ==========================================
    const soundToggle = document.getElementById('soundToggle');
    let soundEnabled = true;

    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            soundToggle.classList.toggle('muted', !soundEnabled);
            soundToggle.querySelector('i').className = soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
            showToast('info', soundEnabled ? '🔊 Sound ON' : '🔇 Sound OFF');
        });
    }

    // ==========================================
    // ULTRA MODERN - Glitch Effect on Scroll
    // ==========================================
    const glitchOverlay = document.getElementById('glitchOverlay');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        if (Math.abs(scrollTop - lastScrollTop) > 100) {
            if (glitchOverlay) {
                glitchOverlay.style.opacity = '0.3';
                setTimeout(() => {
                    glitchOverlay.style.opacity = '0';
                }, 150);
            }
        }
        lastScrollTop = scrollTop;
    });

    // ==========================================
    // ULTRA MODERN - Entrance Animation
    // ==========================================
    setTimeout(() => {
        showToast('info', '🎮 Welcome to ROBLOX CLUB! Scroll untuk explore.');
    }, 3000);

    setTimeout(() => {
        showToast('success', '🤖 AI Assistant siap membantu! Klik tombol robot di kanan bawah.');
    }, 6000);

});

