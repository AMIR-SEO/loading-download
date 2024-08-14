function startDownload() {
    const progress = document.getElementById('progress');
    const percentage = document.getElementById('percentage');
    const downloadedSize = document.getElementById('downloaded-size');
    const totalSize = document.getElementById('total-size');
    const installNotification = document.getElementById('install-notification');
    const timer = document.getElementById('timer');
    const loadingIcon = document.getElementById('loading-icon');

    const url = 'https://game.ssgame.ir//data/package/android/cps001/ssgame_wgjx_cps001_34.apk';

    fetch(url, { method: 'HEAD' })
    .then(response => {
        if (!response.ok) {
            showErrorPopup('مشکل در دریافت اطلاعات فایل. لطفاً مجدداً تلاش کنید.');
            return;
        }

        const totalFileSize = parseInt(response.headers.get('content-length'), 10) / 1024; // به کیلوبایت
        totalSize.innerText = `${Math.round(totalFileSize)}KB`;

        let progressValue = 0;
        let startTime = Date.now();
        
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

                // محاسبه زمان باقی‌مانده
                const elapsedTime = (Date.now() - startTime) / 1000; // زمان به ثانیه
                const downloadRate = progressValue / elapsedTime; // سرعت دانلود به کیلوبایت بر ثانیه
                const remainingTime = ((totalFileSize - progressValue) / downloadRate).toFixed(0);
                timer.innerText = `زمان باقی‌مانده: ${formatTime(remainingTime)}`;
            }
        };

        xhr.onloadend = () => {
            loadingIcon.style.display = 'none';
            if (xhr.status === 200) {
                const blob = xhr.response;
                const downloadUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = 'ssgame_wgjx_cps001_34.apk';
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(downloadUrl);
                installNotification.style.display = 'block';
            } else {
                showErrorPopup('خطا در دانلود فایل. لطفاً مجدداً تلاش کنید.');
            }
        };

        xhr.onerror = () => {
            loadingIcon.style.display = 'none';
            showErrorPopup('مشکلی در دانلود فایل به وجود آمده است. لطفاً اتصال اینترنت خود را بررسی کنید.');
        };

        xhr.send();
        loadingIcon.style.display = 'block';
    })
    .catch(err => {
        showErrorPopup('مشکل در دریافت اطلاعات فایل. لطفاً مجدداً تلاش کنید.');
    });
}

function showErrorPopup(message) {
    alert(message);
}

function installApp() {
    alert('دانلود کامل شد. لطفاً به لیست دانلودهای مرورگر یا فایل منیجر مراجعه کرده و فایل APK را نصب کنید.');
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes} دقیقه و ${remainingSeconds} ثانیه`;
}
