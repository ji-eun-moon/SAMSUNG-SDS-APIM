export const isValidJSON = (jsonString: string) => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
};

export interface JsonData {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export const formatJsonToCurl = (data: JsonData): string => {
  const { url } = data;
  const method = data.method || 'GET';
  const headers = data.headers || {};
  const queryParams = data.params || {};

  // 헤더 문자열 생성
  const headersString = Object.keys(headers)
    .map((key) => `-H "${key}: ${headers[key]}"\n\t `)
    .join('');

  // 쿼리 문자열 생성
  const queryString = Object.keys(queryParams)
    .map((key) => `${key}=${queryParams[key]}`)
    .join('&');

  // cURL 명령어 문자열 생성
  const curlCommand = `curl -X ${method} "${url}?${queryString}"\n\t ${headersString}`;
  return curlCommand;
};
