import { Link, Outlet } from 'react-router-dom'

// 모든 화면에 공통으로 들어가는 머리글(로고, 글쓰기 버튼)과 본문 영역이에요.
export default function Layout() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-melon-600 shadow">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-xl font-bold text-white">
            🍈 메론 마켓
          </Link>
          <Link
            to="/melons/new"
            className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-melon-700 hover:bg-melon-100"
          >
            + 글쓰기
          </Link>
        </div>
      </header>

      {/* Outlet 자리에 주소에 맞는 화면(목록/상세/작성)이 들어가요 */}
      <main className="mx-auto max-w-4xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
