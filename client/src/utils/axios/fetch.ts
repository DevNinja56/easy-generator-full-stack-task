import http from ".";

interface fetchRequestTypes {
  url: string;
  type?: "get" | "post" | "patch" | "put" | "delete";
  body?: { [key: string]: string | any };
  query?: { [key: string]: string | any };
  token?: string;
}

export const fetchRequest = async ({
  url,
  type = "get",
  body,
  query,
  token,
}: fetchRequestTypes) => {
  let res: any;
  const config: any = token ? { Authorization: `Bearer ${token}` } : {};

  switch (type) {
    case "get":
      res = await http.get(url, { params: { ...query }, ...config });
      break;
    case "post":
      res = await http.post(url, body, { params: { ...query }, ...config });
      break;
    case "patch":
      res = await http.patch(url, body, { params: { ...query } });
      break;
    case "delete":
      res = await http.delete(url);
      break;
    default:
      throw new Error(`Invalid request type: ${type}`);
  }
  return res;
};
