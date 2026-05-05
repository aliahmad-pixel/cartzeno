import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} | Cartzeno` : 'Cartzeno'
  }, [title])
}

export function useScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
}
