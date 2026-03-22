import Navbar from './componantesnts/Navbar'
import Hero from './componantesnts/Hero'
import Hotels from './componantesnts/Hotels'
import Offers from './componantesnts/Offers'
import Testimonials from './componantesnts/Testimonials'
import Footer from './componantesnts/Footer'

function App() {
    return (
        <div className="font-body bg-white text-navy overflow-x-hidden">
            <Navbar />
            <Hero />
            <Hotels />
            <Offers />
            <Testimonials />
            <Footer />
        </div>
    )
}

export default App