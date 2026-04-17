// modules/Database.js
export default class Database {
    constructor(dbName = 'UltimateNotesDB', storeName = 'notes') {
        this.dbName = dbName;
        this.storeName = storeName;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id' });
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject('IndexedDB failed to open');
        });
    }

    async save(id, data) {
        const db = await this.init();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put({ id, data });

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject('Failed to save data');
        });
    }

    async load(id) {
        const db = await this.init();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result ? request.result.data : null);
            request.onerror = () => reject('Failed to load data');
        });
    }
}
