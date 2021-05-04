import {UserPreview} from './cmps/user-preview.jsx'
import {Home} from './pages/home.jsx'

// Simple React Component
export function App() {
    return <section className="app">
       <h1>My App</h1>
       <UserPreview/>
       <Home/>
    </section>
}
