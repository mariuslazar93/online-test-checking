import './scss/styles.scss';

// padEnd polyfill
if (!String.prototype.padEnd) {
  String.prototype.padEnd = function padEnd(targetLength,padString) {
      targetLength = targetLength>>0; //floor if number or convert non-number to 0;
      padString = String((typeof padString !== 'undefined' ? padString : ' '));
      if (this.length > targetLength) {
          return String(this);
      }
      else {
          targetLength = targetLength-this.length;
          if (targetLength > padString.length) {
              padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
          }
          return String(this) + padString.slice(0,targetLength);
      }
  };
}

// correct answers
const defaultAnswers = 'CBCABCBAABBACCBABCBACACABBBAACBCCABAAABBCCDBADABCDCBCADACCBABBCCDADCADBBBACAADADABADCCCABBDBBDBABBCDBDCCCACDCBADCDDADBCA';
const examCorrectAnsweres = document.getElementById('exam-correct-answers');
const examCorrectAnswersCounter = document.getElementById('exam-correct-answers-counter');
const examCorrectAnswersReset = document.getElementById('exam-correct-answers-reset');

// responses
const examResponses = document.getElementById('exam-responses');
const examResponsesCounter = document.getElementById('exam-responses-counter');
const examResponsesReset = document.getElementById('exam-responses-reset');

// results
const resultsElem = document.getElementById('results');

// Handle typing correct answers
examCorrectAnsweres.addEventListener('input', () => {
  examCorrectAnswersCounter.innerHTML = `There are <strong>${examCorrectAnsweres.value.length}</strong> answers`;
});
// Trigger the input event to show the initial count
examCorrectAnsweres.dispatchEvent(new Event('input'));

// Handle reset btn
examCorrectAnswersReset.addEventListener('click', (event) => {
  event.preventDefault();
  examCorrectAnsweres.value = '';
  examCorrectAnswersCounter.innerHTML = '';
  resultsElem.innerHTML = '';
});

// Handle typing responses
examResponses.addEventListener('input', (e) => {
  const responses = examResponses.value;
  examResponsesCounter.innerHTML = `You have typed <strong>${responses.length}</strong> answers`;
  if (!examCorrectAnsweres.value.length) return;
  const results = getResult(responses);
  resultsElem.innerHTML = `Correct answers: ${results.correctAnswers}/${results.totalAnswers}<br/>`;
});

// Handle reset btn
examResponsesReset.addEventListener('click', (event) => {
  event.preventDefault();
  examResponses.value = '';
  examResponsesCounter.innerHTML = '';
  resultsElem.innerHTML = '';
});

// Calculates the number of correct answers
const getResult = (responsesStr) => {
  const correctAnswersStr = examCorrectAnsweres.value;
  const upperCaseCorrectAnswersStr = correctAnswersStr.toUpperCase();
  const correctAnswersArr = upperCaseCorrectAnswersStr.split('');

  // Fill the responses string with blanks
  // to match the length of the correct answers string
  if (responsesStr.length < correctAnswersStr.length) {
    responsesStr = responsesStr.padEnd(correctAnswersStr.length, '-');
  }

  const upperCaseResponsesStr = responsesStr.toUpperCase();
  const responsesArr = upperCaseResponsesStr.split('');
  let ct = 0;
  const result = responsesArr.map((letter, index) => {
      if (letter === correctAnswersArr[index]) {
          ct++;
      }
      return letter === correctAnswersArr[index] ? 1 : 0;
  });

  return {
    correctAnswers: ct,
    totalAnswers: correctAnswersArr.length,
  };
}