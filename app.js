function startDownload() {
    const progress = document.getElementById('progress');
    const percentage = document.getElementById('percentage');
    const downloadedSize = document.getElementById('downloaded-size');
    const totalSize = document.getElementById('total-size');
    const installNotification = document.getElementById('install-notification');

    let progressValue = 0;
    const totalFileSize = 50000; // حجم کل فایل (به کیلوبایت)
    const interval = setInterval(() => {
        if (progressValue >= totalFileSize) {
            clearInterval(interval);
            progress.style.width = '100%';
            percentage.innerText = '100%';
            downloadedSize.innerText = `${totalFileSize}KB`;
            installNotification.style.display = 'block'; // نمایش نوتیفیکیشن
        } else {
            progressValue += 500; // مقدار پیشرفت دانلود
            const percent = (progressValue / totalFileSize) * 100;
            progress.style.width = `${percent}%`;
            percentage.innerText = `${Math.round(percent)}%`;
            downloadedSize.innerText = `${progressValue}KB`;
        }
    }, 100); // به میلی‌ثانیه

}

function installApp() {
    alert('برنامه در حال نصب است!');
    // اینجا می‌توانید کد نصب واقعی اپلیکیشن خود را اضافه کنید
}
