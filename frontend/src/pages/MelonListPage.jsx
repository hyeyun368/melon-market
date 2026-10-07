import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMelons } from '../api/melonApi'
import MelonImage from '../components/MelonImage'
import StatusBadge from '../components/StatusBadge'
import { formatPrice, melonTypeLabel } from '../utils/labels'

// "/" 주소: 판매글 목록을 카드 형태로 보여줘요.
export default function MelonListPage() {
  const [melons, setMelons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // 화면이 처음 열릴 때 한 번 백엔드에서 목록을 받아와요.
  useEffect(() => {
    getMelons()
      .then(setMelons)
      .catch(() => setError('목록을 불러오지 못했어요. 백엔드가 켜져 있는지 확인해주세요.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="py-10 text-center text-gray-500">불러오는 중...</p>
  if (error) return <p className="py-10 text-center text-red-600">{error}</p>

  if (melons.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 text-gray-500">아직 등록된 판매글이 없어요.</p>
        <Link to="/melons/new" className="font-semibold text-melon-700 underline">
          첫 판매글 쓰기
        </Link>
      </div>
    )
  }

  return (
    // 휴대폰 1줄, 태블릿 2줄, 큰 화면 3줄로 카드를 배치해요.
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {melons.map((melon) => (
        <li key={melon.id}>
          <Link
            to={`/melons/${melon.id}`}
            className="block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-melon-200 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <MelonImage type={melon.melonType} className="aspect-[4/3] w-full" />
            <div className="space-y-1.5 p-4">
              <div className="flex items-center gap-2">
                <StatusBadge status={melon.status} />
                <span className="text-xs text-melon-700">{melonTypeLabel(melon.melonType)}</span>
              </div>
              <h2 className="truncate text-lg font-semibold">{melon.title}</h2>
              <p className="text-lg font-bold text-melon-700">{formatPrice(melon.price)}</p>
              <p className="text-sm text-gray-500">📍 {melon.region}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
