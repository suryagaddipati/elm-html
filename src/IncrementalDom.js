
var IncrementalDOM = require('incremental-dom'),
  elementOpen = IncrementalDOM.elementOpen,
  elementClose = IncrementalDOM.elementClose,
  elementVoid = IncrementalDOM.elementVoid,
  text = IncrementalDOM.text;
var patch = require('incremental-dom').patch;
import Lazy from './Lazy.js'

function ElmNativeModule(Elm,name, values) {
  Elm.Native[name] = {};
  Elm.Native[name].make = function(elm) {
    elm.Native = elm.Native || {};
    elm.Native[name] = elm.Native[name] || {};
    if (elm.Native[name].values) return elm.Native[name].values;
    return elm.Native[name].values = values;
  };
}
function makeNode(name,propertyList,contents){
  var List = Elm.Native.List.make(Elm);
  var properties = [name,null,null];
  List.toArray(propertyList).forEach(x => {
    if( typeof x.value !== "boolean"){
      properties.push(x.key)
      properties.push(x.value)
    }else{
      if(x.value){
        properties.push(x.key)
        properties.push(x.value)
      }
    }
  })
  return () =>{
    elementOpen.apply(this,properties);
    List.toArray(contents).forEach( x => {
      if(x.type === "Thunk"){
        x.render();
      }else{
        x()
      }
    })
    elementClose(name);
  };
}
function attribute(key, value)
{
  return {
    key: key,
    value: value
  };
}

function property(key, value)
{
  // if( typeof value === "boolean"){
  //   type =
  // }
  return {
    key: key,
    value: typeof value === "boolean" ? value: new Object(value)
  };
}

function on(name, options, decoder, createMessage)
{
  var Json = Elm.Native.Json.make(Elm);
  var List = Elm.Native.List.make(Elm);
  var Signal = Elm.Native.Signal.make(Elm);
  var Utils = Elm.Native.Utils.make(Elm);
  function eventHandler(event)
  {
    var value = A2(Json.runDecoderValue, decoder, event);
    if (value.ctor === 'Ok')
      {
        if (options.stopPropagation)
          {
            event.stopPropagation();
          }
          if (options.preventDefault)
            {
              event.preventDefault();
            }
            Signal.sendMessage(createMessage(value._0));
      }
  }
  return property('on' + name, eventHandler);
}

function incrementalDOM(Elm){
  return {
    node: function(name, x, y){
      return F2(function(propertyList, contents) {
        return makeNode(name, propertyList, contents);
      });
    },

    text: function(x) {
      return function(){
        text(x);
      }
    },
    render: function(func){
      var Element = Elm.Native.Graphics.Element.make(Elm);
      var element = Element.createNode('div');
      patch(element, ()=>{
        func();
      });
      return element;
    },
    updateAndReplace: function(node, oldModel, newFunc)
    {
      patch(node, function(){
        newFunc();
      });
      return node;
    },
    // attribute: F2(attribute),
    property: F2(property),
    lazy: F2(Lazy.lazyRef),
    lazy2: F3(Lazy.lazyRef2),
    lazy3: F4(Lazy.lazyRef3),
    on: F4(on)

  }
}



ElmNativeModule(Elm,'VirtualDom', incrementalDOM(Elm))
