import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Partners from './pages/Partners'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"

export default function App()
{
	const location = useLocation()

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
	}, [location.pathname])

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			<main className="flex-1">
				<Routes>
					<Route path="/" 		 	element={<Home 	 />} />
					<Route path="/portfolio" 	element={<Portfolio />} />
					<Route path="/partenaires"	element={<Partners	 />} />
					<Route path="/contact" 		element={<Contact 	 />} />
					<Route path="/*"		 	element={<NotFound  />} />
				</Routes>
			</main>

		  	<Footer />
			<Analytics />
		</div>
	)
}
