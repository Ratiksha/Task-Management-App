export const getList = () => {
    const localStorageData = localStorage.getItem('lists');
    return JSON.parse(localStorageData);
}

export const getThemeColor = () => {
    const themeColor = localStorage.getItem('themeColor');
    return JSON.parse(themeColor);
}
