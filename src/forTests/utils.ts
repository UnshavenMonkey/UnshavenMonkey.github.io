
export function forEach(items: any[], callback: any) {
    for (const item of items) {
        callback(item);
    }
}