// @flow
const getQueryParam = (match: object, selector: string): string => {
  if (match.params && match.params[selector]) {
    return match.params[selector];
  }

  return null;
};

export default getQueryParam;
