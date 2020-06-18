import decode from 'jwt-decode';

export const isTokenValid =() => {
    const token = localStorage.getItem('token');
    if(!token) return false;
    const exp = decode(token).exp;
    if (Date.now() >= exp * 1000) {
      return false;
    }
    return true;
}