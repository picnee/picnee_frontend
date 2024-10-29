'use client'

export default function LoginPage() {
    const goLoginPage = (provider: string) => {
        window.open(`http://ec2-43-201-110-116.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/${provider}`, '_self');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Login Page</h1>
            <div className="space-y-4">
                <button
                    onClick={() => goLoginPage('kakao')}
                    className="bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-2 rounded-lg shadow-md transition-colors duration-200 w-full"
                >
                    카카오 로그인
                </button>
                <button
                    onClick={() => goLoginPage('google')}
                    className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-6 py-2 rounded-lg shadow-md transition-colors duration-200 w-full"
                >
                    구글 로그인
                </button>
                <button
                    onClick={() => goLoginPage('naver')}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition-colors duration-200 w-full"
                >
                    네이버 로그인
                </button>
            </div>
        </div>
    )
}   