function tanyakanBermainRoblox() {
    let response = confirm("Apakah anda bermain Roblox?");
    
    if (response) {
        // Jika pengguna
        alert("Seru! Roblox memang menarik! Selamat datang!");
    } else {
        // Jika pengguna memilih "
        if (/Android/i.test(navigator.userAgent)) {
        // Jika perangkat adalah Android, alihkan ke Play Store
            window.location.href = "https://play.google.com/store/apps/details?id=com.roblox.client";
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            
            window.location.href = "https://apps.apple.com/us/app/roblox/id431946152";
        } else {
            window.location.href = "https://www.roblox.com/download";
        }
    }
}

document.getElementById("playButton").addEventListener("click", function() {
    window.location.href = "roblox://";
});

tanyakanBermainRoblox();
