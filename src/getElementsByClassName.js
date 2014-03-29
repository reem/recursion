// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

var toArray = function (to_cast) {
    return Array.prototype.slice.call(to_cast);
};

var getChildNodes = function (node) {
    return toArray(node.childNodes);
};

var hasNoChildNodes = function (node) {
    return getChildNodes(node).length === 0;
};

var hasClassName = function (node, className) {
    var classList = node.classList || [];
    return toArray(classList).indexOf(className) > -1;
};

// But instead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
    var fromNode = function (node) {
        if (hasNoChildNodes(node)) {
            if (hasClassName(node, className)) {
                return node;
            } return [];
        }
        var children = getChildNodes(node);
        var results = hasClassName(node, className) ? [node] : [];
        children.forEach(function (node) {
            var res = fromNode(node);
            if (res.length !== 0) {
                results = results.concat(res);
            }
        });
        return results;
    };
    return fromNode(document.body);
};
