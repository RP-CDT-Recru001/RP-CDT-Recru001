//In production project I would use Axios
//pure fetch is very barebone, here's very very very minimal middleware implementation

export function obj2urlparams(obj: Record<string, string>): string {
  return Object.keys(obj)
    .map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    })
    .join('&');
}

export function buildUrl(url: string, params: Record<string, string>): string {
  const urlParams = obj2urlparams(params);
  if (urlParams && urlParams.length > 0) url += `?${urlParams}`;
  return url;
}

export function createRequestOpts(
  url: string,
  requestOps: RequestInit = {},
  urlParams = {}
): { url: string; fetchParameters: RequestInit } {
  const urlWithParameters = buildUrl(url, urlParams);
  return {
    url: urlWithParameters,
    fetchParameters: { ...requestOps, body: requestOps.body && JSON.stringify(requestOps.body) }
  };
}

//eslint-disable-next-line
export default async function execCall<T = any>(url: string, requestOps?: RequestInit, urlParams?: Record<string, string>): Promise<T> {
  // console.log('execCall', url, createRequestOpts(process.env.NODE_ENV, authOpts, requestOps));
  const execParams = createRequestOpts(url, requestOps, urlParams);
  const response = await fetch(execParams.url, execParams.fetchParameters);
  if (response.status < 400) {
    return await response.json();
  } else {
    throw new Error(String(response.status));
  }
}
