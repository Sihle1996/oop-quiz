var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
  data: [
    {
      q: "OOP stands for :",
      o: [
        "Object observed Paradim",
        "Open ordained parallel",
        "Observation Oriented procedure",
        "Object Oriented programming",
      ],
      a: 3,
    },
    {
      q: "What term relates to polymorphism ?",
      o: [
        "Dynamic binding",
        "Static typing",
        "Dynamic allocation",
        "Static alloction",
      ],
      a: 0,
    },
    {
      q: "What is the process by which one can acquire the properties of another object ?",
      o: ["Encapsulation", "Inheritance", "Polymorphism"],
      a: 1,
    },
    {
      q: "Information hiding can also be termed as what ?",
      o: ["Inheritance", "Encapsulation", "Data hiding", "Polymorphism"],
      a: 2,
    },
    {
      q: "What are constructors used for ?",
      o: [
        "Free memory",
        "To build a user interface",
        "Initialize a newly created object",
        "To create a sub-class",
      ],
      a: 2,
    },
    {
      q: "Which is the Keyword that is used to access the method variables from the sub-class ?",
      o: ["is_a", "Has_a", "Super", "Using"],
      a: 2,
    },
    {
      q: "An object that has more than one form is referred to as what ?",
      o: ["Abstract class", "Inheritance", "Polymorphism", "Interface"],
      a: 2,
    },
    {
      q: "The main method can be overhidden",
      o: ["True", "False", "Maybe", "All of the above"],
      a: 1,
    },

    {
      q: "Choose an Object Oriented Programming language from the following:",
      o: ["HTML", "Visual Basic", "English", "Java"],
      a: 3,
    },
    {
      q: "What is an Object ?",
      o: [
        "An instane of a class",
        "A blueprint",
        "Anything you want",
        "All of the above",
      ],
      a: 0,
    },
  ],

  // (A2) HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score

  // (B) INIT QUIZ HTML
  init: () => {
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    // (B2) QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // (B4) GO!
    quiz.draw();
  },

  // (C) DRAW QUESTION
  draw: () => {
    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => {
        quiz.select(label);
      });
      quiz.hAns.appendChild(label);
    }
  },

  // (D) OPTION SELECTED
  select: (option) => {
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }

    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) {
        quiz.draw();
      } else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },

  // (E) RESTART QUIZ
  reset: () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  },
};
  window.addEventListener("load", quiz.init);
  