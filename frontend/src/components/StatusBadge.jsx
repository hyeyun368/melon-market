import { SALE_STATUSES } from '../utils/labels'

// 판매 상태를 색깔 있는 작은 배지로 보여줘요.
export default function StatusBadge({ status }) {
  const info = SALE_STATUSES[status] ?? { label: status, badge: 'bg-gray-200' }

  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${info.badge}`}>
      {info.label}
    </span>
  )
}
