export default function getAllSubmissionsCsvData(userCourses, courseItems) {
  if (!userCourses) return null;

  let headers = courseItems
    // only interested in answerable items
    .filter((item) => "solution" in item)
    .map((item) => ({
      label: item.title || item.prompt,
      key: item.id,
    }));

  // get keys for all answerable items
  const headerKeys = headers.map((header) => header.key);

  let data = [];
  userCourses.forEach((userCourse) => {
    let userData = {};
    userCourse.userItems
      // only keep responses for answerable items
      .filter((userItem) => headerKeys.includes(userItem.itemId))
      .forEach((userItem) => {
        userData = {
          ...userData,
          [userItem.itemId]: userItem.answer,
        };
      });
    data.push(userData);
  });

  return { headers, data };
}
