import { openDB } from "idb";

export const dbPromise = openDB("sensorDB", 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains("sensorData")) {
            const store = db.createObjectStore("sensorData", { keyPath: "id", autoIncrement: true });
            store.createIndex("sessionId", "sessionId");
        }
        if (!db.objectStoreNames.contains("sessions")) {
            db.createObjectStore("sessions", { keyPath: "id", autoIncrement: true });
        }
    },
});

// Function to generate or retrieve the current session identifier
export const getSessionId = async () => {
    const db = await dbPromise;
    const sessionId = sessionStorage.getItem("sessionId");
    if (sessionId) {
        return sessionId;
    } else {
        const newSessionId = await db.add("sessions", { timestamp: Date.now() });
        sessionStorage.setItem("sessionId", newSessionId.toString());
        return newSessionId;
    }
};

export const saveSensorData = async (data: any) => {
    const db = await dbPromise;
    const sessionId = await getSessionId();
    await db.put("sensorData", { sessionId, timestamp: Date.now(), data });
};

export const getCurrentSessionData = async () => {
    const db = await dbPromise;
    const sessionId = await getSessionId();
    const tx = db.transaction("sensorData", "readonly");
    const store = tx.objectStore("sensorData");
    const index = store.index("sessionId");
    const data = await index.getAll(sessionId);
    await tx.done;
    return data;
};

export const clearCurrentSessionData = async () => {
    const db = await dbPromise;
    const sessionId = await getSessionId();
    const tx = db.transaction("sensorData", "readwrite");
    const store = tx.objectStore("sensorData");
    const index = store.index("sessionId");
    const data = await index.getAll(sessionId);
    data.forEach((d) => store.delete(d.id));
    await tx.done;
}

export const resetDB = async () => {
    const db = await dbPromise;
    await db.clear("sensorData");
    await db.clear("sessions");
    sessionStorage.removeItem("sessionId");
}