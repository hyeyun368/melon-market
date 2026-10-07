import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import MelonDetailPage from './pages/MelonDetailPage'
import MelonFormPage from './pages/MelonFormPage'
import MelonListPage from './pages/MelonListPage'

// 주소(URL)마다 어떤 화면을 보여줄지 정하는 곳이에요.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MelonListPage />} />
          <Route path="/melons/new" element={<MelonFormPage />} />
          <Route path="/melons/:id" element={<MelonDetailPage />} />
          <Route path="/melons/:id/edit" element={<MelonFormPage />} />
          <Route path="*" element={<p className="py-10 text-center text-gray-500">없는 페이지예요.</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
