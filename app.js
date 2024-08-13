function startDownload() {
    const progress = document.getElementById('progress');
    const percentage = document.getElementById('percentage');
    const downloadedSize = document.getElementById('downloaded-size');
    const totalSize = document.getElementById('total-size');
    const installNotification = document.getElementById('install-notification');

    const url = 'https://game.ssgame.ir//data/package/android/cps001/ssgame_wgjx_cps001_34.apk';

    // دریافت حجم فایل
    fetch(url, { method: 'HEAD' }).then(response => {
        const totalFileSize = parseInt(response.headers.get('content-length'), 10) / 1024; // حجم فایل به کیلوبایت
        totalSize.innerText = `${Math.round(totalFileSize)}KB`;

        let progressValue = 0;

        // دانلود فایل
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';

        xhr.onprogress = (event) => {
            if (event.lengthComputable) {
                progressValue = event.loaded / 1024; // تبدیل به کیلوبایت
                const percent = (progressValue / totalFileSize) * 100;
                progress.style.width = `${percent}%`;
                percentage.innerText = `${Math.round(percent)}%`;
                downloadedSize.innerText = `${Math.round(progressValue)}KB`;

                if (progressValue >= totalFileSize) {
                    installNotification.style.display = 'block'; // نمایش نوتیفیکیشن
                }
            }
        };

        xhr.onloadend = () => {
            if (xhr.status === 200) {
                const blob = xhr.response;
                const downloadUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = 'ssgame_wgjx_cps001_34.apk'; // نام فایل دانلودی
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(downloadUrl);
            } else {
                alert('خطا در دانلود فایل!');
            }
        };

        xhr.send();
    }).catch(err => {
        console.error('خطا در دریافت حجم فایل:', err);
    });
}

function installApp() {
    alert('فایل APK دانلود شده است، لطفاً آن را از فایل منیجر نصب کنید.');
}
