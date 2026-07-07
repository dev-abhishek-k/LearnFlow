import {cookies} from "next/headers";

export async function setRefreshTokenCookie(token: string,) {
    const cookieStore = await  cookies();
    cookieStore.set({
        name: "refresh_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30, // 30 days
    });
}
export async function getRefreshTokenCookie(): Promise<string | undefined> {
    const cookieStore = await cookies();
    const refreshTokenCookie = cookieStore.get("refresh_token");
    return refreshTokenCookie?.value;
}   
 export async function clearRefreshTokenCookie () {
    const cookieStore = await cookies();
    cookieStore.delete("refresh_token");
}