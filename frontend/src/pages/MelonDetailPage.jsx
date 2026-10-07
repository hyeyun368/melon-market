import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteMelon, getMelon } from '../api/melonApi'
import MelonImage from '../components/MelonImage'
import StatusBadge from '../components/StatusBadge'
import { formatDate, formatPrice, melonTypeLabel } from '../utils/labels'

// "/melons/:id" 주소: 판매글 하나를 자세히 보여주고, 수정·삭제 버튼을 제공해요.
export default function MelonDetailPage() {
  const { id } = useParams() // 주소의 :id 부분 (예: /melons/3 → "3")
  const navigate = useNavigate()
  const [melon, setMelon] = useState(null)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    getMelon(id)
      .then(setMelon)
      .catch((e) =>
        setError(e.status === 404 ? '존재하지 않는 판매글이에요.' : '판매글을 불러오지 못했어요.'),
      )
  }, [id])

  const handleDelete = async () => {
    // 확인창에서 "취소"를 누르면 여기서 멈춰요.
    if (!window.confirm('정말 이 판매글을 삭제할까요?')) return

    setDeleting(true)
    try {
      await deleteMelon(id)
      navigate('/') // 삭제 후 목록으로 이동
    } catch {
      alert('삭제하지 못했어요. 잠시 후 다시 시도해주세요.')
      setDeleting(false)
    }
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <p className="mb-4 text-red-600">{error}</p>
        <Link to="/" className="text-melon-700 underline">목록으로</Link>
      </div>
    )
  }
  if (!melon) return <p className="py-10 text-center text-gray-500">불러오는 중...</p>

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-melon-200">
      <MelonImage type={melon.melonType} className="aspect-[16/9] w-full" />

      <div className="space-y-4 p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={melon.status} />
          <span className="rounded-full bg-melon-100 px-2.5 py-0.5 text-xs font-medium text-melon-800">
            {melonTypeLabel(melon.melonType)}
          </span>
        </div>

        <h1 className="text-2xl font-bold">{melon.title}</h1>
        <p className="text-2xl font-bold text-melon-700">{formatPrice(melon.price)}</p>

        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          <dt className="text-gray-500">판매자</dt>
          <dd>{melon.sellerName}</dd>
          <dt className="text-gray-500">지역</dt>
          <dd>{melon.region}</dd>
          <dt className="text-gray-500">작성일</dt>
          <dd>{formatDate(melon.createdAt)}</dd>
        </dl>

        {/* whitespace-pre-line: 내용에 입력한 줄바꿈을 그대로 보여줘요 */}
        <p className="whitespace-pre-line border-t border-melon-100 pt-4 leading-relaxed">
          {melon.content}
        </p>

        <div className="flex gap-2 pt-2">
          <Link
            to="/"
            className="mr-auto rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
          >
            ← 목록
          </Link>
          <Link
            to={`/melons/${melon.id}/edit`}
            className="rounded-lg bg-melon-500 px-4 py-2 text-sm font-semibold text-white hover:bg-melon-600"
          >
            수정
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50"
          >
            {deleting ? '삭제 중...' : '삭제'}
          </button>
        </div>
      </div>
    </article>
  )
}
