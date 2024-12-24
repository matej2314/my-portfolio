export const getImageForScreen = (photo, isMobile, isTablet, isDesktop) => {
    // if (isMobile) {
    //     // Dla małych ekranów, wybieramy wersję -320.png
    //     if (photo.includes('-320.png')) return photo;
    //     return photo.replace(/-960.png|-640.png/, '-320.png');
    // } else if (isTablet) {
    //     // Dla tabletów, wybieramy wersję -640.png
    //     if (photo.includes('-640.png')) return photo;
    //     return photo.replace(/-960.png|-320.png/, '-640.png');
    // } else if (isDesktop) {
    //     // Dla desktopów, wybieramy wersję -960.png
    //     if (photo.includes('-960.png')) return photo;
    //     return photo.replace(/-320.png|-640.png/, '-960.png');
    // }
    // return photo;

    if (isMobile || isTablet) {
        if (photo.includes('-640.png')) return photo;
        return photo.replace(/-960.png|-320.png/, '-640.png');
    } else if (isDesktop) {
        if (photo.includes('-960.png')) return photo;
        return photo.replace(/-320.png|-640.png/, '-960.png');
    }
    return photo;
};
