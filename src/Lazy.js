function lazyRef(fn, a)
{
  function thunk()
  {
    return fn(a);
  }
  return new Thunk(fn, [a], thunk);
}

function lazyRef2(fn, a, b)
{
  function thunk()
  {
    return A2(fn, a, b);
  }
  return new Thunk(fn, [a,b], thunk);
}

function lazyRef3(fn, a, b, c)
{
  function thunk()
  {
    return A3(fn, a, b, c);
  }
  return new Thunk(fn, [a,b,c], thunk);
}

function Thunk(fn, args, thunk)
{
  this.fn = fn;
  this.args = args;
  this.vnode = null;
  this.key = undefined;
  this.thunk = thunk;
}

Thunk.prototype.type = "Thunk";
Thunk.prototype.render = renderThunk;


function renderThunk()
{
  return this.thunk()();
}
export default {
  lazyRef, lazyRef2, lazyRef3
}
