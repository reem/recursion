// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

var getChildNodes = function (node) {
  return _.toArray(node.childNodes);
};

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
/*
1. check if root node has className
    if has className: add root node to results
2. recurse on all children
 */
  var fromNode = function (node) {
    var results = [];

    if (_.contains(node.classList, className)) {
      results.push(node);
    };

    getChildNodes(node).forEach(function (child) {
      results = results.concat(fromNode(child));
    });

    return results;
  };
  return fromNode(document.body);
};
