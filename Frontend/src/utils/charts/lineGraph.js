export const formatDataToBar = (data) => {
    // Zmienna do przechowywania zgrupowanych danych
    const groupedData = {};

    // Iterujemy przez klucze obiektu `data`
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const item = data[key]; // Pobieramy wartość z obiektu

            const rawDate = item.date;
            const formattedDate = `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}`;

            // Zliczanie zdarzeń dla tej daty
            if (groupedData[formattedDate]) {
                groupedData[formattedDate] += 1;
            } else {
                groupedData[formattedDate] = 1;
            }
        }
    };

    // Konwersja obiektu `groupedData` na tablicę obiektów w formacie oczekiwanym przez BarChart
    return Object.entries(groupedData).map(([date, count]) => ({
        label: date,  // Format daty jako string (np. "2024-12-28")
        value: count, // Liczba zdarzeń
    }));
};
