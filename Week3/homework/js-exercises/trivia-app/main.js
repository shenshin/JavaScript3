/*
Exercise 3: Trivia time!

Don't you just love trivia games? Let's make our own!

In this exercise you'll make use of the Open Trivia Database API. You are going to fetch 5 random trivia questions and then inject them into the DOM, inside of an accordion.
*/

// Make use of the following endpoint:
const triviaURL = 'https://opentdb.com/api.php?amount=5';

async function fetchTrivia(url) {
  const response = await fetch(url);
  const trivia = await response.json();
  return trivia.results;
}

/* 
Sometimes the strings you get back from the API contains HTML entities (like &quote;). Find out a way to turn this into regular text
*/

/* I believe, the best way to do it is just to set 'innerHTML' property
of the updated element to those entities. */

/* Another very similar way to do it is to use DOM. I could create a
function like this:
*/
/* function htmlDecode(html) {
  const temp = document.createElement('p');
  temp.innerHTML = html;
  return temp.innerText;
} */
/* 
There is another way, but I don't like it. It's about using side library like 'he'.
I downloaded it and used below.
*/

function addQuestionToNode(node, record) {
  const questionNode = document.createElement('div');
  questionNode.classList.add('trivia', 'trivia-question');
  questionNode.innerText = he.decode(record.question);
  const answerNode = document.createElement('div');
  answerNode.classList.add('trivia', 'trivia-answer');
  answerNode.innerText = he.decode(record.correct_answer);
  node.append(questionNode, answerNode);

  // show - hide the answer
  let collapsed = true;
  const expand = () => {
    answerNode.style.display = collapsed ? 'block' : 'none';
    collapsed = !collapsed;
  };
  questionNode.addEventListener('click', expand);
  answerNode.addEventListener('click', expand);
}

fetchTrivia(triviaURL).then(trivia => {
  const trivaHolder = document.getElementById('trivia-collection');
  trivia.forEach(record => {
    addQuestionToNode(trivaHolder, record);
  });
});
