import { getImageForScreen } from "./getImageForScreen";
import { imgUrl } from "../url";

// export const mapPhotos = (photos, id, isMobile, isTablet, isDesktop) => {
//     return photos
//         .filter((photo) => {
//             if (isMobile || isTablet) {
//                 return photo.includes('-640.png');
//             }
//             if (isDesktop) {
//                 return photo.includes('-960.png');
//             }
//             return false;
//         })
//         .map((photo) => {
//             const baseName = photo.split('-')[0];
//             const src = getImageForScreen(
//                 `${imgUrl}/${id}/gallery/${photo}`,
//                 isMobile,
//                 isTablet,
//                 isDesktop
//             );
//             return {
//                 src,
//                 srcSet: `
//                     ${imgUrl}/${id}/gallery/${baseName}-320.png 320w,
//                     ${imgUrl}/${id}/gallery/${baseName}-640.png 640w,
//                     ${imgUrl}/${id}/gallery/${baseName}-960.png 960w
//                 `,
//             };
//         });
// };

export const mapPhotos = (photos, id, isMobile, isTablet, isDesktop) => {
    return photos
        .filter((photo) => {
            if (isMobile || isTablet) {
                return photo.includes('-640.png');
            }
            if (isDesktop) {
                return photo.includes('-960.png');
            }
            return false;
        })
        .map((photo) => {
            const baseName = photo.split('-')[0];
            return {
                src: `${imgUrl}/${id}/gallery/${photo}`,
                srcSet: `
                    ${imgUrl}/${id}/gallery/${baseName}-320.png 320w,
                    ${imgUrl}/${id}/gallery/${baseName}-640.png 640w,
                    ${imgUrl}/${id}/gallery/${baseName}-960.png 960w
                `,
            };
        });
};

