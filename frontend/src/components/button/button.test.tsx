import { render, screen } from '@testing-library/react'
import { Button } from './button'
import userEvent from '@testing-library/react'

describe('Button', () => {
    it('renders label', () => {
        render(<Button>Click me</Button>)

        expect(screen.getByText('Click me')).toBeInTheDocument()
    });
    it('calls onclick when clicked', async () => {
        const onClick = vi.fn()

        render (<Button onCLick={onClick}>Click</Button>)

        await userEvent.click(screen.getByText('Click'))

        expect(onClick).toHaveBeenCalled()
    })
})

