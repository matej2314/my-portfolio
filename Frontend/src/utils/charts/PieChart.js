export const getSystemColor = (system) => {
    const colors = {
        Windows: "#4caf50",
        Android: "#ff9800",
        iOS: "#2196f3",
        Linux: "#f44336",
    };
    return colors[system] || "#9e9e9e"; // Domyślny kolor
};

export const getDeviceColor = (device) => {
    const colors = {
        desktop: '#73B8FD',
        mobile: '#EE8822',
    };

    return colors[device] || '#000';
};

export const preparePieChartData = (array, colors) => {
    return array.map(([label, value]) => ({
        label,
        value,
        color: colors(label),
    })); 
}
    
   

