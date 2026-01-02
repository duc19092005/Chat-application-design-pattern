export class userEntityValidate {
    public static validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public static validateUserName(username: string): boolean {
        return username.length >= 3 && username.length <= 30;
    }

    public static validatePassword(password: string): boolean {
        const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g
        return password.length >= 8 && password.length <= 100 && regex.test(password);
    }
}