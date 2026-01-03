interface IUserRepository {
    findUserById(userId: string): Promise<string | null>;
}