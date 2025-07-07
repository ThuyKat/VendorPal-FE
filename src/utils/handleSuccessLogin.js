export function handleSuccessLogin(data) {
    const { user, access_token,refresh_token } = data;
    // Store user info and token
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
}