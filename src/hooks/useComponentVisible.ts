import {useRef, useState, MutableRefObject, useEffect} from 'react'

export default () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const ref = useRef(null) as MutableRefObject<any>

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false)
    }
  }

  const toggle = () => {
    setIsVisible(!isVisible)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return { ref, isVisible, setIsVisible, toggle }
}