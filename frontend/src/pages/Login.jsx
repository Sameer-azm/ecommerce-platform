import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'sonner'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'

const Login = () => {

  const [currentState, setCurrentState] = useState('Sign up')

  const { token, setToken, navigate, backendUrl } =
    useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      // =========================
      // SIGN UP
      // =========================

      if (currentState === 'Sign up') {

        const response = await axios.post(
          backendUrl + '/api/user/register',
          {
            name,
            email,
            password
          }
        )

        if (response.data.success) {

          setToken(response.data.token)

          localStorage.setItem(
            'token',
            response.data.token
          )

          toast.success('User Registered Successfully')

        } else {

          toast.error(response.data.message)

        }

      }

      // =========================
      // LOGIN
      // =========================

      else {

        const response = await axios.post(
          backendUrl + '/api/user/login',
          {
            email,
            password
          }
        )

        if (response.data.success) {

          setToken(response.data.token)

          localStorage.setItem(
            'token',
            response.data.token
          )

          toast.success('User Logged In Successfully')

        } else {

          toast.error(response.data.message)

        }

      }

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        'Something went wrong'
      )

    } finally {

      setLoading(false)

    }
  }


  // Redirect after successful login/signup
  useEffect(() => {

    if (token) {
      navigate('/')
    }

  }, [token, navigate])


  return (

    <div className="min-h-screen flex items-center justify-center px-4 ">

      <form
        onSubmit={onSubmitHandler}
        className="
          w-full
          max-w-md
          flex
          flex-col
          gap-4
          bg-black
          p-8
          sm:p-10
          border rounded-2xl
        "
      >

        {/* TITLE */}

        <div className="text-center mb-3">

          <p className="
            font-cormorant-garamond
            text-3xl
            font-semibold
            text-white
          ">
            {currentState}
          </p>

        </div>


        {/* NAME */}

        {currentState === 'Sign up' && (

          <div className="relative w-full">

            <User
              className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                w-4
                h-4
                text-gray-500
              "
            />

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="
                bg-white/10
                border
                border-white/20
                text-white
                placeholder-gray-400
                outline-none
                pl-10
                pr-3.5
                py-2.5
                w-full
                focus:border-amber-500
              "
            />

          </div>

        )}


        {/* EMAIL */}

        <div className="relative w-full">

          <Mail
            className="
              absolute
              left-3.5
              top-1/2
              -translate-y-1/2
              w-4
              h-4
              text-gray-500
            "
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              bg-white/10
              border
              border-white/20
              text-white
              placeholder-gray-400
              outline-none
              pl-10
              pr-3.5
              py-2.5
              w-full
              focus:border-amber-500
            "
          />

        </div>


        {/* PASSWORD */}

        <div className="relative w-full">

          <Lock
            className="
              absolute
              left-3.5
              top-1/2
              -translate-y-1/2
              w-4
              h-4
              text-gray-500
            "
          />

          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              bg-white/10
              border
              border-white/20
              text-white
              placeholder-gray-400
              outline-none
              pl-10
              pr-10
              py-2.5
              w-full
              focus:border-amber-500
            "
          />


          {/* SHOW PASSWORD */}

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="
              absolute
              right-3.5
              top-1/2
              -translate-y-1/2
              text-gray-500
              hover:text-gray-300
            "
          >

            {showPassword
              ? <EyeOff className="w-4 h-4" />
              : <Eye className="w-4 h-4" />
            }

          </button>

        </div>


        {/* FORGOT + SWITCH LOGIN/SIGNUP */}

        <div
          className="
            w-full
            flex
            items-center
            justify-between
            text-xs
            text-white
            mt-1
          "
        >

          <p
            className="
              cursor-pointer
              hover:text-amber-500
            "
          >
            Forgot Password?
          </p>


          {currentState === 'Sign up' ? (

            <p>

              Already have an account?

              <span
                onClick={() => setCurrentState('Login')}
                className="
                  ml-1
                  text-amber-500
                  cursor-pointer
                  hover:underline
                "
              >
                Login
              </span>

            </p>

          ) : (

            <p>

              Don't have an account?

              <span
                onClick={() => setCurrentState('Sign up')}
                className="
                  ml-1
                  text-amber-500
                  cursor-pointer
                  hover:underline
                "
              >
                Sign up
              </span>

            </p>

          )}

        </div>


        {/* SUBMIT BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="
            bg-amber-500
            hover:bg-amber-400
            disabled:opacity-60
            text-gray-900
            font-medium
            px-6
            py-2.5
            rounded-full
            mt-4
            w-full
            transition-all
          "
        >

          {loading
            ? 'Please wait...'
            : currentState === 'Login'
              ? 'Login'
              : 'Sign up'
          }

        </button>

      </form>

    </div>

  )
}

export default Login