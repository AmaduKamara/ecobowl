export const getColor = () => {
    return "hsl(" + 360 * Math.random() + ',' +
        (22.2 + 70 * Math.random()) + '%,' +
        (10 + 85 * Math.random()) + '%)'
}


export const Color = (len) => {
    const backgroundColor: Array<any> = [];

    for (let index = 0; index < len; index++) {
        backgroundColor.push(getColor());
    }

    return {
        backgroundColor
    }
};