document.addEventListener('DOMContentLoaded', () => {

    // ==============================================
    //     BAGIAN 1: PENGATURAN FIREBASE (SUDAH DIISI)
    // ==============================================
    const firebaseConfig = {
        apiKey: "AIzaSyDFRslV-wFwbmYGr7s0Lk17pXGm0Tq8NQM",
        authDomain: "website-kelas-v3.firebaseapp.com",
        databaseURL: "https://website-kelas-v3-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "website-kelas-v3",
        storageBucket: "website-kelas-v3.appspot.com",
        messagingSenderId: "812973677269",
        appId: "1:812973677269:web:6bd751c8d98bbb0822605c",
        measurementId: "G-N9N6XH85KB"
    };

    // ==============================================
    //     BAGIAN 2: LOGIKA BIODATA DENGAN PAGINATION
    // ==============================================
    const allStudentsData = [
        { absen: "01", nama: "Adelia Belva Calista", hobi: "Membaca novel", motto: "Lakukan yang terbaik di setiap kesempatan.", foto: "img/adelia.jpg", instagram: "https://www.instagram.com/adlsk.1" },
        { absen: "02", nama: "Ahmad Raditia", hobi: "Menulis cerita", motto: "Tulis kisahmu sendiri.", foto: "img/ahmad.jpg", instagram: "https://www.instagram.com/lilzawv" },
        { absen: "03", nama: "Alika", hobi: "Jalan-jalan", motto: "Jelajahi dunia, temukan dirimu.", foto: "img/alika.jpg", instagram: "https://www.instagram.com/" },
        { absen: "04", nama: "Alvino Rasya Pratama", hobi: "Bermain game", motto: "Jangan pernah menyerah.", foto: "img/alvino.jpg", instagram: "https://www.instagram.com/alvv68_" },
        { absen: "05", nama: "Cikal Rai Satria", hobi: "Berolahraga di gym", motto: "Tubuh kuat, pikiran sehat.", foto: "img/cikal.jpg", instagram: "https://www.instagram.com/" },
        { absen: "06", nama: "Dewi Sekarsari", hobi: "Melukis pemandangan", motto: "Warna adalah senyuman alam.", foto: "img/dewi.jpg", instagram: "https://www.instagram.com/" },
        { absen: "07", nama: "Faiz Rifki Nugraha", hobi: "Mendengarkan musik", motto: "Hidup itu seperti musik, perlu harmoni.", foto: "img/faizr.jpg", instagram: "https://www.instagram.com/" },
        { absen: "08", nama: "Gilang Yosep Fahreza", hobi: "Menonton film", motto: "Setiap frame adalah cerita.", foto: "img/gilang.jpg", instagram: "https://www.instagram.com/vlnxz__langzz" },
        { absen: "09", nama: "Kayla Nazhira Abella", hobi: "Fotografi", motto: "Abadikan momen, ciptakan kenangan.", foto: "img/kayla.jpg", instagram: "https://www.instagram.com/" },
        { absen: "10", nama: "Khayyirah Nareswari", hobi: "Memasak kue", motto: "Manisnya hidup ada di tanganmu.", foto: "img/khayyirah.jpg", instagram: "https://www.instagram.com/" },
        { absen: "11", nama: "M. Daffa Faiz Al Hakam", hobi: "Bermain catur", motto: "Pikirkan langkahmu selanjutnya.", foto: "img/daffa.jpg", instagram: "https://www.instagram.com/" },
        { absen: "12", nama: "M. Fajar Ar Rassyid", hobi: "Mempelajari sejarah", motto: "Masa lalu adalah guru terbaik.", foto: "img/fajar.jpg", instagram: "https://www.instagram.com/" },
        { absen: "13", nama: "M. Haikal", hobi: "Naik gunung", motto: "Puncak adalah bonus, perjalanan adalah proses.", foto: "img/haikal.jpg", instagram: "https://www.instagram.com/_kaallll__" },
        { absen: "14", nama: "M. Rohman Al Hafis", hobi: "Membaca komik", motto: "Imajinasi tanpa batas.", foto: "img/rohman.jpg", instagram: "https://www.instagram.com/hafisss_27" },
        { absen: "15", nama: "Moh Faiz Adya Suryadi", hobi: "Desain grafis", motto: "Kreativitas adalah kecerdasan yang bersenang-senang.", foto: "img/faiza.jpg", instagram: "https://www.instagram.com/adya7822" },
        { absen: "16", nama: "Nyimas Daiva Khanza Nabila", hobi: "Menari", motto: "Ekspresikan dirimu lewat gerakan.", foto: "img/nyimas.jpg", instagram: "https://www.instagram.com/" },
        { absen: "17", nama: "Olivia Aprilia", hobi: "Berkebun", motto: "Tanam kebaikan, petik kebahagiaan.", foto: "img/olivia.jpg", instagram: "https://www.instagram.com/olipprilian" },
        { absen: "18", nama: "Rasya Adilah Alfarizi", hobi: "Bermain gitar", motto: "Musik adalah suara perasaan.", foto: "img/rasyaa.jpg", instagram: "https://www.instagram.com/" },
        { absen: "19", nama: "Rasya Saputra", hobi: "Membuat video pendek", motto: "Ceritakan dalam 60 detik.", foto: "img/rasyas.jpg", instagram: "https://www.instagram.com/" },
        { absen: "20", nama: "Rayhan Azril Alifian", hobi: "Mengoleksi action figure", motto: "Setiap koleksi punya cerita.", foto: "img/rayhan.jpg", instagram: "https://www.instagram.com/" },
        { absen: "21", nama: "Razqa Milza Denandra", hobi: "Coding", motto: "Ubah kopi menjadi kode.", foto: "img/razqa.jpg", instagram: "https://www.instagram.com/" },
        { absen: "22", nama: "Risa", hobi: "Belajar bahasa baru", motto: "Beda bahasa, satu dunia.", foto: "img/risa.jpg", instagram: "https://www.instagram.com/vvoklaa" },
        { absen: "23", nama: "Shafa Tasya Asy Syifa", hobi: "Fashion design", motto: "Gayamu adalah dirimu.", foto: "img/shafa.jpg", instagram: "https://www.instagram.com/shff_assyifaa" },
        { absen: "24", nama: "Tiara Putri Azzahra", hobi: "Menyanyi", motto: "Suarakan isi hatimu.", foto: "img/tiara.jpg", instagram: "https://www.instagram.com/vvoklaa_" },
        { absen: "25", nama: "Tiffany Ayu Dwi Winarti", hobi: "Yoga", motto: "Ketenangan datang dari dalam.", foto: "img/tiffany.jpg", instagram: "https://www.instagram.com/ntyaxvllala" },
        { absen: "26", nama: "Vivi Oktavia", hobi: "Membuat kerajinan tangan", motto: "Ciptakan sesuatu yang indah.", foto: "img/vivi.jpg", instagram: "https://www.instagram.com/vvoklaa_" },
        { absen: "27", nama: "Yasmin", hobi: "Volunteering", motto: "Berbagi itu peduli.", foto: "img/yasmin.jpg", instagram: "https://www.instagram.com/" },
        { absen: "28", nama: "Zia Aliza Putri", hobi: "Merawat hewan peliharaan", motto: "Cinta tanpa syarat.", foto: "img/zia.jpg", instagram: "https://www.instagram.com/zyhg4dsc_l" }
    ];

    const galleryContainer = document.getElementById('student-gallery');
    const paginationContainer = document.getElementById('pagination-controls');
    const biodataSiswaSection = document.getElementById('biodata-siswa');
    const studentsPerPage = 5;
    let currentPage = 1;

    function displayStudentsPage(page) {
        if (!galleryContainer || !paginationContainer) return;
        
        galleryContainer.innerHTML = '';
        galleryContainer.classList.remove('fade-in');
        void galleryContainer.offsetWidth;
        galleryContainer.classList.add('fade-in');

        page = parseInt(page);
        const start = (page - 1) * studentsPerPage;
        const end = start + studentsPerPage;
        const paginatedStudents = allStudentsData.slice(start, end);

        paginatedStudents.forEach((student, index) => {
            const item = document.createElement('div');
            item.className = 'student-item';
            item.style.animationDelay = `${index * 0.1}s`;
            
            const imgHtml = `<img src="${student.foto || 'https://placehold.co/300x400/333/fff?text=' + student.nama.split(' ')[0]}" alt="${student.nama}" onclick="openBiodataModalById('${student.absen}')">`;
            
            const infoHtml = `
                <div class="student-info">
                    <h3>${student.nama}</h3>
                    <a href="${student.instagram}" target="_blank">Follow me</a>
                </div>
            `;
            item.innerHTML = imgHtml + infoHtml;
            galleryContainer.appendChild(item);
        });

        setupPagination(page);
    }

    function setupPagination(currentPage) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(allStudentsData.length / studentsPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.classList.add('pagination-button');
            if (i === currentPage) {
                button.classList.add('active');
            }
            button.addEventListener('click', (event) => {
                event.preventDefault();
                displayStudentsPage(i);
                biodataSiswaSection.scrollIntoView({ behavior: 'smooth' });
            });
            paginationContainer.appendChild(button);
        }
    }

    displayStudentsPage(currentPage);


    // ==============================================
    //     BAGIAN 3: PENGATURAN SEMUA MODAL
    // ==============================================
    const biodataModal = document.getElementById('biodata-modal');
    const lightboxModal = document.getElementById('lightbox-modal');
    const anonimModal = document.getElementById('anonim-modal');
    
    function openBiodataModalById(absen) {
        const student = allStudentsData.find(s => s.absen === absen);
        if (!student) return;

        const img = document.getElementById('modal-img');
        const placeholder = document.getElementById('modal-img-placeholder');
        if (student.foto && student.foto.trim() !== "") {
            img.src = student.foto;
            img.style.display = 'block';
            placeholder.style.display = 'none';
        } else {
            img.style.display = 'none';
            placeholder.style.display = 'flex';
            placeholder.textContent = student.nama.split(' ')[0];
        }
        document.getElementById('modal-name').textContent = student.nama;
        document.getElementById('modal-absen').innerHTML = `<strong>Absen:</strong> ${student.absen}`;
        document.getElementById('modal-hobi').innerHTML = `<strong>Hobi:</strong> ${student.hobi}`;
        document.getElementById('modal-motto').innerHTML = `<strong>Motto:</strong> ${student.motto}`;
        biodataModal.style.display = 'block';
    }
    window.openBiodataModalById = openBiodataModalById;

    document.getElementById('open-anonim-modal')?.addEventListener('click', () => {
        anonimModal.style.display = 'block';
    });
    
    document.querySelectorAll('.modal .close-button').forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    window.onclick = (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
        }
    };

    // ==============================================
    //     BAGIAN 4: LOGIKA SLIDER & LIGHTBOX
    // ==============================================
    const slideTrack = document.querySelector('.slide-track');
    if (slideTrack) {
        const slides = Array.from(slideTrack.children);
        if (slides.length > 0) {
            let currentSlide = 0;
            const moveToSlide = () => {
                const slideWidth = slides[0].getBoundingClientRect().width;
                slideTrack.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
            };
            setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                moveToSlide();
            }, 4000);

            slides.forEach(slide => {
                slide.addEventListener('click', () => {
                    document.getElementById('lightbox-img').src = slide.querySelector('img').src;
                    lightboxModal.style.display = 'block';
                });
            });
        }
    }
    
    // ==============================================
    //     BAGIAN 5: LOGIKA TEXT ANONIM (FIREBASE)
    // ==============================================
    try {
        firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
        const messagesRef = database.ref('messages');

        const anonimForm = document.getElementById('anonim-form');
        const anonimInput = document.getElementById('anonim-input');
        const messagesList = document.getElementById('messages-list');

        if (anonimForm) {
            anonimForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const messageText = anonimInput.value.trim();
                if (messageText) {
                    messagesRef.push({
                        text: messageText,
                        timestamp: firebase.database.ServerValue.TIMESTAMP
                    });
                    anonimInput.value = '';
                }
            });
        }

        if (messagesList) {
            messagesRef.on('value', (snapshot) => {
                messagesList.innerHTML = '';
                if (snapshot.exists()) {
                    snapshot.forEach((childSnapshot) => {
                        const message = childSnapshot.val();
                        const messageElement = document.createElement('div');
                        messageElement.className = 'message-item';
                        messageElement.innerHTML = `
                            <i class="fas fa-user-circle"></i>
                            <div class="message-bubble">
                                <strong>Anonim</strong>
                                <span>${message.text}</span>
                            </div>
                        `;
                        messagesList.appendChild(messageElement);
                    });
                }
                messagesList.scrollTop = messagesList.scrollHeight;
            });
        }
    } catch (e) {
        console.error("Error initializing Firebase. Please check your config.", e);
        const anonimCard = document.getElementById('open-anonim-modal');
        if(anonimCard) {
            anonimCard.style.opacity = '0.5';
            anonimCard.style.pointerEvents = 'none';
            anonimCard.querySelector('h3').textContent = 'Fitur Offline';
        }
    }
    
    // ==============================================
    //     BAGIAN 6: LOGIKA ANIMASI & RATING
    // ==============================================
    const ratingSlider = document.getElementById('ratingSlider');
    const ratingValue = document.getElementById('ratingValue');
    const ratingIcon = document.getElementById('ratingIcon');

    const updateRatingVisuals = (value) => {
        let iconClass = 'fas fa-star';
        let iconColor = '#f1c40f';

        if (value >= 9.5) {
            iconClass = 'fas fa-face-grin-hearts';
            iconColor = '#ff6b6b';
        } else if (value >= 8.0) {
            iconClass = 'fas fa-face-grin-stars';
            iconColor = '#1dd1a1';
        } else if (value >= 6.0) {
            iconClass = 'fas fa-face-smile';
            iconColor = '#feca57';
        } else if (value >= 4.0) {
            iconClass = 'fas fa-face-meh';
            iconColor = '#54a0ff';
        } else {
            iconClass = 'fas fa-face-frown';
            iconColor = '#576574';
        }
        
        ratingIcon.innerHTML = `<i class="${iconClass}"></i>`;
        ratingIcon.style.color = iconColor;
        ratingValue.textContent = value.toFixed(1);
    };

    if (ratingSlider && ratingValue && ratingIcon) {
        updateRatingVisuals(parseFloat(ratingSlider.value));

        ratingSlider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            updateRatingVisuals(value);
        });
    }

    // LOGIKA BARU UNTUK ANIMASI SCROLL
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15 // Muncul saat 15% elemen terlihat
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
