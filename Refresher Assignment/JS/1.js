// Student Utility script to read list of students and perform various functions on it
// 

'use strict'
/** Example for require */
var fs = require('fs');
const helper= require('./helper.js')
let {comparator}=helper
/** Example JSON.parse **/
var students = JSON.parse(fs.readFileSync('student-input.json', 'utf8'))
console.log('----------Students from JSON.parse')
console.log(students)
console.log('----------')
/** Example split **/
let getFirstNameLastName = () => {
    'use strict';
    for (let student of students) {
        // (2)Object Destructuring
        let {fullName}=student
        // (2)Array Destructuring 
        let [lastName,firstName]=fullName.split(',')
        //(4)object.assign
        Object.assign(student,{'lastName':lastName,'firstName':firstName});
        // console.log(`First Name ${firstName}, Last Name ${lastName}`);
        // console.log(fullName.split(',')[0]);
    }
    return students;
}
/** Example includes **/
let findStudentByCourses = (course) => {
    'use strict';
    let result = [];
    for (let student of students) {
        if (student.courses.includes(course))
            result.push(student);
    }
    return result;
};


/** Example slice , typeof ,(3) default argument**/
let findTopNStudentsByMarks = (n=2) => {
    // 'use strict'; cannot be used with default parameters
    var result = [];
    if (typeof n === 'number') {
        result = students.sort(comparator)
        return result.slice(0, n);
    }
    else
        throw 'parameter n is not a number'
}

/** Example for JSON.Stringify **/
let writeStudentsByMarksToFile = () => {
    'use strict';
    var data = JSON.stringify(students.sort(comparator));
    fs.writeFileSync('student-output.json', data, 'utf8');
}
console.log('------------------Add first and lastname to students-----------------');
console.log(getFirstNameLastName());
console.log('-------------------Find students by course----------------------------')
console.log(findStudentByCourses("CMPE-273"));
console.log('-------------------Find Students By Marks ----------------------------')
console.log(findTopNStudentsByMarks(1));
writeStudentsByMarksToFile();
console.log('')
