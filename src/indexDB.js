// client side Database for storing cocktails
let db;

// check if the browser supports persisting data
if (navigator.storage && navigator.storage.persist) {
  navigator.storage.persist().then((persistent) => {
    if (persistent) {
      console.log("Storage will not be cleared except by explicit user action");
    } else {
      console.log("Storage may be cleared by the UA under storage pressure.");
    }
  });
}
let dbPromise = new Promise((resolve, reject) => {
  // request indexDB for storing cocktails locally
  const request = window.indexedDB.open("cocktails", 1);

  // check if the indexDB is already open
  request.onerror = function(event) {
    console.error(`Database error: ${event.target.errorCode}`);
    reject(event.target.errorCode);
  };

  request.onsuccess = function(event) {
    console.log("indexDB opened successfully");
    db = event.target.result;
    resolve(db);
  };

  // This event is only implemented in recent browsers
  request.onupgradeneeded = (event) => {
    // Save the IDBDatabase interface
    const db = event.target.result;

    // Create an objectStore for this database
    const objectStore = db.createObjectStore("cocktails", { keyPath: "myKey" });
  };
});

// add a cocktail to the indexDB
function add(cocktail) {
  return dbPromise.then(() => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["cocktails"], "readwrite");
      const objectStore = transaction.objectStore("cocktails");
      const request = objectStore.add(cocktail);
      request.onsuccess = () => {
        console.log("cocktail added in indexDB");
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  });
}

// delete a cocktail from the indexDB
function remove(key) {
  return dbPromise.then(() => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["cocktails"], "readwrite");
      const objectStore = transaction.objectStore("cocktails");
      const request = objectStore.delete(key);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  });
}

// edit a cocktail in the indexDB
function editCocktail(cocktail) {
  return dbPromise.then(() => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["cocktails"], "readwrite");
      const objectStore = transaction.objectStore("cocktails");
      const request = objectStore.put(cocktail);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  });
}

// get all cocktails from the indexDB
function getAll() {
  return dbPromise.then(() => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["cocktails"], "readonly");
      const objectStore = transaction.objectStore("cocktails");
      const request = objectStore.getAll();
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  });
}

// get a cocktail from the indexDB
function get(key) {
  return dbPromise.then(() => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["cocktails"], "readonly");
      const objectStore = transaction.objectStore("cocktails");
      const request = objectStore.get(key);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  });
}

export { add, remove, editCocktail, getAll, get };