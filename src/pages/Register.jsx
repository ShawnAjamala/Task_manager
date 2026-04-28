 import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (username, password) => {
    setIsLoading(true)
    setError('')
    
    try {
      await register(username, password)
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <AuthForm type="register" onSubmit={handleRegister} isLoading={isLoading} />
        
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register