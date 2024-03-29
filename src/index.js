import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { vim } from "@replit/codemirror-vim"

const vimChallenges = [
    {
        "id": 1,
        "buggyCode": "<html>\n<head>\n<title>My Website</tile>\n</head>\n<body>\n<h1>Welcome to my website</h1>\n</body>\n</html>",
        "description": "The closing tag for the title element is misspelled.",
        "fixedCode": "<html>\n<head>\n<title>My Website</title>\n</head>\n<body>\n<h1>Welcome to my website</h1>\n</body>\n</html>"
    },
    {
        "id": 2,
        "buggyCode": "body {\n    font-family: sans-serif\n    background-color: #f0f0f0;\n}",
        "description": "A semicolon is missing at the end of the font-family property.",
        "fixedCode": "body {\n    font-family: sans-serif;\n    background-color: #f0f0f0;\n}"
    },
    {
        "id": 3,
        "buggyCode": "function greet(name) {\n    console.log('Hello, ' + name)\n}",
        "description": "Replace the string concatenation with a template literal.",
        "fixedCode": "function greet(name) {\n    console.log(`Hello, ${name}`)\n}"
    },
    {
        "id": 4,
        "buggyCode": "<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n<li>Item 3</ul>",
        "description": "The unordered list (ul) closing tag is missing.",
        "fixedCode": "<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n<li>Item 3</li>\n</ul>"
    },
    {
        "id": 5,
        "buggyCode": "document.getElementByID('myElement').innerText = 'Hello World';",
        "description": "Correct the method name to access an element by ID.",
        "fixedCode": "document.getElementById('myElement').innerText = 'Hello World';"
    }
];

const state = EditorState.create({
  extensions: [basicSetup, oneDark, vim()],
});

const editor = new EditorView({
  state,
  parent: document.getElementById('editor')
});

function loadChallenge(challenge) {
  document.querySelector(".description").innerHTML = challenge.description;
  editor.setState(EditorState.create({
    doc:challenge.buggyCode,
    extensions: [basicSetup, oneDark, vim()],
  }));
}

function checkSolution(challenge) {
  const userCode = editor.state.doc.toString();

  if (userCode === challenge.fixedCode) {
    document.querySelector(".description").innerHTML = "Correct";

    if (count < vimChallenges.length - 1) {
      count++;
      loadChallenge(vimChallenges[count]);
    } else {
      document.querySelector(".description").innerHTML = "All challenges completed!";
    }
  } else {
    document.querySelector(".description").innerHTML = "Try again";
  }
}

let count = 0
loadChallenge(vimChallenges[count]);

document.getElementById('checkBtn').addEventListener('click', () => {
  checkSolution(vimChallenges[count]);
});