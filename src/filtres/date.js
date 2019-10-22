export default (value) => {
const date = new Date (value)
    return date.toLocaleString(['ru-RU'],{month:'long',day: '2-digit',year:'numeric'})
}
