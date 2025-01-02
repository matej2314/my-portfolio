export const handleToastAndClose = (error, result, onClose, toast) => {
    if (result || error) {
        const message = result?.message || error;
        const type = result ? "info" : "error";

        toast[type](message);

        const timer = setTimeout(() => {
            onClose();
        }, 1500);

        return () => clearTimeout(timer);
    }
};
