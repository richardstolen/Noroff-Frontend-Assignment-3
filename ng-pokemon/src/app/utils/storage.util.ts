export class StorageUtil {
    public static storageSave<T>(key: string, value: T): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    
    public static storageRead<T>(key: string): T | undefined {
        const storedValue = sessionStorage.getItem(key);
    
        // Try/catch in case invalid JSON is received.
        try {
            // If the item exists...
            if (storedValue) {
                return JSON.parse(storedValue) as T;
            } // Else...
                return undefined;
    
        } catch (error) {
            sessionStorage.removeItem(key);
            return undefined;
        }
    }
}