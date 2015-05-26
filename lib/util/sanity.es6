import _ from 'lodash'

export function notEmpty(value){
  if(_.isEmpty(value)){
    throw new TypeError('${value} must not be empty')
  }
}

export function haveType(value, type, messenger){
  if(!messenger){
    messenger = () => `${value} must have type ${type.name}`
  }

  if(type === Number){
    if(!_.isNumber(value)){
      throw new TypeError(messenger())
    }
  } else if(type === Array){
    if(!_.isArray(value)){
      throw new TypeError(messenger())
    }
  } else if(type === String){
    if(!_.isString(value)){
      throw new TypeError(messenger())
    }
  } else {
    if(!(value instanceof type)){
      throw new TypeError(messenger())
    }
  }
}

export function allHaveProperty(array, property, type){
  _.forEach(array, (element) => {
    haveType(element[property], type, () => `${element} must have ${property} of type ${type.name}`)
  })
}
