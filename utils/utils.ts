export const isValidEmail = (email: string) => {
    const regExpEmail = /.+\@.+\..+/;
    return regExpEmail.test(email);
}

export const isWeakPassword = (password: string) => (password.length <= 3)

export const validateParams = (params: any) => {
    if (!isNaN(params)) {
        return { id: params }
    } else if (isValidEmail(params)) {
        return { email: params }
    } else {
        return false
    }
}