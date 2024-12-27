export const getImageForScreen = (photo, isMobile, isTablet, isDesktop) => {
    
    if (isMobile || isTablet) {
        if (photo.includes('-640.png')) return photo;
        return photo.replace(/-960.png|-320.png/, '-640.png');
    } else if (isDesktop) {
        if (photo.includes('-960.png')) return photo;
        return photo.replace(/-320.png|-640.png/, '-960.png');
    }
    return photo;
};
