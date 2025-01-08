'use client'

import { useState } from 'react'
import ReviewModal from './modal'

export default function ModalTestPage() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'restaurant' as const
  })

  const openModal = (type: 'restaurant' | 'attraction' | 'hotel') => {
    setModalState({ isOpen: true, type: type })
  }

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }))
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">모달 테스트</h1>

      <div className="flex gap-4">
        <button
          onClick={() => openModal('restaurant')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          맛집 리뷰
        </button>

        <button
          onClick={() => openModal('attraction')}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          관광지 리뷰
        </button>

        <button
          onClick={() => openModal('hotel')}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          숙소 리뷰
        </button>
      </div>

      <ReviewModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
      />
    </div>
  )
}   