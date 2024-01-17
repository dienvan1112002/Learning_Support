export default function formatDate(date) {
    let time = new Date(date);
    if (time) return time.getDate() + " tháng " + (parseInt(time.getMonth()) + 1) + " " + time.getFullYear() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
}