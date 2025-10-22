export function getErrorMessage(err) {
    if (err.errors) {
        return Object.values(err.errors)[0].message;
    }

    return err.message;
}