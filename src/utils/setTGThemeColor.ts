export function setTGThemeColor(){
    if('Telegram' in window){
        if(Telegram.WebApp.themeParams.secondary_bg_color) document.documentElement.style.setProperty("--bg-secondery", Telegram.WebApp.themeParams.secondary_bg_color);
        if(Telegram.WebApp.themeParams.bg_color) document.documentElement.style.setProperty("--bg-main", Telegram.WebApp.themeParams.bg_color);
        if(Telegram.WebApp.themeParams.text_color) document.documentElement.style.setProperty("--text-color", Telegram.WebApp.themeParams.text_color);
        if(Telegram.WebApp.themeParams.accent_text_color) document.documentElement.style.setProperty("--text-accent-color", Telegram.WebApp.themeParams.accent_text_color);
        if(Telegram.WebApp.themeParams.destructive_text_color) document.documentElement.style.setProperty("--text-error-color", Telegram.WebApp.themeParams.destructive_text_color);
        if(Telegram.WebApp.themeParams.secondary_bg_color) document.documentElement.style.setProperty("--border-color", Telegram.WebApp.themeParams.secondary_bg_color);
        if(Telegram.WebApp.themeParams.header_bg_color) document.documentElement.style.setProperty("--bg-header", Telegram.WebApp.themeParams.header_bg_color);
        if(Telegram.WebApp.themeParams.subtitle_text_color) document.documentElement.style.setProperty("--text-color-secondary", Telegram.WebApp.themeParams.subtitle_text_color);
    }
}