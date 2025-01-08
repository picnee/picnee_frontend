'use client'

import { useState } from 'react'

type ReviewType = 'restaurant' | 'attraction' | 'hotel'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  type: ReviewType
}

export default function ReviewModal({ isOpen, onClose, type }: ReviewModalProps) {
  const [rating, setRating] = useState<number>(0)
  const [selectedOperations, setSelectedOperations] = useState<string[]>([])
  const [selectedMemories, setSelectedMemories] = useState<string[]>([])
  const [reviewText, setReviewText] = useState({
    good: '',
    bad: '',
    tip: ''
  })

  // 타입별 운영 방식 옵션
  const operationOptions = {
    restaurant: [
      '한국어 메뉴', '키오스크 주문', '카드 결제', '현금 결제',
      '예약 가능', '룸연 가능'
    ],
    attraction: [
      '유료 입장', '한국어 가이드 제공', '자유와 주차 가능',
      '사진 촬영 필요', '지정석 주차 가능', '조조/야간 관람'
    ],
    hotel: [
      '셀프 체크인/체크아웃', '24시간 프론트 운영', '조식 제공',
      '부대시설 운영', '짐 보관 서비스 운영', '대학회(룸펍) 운영'
    ]
  }

  // 타입별 기억에 남는 점 옵션
  const memoryOptions = {
    restaurant: [
      '음식이 맛있어요', '친절의 맛이 느껴져요', '역시와 전통이 느껴져요',
      '세련되고 모던해요', '매장이 깨끗해요', '서비스가 친절해요',
      '현지인이 많아요', '분위기가 좋아요', '웨이팅이 있어요', '가성비가 좋아요'
    ],
    attraction: [
      '역사와 전통이 느껴져요', '볼거리가 많아요', '아이와 좋아요',
      '사진 찍기 좋아요', '한적한 힐 있어 좋아요', '편의시설이 있어요',
      '계절 프로그램이 있어요', '문화상이 매력적이요', '조용하고 한적해요', '데이트하기 좋아요'
    ],
    hotel: [
      '객실이 쾌적해요', '객실이 깨끗해요', '직원 친절이 좋아요',
      '객실이 전망이 좋아요', '침대가 편안해요', '조식이 맛있어요',
      '방음이 잘 돼요', '서비스가 친절해요', '대중교통 이용이 쉬워요', '냄새없이 잘 돼요'
    ]
  }

  // 타입별 제목
  const titles = {
    restaurant: '맛집',
    attraction: '관광지',
    hotel: '숙소'
  }

  const toggleOperation = (option: string) => {
    setSelectedOperations(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    )
  }

  const toggleMemory = (option: string) => {
    setSelectedMemories(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-center mb-4">리뷰 작성하기</h2>
          <p className="text-gray-500 text-center mb-6">{titles[type]}</p>

          {/* 별점 섹션 */}
          <div className="mb-6">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-12 h-12 border-2 rounded-lg transition-colors
                    ${rating >= star
                      ? 'border-purple-500 bg-purple-50 text-purple-500'
                      : 'border-dashed border-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* 운영 방식 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              {type === 'restaurant' && '매장의 운영 방식은 어땠나요?'}
              {type === 'attraction' && '장소의 운영 방식은 어땠나요?'}
              {type === 'hotel' && '숙소의 운영 방식은 어땠나요?'}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {operationOptions[type].map((option) => (
                <button
                  key={option}
                  onClick={() => toggleOperation(option)}
                  className={`p-3 border rounded-lg transition-all
                    ${selectedOperations.includes(option)
                      ? 'bg-purple-50 border-purple-500 text-purple-500'
                      : 'hover:bg-purple-50 hover:border-purple-500'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* 기억에 남는 점 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">방문 후 어떤 점이 기억에 남으셨나요?</h3>
            <div className="grid grid-cols-2 gap-3">
              {memoryOptions[type].map((option) => (
                <button
                  key={option}
                  onClick={() => toggleMemory(option)}
                  className={`p-3 border rounded-lg transition-all
                    ${selectedMemories.includes(option)
                      ? 'bg-purple-50 border-purple-500 text-purple-500'
                      : 'hover:bg-purple-50 hover:border-purple-500'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* 상세 리뷰 작성 */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">좋았던 점</h4>
              <textarea
                className="w-full p-3 border rounded-lg resize-none h-32"
                placeholder="방문한 매장에서 좋았던 점을 남겨주세요. 음식의 맛, 매장 분위기, 직원 서비스 등 기억에 남는 부분을 알려주시면 좋아요."
                value={reviewText.good}
                onChange={(e) => setReviewText({ ...reviewText, good: e.target.value })}
              />
            </div>
            <div>
              <h4 className="font-medium mb-2">아쉬운 점</h4>
              <textarea
                className="w-full p-3 border rounded-lg resize-none h-32"
                placeholder="방문한 매장에서 아쉬웠던 점을 남겨주세요. 다른 방문객이 미리 참고할 수 있도록 솔직한 의견을 남겨주시면 좋아요."
                value={reviewText.bad}
                onChange={(e) => setReviewText({ ...reviewText, bad: e.target.value })}
              />
            </div>
            <div>
              <h4 className="font-medium mb-2">장소 팁</h4>
              <textarea
                className="w-full p-3 border rounded-lg resize-none h-32"
                placeholder="다른 방문객에게 도움이 될 만한 정보가 있다면 알려주세요. 예약 방법이나 쉽게 찾아가는 법, 대기 시간 등을 알려주시면 좋아요."
                value={reviewText.tip}
                onChange={(e) => setReviewText({ ...reviewText, tip: e.target.value })}
              />
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              취소
            </button>
            <button
              className="px-6 py-2 bg-purple-500 text-white rounded-lg 
                       hover:bg-purple-600 transition-colors"
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}