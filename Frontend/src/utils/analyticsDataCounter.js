export const dataCounter = (array) => {
    return Array.isArray(array)
        ? array.reduce((acc, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {})
        : {};
};