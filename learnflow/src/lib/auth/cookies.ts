import {cookies} from "next/headers";

export async function setAccessTokenCookie(token: string,) {
    const cookieStore = await  cookies();
    cookieStore.set({
        name: "access_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30, // 30 days
    });
}
export async function getAccessTokenCookie(): Promise<string | undefined> {
    const cookieStore = await cookies();
    const accessTokenCookie = cookieStore.get("access_token");
    return accessTokenCookie?.value;
}   
 export async function deleteAccessTokenCookie() {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
}