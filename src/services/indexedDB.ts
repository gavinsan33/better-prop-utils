import { openDB } from "idb";


export const dbPromise = openDB("sensorDB", 2, { // Increment version number
    upgrade(db) {
        // Create sensorData store if it doesn't exist
        if (!db.objectStoreNames.contains("sensorData")) {
            const store = db.createObjectStore("sensorData", { 
                keyPath: "id", 
                autoIncrement: true 
            });
            store.createIndex("sessionId", "sessionId");
        }
        
        // Create sessions store if it doesn't exist
        if (!db.objectStoreNames.contains("sessions")) {
            db.createObjectStore("sessions", { 
                keyPath: "id", 
                autoIncrement: true 
            });
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
    console.log(sessionId);
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

export const createNewSession = async () => {
    // Clear session storage to force new session creation
    sessionStorage.removeItem("sessionId");
    
    // Create a new session in the database
    const db = await dbPromise;
    const newSessionId = await db.add("sessions", { timestamp: Date.now() });
    
    // Store the new session ID in sessionStorage
    sessionStorage.setItem("sessionId", newSessionId.toString());
    
    return newSessionId;
};