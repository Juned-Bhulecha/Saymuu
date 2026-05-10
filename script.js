// Data for the 3D Polaroid Gallery
const PHOTOS = [
    { src: 'Photos/IMG-20251123-WA0000.jpg', caption: 'The start of our journey 🌸' },
    { src: 'Photos/IMG-20251123-WA0002.jpg', caption: 'Smiling through everything 😊' },
    { src: 'Photos/IMG_20250927_011705_481.jpg', caption: 'Always side by side 💕' },
    { src: 'Photos/IMG_20260507_194233_867.jpg', caption: 'Forever grateful for you ✨' },
    { src: 'Photos/IMG_20260507_194235_524.jpg', caption: 'The most beautiful soul 🎀' },
    { src: 'Photos/IMG_20260507_194245_207.jpg', caption: 'Precious moments 💖' },
    { src: 'Photos/IMG_20260507_194246_773.jpg', caption: 'So much joy 🌟' },
    { src: 'Photos/IMG_20260507_194248_405.jpg', caption: 'My favorite person 💗' },
    { src: 'assets/IMG-20251123-WA0003.jpg', caption: 'Absolute perfection ✨' },
    { src: 'Photos/Cuite.png', caption: 'Too cute 🎀' }
];

// Helper: Haptic Feedback
function triggerHaptic() {
    if (navigator.vibrate) {
        navigator.vibrate(50); // 50ms vibration
    }
}

// Helper: Audio Fade-in
function playAudioWithFadeIn(audioElement) {
    if(!audioElement) return;
    audioElement.volume = 0;
    audioElement.play().then(() => {
        let vol = 0;
        let fadeInterval = setInterval(() => {
            if (vol < 0.95) {
                vol += 0.05;
                audioElement.volume = vol;
            } else {
                audioElement.volume = 1;
                clearInterval(fadeInterval);
            }
        }, 100); // Fades in over ~2 seconds
    }).catch(e => console.log("Audio play error:", e));
}

// Global state for music
window.isMainMusicPlaying = false;

window.addEventListener('load', () => {
    // Keep loading screen for 2 seconds for aesthetic effect
    setTimeout(() => {
        const loader = document.getElementById('loader-wrapper');
        if(loader) loader.classList.add('fade-out');
        
        // Start all animations only AFTER loader fades out
        setTimeout(() => {
            const cinematicOverlay = document.getElementById('cinematic-overlay');
            const openSurpriseBtn = document.getElementById('open-surprise-btn');
            
            if (cinematicOverlay && openSurpriseBtn) {
                // Wait for user to click "Open Surprise"
                openSurpriseBtn.addEventListener('click', () => {
                    triggerHaptic();
                    cinematicOverlay.style.opacity = '0';
                    setTimeout(() => cinematicOverlay.style.display = 'none', 800);
                    startAllExperiences();
                });
            } else {
                // No overlay found, start directly
                startAllExperiences();
            }
        }, 500); // Wait for fade out transition
    }, 2000); // 2 seconds of loading screen
});

function startAllExperiences() {
    initAnimations();
    createPetals();
    createNotes();
    renderGallery();
    initGamifiedFeatures();
    initMusicPlayer();
    initTeddy();
    fireConfettiBurst(); 
    
    // Auto-start music with beautiful fade-in
    const mainMusic = document.getElementById('main-bg-music');
    const musicBtn = document.getElementById('music-toggle-btn');
    const musicBtnText = document.getElementById('music-btn-text');
    
    if (mainMusic) {
        playAudioWithFadeIn(mainMusic);
        window.isMainMusicPlaying = true;
        if (musicBtn && musicBtnText) {
            musicBtn.classList.add('playing');
            musicBtnText.innerText = 'Now Playing 🎶';
        }
    }
}

function initTeddy() {
    const teddyWidget = document.getElementById('teddy-widget');
    if (teddyWidget) {
        const teddyBear = teddyWidget.querySelector('.teddy-bear');
        const teddySpeech = teddyWidget.querySelector('.teddy-speech');
        
        const cuteMessages = [
            "You look beautiful today! ✨",
            "Eat lots of cake! 🍰",
            "Best sister ever! 🎀",
            "Keep smiling Saymuu! 💕",
            "Have a magical day! 🌸",
            "I love you endlessly! 💗",
            "You're a star! 🌟"
        ];
        
        // When tapped, fully show the teddy, trigger animation, and show the message
        teddyBear.addEventListener('click', () => {
            triggerHaptic();
            
            // Pick a random message
            const randomMsg = cuteMessages[Math.floor(Math.random() * cuteMessages.length)];
            if(teddySpeech) teddySpeech.innerText = randomMsg;
            
            // Slide fully into view
            teddyWidget.classList.add('show-full');
            // Show speech bubble
            teddyWidget.classList.add('show-speech');
            // Play jump animation
            teddyBear.style.animation = 'teddyJump 0.5s ease';
            
            // Pop confetti from the bottom right
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { x: 0.9, y: 0.9 },
                colors: ['#ffb3e0', '#ff6bae', '#e91e8c']
            });

            // Reset animation back to waving after jump finishes
            setTimeout(() => {
                teddyBear.style.animation = 'teddyWave 3s infinite ease-in-out';
            }, 500);

            // Hide the message and slide the teddy back into "peeking" mode after 5 seconds
            setTimeout(() => {
                teddyWidget.classList.remove('show-full');
                teddyWidget.classList.remove('show-speech');
            }, 5000);
        });
    }
}

function initAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Section Elements
        gsap.from(".hero .hero-profile-img", { duration: 1, y: 30, opacity: 0, ease: "back.out(1.5)", delay: 0.2 });
        gsap.from(".hero .hb-text", { duration: 1, y: 20, opacity: 0, ease: "power2.out", delay: 0.4 });
        gsap.from(".hero .name-text", { duration: 1, scale: 0.8, opacity: 0, ease: "back.out(1.2)", delay: 0.6 });
        
        // Gift Section Fade-in
        gsap.from(".gift-section", {
            scrollTrigger: {
                trigger: ".gift-section",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8, y: 40, opacity: 0, ease: "power2.out"
        });

        // Section Title
        gsap.from(".section-title, .section-sub", {
            scrollTrigger: {
                trigger: ".section-title",
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8, y: 20, opacity: 0, stagger: 0.2, ease: "power2.out"
        });

        // Gallery Polaroids Staggered
        gsap.from(".polaroids-grid .polaroid-container", {
            scrollTrigger: {
                trigger: ".gallery-wrap",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8, y: 50, opacity: 0, stagger: 0.15, ease: "back.out(1.2)"
        });

        // Slideshow Link Button
        gsap.from(".slideshow-link", {
            scrollTrigger: {
                trigger: ".slideshow-link",
                start: "top 95%",
                toggleActions: "play none none reverse"
            },
            duration: 0.6, scale: 0.8, opacity: 0, ease: "back.out(1.5)"
        });
    }
}

function initMusicPlayer() {
    const musicBtn = document.getElementById('music-toggle-btn');
    const mainMusic = document.getElementById('main-bg-music');
    const musicBtnText = document.getElementById('music-btn-text');
    if (musicBtn && mainMusic) {
        musicBtn.addEventListener('click', () => {
            triggerHaptic();
            if (window.isMainMusicPlaying) {
                mainMusic.pause();
                musicBtn.classList.remove('playing');
                musicBtnText.innerText = 'Tap to Play Song 🎵';
            } else {
                mainMusic.play().catch(e => console.log('Audio play error:', e));
                musicBtn.classList.add('playing');
                musicBtnText.innerText = 'Now Playing 🎶';
            }
            window.isMainMusicPlaying = !window.isMainMusicPlaying;
        });
    }
}

function createPetals() {
    for(let i=0; i<8; i++){
        let p = document.createElement('div');
        p.className = 'petal';
        p.innerHTML = '🌸';
        p.style.left = Math.random()*100 + 'vw';
        p.style.animationDuration = (Math.random()*4 + 4) + 's';
        p.style.animationDelay = Math.random()*2 + 's';
        document.body.appendChild(p);
    }
}

function createNotes() {
    for(let i=0; i<4; i++){
        let n = document.createElement('div');
        n.className = 'note';
        n.innerHTML = '🎵';
        n.style.left = Math.random()*100 + 'vw';
        n.style.top = (Math.random()*80 + 10) + 'vh';
        n.style.animationDuration = (Math.random()*3 + 3) + 's';
        n.style.animationDelay = Math.random()*2 + 's';
        document.body.appendChild(n);
    }
}

function fireConfettiBurst() {
    var duration = 3000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ffb3e0', '#ff6bae', '#e91e8c']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ffb3e0', '#ff6bae', '#e91e8c']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function renderGallery() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    
    gallery.innerHTML = PHOTOS.map((p, i) => `
        <div class="polaroid-container">
            <div class="polaroid-inner">
                <div class="polaroid-front">
                    <img src="${p.src}" alt="Memory" class="pol-img" loading="lazy">
                    <div class="pol-caption">${p.caption}</div>
                </div>
                <div class="polaroid-back">
                    <div class="back-note">Flip me back! ✨</div>
                    <button class="view-full-btn" data-src="${p.src}">View Full</button>
                </div>
            </div>
        </div>
    `).join('');
}

function initGamifiedFeatures() {
    // Cake
    const cake = document.getElementById('interactive-cake');
    if (cake) {
        cake.addEventListener('click', () => {
            if (cake.innerText === '🎂') {
                triggerHaptic();
                cake.innerText = '🍰';
                fireConfettiBurst();
            }
        });
    }

    // Shutter Sound
    function playShutterSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            osc.type = 'square';
            osc.frequency.setValueAtTime(150, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) {
            console.log('AudioContext not supported');
        }
    }

    // Gallery Flip & Lightbox
    const galleryItems = document.querySelectorAll('.polaroid-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-full-btn')) {
                const src = e.target.getAttribute('data-src');
                lightboxImg.src = src;
                lightbox.classList.add('active');
                return;
            }
            if (!item.classList.contains('flipped')) {
                playShutterSound();
            }
            item.classList.toggle('flipped');
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });
    }

    // Gift Box & Typewriter
    const giftBoxContainer = document.getElementById('gift-box-container');
    const messageBox = document.getElementById('message-box');
    const typewriterText = document.getElementById('typewriter-text');
    const originalMessage = document.getElementById('original-message');
    const signature = document.querySelector('.signature');
    let isTyping = false;

    if (giftBoxContainer && messageBox) {
        giftBoxContainer.addEventListener('click', () => {
            triggerHaptic();
            // Add a little pop effect before opening
            giftBoxContainer.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                giftBoxContainer.style.transform = 'scale(0)';
                giftBoxContainer.style.opacity = '0';
                
                // Blast confetti when the envelope bursts
                confetti({
                    particleCount: 100,
                    spread: 80,
                    origin: { y: 0.5 },
                    colors: ['#ffb3e0', '#ff6bae', '#e91e8c']
                });
                
                setTimeout(() => {
                    giftBoxContainer.style.display = 'none';
                    messageBox.style.display = 'block';
                    // Apply a beautiful slide-up spring effect to the message card
                    messageBox.style.transform = 'translateY(50px) scale(0.8)';
                    
                    setTimeout(() => {
                        messageBox.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                        messageBox.style.opacity = '1';
                        messageBox.style.transform = 'translateY(0) scale(1)';
                        
                        if (!isTyping) {
                            isTyping = true;
                            setTimeout(typeMessage, 400); // slight delay before typing starts
                        }
                    }, 50);
                }, 400);
            }, 150);
        });
    }

    function typeMessage() {
        let i = 0;
        const htmlContent = originalMessage.innerHTML;
        typewriterText.innerHTML = '';
        
        function typeWriter() {
            if (i < htmlContent.length) {
                if (htmlContent.charAt(i) === '<') {
                    let tag = '';
                    while (htmlContent.charAt(i) !== '>' && i < htmlContent.length) {
                        tag += htmlContent.charAt(i);
                        i++;
                    }
                    tag += '>';
                    i++; // Advance past the '>'
                    typewriterText.innerHTML += tag;
                } else {
                    typewriterText.innerHTML += htmlContent.charAt(i);
                    i++;
                }
                setTimeout(typeWriter, 35);
            } else {
                typewriterText.classList.add('done');
                signature.style.opacity = '1';
                signature.style.transition = 'opacity 2s';
            }
        }
        typeWriter();
    }
}

