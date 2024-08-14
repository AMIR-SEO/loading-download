function startDownload() {
    const url = 'https://github.com/AMIR-SEO/loading-download/raw/main/ssgame_yxhz_riseofkingdoms_2_332.apk';  // آدرس دانلود فایل از گیت‌هاب
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';

    xhr.onprogress = function (event) {
        if (event.lengthComputable) {
            const downloaded = event.loaded;
            const total = event.total;
            const percentage = (downloaded / total) * 100;

            document.getElementById('progress').style.width = percentage + '%';
            document.getElementById('percentage').textContent = Math.round(percentage) + '%';
            document.getElementById('downloaded-size').textContent = (downloaded / 1024).toFixed(2) + 'KB';
            document.getElementById('total-size').textContent = (total / 1024).toFixed(2) + 'KB';
        }
    };

    xhr.onload = function () {
        if (xhr.status === 200) {
            const blob = xhr.response;
            const downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = 'ssgame_yxhz_riseofkingdoms_2_332.apk';
            downloadLink.click();

            document.getElementById('install-notification').style.display = 'block';
        } else {
            alert('مشکلی در دانلود به وجود آمد. لطفاً دوباره امتحان کنید.');
        }
    };

    xhr.onerror = function () {
        alert('مشکلی در دانلود به وجود آمد. لطفاً دوباره امتحان کنید.');
    };

    xhr.send();
}

function openDownloads() {
    alert('لطفاً به لیست دانلودهای مرورگر خود مراجعه کنید و فایل APK را نصب کنید.');
}
