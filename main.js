/* All answer options */
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

      /*All our options */
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); //same question

const numberOfQuestion = document.getElementById('number-of-question'), //number question
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); // number all questions

let indexOfQuestion, //index current question
    indexOfPage = 0; //index page

const answersTracker = document.getElementById('answers-tracker'); //wrapper for tracker
const btnNext = document.getElementById('btn-next'); //button next

let score = 0; //total result qestionary

const correctAnswer = document.getElementById('correct-answer'), // quantity correct answer
    numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), // number all question modal
    btnTryAgain = document.getElementById('btn-try-again'); //button -run qestionary again

const questions = [
    {
        question: 'What is the difference between const and let?',
        options: [
            'const - not part of JavaScript',
            'The const declaration specifies a constant, that is, a value that cannot be changed',
            'Variables declared with const are in the global scope',
            'There is no difference',
        ],
        rightAnswer: 1
    },
    {
        question: 'How can you check if a is a multiple of b?',
        options: [
            'a % b > 0',
            'a / b === 0',
            'b % a === 0',
            'a % b === 0',
        ],
        rightAnswer: 3  
    },
    {
        question: 'How does JavaScript find out the data type of variable a?',
        options: [
            'typeof a',
            'a.type',
            'type(a)',
            'type a',
        ],
        rightAnswer: 0  
    },
    {
        question: 'Which operator terminates the current function and returns its value?',
        options: [
            'break',
            'case',
            'return',
            'continue',
        ],
        rightAnswer: 2  
    }
];

numberOfAllQuestions.innerHTML = questions.length; //out number questions

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; //question

    //sort answer
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // setting page number
    indexOfPage++; // page index increment
};

let completedAnswers = [] //array for completed answers

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // anchor to check the same questions

    if(indexOfPage == questions.length) {
        quizOver()
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            }else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
};
// delete all class all answer
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);        
    })
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('You need to select an answer option!!');
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});