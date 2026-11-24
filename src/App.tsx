import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import { AppProvider } from './context/AppContext'
import { useAppContext } from './context/useAppContext'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import Cardapio from './pages/Cardapio'
import Contato from './pages/Contato'
import Home from './pages/Home'
import Login from './pages/Login'
import Sobre from './pages/Sobre'

function AppLayout() {
  const { user, favorites, setUser } = useAppContext()

  return (
    <div className="app-shell">
      <Navbar user={user} favoritesCount={favorites.length} onLogout={() => setUser(null)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="*" element={<main className="section-shell narrow-page"><h1>Página não encontrada</h1><p>Confira o endereço ou volte para a página inicial.</p></main>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  )
}
