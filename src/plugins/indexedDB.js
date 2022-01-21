const INDEX_DB_NAME = 'smart_pos'
const INDEXED_DB_VERSION = 1
const COLLECTION_NAME = 'smart_pos_collection'

const idb = {

  db: null,

  async init () {
    this.db = await new Promise((resolve, reject) => {
      const request = window.indexedDB.open(INDEX_DB_NAME, INDEXED_DB_VERSION)

      request.onerror = e => {
        console.error('Error opening db', e)
        reject(new Error('Error opening db', e))
      }

      request.onsuccess = e => {
        resolve(e.target.result)
      }

      // Incase the table structure changes
      // Increment the Db version number and re-run all createObjectStore(s)
      request.onupgradeneeded = e => {
        const db = e.target.result
        // Technically these are your tables (collections)
        // Add more tables here
        const objectStore = db.createObjectStore(COLLECTION_NAME, { autoIncrement: true, keyPath: 'data_key' })
        objectStore.createIndex('data_key', 'data_key', { unique: true })
      }
    })
  },

  collection (dataKeyPath, db = this.db) {
    return {
      add: (DATA) => {
        return new Promise((resolve, reject) => {
          if (!DATA || !dataKeyPath) reject(new Error('null data passed or invalid collection key'))
          const trans = db.transaction([COLLECTION_NAME], 'readwrite')

          const store = trans.objectStore(COLLECTION_NAME)
          const idbDATA = {
            ...DATA,
            data_key: dataKeyPath
          }

          store.add(idbDATA)

          trans.oncomplete = e => {
            resolve(idbDATA)
          }

          trans.onerror = e => {
            reject(new Error('Sorry, data key already exists. Please run update instead'))
          }
        })
      },
      get: () => {
        return new Promise((resolve, reject) => {
          const trans = this.db.transaction([COLLECTION_NAME], 'readonly')
          const objectStore = trans.objectStore(COLLECTION_NAME)
          let document = null
          const PATH = dataKeyPath

          const index = objectStore.index('data_key')

          index.openCursor().onerror = function (e) {
            reject(new Error(e))
          }

          index.openCursor().onsuccess = function (event) {
            var cursor = event.target.result
            if (cursor) {
              if (cursor.value.data_key === PATH) {
                document = cursor.value
              }
              cursor.continue()
            }
          }

          trans.oncomplete = () => {
            if (document) {
              resolve(document)
            } else {
              reject(new Error('Sorry, object not found'))
            }
          }
        })
      },
      docs: () => {
        return new Promise((resolve, reject) => {
          const trans = this.db.transaction([COLLECTION_NAME], 'readonly')

          const store = trans.objectStore(COLLECTION_NAME)
          const docs = []

          store.openCursor().onsuccess = e => {
            const cursor = e.target.result
            if (cursor) {
              docs.push(cursor.value)
              cursor.continue()
            }
          }

          trans.onerror = e => {
            reject(new Error(e))
          }

          trans.oncomplete = e => {
            resolve(docs)
          }
        })
      },
      update: (DATA) => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction([COLLECTION_NAME], 'readwrite')
          const PATH = dataKeyPath

          transaction.onerror = function (e) {
            reject(new Error(e))
          }
          const objectStore = transaction.objectStore(COLLECTION_NAME)

          objectStore.onerror = function (e) {
            reject(new Error(e))
          }

          objectStore.openCursor().onsuccess = function (event) {
            const cursor = event.target.result
            if (cursor) {
              if (cursor.value.data_key === PATH) {
                const request = cursor.update(
                  { ...DATA, data_key: dataKeyPath }
                )
                request.onsuccess = function () {
                  resolve(DATA)
                }

                request.onerror = function (e) {
                  reject(new Error(e))
                }
              }
              cursor.continue()
            }
          }
        })
      },
      delete: () => {
        return new Promise((resolve, reject) => {
          if (!dataKeyPath) reject(new Error('please provide a collection key'))
          const transaction = this.db.transaction([COLLECTION_NAME], 'readwrite')
          const objectStore = transaction.objectStore(COLLECTION_NAME)
          const PATH = dataKeyPath

          var objectStoreRequest = objectStore.delete(PATH)
          objectStoreRequest.onsuccess = function (event) {
            resolve('Sucess')
          }

          objectStoreRequest.onerror = function (e) {
            reject(new Error(e))
          }
        })
      },
      dropCollections: (collections) => {
        // eslint-disable-next-line prefer-promise-reject-errors
        if (!(collections instanceof Array)) return Promise.reject('Please provide an array')
        collections.forEach(col => {
          dropCollection(col)
        })

        const dropCollection = (col) => {
          this.collection(col).delete()
        }
      }
    }
  }

}

export default idb
