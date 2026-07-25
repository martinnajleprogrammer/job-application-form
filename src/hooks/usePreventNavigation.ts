import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom'
const usePreventNavigation = (isDirty: boolean) => {
  const blocker = useBlocker(isDirty);

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const confirmed = window.confirm('You have unsaved changes. Are you sure?')
      if (confirmed) blocker.proceed()
      else blocker.reset()
    }
  }, [blocker])

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault()
        // event.returnValue = ''
      }
    }
    document.addEventListener('beforeunload', handler)
    return () => document.removeEventListener('beforeunload', handler)
  }, [isDirty])
};
export default usePreventNavigation;