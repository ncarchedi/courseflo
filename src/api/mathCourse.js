export default {
  title: "Introduction to Intercepts",
  finalMessage: "Thanks for completing the course! We'll be in touch ✌️",
  content: [
    {
      id: "welcome",
      type: "text",
      title: "Welcome to our lesson on intercepts! 🙌",
      body:
        "Over the next few minutes, you'll learn what intercepts are and how to compute them from both graphs and formulas. Enjoy!",
    },
    {
      id: "introVideo",
      type: "video",
      title: "Watch this 6-minute video on intercepts",
      source: "https://www.youtube-nocookie.com/embed/LNSB0N6esPU",
    },
    {
      id: "howCompute",
      type: "multiSelect",
      prompt: "Which of the following describe(s) a $$y$$-intercept?",
      options: [
        "The value of $$x$$ for which $$y$$ equals $$0$$",
        "The value of $$y$$ for which $$x$$ equals $$0$$",
        "The point at which a line crosses the $$x$$-axis",
        "The point at which a line crosses the $$y$$-axis",
        "None of the above",
      ],
      solution: [
        "The value of $$y$$ for which $$x$$ equals $$0$$",
        "The point at which a line crosses the $$y$$-axis",
      ],
    },
    {
      id: "howCompute",
      type: "singleSelect",
      prompt:
        "Given the formula for a line, how do you compute the $$x$$-intercept?",
      options: [
        "Set $$y$$ equal to $$0$$ and solve for $$x$$",
        "Set $$x$$ equal to $$0$$ and solve for $$y$$",
        "Set both $$x$$ and $$y$$ equal to $$0$$",
        "None of the above",
      ],
      solution: "Set $$y$$ equal to $$0$$ and solve for $$x$$",
    },
    {
      id: "linePlot",
      type: "image",
      title: "Here's a plot of $$y = -2x - 6$$ ...",
      source:
        "https://storage.googleapis.com/course-builder-test-bucket/linePlot.png",
    },
    {
      id: "xIntercept",
      type: "singleSelect",
      prompt: "What's the $$x$$-intercept of this line?",
      options: ["$$-6$$", "$$-3$$", "$$0$$", "$$3$$", "$$6$$"],
      solution: "$$-3$$",
    },
    {
      id: "yIntercept",
      type: "textInput",
      prompt: "What's the $$y$$-intercept of the line above?",
      solution: "-6",
    },
    {
      id: "x-intercept2",
      type: "textInput",
      prompt: "What's the $$x$$-intercept of $$y = \\frac{1}{2}x + 4$$ ?",
      solution: "-8",
    },
    {
      id: "linePlot2",
      type: "image",
      title: "Here's one more line...",
      source:
        "https://storage.googleapis.com/course-builder-test-bucket/linePlot2.png",
    },
    {
      id: "pickFormula",
      type: "singleSelect",
      prompt: "Which of the following formulas describes this line?",
      options: [
        "$$-\\frac{2}{3}x + 3$$",
        "$$-\\frac{2}{3}x - 3$$",
        "$$\\frac{2}{3}x + 3$$",
        "$$\\frac{2}{3}x - 3$$",
      ],
      solution: "$$\\frac{2}{3}x - 3$$",
    },
  ],
};
