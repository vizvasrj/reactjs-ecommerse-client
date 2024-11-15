const dateOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'UTC',
    weekday: 'long', // Use the literal type 'long' instead of the string 'long'
    year: 'numeric',
    month: 'short',
    day: 'numeric'
};

const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric'
};

export const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('en-US', dateOptions);
};

export const formatTime = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleTimeString(undefined, timeOptions);
};