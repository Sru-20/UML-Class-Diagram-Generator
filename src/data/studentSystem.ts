import type { DiagramState, UMLClass, UMLMethod, UMLAttribute } from '../types/uml'

const attribute = (id: string, name: string, type: string, visibility: UMLAttribute['visibility'] = '-'): UMLAttribute => ({ id, name, type, visibility })
const method = (id: string, name: string, returnType: string, parameters: UMLMethod['parameters'] = []): UMLMethod => ({ id, name, returnType, visibility: '+', parameters })

export const studentSystem: DiagramState = {
  classes: [
    {
      id: 'student', name: 'Student', kind: 'class', position: { x: 70, y: 80 },
      attributes: [
        attribute('student-id', 'studentId', 'int'), attribute('student-name', 'name', 'String'),
        attribute('student-email', 'email', 'String'), attribute('student-semester', 'semester', 'int'),
        attribute('student-department', 'department', 'String'),
      ],
      methods: [method('student-enroll', 'enrollCourse', 'void'), method('student-attendance', 'viewAttendance', 'double'), method('student-results', 'viewResults', 'void'), method('student-cgpa', 'calculateCGPA', 'double')],
    },
    {
      id: 'course', name: 'Course', kind: 'class', position: { x: 540, y: 70 },
      attributes: [attribute('course-id', 'courseId', 'String'), attribute('course-name', 'courseName', 'String'), attribute('course-credits', 'credits', 'int'), attribute('course-semester', 'semester', 'int')],
      methods: [method('course-add', 'addStudent', 'void'), method('course-remove', 'removeStudent', 'void'), method('course-details', 'getCourseDetails', 'String')],
    },
    {
      id: 'faculty', name: 'Faculty', kind: 'class', position: { x: 1010, y: 70 },
      attributes: [attribute('faculty-id', 'facultyId', 'int'), attribute('faculty-name', 'name', 'String'), attribute('faculty-email', 'email', 'String'), attribute('faculty-dept', 'department', 'String')],
      methods: [method('faculty-create', 'createCourse', 'void'), method('faculty-mark', 'markAttendance', 'void'), method('faculty-marks', 'uploadMarks', 'void'), method('faculty-students', 'viewStudents', 'void')],
    },
    {
      id: 'attendance', name: 'Attendance', kind: 'class', position: { x: 70, y: 430 },
      attributes: [attribute('attendance-id', 'attendanceId', 'int'), attribute('attendance-student', 'studentId', 'int'), attribute('attendance-course', 'courseId', 'String'), attribute('attendance-percent', 'percentage', 'double'), attribute('attendance-status', 'status', 'String')],
      methods: [method('attendance-present', 'markPresent', 'void'), method('attendance-absent', 'markAbsent', 'void'), method('attendance-calc', 'calculatePercentage', 'double'), method('attendance-status-method', 'getAttendanceStatus', 'String')],
    },
    {
      id: 'enrollment', name: 'Enrollment', kind: 'class', position: { x: 535, y: 450 },
      attributes: [attribute('enrollment-id', 'enrollmentId', 'int'), attribute('enrollment-date', 'enrollmentDate', 'String'), attribute('enrollment-student', 'studentId', 'int'), attribute('enrollment-course', 'courseId', 'String'), attribute('enrollment-status', 'status', 'String')],
      methods: [method('enrollment-enroll', 'enroll', 'void'), method('enrollment-drop', 'dropCourse', 'void'), method('enrollment-status-method', 'getEnrollmentStatus', 'String')],
    },
    {
      id: 'result', name: 'Result', kind: 'class', position: { x: 1010, y: 450 },
      attributes: [attribute('result-id', 'resultId', 'int'), attribute('result-student', 'studentId', 'int'), attribute('result-course', 'courseId', 'String'), attribute('result-marks', 'marks', 'double'), attribute('result-grade', 'grade', 'String')],
      methods: [method('result-grade-method', 'calculateGrade', 'String'), method('result-percent', 'calculatePercentage', 'double'), method('result-get', 'getResult', 'double'), method('result-gpa', 'calculateGPA', 'double')],
    },
  ],
  relationships: [
    { id: 'student-enrollment', source: 'student', target: 'enrollment', type: 'association' },
    { id: 'student-course', source: 'student', target: 'course', type: 'association' },
    { id: 'faculty-course', source: 'faculty', target: 'course', type: 'association' },
    { id: 'student-attendance', source: 'student', target: 'attendance', type: 'association' },
    { id: 'course-attendance', source: 'course', target: 'attendance', type: 'association' },
    { id: 'student-result', source: 'student', target: 'result', type: 'association' },
    { id: 'course-result', source: 'course', target: 'result', type: 'association' },
  ],
}
