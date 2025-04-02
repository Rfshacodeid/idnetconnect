<?php
session_start();

$key = "Rafasha318Cyberxnc318"; // Ganti dengan kunci unik
$file = basename($_GET['file']);

if (!file_exists($file)) {
    http_response_code(403);
    die("Akses Ditolak!");
}

// Enkripsi isi file sebelum dikirim
$content = file_get_contents($file);
$encrypted_content = base64_encode(openssl_encrypt($content, "AES-256-CBC", $key, 0, "1234567890123456"));

header("Content-Type: text/plain");
echo $encrypted_content;
?>
