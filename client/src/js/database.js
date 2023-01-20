import { openDB } from 'idb'

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists')
        return
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true })
      console.log('jate database created')
    },
  })

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const textDbData = await openDB('jate', 1)
  const transaction = textDbData.transaction('jate', 'readwrite')
  const store = transaction.objectStore('jate')
  const DBrequest = store.put({ id: 1, value: content })
  const result = await DBrequest
  console.log('PUT request to indexDb')
  console.log('Successfully saved data to the database', result.value)
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented')

initdb()
