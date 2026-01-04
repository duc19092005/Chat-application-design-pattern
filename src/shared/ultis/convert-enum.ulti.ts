export function convertEnumToArray<T>(enumObj: T): string[] {
    return Object.values(enumObj as string[]);
}