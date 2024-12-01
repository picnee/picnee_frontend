import NextAuth, { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import { URL } from "@/constants/url";

// 기본 Session 및 JWT 타입을 확장
interface CustomUser {
  name: string;
  email: string;
  image?: string;
  age?: string;
  gender?: string;
  birthday?: string;
  birthyear?: string;
  profile_image?: string;
  mobile?: string;
}

interface CustomToken extends JWT {
  accessToken?: string;
  age?: string;
  gender?: string;
  birthday?: string;
  birthyear?: string;
  profile_image?: string;
  mobile?: string;
}

interface CustomSession extends Session {
  accessToken?: string;
  user: CustomUser;
}

const authOptions: NextAuthOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            "id,nickname,name,email,age,gender,birthday,birthyear,profile_image,mobile",
        },
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],

  pages: { signIn: URL.LOGIN.BASE },
  callbacks: {
    async jwt({ token, account }): Promise<CustomToken> {
      if (account) {
        token.accessToken = account.access_token;

        // 추가 정보 요청
        const response = await fetch("https://openapi.naver.com/v1/nid/me", {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userInfo = data.response; // 네이버 API에서 받은 사용자 정보

          // 추가 정보를 token에 저장
          token.age = userInfo.age;
          token.gender = userInfo.gender;
          token.birthday = userInfo.birthday;
          token.birthyear = userInfo.birthyear;
          token.profile_image = userInfo.profile_image;
          token.mobile = userInfo.mobile;
        }
      }
      return token;
    },
    async session({ session, token }): Promise<CustomSession> {
      const customSession = session as CustomSession;
      const customToken = token as CustomToken;
      customSession.accessToken = customToken.accessToken;

      // 추가 정보를 session.user에 저장
      customSession.user.age = customToken.age;
      customSession.user.gender = customToken.gender;
      customSession.user.birthday = customToken.birthday;
      customSession.user.birthyear = customToken.birthyear;
      customSession.user.profile_image = customToken.profile_image;
      customSession.user.mobile = customToken.mobile;
      return customSession;
    },
    async signIn({ user, account, profile, email }) {
      console.log(user, account, profile, email);
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
