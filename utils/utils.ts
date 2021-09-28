export const isValidEmail = (email:string) => {
    const regExpEmail = /.+\@.+\..+/;
    return regExpEmail.test(email);
}

export const isWeakPassword = (password:string) => (password.length <=3)