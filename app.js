function startDownload() {
    const progress = document.getElementById('progress');
    const percentage = document.getElementById('percentage');
    const downloadedSize = document.getElementById('downloaded-size');
    const totalSize = document.getElementById('total-size');
    const installNotification = document.getElementById('install-notification');

    const url = 'https://game.ssgame.ir//data/package/android/cps001/ssgame_wgjx_cps001_34.apk';

    fetch(url, { method: 'HEAD' }).then(response => {
        // بررسی صحت پاسخ
        if (!response.ok) {
            showErrorPopup('مشکل در دریافت اطلاعات فایل. لطفاً مجدداً تلاش کنید.');
            return;
        }

        const totalFileSize = parseInt(response.headers.get('content-length'), 10) / 1024; // حجم فایل به کیلوبایت
        totalSize.innerText = `${Math.round(totalFileSize)}KB`;

        let progressValue = 0;

        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';

        xhr.onprogress = (event) => {
            if (event.lengthComputable) {
                progressValue = event.loaded / 1024;
                const percent = (progressValue / totalFileSize) * 100;
                progress.style.width = `${percent}%`;
                percentage.innerText = `${Math.round(percent)}%`;
                downloadedSize.innerText = `${Math.round(progressValue)}KB`;

                if (progressValue >= totalFileSize) {
                    installNotification.style.display = 'block';
                }
            }
        };

        xhr.onloadend = () => {
            if (xhr.status === 200) {
                const blob = xhr.response;
                const downloadUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = 'ssgame_wgjx_cps001_34.apk';
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(downloadUrl);
            } else {
                showErrorPopup('خطا در دانلود فایل. لطفاً مجدداً تلاش کنید.');
            }
        };

        xhr.onerror = () => {
            showErrorPopup('مشکلی در دانلود فایل به وجود آمده است. لطفاً اتصال اینترنت خود را بررسی کنید.');
        };

        xhr.send();
    }).catch(err => {
        console.error('خطا در دریافت اطلاعات فایل:', err);
        showErrorPopup('مشکل در دریافت اطلاعات فایل. لطفاً مجدداً تلاش کنید.');
    });
}

// تابع برای نمایش پاپ‌آپ خطا
function showErrorPopup(message) {
    alert(message);
}

function installApp() {
    alert('دانلود کامل شد. لطفاً به لیست دانلودهای مرورگر یا فایل منیجر مراجعه کرده و فایل APK را نصب کنید.');
}
