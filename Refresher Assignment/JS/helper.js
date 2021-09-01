'use strict';
/** Example for exports */
 const comparator = (x, y) => {
    'use strict';
    if (x.marks < y.marks) {
        return 1;
    }
    if (x.marks > y.marks)
    return -1;
    return 0;
};
module.exports= {comparator}