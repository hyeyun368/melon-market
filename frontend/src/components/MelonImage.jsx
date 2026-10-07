import { useState } from 'react'
import { melonImage, melonTypeLabel } from '../utils/labels'

// 메론 종류에 맞는 사진을 보여줘요. 사진 파일이 없으면 🍈 그림으로 대신해요.
export default function MelonImage({ type, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-melon-100 text-5xl ${className}`}>
        🍈
      </div>
    )
  }

  return (
    <img
      src={melonImage(type)}
      alt={melonTypeLabel(type)}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}
