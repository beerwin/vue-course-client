const compareStrings = (a, b) => {
    const first = a.toLowerCase();
    const second = b.toLowerCase();

    if (first === second) {
        return 0;
    }

    return a < b ? -1 : 1;
}

export { compareStrings };