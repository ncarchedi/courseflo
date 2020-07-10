export default function duplicateCourse(course) {
  // make a copy of the original course
  const newCourse = { ...course };
  // remove the ID, since we'll generate a new one
  delete newCourse.id;
  // return the new course with updated title
  return {
    ...newCourse,
    title: "Copy of " + newCourse.title,
  };
}
