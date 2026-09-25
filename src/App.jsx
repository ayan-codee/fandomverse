import ModernHeroSection from './components/HeroSec'
import CategoryPage from './components/CategoryPage'


const App = () => {
  const categoryMatch = window.location.pathname.match(/^\/category\/([^/]+)/)

  if (categoryMatch) {
    return <CategoryPage slug={categoryMatch[1]} />
  }

  return (
    <div>
      <ModernHeroSection/>
    </div>
  )
}

export default App