import { openDB } from 'idb'

const startIndexDb = async () =>
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

// method that accepts some text content and adds it to the database
export const putDb = async (content) => {
  const textDbData = await openDB('jate', 1)
  const transaction = textDbData.transaction('jate', 'readwrite')
  const store = transaction.objectStore('jate')
  const DBrequest = store.put({ id: 1, value: content })
  const result = await DBrequest
  console.log('PUT request to indexDB')
  result
    ? console.log('Successfully saved data to the database', result.value)
    : console.log('Failed: Data was not added to indexDB')
}

// method that gets all the content from the database
export const getDb = async () => {
  const textDbData = await openDB('jate', 1)
  const transaction = textDbData.transaction('jate', 'readonly')
  const store = transaction.objectStore('jate')
  const DBrequest = store.get(1)
  const result = await DBrequest
  console.log('Fetching ALL data from the database')
  result
    ? console.log(
        'Successfully fetched all data from the indexDB',
        result.value
      )
    : console.log('Failed: Data was not found in the indexDB')
  return result?.value
}

startIndexDb()
