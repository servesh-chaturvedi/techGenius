import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import usePersist from "../../hooks/usePersist"
import { useRefreshMutation } from "./authApiSlice"
import { selectCurrentToken } from "./authSlice"

const PersistLogin = () => {
  const [persist] = usePersist()
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation()

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        // console.log("verifying refresh token")
        try {
          await refresh()
          setTrueSuccess(true)
        } catch (err) {
          console.error(err)
        }
      }
      if (!token && persist) verifyRefreshToken()
    }
    return () => (effectRan.current = true)
  }, [])

  let content
  if (!persist) {
    // persist: no
    content = <Outlet />
  } else if (isLoading) {
    //persist: yes, token: no
    content = <p>Loading...</p>
  } else if (isError) {
    //persist: yes, token: no
    content = (
      <p>
        {`${error?.data?.message} - `}
        <Link to="/login">Please login again</Link>.
      </p>
    )
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    content = <Outlet />
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    content = <Outlet />
  }

  return content
}
export default PersistLogin
