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
    musicToggleButton.innerHTML = '&#9658;'; // Ikon Play

    // Saat tombol "Buka Undangan" di-klik
    openButton.addEventListener('click', function() {
        // 1. Tambahkan kelas 'open' ke sampul untuk memicu animasi CSS
        cover.classList.add('open');
        
        // 2. Tampilkan konten utama setelah animasi sampul selesai (sekitar 1 detik)
        setTimeout(() => {
            mainContent.classList.add('visible');
        }, 1000); // Samakan dengan durasi transisi di CSS

        // 3. Putar musik
        audio.play();
        isPlaying = true;
        musicToggleButton.classList.remove('paused');
        musicToggleButton.classList.add('playing');
        musicToggleButton.innerHTML = '&#10074;&#10074;'; // Ikon Pause
    });

    // Saat tombol kontrol musik di-klik
    musicToggleButton.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            musicToggleButton.classList.remove('playing');
            musicToggleButton.classList.add('paused');
            musicToggleButton.innerHTML = '&#9658;'; // Ikon Play
        } else {
            audio.play();
            musicToggleButton.classList.remove('paused');
            musicToggleButton.classList.add('playing');
            musicToggleButton.innerHTML = '&#10074;&#10074;'; // Ikon Pause
        }
        isPlaying = !isPlaying; // Balik status isPlaying
    });


    // --- 2. FITUR HITUNG MUNDUR (COUNTDOWN) ---
    
    // Tetapkan tanggal acara (Tahun, Bulan (dimulai dari 0), Tanggal, Jam, Menit, Detik)
    // Contoh: 26 Oktober 2025 jam 09:00:00
    const targetDate = new Date(2025, 9, 26, 9, 0, 0).getTime();

    // Perbarui hitungan setiap 1 detik
    const countdownInterval = setInterval(function() {
        
        // Dapatkan tanggal dan waktu hari ini
        const now = new Date().getTime();
        
        // Hitung selisih waktu
        const distance = targetDate - now;
        
        // Hitung hari, jam, menit, detik
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Tampilkan hasilnya di HTML
        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        
        // Jika waktu acara sudah tiba
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = "Acara Telah Dimulai!";
        }
    }, 1000);

});

// --- 3. FITUR SALIN TEKS (Copy to Clipboard) ---
// Fungsi ini harus diletakkan di luar 'DOMContentLoaded' agar bisa dipanggil dari atribut 'onclick'
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert('Nomor rekening berhasil disalin!');
    }, function(err) {
        alert('Gagal menyalin. Coba lagi.');
    });
}
