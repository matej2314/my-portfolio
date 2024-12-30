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
}