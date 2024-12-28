export const getImageForScreen = (photo, isMobile, isTablet, isDesktop) => {
    if (!photo) return '';
    if (isMobile || isTablet) {
        return photo.includes('-640.png') ? photo : photo.replace(/-960.png|-320.png/, '-640.png');
    }
    if (isDesktop) {
        return photo.includes('-960.png') ? photo : photo.replace(/-320.png|-640.png/, '-960.png');
    }
    return photo;
};
