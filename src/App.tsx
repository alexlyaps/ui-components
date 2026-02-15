import { Check } from 'lucide-react'
import './App.css'
import { Button } from '@/components/button'

function App() {
  return (
    <>
      <Button onClick={() => alert('Button clicked!')} variant="danger">
        <Check />
      </Button>
      <Button onClick={() => alert('Button clicked!')} variant="danger">
        Text
      </Button>
    </>
  )
}

export default App
