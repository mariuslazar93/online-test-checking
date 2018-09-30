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


const examForm = document.getElementById('exam-form');
const examResponses = document.getElementById('exam-responses');
const examResponsesCounter = document.getElementById('exam-responses-counter');
const resultsElem = document.getElementById('results');

// Handle submit btn
examForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const responses = examForm.elements['exam-responses'].value;
  const results = getResult(responses);
  resultsElem.innerHTML = `Correct answers: ${results.correctAnswers}/${results.totalAnswers}<br/>`;
});

// Handle reset btn
examForm.addEventListener('reset', (event) => {
  event.preventDefault();
  examForm.elements['exam-responses'].value = '';
  resultsElem.innerHTML = '';
  examResponsesCounter.innerHTML = '';
});

// Handle typing in the form
examResponses.addEventListener('input', () => {
  examResponsesCounter.innerHTML = `You have typed <strong>${examResponses.value.length}</strong> answers`;
});


// Calculates the number of correct answers
const getResult = (responsesStr) => {
  const correctAnswersStr = 'CBCABCBAABBACCBABCBACACABBBAACBCCABAAABBCCDBADABCDCBCADACCBABBCCDADCADBBBACAADADABADCCCABBDBBDBABBCDBDCCCACDCBADCDDADBCA';
  const ansArr = correctAnswersStr.split('');

  // Fill the responses string with blanks
  // to match the length of the correct answers string
  if (responsesStr.length < correctAnswersStr.length) {
    responsesStr = responsesStr.padEnd(correctAnswersStr.length, 'x');
  }

  const upperCaseResponsesStr = responsesStr.toUpperCase();
  const arr = upperCaseResponsesStr.split('');
  let ct = 0;
  const result = arr.map((letter, index) => {
      if (letter === ansArr[index]) {
          ct++;
      }
      return letter === ansArr[index] ? 1 : 0;
  });

  return {
    correctAnswers: ct,
    totalAnswers: arr.length,
    resultsArr: result,
  };
}