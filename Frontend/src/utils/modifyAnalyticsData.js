export const mapData = (array, callback) => {
    if (!Array.isArray(array)) return [];

    return array.map(callback);
};

export const filterData = (array, callback) => {
    if (!Array.isArray(array)) return [];

    return array.filter(callback);
};

export const filterAndMap = (array, filterCallback, mapCallback) => {
    if (!Array.isArray(array)) return [];

    return array.filter(filterCallback).map(mapCallback);
};

export const countEvents = (array) => {
   return array.reduce((acc, item) => {
        if (item.eventName) {
            acc[item.eventName] = (acc[item.eventName] || 0) + 1;
        }
        return acc;
    }, {});
};