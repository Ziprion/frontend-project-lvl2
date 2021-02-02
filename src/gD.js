import _ from 'lodash';
import parser from './parsers.js';
import whichformat from '../formatters/index.js';

export default function diffObj (objOne, objTwo) {
  const result = [];
  const mainObj = { ...objTwo, ...objOne };
  const asd = _.keys(mainObj);
  const keys = asd.sort();
  keys.forEach((key) => {
    const item = {};
    item.name = key;
    if (_.has(objOne, key) && !_.has(objTwo, key)) {
      item.status = 'deleted';
      item.newValue = _.isObject(objOne[key]) ? diffObj(objOne[key], objOne[key])
        : objOne[key];
      item.value = _.isObject(objOne[key]) ? diffObj(objOne[key], objOne[key])
        : objOne[key];
    }
    if (!_.has(objOne, key) && _.has(objTwo, key)) {
      item.status = 'added';
      item.newValue = _.isObject(objTwo[key]) ? diffObj(objTwo[key], objTwo[key]) : objTwo[key];
      item.value = _.isObject(objTwo[key]) ? diffObj(objTwo[key], objTwo[key]) : objTwo[key];
    }
    if (_.has(objOne, key) && _.has(objTwo, key)) {
      if (typeof objOne[key] === 'object' || typeof objOne[key] === 'object') {
        if (typeof objOne[key] === typeof objTwo[key]) {
          item.status = 'unchanged';
          item.value = _.isObject(objOne[key]) ? diffObj(objOne[key], objTwo[key]) : objOne[key];
          item.newValue = _.isObject(objTwo[key]) ? diffObj(objOne[key], objTwo[key]) : objTwo[key];
        } else {
          item.status = 'changed';
          item.value = _.isObject(objOne[key]) ? diffObj(objOne[key], objOne[key]) : objOne[key];
          item.newValue = _.isObject(objTwo[key]) ? diffObj(objTwo[key], objTwo[key]) : objTwo[key];
        }
      } else if (objOne[key] !== objTwo[key]) {
        item.status = 'changed';
        item.value = _.isObject(objOne[key]) ? diffObj(objOne[key], objOne[key]) : objOne[key];
        item.newValue = _.isObject(objTwo[key]) ? diffObj(objTwo[key], objTwo[key]) : objTwo[key];
      } else {
        item.status = 'unchanged';
        item.value = _.isObject(objOne[key]) ? diffObj(objOne[key], objTwo[key]) : objOne[key];
        item.newValue = _.isObject(objTwo[key]) ? diffObj(objOne[key], objTwo[key]) : objTwo[key];
      }
    }
    return result.push(item);
  });
  return result;
};
