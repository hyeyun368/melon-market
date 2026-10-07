// 백엔드 주소: 환경변수 VITE_API_URL이 있으면 그걸 쓰고, 없으면 내 컴퓨터(localhost:8080)를 써요.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// 모든 요청이 공통으로 거치는 함수. 실패하면 백엔드가 보낸 에러 메시지를 담아 던져요.
async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    const error = new Error(body.message || '요청을 처리하지 못했어요.')
    error.status = response.status
    error.fieldErrors = body.errors || {} // 입력값 검사 실패 시 칸별 메시지
    throw error
  }

  // 삭제(204)처럼 내용이 없는 응답은 null을 돌려줘요.
  return response.status === 204 ? null : response.json()
}

export const getMelons = () => request('/api/melons')

export const getMelon = (id) => request(`/api/melons/${id}`)

export const createMelon = (data) =>
  request('/api/melons', { method: 'POST', body: JSON.stringify(data) })

export const updateMelon = (id, data) =>
  request(`/api/melons/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const deleteMelon = (id) => request(`/api/melons/${id}`, { method: 'DELETE' })
