import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { isBlank } from "@muft/dailyfns"

export function getLoginUrl(redirect? : string): string {
	if(isBlank(redirect)) redirect='/profile'

	const url = `${process.env.NEXT_PUBLIC_UXM_MARKET_DOMAIN}/login?s=music&st=t&redirect=${process.env.NEXT_PUBLIC_EVENT_DOMAIN}/login?redirect=${redirect}`
	return url
}

export function getInviteLink(redirect="/profile"): string {
	const uid = getUserUID() || ''
	// console.log(uid)
  const url = `${process.env.NEXT_PUBLIC_UXM_MARKET_DOMAIN}/login?pid=${uid}&s=music&st=t&redirect=${process.env.NEXT_PUBLIC_EVENT_DOMAIN}/login?redirect=${redirect}`
	return url
}

export function getUserName(): string | undefined {
	return Cookies.get('event_username');
}

export function getTokenName(): string {
	return process.env.NEXT_PUBLIC_COOKIE_TOKEN_NAME || "eventtoken"
}

export function getToken(): string | undefined {
	return Cookies.get(getTokenName());
}

// export function login(token = null) {
// 	if (!token) return 'Cannot Login';
// 	Cookies.set(getTokenName(), token);
// }

export function getTokenDecoded(): any {
	var token = getToken();
	if (!token) return null;
	const decoded = jwtDecode(token);
	return decoded;
}

export function isTokenExpired(): boolean {
	const decoded = getTokenDecoded();
	if (!decoded) return true;
	if (Date.now() <= decoded.exp * 1000) {
		return false;
	} else {
		return true;
	}
}

export function getTokenExpirationDate() {
	const decoded = getTokenDecoded();
	if (!decoded) return null;
	return new Date(decoded.exp * 1000);
}

export function isLoggedIn(): boolean {
	if (getToken() && !isTokenExpired()) return true;
	return false;
}

// export function logout() {
// 	Cookies.remove(getTokenName());
// }

export function getUserID() {
	const data = getTokenDecoded();
	return data?.sub;
}

export function getUserUID(): string {
	const data = getTokenDecoded();
	return data?.sub;
}

export function getUserEmail(): string {
	const data = getTokenDecoded();
	return data?.email;
}
