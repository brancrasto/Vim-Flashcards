import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { vim } from "@replit/codemirror-vim"

const vimChallenges = [
	[
		{
			"id": 2,
			"buggyCode": "int main() {\n    printf('Hello, world!');\n}",
			"description": "The printf statement uses incorrect string delimiters.",
			"fixedCode": "int main() {\n    printf(\"Hello, world!\");\n}"
		}
	]
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
		console.log("Correct");
		document.querySelector(".description").innerHTML = "Correct";
	} else {
		console.log("Fail");
		document.querySelector(".description").innerHTML = "Fail";
	}
}

vimChallenges.forEach((challengeGroup) => {
	challengeGroup.forEach((challenge) => {
		loadChallenge(challenge);

		document.getElementById('checkBtn').addEventListener('click', () => {
			checkSolution(challenge);
		});
	})
})
