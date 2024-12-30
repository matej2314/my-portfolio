export const formatDataToBar = (data) => {
  
    const groupedData = {};

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const item = data[key];

            const rawDate = item.date;
            const formattedDate = `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}`;

            if (groupedData[formattedDate]) {
                groupedData[formattedDate] += 1;
            } else {
                groupedData[formattedDate] = 1;
            }
        }
    };

    return Object.entries(groupedData).map(([date, count]) => ({
        label: date,  
        value: count,
    }));
};
