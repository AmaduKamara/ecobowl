export const phoneRegExp = /^[1-9]{2}[0-9]{6}$/;
export const PC = 1024;
export const PT = 1240;
export const size = (width) => {
    return width > 1024 && PT < width ? "30%" : width >= 768 ? "50%" : "100%";
}
export const PAGE_SIZE =  8;