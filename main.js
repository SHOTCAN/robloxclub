// Fungsi untuk menanyakan apakah pengguna bermain Roblox
function tanyakanBermainRoblox() {
    let response = confirm("Apakah anda bermain Roblox?");
    
    if (response) {
        // Jika pengguna memilih "Ya", lanjutkan akses ke website
        alert("Seru! Roblox memang menarik! Selamat datang!");
    } else {
        // Jika pengguna memilih "Tidak", alihkan ke halaman unduhan Roblox
        if (/Android/i.test(navigator.userAgent)) {
            // Jika perangkat adalah Android, alihkan ke Play Store
            window.location.href = "https://play.google.com/store/apps/details?id=com.roblox.client";
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            // Jika perangkat adalah iOS, alihkan ke App Store
            window.location.href = "https://apps.apple.com/us/app/roblox/id431946152";
        } else {
            // Jika perangkat adalah desktop atau lain-lain, alihkan ke halaman unduhan Roblox desktop
            window.location.href = "https://www.roblox.com/download";
        }
    }
}

// Panggil fungsi ini saat halaman dimuat
tanyakanBermainRoblox();
