import { useState } from 'react'

const AuthForm = ({ type, onSubmit, isLoading }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setLocalError('')
    
    if (!username.trim()) {
      setLocalError('Username is required')
      return
    }
    
    if (!password.trim()) {
      setLocalError('Password is required')
      return
    }
    
    if (type === 'register' && password !== confirmPassword) {
      setLocalError('Passwords do not match')
      return
    }
    
    onSubmit(username, password)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {type === 'login' ? 'Welcome Back' : 'Create Account'}
      </h2>
      
      {localError && (
        <div className="mb-4 p-2 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
          {localError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter username"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter password"
          />
        </div>
        
        {type === 'register' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Confirm password"
            />
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Please wait...' : type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default AuthForm