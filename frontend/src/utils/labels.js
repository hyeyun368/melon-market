// 백엔드의 영어 값(MUSK, ON_SALE 등)을 화면에 보여줄 한글과 사진으로 바꿔요.

export const MELON_TYPES = {
  MUSK: { label: '머스크', image: '/images/musk.jpg' },
  HAMI: { label: '하미과', image: '/images/hami.jpg' },
  KOREAN: { label: '참외', image: '/images/korean.jpg' },
  ETC: { label: '기타', image: '/images/etc.jpg' },
}

// badge: 판매 상태마다 다른 색 배지를 보여주기 위한 Tailwind 클래스
export const SALE_STATUSES = {
  ON_SALE: { label: '판매중', badge: 'bg-melon-500 text-white' },
  RESERVED: { label: '예약중', badge: 'bg-amber-400 text-amber-950' },
  SOLD_OUT: { label: '판매완료', badge: 'bg-gray-400 text-white' },
}

export const melonTypeLabel = (type) => MELON_TYPES[type]?.label ?? type

export const melonImage = (type) => MELON_TYPES[type]?.image ?? MELON_TYPES.ETC.image

// 15000 → "15,000원"
export const formatPrice = (price) => `${Number(price).toLocaleString('ko-KR')}원`

// "2026-10-07T14:30:00" → "2026. 10. 7. 오후 2:30"
export const formatDate = (dateText) =>
  new Date(dateText).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })
