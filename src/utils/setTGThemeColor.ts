let intervalID: number = -1

let start: number = 0

export function setTGThemeColor(){
    if('Telegram' in window){
        if(Telegram.WebApp.themeParams.secondary_bg_color) document.documentElement.style.setProperty("--bg-secondery", Telegram.WebApp.themeParams.secondary_bg_color);
        if(Telegram.WebApp.themeParams.bg_color) document.documentElement.style.setProperty("--bg-main", Telegram.WebApp.themeParams.bg_color);
        if(Telegram.WebApp.themeParams.text_color) document.documentElement.style.setProperty("--text-color", Telegram.WebApp.themeParams.text_color);
        if(Telegram.WebApp.themeParams.subtitle_text_color) document.documentElement.style.setProperty("--text-color-secondary", Telegram.WebApp.themeParams.subtitle_text_color);
        if(Telegram.WebApp.themeParams.accent_text_color) document.documentElement.style.setProperty("--text-accent-color", Telegram.WebApp.themeParams.accent_text_color);
        if(Telegram.WebApp.themeParams.destructive_text_color) document.documentElement.style.setProperty("--text-error-color", Telegram.WebApp.themeParams.destructive_text_color);
        if(Telegram.WebApp.themeParams.secondary_bg_color) document.documentElement.style.setProperty("--border-color", Telegram.WebApp.themeParams.secondary_bg_color);
        if(Telegram.WebApp.themeParams.header_bg_color) document.documentElement.style.setProperty("--bg-header", Telegram.WebApp.themeParams.header_bg_color);
        if(Telegram.WebApp.themeParams.subtitle_text_color) document.documentElement.style.setProperty("--text-color-secondary", Telegram.WebApp.themeParams.subtitle_text_color);
    } else if(intervalID === -1){
        start = Date.now()
        intervalID = window.setInterval(() => {
            if('Telegram' in window){
                window.clearInterval(intervalID)
                intervalID = -1
                setTGThemeColor()
            } else if(Date.now() - start > 5000){
                window.location.reload()
            }
        }, 100)
    }
}