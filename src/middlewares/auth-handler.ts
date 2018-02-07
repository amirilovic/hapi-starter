export const authHandler = (decoded, request, callback) => {
    // do your checks to see if the person is valid
    if (decoded.id === 1) {
        return callback(null, true);
    } else {
        return callback(null, false);
    }
};
