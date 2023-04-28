type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
interface Options {
  body?: object;
  params?: {
    [key: string]: string | number;
  };
}
const useApi = () => {
  const fetchWithOpts = async (
    route: string,
    method: Method = 'GET',
    options?: Options
  ) => {
    let url = '/api';
    url += route.startsWith('/') ? route : `/${route}`;
    if (options?.params) {
      url += '?' + new URLSearchParams(options.params as any).toString();
    }

    const { body } = options ?? {};

    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(body && { body: JSON.stringify(body) }),
    });
  };

  return fetchWithOpts;
};

export default useApi;
