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
    this.response = null;
  }

  async blocking(blockingCallback, errorCallback, dropIfBlocking = true) {
    if (blocking && dropIfBlocking) {
      // There is already a blocking request, drop this one.
      return this;
    }
    this.response = null;
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

  async background(errorCallback) {
    errorCallback(false);
    this.response = null;
    try {
      this.response = await request(this.target, this.method, this.body);
    } catch(exception) {
      errorCallback(true);
    }
    return this;
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
    if (method === HTTP_POST) {
      fetchParams.headers['Content-Type'] = 'application/json;charset=utf-8';
      fetchParams.body = JSON.stringify(body);
    } else {
      target += '?' + new URLSearchParams(body).toString();
    }
  }
  const response = await fetch(`${ENDPOINT}/${target}`, fetchParams);
  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error('Error: Response status code was ' + response.status + '!');
  }
}
