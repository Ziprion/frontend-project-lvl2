import _ from 'lodash';

export default function diffObj(objOne, objTwo) {
  const mainObj = { ...objTwo, ...objOne };
  const asd = _.keys(mainObj);
  const keys = _.sortBy(asd);
  const results = keys.reduce((acc, key) => {
    if (_.has(objOne, key) && !_.has(objTwo, key)) {
      return [...acc, {
        name: key,
        status: 'deleted',
        newValue: _.isObject(objOne[key]) ? diffObj(objOne[key], objOne[key]) : objOne[key],
        value: _.isObject(objOne[key]) ? diffObj(objOne[key], objOne[key]) : objOne[key],
      }];
    }
    if (!_.has(objOne, key) && _.has(objTwo, key)) {
      return [...acc, {
        name: key,
        status: 'added',
        newValue: _.isObject(objTwo[key]) ? diffObj(objTwo[key], objTwo[key]) : objTwo[key],
        value: _.isObject(objTwo[key]) ? diffObj(objTwo[key], objTwo[key]) : objTwo[key],
      }];
    }
    if (_.has(objOne, key) && _.has(objTwo, key)) {
      if (typeof objOne[key] === 'object' || typeof objOne[key] === 'object') {
        if (typeof objOne[key] === typeof objTwo[key]) {
          return [...acc, {
            name: key,
            status: 'unchanged',
            value: _.isObject(objOne[key]) ? diffObj(objOne[key], objTwo[key]) : objOne[key],
            newValue: _.isObject(objTwo[key]) ? diffObj(objOne[key], objTwo[key]) : objTwo[key],
          }];
        }
        if (typeof objOne[key] !== typeof objTwo[key]) {
          return [...acc, {
            name: key,
            status: 'changed',
            value: _.isObject(objOne[key]) ? diffObj(objOne[key], objOne[key]) : objOne[key],
            newValue: _.isObject(objTwo[key]) ? diffObj(objTwo[key], objTwo[key]) : objTwo[key],
          }];
        }
      } else if (objOne[key] !== objTwo[key]) {
        return [...acc, {
          name: key,
          status: 'changed',
          value: _.isObject(objOne[key]) ? diffObj(objOne[key], objOne[key]) : objOne[key],
          newValue: _.isObject(objTwo[key]) ? diffObj(objTwo[key], objTwo[key]) : objTwo[key],
        }];
      } else {
        return [...acc, {
          name: key,
          status: 'unchanged',
          value: _.isObject(objOne[key]) ? diffObj(objOne[key], objTwo[key]) : objOne[key],
          newValue: _.isObject(objTwo[key]) ? diffObj(objOne[key], objTwo[key]) : objTwo[key],
        }];
      }
    }
    return acc;
  }, []);
  return results;
}
