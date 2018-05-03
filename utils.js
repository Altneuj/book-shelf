const Collection = (config) => {
  const models = []

  const init = () => {
    if (config) {
      models.push(config)
    }
  }

  let changeCallback = null

  const add = (item) => {
    if (!_.includes(models, item) || _.isEmpty(models)) {
      models.push(item);

      if (changeCallback) {
        changeCallback()
        console.log("I changed")
      }
    }
  }

  // const get = function(){
  //
  // }

  const change = (func) => changeCallback = func;

  init();

  return {
    add,
    // get,
    models,
    change
  }
};


const Model = (config) => {
  const attributes = {}

  let changeCallback = null

  const init = () => Object.assign(attributes, config);

  var getAttributes = function(){
    return attributes;
  }

  const set = (prop, value) => {
    const tempObj = Object.assign({}, attributes)

    tempObj[prop] = value

    if (!_.isEqual(attributes, tempObj)) {
      attributes[prop] = value

      if (changeCallback) {
        changeCallback();
        console.log("I SURRENDER!");
      }
    }
  };

  const get = (prop) => attributes[prop];
  const change = (func) => changeCallback = func;

  init()

  return {
    set,
    get,
    change,
    getAttributes,
    attributes
  }
};
const View = (model, template) => {
  const render = function () {
    var attrs = model.getAttributes();

    return template(attrs);
  }


  return {
    render
  }
};
