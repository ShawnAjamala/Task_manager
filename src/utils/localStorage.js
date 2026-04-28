const USERS_KEY = 'task_manager_users'

export const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || '[]')

export const saveUser = (username, password) => {
  const users = getUsers()
  if (!users.find(u => u.username === username)) {
    users.push({ username, password })
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }
}

export const getUser = (username) => getUsers().find(u => u.username === username)