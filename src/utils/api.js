export const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://ep-strength.silvercrater.dev/api' : 'http://localhost:8080/api';
export const HTTP_GET = 'GET';
export const HTTP_POST = 'POST';
export const HTTP_PUT = 'PUT';
export const HTTP_DELETE = 'DELETE';

let blocking = false, blockingPromise = Promise.resolve();

export class Request {
  constructor(target, method = HTTP_GET, body) {
    this.target = target;
    this.method = method;
    this.body = body;
    this.response = {};
  }

  async blocking(blockingCallback, errorCallback, dropIfBlocking = true) {
    if (blocking && dropIfBlocking) {
      // There is already a blocking request, drop this one.
      return this;
    }
    blockingPromise = request(this.target, this.method, this.body);
    blockingCallback(blocking = true);
    errorCallback(false);
    try {
      this.response = await blockingPromise;
    } catch(exception) {
      errorCallback(true);
      console.error(exception);
    }
    blockingCallback(blocking = false);
    return this;
  }

  async background() {
    return await request(this.target, this.method, this.body);
  }

  getResponseValue(propertyName) {
    return this.response[propertyName];
  }
}

async function request(target, method, body) {
  const fetchParams = {
    method,
    headers: { Accept: 'application/json' }
  };
  if (body) {
    fetchParams.headers['Content-Type'] = 'application/json;charset=utf-8';
    fetchParams.body = JSON.stringify(body);
  }
  const response = await fetch(`${ENDPOINT}/${target}`, fetchParams);
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}
