export function convertEnumToArray<T>(enumObj: T): Object[] {
    return Object.values(enumObj as string[]);
}