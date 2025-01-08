'use client'

import { useRouter } from 'next/navigation'

export default function UITestPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b pb-4">
          UI 테스트 페이지
        </h1>

        {/* 버달 테스트 섹션 추가 */}
        <section className="mb-8 p-6 bg-white border border-gray-200 rounded-xl 
                          shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            모달 테스트
          </h2>
          <div className="space-y-4">
            <button
              onClick={() => router.push('/uitest/modal')}
              className="w-40 h-40 flex items-center justify-center text-center
                       bg-gradient-to-r from-purple-500 to-purple-600 
                       text-white rounded-2xl hover:from-purple-600 hover:to-purple-700
                       transform hover:-translate-y-1 hover:scale-105 transition-all duration-200
                       font-medium shadow-lg hover:shadow-xl
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              <span className="text-lg">
                모달 테스트<br />페이지로 이동
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
