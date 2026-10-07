import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createMelon, getMelon, updateMelon } from '../api/melonApi'
import { MELON_TYPES, SALE_STATUSES } from '../utils/labels'

const EMPTY_FORM = {
  title: '',
  content: '',
  price: '',
  sellerName: '',
  region: '',
  melonType: 'MUSK',
  status: 'ON_SALE',
}

// 입력칸 공통 디자인
const inputClass =
  'w-full rounded-lg border border-melon-200 bg-white px-3 py-2 focus:border-melon-500 focus:outline-none focus:ring-2 focus:ring-melon-200'

// "/melons/new"(작성)와 "/melons/:id/edit"(수정)가 함께 쓰는 화면이에요.
// 주소에 id가 있으면 수정, 없으면 작성으로 동작해요.
export default function MelonFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  // 수정 모드라면 기존 글 내용을 불러와 입력칸에 채워둬요.
  useEffect(() => {
    if (!isEdit) return
    getMelon(id)
      .then((melon) =>
        setForm({
          title: melon.title,
          content: melon.content,
          price: String(melon.price),
          sellerName: melon.sellerName,
          region: melon.region,
          melonType: melon.melonType,
          status: melon.status,
        }),
      )
      .catch(() => setMessage('판매글을 불러오지 못했어요.'))
      .finally(() => setLoading(false))
  }, [id, isEdit])

  // 어느 칸이든 입력하면 form의 해당 항목(name)만 바꿔요.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // 브라우저가 페이지를 새로고침하지 않게 막아요.
    setSaving(true)
    setMessage('')
    setFieldErrors({})

    // 가격은 숫자로 바꿔서 보내요. 비어 있으면 null → 백엔드가 "가격을 입력해주세요" 안내
    const data = { ...form, price: form.price === '' ? null : Number(form.price) }

    try {
      const saved = isEdit ? await updateMelon(id, data) : await createMelon(data)
      navigate(`/melons/${saved.id}`) // 저장 후 상세 화면으로 이동
    } catch (err) {
      setMessage(err.message)
      setFieldErrors(err.fieldErrors || {})
      setSaving(false)
    }
  }

  if (loading) return <p className="py-10 text-center text-gray-500">불러오는 중...</p>

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-melon-200 sm:p-8"
    >
      <h1 className="text-xl font-bold text-melon-800">
        {isEdit ? '판매글 수정' : '새 판매글 쓰기'}
      </h1>

      {message && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{message}</p>}

      <Field label="제목" error={fieldErrors.title}>
        <input name="title" value={form.title} onChange={handleChange} maxLength={100} required className={inputClass} />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="메론 종류" error={fieldErrors.melonType}>
          <select name="melonType" value={form.melonType} onChange={handleChange} className={inputClass}>
            {Object.entries(MELON_TYPES).map(([value, { label }]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </Field>

        <Field label="판매 상태" error={fieldErrors.status}>
          <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
            {Object.entries(SALE_STATUSES).map(([value, { label }]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </Field>

        <Field label="가격 (원)" error={fieldErrors.price}>
          <input name="price" type="number" min="0" inputMode="numeric" value={form.price} onChange={handleChange} required className={inputClass} />
        </Field>

        <Field label="지역" error={fieldErrors.region}>
          <input name="region" value={form.region} onChange={handleChange} placeholder="예: 서울 강남구" required className={inputClass} />
        </Field>

        <Field label="판매자 이름" error={fieldErrors.sellerName}>
          <input name="sellerName" value={form.sellerName} onChange={handleChange} required className={inputClass} />
        </Field>
      </div>

      <Field label="내용" error={fieldErrors.content}>
        <textarea name="content" value={form.content} onChange={handleChange} rows={6} required className={inputClass} />
      </Field>

      <div className="flex justify-end gap-2 pt-2">
        <Link
          to={isEdit ? `/melons/${id}` : '/'}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
        >
          취소
        </Link>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-melon-500 px-5 py-2 text-sm font-semibold text-white hover:bg-melon-600 disabled:opacity-50"
        >
          {saving ? '저장 중...' : isEdit ? '수정 완료' : '등록하기'}
        </button>
      </div>
    </form>
  )
}

// 이름표 + 입력칸 + 에러 메시지를 묶어주는 작은 부품
function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </label>
  )
}
