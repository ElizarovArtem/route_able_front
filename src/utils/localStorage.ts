type TLocalStorageFields = 'user';

export const localStorage = {
  set(name: TLocalStorageFields, value: string) {
    window.localStorage.setItem(name, value);
  },

  get(name: TLocalStorageFields) {
    return window.localStorage.getItem(name) || '';
  },

  delete(name: TLocalStorageFields) {
    window.localStorage.removeItem(name);
  },
};
