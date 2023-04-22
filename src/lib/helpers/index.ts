export function uuid(): string {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function getSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export function clearEmptyProperties(obj: { [key: string]: any }): { [key: string]: any } {
  const result = {};
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== '') {
      result[key] = obj[key];
    }
  }
  return result;
}
