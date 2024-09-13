export const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
})