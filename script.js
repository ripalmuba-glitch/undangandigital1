/*
=========================================
--- SCRIPT UNDANGAN DIGITAL ---
=========================================
*/

// Menunggu seluruh konten HTML dimuat sebelum menjalankan script
document.addEventListener("DOMContentLoaded", function() {

    // --- 1. FITUR BUKA SAMPUL & MUSIK ---
    const cover = document.getElementById('cover');
    const mainContent = document.getElementById('main-content');
    const openButton = document.getElementById('open-invitation');
    const audio = document.getElementById('background-music');
    const musicToggleButton = document.getElementById('music-toggle');
    
    // Set status awal musik (paused)
    let isPlaying = false;
    musicToggleButton.classList.add('paused');
    musicToggleButton.innerHTML = '►'; // Ikon Play

    // Saat tombol "Buka Undangan" di-klik
    openButton.addEventListener('click', function() {
        // 1. Tambahkan kelas 'open' ke sampul untuk memicu animasi CSS
        cover.classList.add('open');
        
        // 2. Tampilkan konten utama setelah animasi sampul selesai (sekitar 1 detik)
        setTimeout(() => {
            mainContent.classList.add('visible');
        }, 1000); // Samakan dengan durasi transisi di CSS

        // 3. Putar musik
        // Kita gunakan .play() dan tangani error jika browser memblokir autoplay
        audio.play().catch(error => {
            console.log("Autoplay musik diblokir oleh browser. Menunggu interaksi user.");
        });
        
        isPlaying = true;
        musicToggleButton.classList.remove('paused');
        musicToggleButton.classList.add('playing');
        musicToggleButton.innerHTML = '❚❚'; // Ikon Pause
    });

    // Saat tombol kontrol musik di-klik
    musicToggleButton.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            musicToggleButton.classList.remove('playing');
            musicToggleButton.classList.add('paused');
            musicToggleButton.innerHTML = '►'; // Ikon Play
        } else {
            audio.play();
            musicToggleButton.classList.remove('paused');
            musicToggleButton.classList.add('playing');
            musicToggleButton.innerHTML = '❚❚'; // Ikon Pause
        }
        isPlaying = !isPlaying; // Balik status isPlaying
    });


    // --- 2. FITUR HITUNG MUNDUR (COUNTDOWN) ---
    
    // PENTING: Ganti tanggal ini ke tanggal acara Anda!
    // Format: Tahun, Bulan (0-11), Tanggal, Jam, Menit, Detik
    // Contoh: 26 Oktober 2025 jam 09:00:00 (Oktober adalah bulan ke-9)
    const targetDate = new Date(2025, 9, 26, 9, 0, 0).getTime();

    // Perbarui hitungan setiap 1 detik
    const countdownInterval = setInterval(function() {
        
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        // Hitung hari, jam, menit, detik
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Tampilkan hasilnya di HTML
        // Cek dulu apakah elemennya ada sebelum diisi
        if (document.getElementById('days')) {
            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        }
        
        // Jika waktu acara sudah tiba
        if (distance < 0) {
            clearInterval(countdownInterval);
            if(document.getElementById('countdown')) {
                document.getElementById('countdown').innerHTML = "Acara Telah Dimulai!";
            }
        }
    }, 1000);


    // --- 3. FITUR FORMULIR RSVP (Google Sheets) ---
    const rsvpForm = document.getElementById('rsvp-form');
    
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            // Mencegah formulir mengirim data secara default
            e.preventDefault(); 
    
            // PENTING: Ganti URL ini dengan URL Web App Anda dari Google Apps Script
            const scriptURL = 'https://script.google.com/macros/s/xxxxxxxxx/exec';
    
            const submitButton = rsvpForm.querySelector('button[type="submit"]');
            
            // Nonaktifkan tombol saat mengirim
            submitButton.disabled = true;
            submitButton.innerText = 'Mengirim...';
    
            const formData = new FormData(rsvpForm);
    
            // Kirim data menggunakan 'fetch'
            fetch(scriptURL, { 
                method: 'POST', 
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.result === 'success') {
                    alert('Terima kasih! Konfirmasi & ucapan Anda telah terkirim.');
                    rsvpForm.reset(); // Kosongkan formulir
                } else {
                    // Jika skrip Google mengembalikan error
                    throw new Error(data.message || 'Gagal mengirim data.');
                }
            })
            .catch(error => {
                // Jika terjadi error jaringan atau lainnya
                console.error('Error!', error.message);
                alert('Maaf, terjadi kesalahan. Silakan coba lagi.');
            })
            .finally(() => {
                // Apapun hasilnya (sukses/gagal), aktifkan kembali tombolnya
                submitButton.disabled = false;
                submitButton.innerText = 'Kirim';
            });
        });
    }

}); // Penutup untuk 'DOMContentLoaded'


// --- 4. FITUR SALIN TEKS (Copy to Clipboard) ---
// Fungsi ini harus diletakkan di luar 'DOMContentLoaded' 
// agar bisa dipanggil dari atribut 'onclick' di HTML
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert('Nomor rekening berhasil disalin!');
    }, function(err) {
        alert('Gagal menyalin. Coba lagi.');
    });
}
