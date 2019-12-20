function nullToString(value) {
    function recursiveFix(o) {
        // loop through each property in the provided value
        for (var k in o) {
            // make sure the value owns the key
            if (o.hasOwnProperty(k)) {
                if (o[k] === null || o[k] === undefined) {
                    // if the value is null, set it to 'null'
                    o[k] = "";
                } else if (typeof (o[k]) !== 'string' && o[k].length > 0) {
                    // if there are sub-keys, make a recursive call
                    recursiveFix(o[k]);
                }
            }
        }
    }
    var cloned = jQuery.extend(true, {}, value)
    recursiveFix(cloned);
    return cloned;
}