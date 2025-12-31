    document.addEventListener('DOMContentLoaded', () => {

        // ===================================================================
        //  CONFIGURAÇÃO DE CONTEÚDO
        //  Edite todo o conteúdo do site aqui neste objeto.
        // ===================================================================
        const content = {
            music: {
                title: "FICA",
                artist: "Canção de ANAVITORIA, Matheus & Kauan ‧ 2016",
                description: "Essa música foi o ponto de partida. Foi com ela que nossas vozes se encontraram pela primeira vez e, sem a gente perceber, algo maior começou a nascer. Virou o início de uma relação que Deus já estava escrevendo muito antes da gente entender.",
                // IMPORTANTE: Substitua este placeholder pelo link real do seu arquivo MP3.
                // O ideal é hospedá-lo junto com o site (ex: /assets/media/nossa-musica.mp3)
                audioSrc: "audio/fica.mp3" 
            },
            timeline: [
                {
                    date: "18 de Dezembro, 2024",
                    title: "O Início de Tudo",
                    text: 'O começo de algo que não imaginariamos, "quer um spoiler?". Incrivel pensar que isso daria uma história linda, não é mesmo?',
                },
                {
                    date: "01 de Outubro, 2025",
                    title: "Fica",
                    text: "Tudo começou com um bilhete justamente com a letra dessa música. Um gesto simples que acendeu uma chama e nos levou a descobrir um universo novo juntos."
                },
                {
                    date: "13 de Outubro, 2025",
                    title: "1 Abraço, 1 Foto",
                    text: "Nossa primeira tentativa de combinar um roupa. E deu certo do nosso jeito! Aquele abraço apertado e a foto marcaram o início de muitas memórias felizes."
                },
                {
                    date: "18 de Dezembro, 2025",
                    title: "A despedida do ano",
                    text: "Nossa primeira despedida de ano juntos. Entre risadas e revelações. Além disso completando 1 ano desde o início de tudo."
                },
                {
                    date: "Hoje",
                    title: "Construindo o Futuro",
                    text: "Olhando para trás, vejo cada passo como uma estrela em nossa jornada. E olhando para frente, vejo um infinito de possibilidades ao seu lado."
                }
            ],
            gallery: [
                { src: "images/primeirafoto.JPEG", caption: "Nossa primeira foto juntos", tags: ["us"] },
                { src: "images/mão.JPEG", caption: "Desenho que Van Gogh seria humilhado", tags: ["moments"] },
                { src: "images/Pato.jpeg", caption: "Quando você ficou cuidando do pato quando viajei.", tags: ["moments"] },
                { src: "images/capivara.JPEG", caption: "Capivara sequestrada para programar", tags: ["moments"] },
                { src: "images/Ultima.jpeg", caption: "Nossa última foto juntos. 🤍", tags: ["us"] },
            ],  
            letter: {
                title: "Minha Querida Anny,",
                paragraphs: [
                    "Um novo ciclo se inicia, mais 365 dias para te irritar, amar e compartilhar momentos com você. Hoje, enquanto celebramos o 3 meses de Girassóis! Não posso deixar de refletir sobre a incrível jornada que temos vivido juntos até aqui. Nem parece que se passou tanto tempo, enfim o tempo sem lógica. Parece que nos conhecemos há uma eternidade e, ao mesmo tempo, cada dia com você é uma nova descoberta.",
                    "Com você, aprendi que o amor não é sobre encontrar alguém perfeito, mas sobre encontrar alguém que faz o nosso mundo ser perfeito. É sobre as risadas espontâneas, o conforto no silêncio, o apoio nos sonhos mais loucos. É sobre construir um universo que é só nosso.",
                    "Obrigado mais uma vez por ser essa pessoa incrível que você é. Veremos o que a nova temporada nos reserva, mas tenho certeza de que, com você ao meu lado, será uma aventura inesquecível. Eu te amo 🤍🌻",
                    "Com carinho,",
                    "Melo"
                ]
            },
            final: {
                text: "Nossa história não tem um ponto final. É uma série de reticências, um universo em constante expansão, cheio de novas estrelas para descobrir. E eu mal posso esperar para explorar cada uma delas com você."
            }
        };

        // ===================================================================
        //  INICIALIZAÇÃO E LÓGICA DO SITE
        // ===================================================================

        // --- Carregamento de Conteúdo Dinâmico ---
        function loadContent() {
            // Música
            document.getElementById('track-title').textContent = content.music.title;
            document.getElementById('track-artist').textContent = content.music.artist;
            document.getElementById('music-text').textContent = content.music.description;
            document.getElementById('audio-player').src = content.music.audioSrc;

            // Linha do Tempo
            const timelineContainer = document.getElementById('timeline-container');
            content.timeline.forEach((item, index) => {
                const side = index % 2 === 0 ? 'left' : 'right';
                const timelineItem = document.createElement('div');
                timelineItem.className = `timeline-item ${side}`;
                timelineItem.innerHTML = `
                    <div class="timeline-content">
                        <span class="date">${item.date}</span>
                        <h3>${item.title}</h3>
                        <p>${item.text}</p>
                    </div>
                `;
                timelineContainer.appendChild(timelineItem);
            });

            // Galeria
            const galleryGrid = document.getElementById('gallery-grid-container');
            const filtersContainer = document.getElementById('gallery-filters-container');
            const allTags = new Set(['todos']);
            content.gallery.forEach(item => item.tags.forEach(tag => allTags.add(tag)));

            filtersContainer.innerHTML = [...allTags].map(tag => 
                `<button class="filter-btn ${tag === 'todos' ? 'active' : ''}" data-filter="${tag}">${tag.charAt(0).toUpperCase() + tag.slice(1)}</button>`
            ).join('');

            galleryGrid.innerHTML = content.gallery.map((item, index) => `
                <div class="gallery-item" data-tags="${item.tags.join(' ')}" data-index="${index}">
                    <img src="${item.src}" alt="${item.caption}" loading="lazy">
                    <div class="overlay">Ver Foto</div>
                </div>
            `).join('');

            // Carta
            const letterContainer = document.getElementById('letter-container');
            letterContainer.innerHTML = `
                <h3>${content.letter.title}</h3>
                ${content.letter.paragraphs.map(p => `<p>${p}</p>`).join('')}
            `;
            
            // Final
            document.getElementById('final-text').textContent = content.final.text;
        }

        loadContent();

        // --- Fundo Cósmico com Canvas ---
        const canvas = document.getElementById('cosmic-background');
        const ctx = canvas.getContext('2d');
        let stars = [];
        let animationFrameId;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createStars() {
            stars = [];
            for (let i = 0; i < 400; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5,
                    alpha: Math.random(),
                    speed: Math.random() * 0.2 + 0.1
                });
            }
        }

        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();
            });
        }

        function updateStars() {
            stars.forEach(star => {
                star.y -= star.speed;
                if (star.y < 0) {
                    star.y = canvas.height;
                    star.x = Math.random() * canvas.width;
                }
            });
        }

        function animateCosmos() {
            drawStars();
            updateStars();
            animationFrameId = requestAnimationFrame(animateCosmos);
        }

        function initCosmos() {
            resizeCanvas();
            createStars();
            animateCosmos();
        }
        
        window.addEventListener('resize', () => {
            cancelAnimationFrame(animationFrameId);
            initCosmos();
        });
        
        initCosmos();

        // --- Animações de Scroll (GSAP & Intersection Observer) ---
        gsap.registerPlugin(ScrollTrigger);
        
        // Revelar elementos
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => {
            gsap.fromTo(el, 
                { opacity: 0, y: 50 },
                { 
                    opacity: 1, y: 0, duration: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    delay: parseFloat(el.dataset.delay) || 0
                }
            );
        });

        // Animações da timeline
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            const side = item.classList.contains('left') ? -50 : 50;
            gsap.fromTo(item,
                { opacity: 0, x: side },
                {
                    opacity: 1, x: 0, duration: 0.8,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                    }
                }
            );
        });

        // Barra de progresso
        gsap.to('.progress-bar', {
            width: '100%',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5
            }
        });

        // --- Navegação com Scroll Spy ---
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 60) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });

        // --- Player de Música Simples ---
        const audio = document.getElementById('audio-player');
        const playPauseBtn = document.getElementById('play-pause-btn');
        const playIcon = document.getElementById('play-icon');
        const pauseIcon = document.getElementById('pause-icon');
        const startJourneyBtn = document.getElementById('start-journey-btn');

        // Função para tocar/pausar
        function togglePlay() {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }

        // Evento para o botão principal "Começar"
        startJourneyBtn.addEventListener('click', () => {
            document.getElementById('music').scrollIntoView({ behavior: 'smooth' });
            if (audio.paused) {
                togglePlay();
            }
        });

        // Evento para o botão de play/pause
        playPauseBtn.addEventListener('click', togglePlay);

        // Alterar ícones conforme estado do áudio
        audio.addEventListener('play', () => {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        });

        audio.addEventListener('pause', () => {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        });


        // --- Galeria e Lightbox ---
        const filters = document.querySelector('.gallery-filters');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        let currentIndex = 0;
        
        filters.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') return;
            
            document.querySelector('.filter-btn.active').classList.remove('active');
            e.target.classList.add('active');
            
            const filter = e.target.dataset.filter;
            galleryItems.forEach(item => {
                if (filter === 'todos' || item.dataset.tags.includes(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });

        function showLightbox(index) {
            currentIndex = index;
            const item = content.gallery[currentIndex];
            lightboxImg.src = item.src;
            lightboxCaption.textContent = item.caption;
            lightbox.classList.add('show');
        }
        
        function closeLightbox() {
            lightbox.classList.remove('show');
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % content.gallery.length;
            showLightbox(currentIndex);
        }
        
        function showPrev() {
            currentIndex = (currentIndex - 1 + content.gallery.length) % content.gallery.length;
            showLightbox(currentIndex);
        }

        document.getElementById('gallery-grid-container').addEventListener('click', e => {
            const item = e.target.closest('.gallery-item');
            if (item) {
                showLightbox(parseInt(item.dataset.index));
            }
        });
        
        document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        document.querySelector('.lightbox-next').addEventListener('click', showNext);
        document.querySelector('.lightbox-prev').addEventListener('click', showPrev);
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) closeLightbox();
        });

        function createHeartExplosion(count = 50) {
            const overlay = document.getElementById('konami-overlay');
            const messages = [
                '💖', 'Amor da minha vida!💘', '💝', 
                'Princesa!💗', 'Eu te amo!💞', '💕', 
                '❣️', 'Gostosura!❤️‍🔥', 'Meu coração!💓'
            ];

            for (let i = 0; i < count; i++) {
                const heart = document.createElement('div');
                heart.className = 'heart-particle';
                heart.innerHTML = messages[Math.floor(Math.random() * messages.length)];
            
                // posição e estilo aleatórios
                heart.style.left = `${Math.random() * 100}vw`;
                heart.style.top = `${Math.random() * 20 + 80}vh`; // começa sempre na parte de baixo
                heart.style.animationDelay = `${Math.random() * 3}s`;
                heart.style.animationDuration = `${5 + Math.random() * 4}s`;
                heart.style.fontSize = `${1.8 + Math.random() * 2.2}rem`;
                heart.style.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
            
                overlay.appendChild(heart);
                setTimeout(() => heart.remove(), 9000);
            }
        
            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        }

        // Botão de surpresa
        document.getElementById('surprise-btn').addEventListener('click', () => {
            createHeartExplosion(80); // mais partículas para encher a tela
            playLoveSound();
        });

        // Função de som opcional
        function playLoveSound() {
            const audio = new Audio('https://freesound.org/data/previews/458/458889_8386270-lq.mp3');
            audio.volume = 0.5;
            audio.play();
        }

        // Konami Code
        const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
        let konamiIndex = 0;
        document.addEventListener('keydown', e => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    createHeartExplosion(200); // explosão épica
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });

    });