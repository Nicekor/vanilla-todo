const utils = {
  serialize: (data: FormData) => {
    const obj: Record<string, unknown> = {}
    for (let [key, value] of data) {
      if (obj[key] !== undefined) {
        if (!Array.isArray(obj[key])) {
          obj[key] = [obj[key]]
        }
        ;(obj[key] as Array<unknown>).push(value)
      } else {
        obj[key] = value
      }
    }
    return obj
  },
  getFormData: (form: HTMLFormElement) => utils.serialize(new FormData(form)),
}

export default utils
