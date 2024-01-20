export default function formatDate(timeString) {
    let time;

    if (typeof timeString === 'object' && timeString.seconds !== undefined && timeString.nanoseconds !== undefined) {
        // Đối tượng Timestamp
        time = new Date(timeString.seconds * 1000 + timeString.nanoseconds / 1e6);
    } else if (typeof timeString === 'string') {
        // Chuỗi
        time = new Date(timeString);
    } else {
        // Trường hợp không xác định
        return 'Invalid time format';
    }

    const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };

    const vietnameseFormat = new Intl.DateTimeFormat('vi-VN', options).format(time);
    return vietnameseFormat;
}