const getTokenFromAuthorizationHeader = (headers?: string): string | undefined => {
  if (!headers || !headers.startsWith("Bearer ")) {
    return undefined;
  }
  return headers.split(" ")[1];
};

export { getTokenFromAuthorizationHeader };
