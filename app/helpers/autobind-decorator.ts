function getAllMethods(obj) {
  return Object.getOwnPropertyNames(obj)
    .filter(key => typeof obj[key] === 'function')
}

function autoBind(obj) {
  getAllMethods(obj.constructor.prototype)
    .forEach(mtd => {
      obj[mtd] = obj[mtd].bind(obj);
    })
}

export default autoBind;
