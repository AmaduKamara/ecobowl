import { useRouter } from "next/router";

export const usePageTitle = () => {
    const route = useRouter();
    let path = "";

    path = route.pathname;

    const name = path.replace('/', '')

    const split = name.split('-')

    let title = "Dashboard";

    if (split.length > 1) {
        const first1 = split[0].substring(0, 1);
        const remains1 = split[0].substring(1, name.length);

        const first2 = split[1].substring(0, 1);
        const remains2 = split[1].substring(1, name.length);

        title = `${first1.toUpperCase()}${remains1} ${first2.toUpperCase()}${remains2}`;
    }

    if (split.length === 1) {
        const firstLetter = name.substring(0, 1);
        const remains = name.substring(1, name.length);

        title = `${firstLetter.toUpperCase()}${remains}`;
    }

    return { title: title.replace('/new', ''), path };
}