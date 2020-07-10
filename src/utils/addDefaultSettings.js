// adds any missing default settings, e.g. if the course is new
// or a new setting has been added to the product
export default function addDefaultSettings(course) {
  // define default settings
  const defaultSettings = {
    collectEmails: true,
    showScore: true,
  };

  // get existing user settings, if any
  const userSettings = course.settings || {};

  // overwrite any defaults with existing user settings
  const updatedCourse = {
    ...course,
    settings: { ...defaultSettings, ...userSettings },
  };

  // return updated course object
  return updatedCourse;
}
