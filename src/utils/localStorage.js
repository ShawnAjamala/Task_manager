const USERS_KEY = 'task_manager_users'

export const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : []
}

export const saveUser = (username, password) => {
  const users = getUsers()
  if (!users.find(u => u.username === username)) {
    users.push({ username, password })
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }
}

export const getUser = (username) => {
  const users = getUsers()
  return users.find(u => u.username === username)
}