// Interactive Petals - Fly away from mouse/touch
document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.petal').forEach(petal => {
        const rect = petal.getBoundingClientRect();
        // Calculate center of the petal
        const petalX = rect.left + rect.width / 2;
        const petalY = rect.top + rect.height / 2;
        
        const dx = e.clientX - petalX;
        const dy = e.clientY - petalY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) { // If mouse is within 100px
            const repelX = (dx / distance) * -80; // Push away strongly
            const repelY = (dy / distance) * -80;
            petal.style.transform = `translate(${repelX}px, ${repelY}px) scale(1.5)`;
            petal.style.transition = 'transform 0.4s ease-out, filter 0.4s ease-out';
            petal.style.filter = 'blur(4px)';
            
            // Revert after escaping
            setTimeout(() => {
                petal.style.transform = '';
                petal.style.filter = '';
            }, 600);
        }
    });
});

// Smooth Page Transitions
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        // If it's a real internal link
        if(href && !href.startsWith('#') && this.getAttribute('target') !== '_blank') {
            e.preventDefault();
            document.body.style.transition = 'opacity 0.5s ease, filter 0.5s ease, transform 0.5s ease';
            document.body.style.opacity = '0';
            document.body.style.filter = 'blur(10px)';
            document.body.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        }
    });
});
