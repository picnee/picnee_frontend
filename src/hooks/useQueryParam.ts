import { useSearchParams } from "next/navigation"

/**
 * 쿼리스트링에서 원하는 쿼리 파라미터 값 꺼내주는 훅
 * @param paramName key
 * @returns value
 */
const useQueryParam = (paramName: string) => {
    const searchParams = useSearchParams()
    return searchParams?.get(paramName) || null
}

export default useQueryParam