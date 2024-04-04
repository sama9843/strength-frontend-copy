export const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://ep-strength.silvercrater.dev/api' : 'http://localhost:8080/api';
export const HTTP_GET = 'GET';
export const HTTP_POST = 'POST';
export const HTTP_PUT = 'PUT';
export const HTTP_DELETE = 'DELETE';


export async function request(target, method, body) {
  const fetchParams = {
    method: method
  };
  if (body) {
    fetchParams.body = JSON.stringify(body);
  }
  const response = await fetch(`${ENDPOINT}/${target}`, fetchParams);
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}
