import listsData from '../mockData/lists.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Local storage key
const STORAGE_KEY = 'taskflow_lists'

// Get lists from localStorage or use mock data
const getLists = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : [...listsData]
}

// Save lists to localStorage
const saveLists = (lists) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists))
}

const listService = {
  async getAll() {
    await delay(250)
    return getLists()
  },

  async getById(id) {
    await delay(200)
    const lists = getLists()
    const list = lists.find(l => l.id === id)
    if (!list) {
      throw new Error('List not found')
    }
    return { ...list }
  },

  async create(listData) {
    await delay(350)
    const lists = getLists()
    const newList = {
      id: Date.now().toString(),
      ...listData,
      createdAt: new Date().toISOString()
    }
    lists.push(newList)
    saveLists(lists)
    return { ...newList }
  },

  async update(id, updates) {
    await delay(300)
    const lists = getLists()
    const index = lists.findIndex(l => l.id === id)
    if (index === -1) {
      throw new Error('List not found')
    }
    
    const updatedList = {
      ...lists[index],
      ...updates
    }
    lists[index] = updatedList
    saveLists(lists)
    return { ...updatedList }
  },

  async delete(id) {
    await delay(250)
    const lists = getLists()
    const filteredLists = lists.filter(l => l.id !== id)
    if (filteredLists.length === lists.length) {
      throw new Error('List not found')
    }
    saveLists(filteredLists)
    return { success: true }
  }
}

export default listService