// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

function stringifyObject(obj) { // Part of a mutually recursive pair.
    var inside, key, stringifiedVal;
    inside = "";
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            stringifiedVal = stringifyJSON(obj[key]);
            if (stringifiedVal !== "") {
                inside = inside.concat('"' + key + '":' +
                                       stringifiedVal + ',');
            }
        }
    }
    inside = inside.substring(0, inside.length - 1);
    return "{" + inside + "}";
}

// but you don't so you're going to have to write it from scratch:
function stringifyJSON(obj) {
    switch (typeof obj) {
        case "object":
            if (Array.isArray(obj)) {
                return "[" + obj.map(stringifyJSON).join(',') + "]";
            } if (obj === null) {
                return "null";
            } return stringifyObject(obj);
        case "boolean":
            if (obj) {
                return "true";
            } return "false"; // No need for break
        case "number":
            return obj.toString();
        case "string":
            return '"' + obj + '"';
        default:
            return "";
    }
}
