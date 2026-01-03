import { LoginUseCase } from "./use-cases/auth/login.use-case";

const loginUseCase = new LoginUseCase();

// Ví dụ sử dụng use case để đăng nhập

export const loginService = async (username: string, password: string) => {
    try {
        loginUseCase.execute(username, password)
    } catch (error) {
        console.error("Error during login:", error);
    }
}