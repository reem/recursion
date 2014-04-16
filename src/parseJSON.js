// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;
//

var trace = function (x) {
  console.log(x);
  return x;
};

var fail = function (message) {
  throw new Error("Fail: ", message);
};

var either = function (kind, value) {
  switch (kind) {
    case "Left":
    case "left":
      return { status: "Left", value: value };
    case "Right":
    case "right":
      return { status: "Right", value: value };
    default:
      throw new Error("Malformed either type: ", kind);
  }
};

var switchEither = function (eitherVal, left, right) {
  switch (eitherVal.status) {
    case "Left":
      return left(eitherVal.value);
    case "Right":
      return right(eitherVal.value);
  }
};

var newParseState = function (string, workIndex) {
  return { str: string,
           workIndex: workIndex,
           current: function () { return this.str[this.workIndex]; },
         };
};

var get = function (parseState, index) {
  return parseState.str[parseState.workIndex + index];
};

var consume = function (parseState) {
  return [parseState.str[parseState.workIndex + 1],
    newParseState(parseState.str, parseState.workIndex + 1)];
};

var runParser = function (parser) {
  return function (parseState) {
    return parser(parseState.str);
  };
};

var identity = function (val) {
  return function (s) {
    return either("right", [val, s]);
  };
};

var everything = function () {
  return function (s) {
    return either("right", [s, ""]);
  };
};

var alwaysFail = function () {
  return function () {
    return either("left", "failure");
  };
};

var parse = function (parser, string) {
  return switchEither(runParser(parser)(newParseState(string, 0)),
    function (error) { fail(error); },
    function (state) { return state[0];
  });
};

var testAll;
(function (){
  var ensure = function (condition, message) {
    if (!condition) {
      throw new Error("Ensure Error: ", message);
    }
  };

  var checkThrows = function (func) {
    var threw = false;
    try {
      func();
    } catch (e) {
      threw = true;
    } finally {
      return threw;
    }
  };

  var testBasics = function () {
    ensure(parse(identity(7), "Hello") === 7, "identity failed.");
    ensure(parse(everything(), "Hello") === "Hello", "everything failed.");
  };

  var testFails = function () {
    ensure(checkThrows(function () { parse(alwaysFail(), "Hello"); }),
           "doesn't fail properly.");
  };

  testAll = function () {
    testBasics();
    testFails();
    console.log("Passed all tests!");
  };
}());
testAll();

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  parse(jsonParser(), json);
};
