export const isFunction = (fn: unknown) => fn && Object.prototype.toString.call(fn) === '[object Function]'
