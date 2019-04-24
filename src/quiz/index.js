import React from 'react';
import getQuestions from '../app/questions';
import Question from './question';
import './index.css';

class Quiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isError: false,
            questions: [],
            currentQuestion: 0,
            score: 0,
            canProceed: false,
            completed: false
        };
    }

    componentDidMount() {
        this.fetchQuestions();
    }

    restartGame = () => {
        this.setState({
            isLoading: false,
            isError: false,
            questions: [],
            currentQuestion: 0,
            score: 0,
            canProceed: false,
            completed: false
        })

        this.fetchQuestions();
    }

    render() {

        const {
            currentQuestion,
            canProceed,
            score,
            completed,
            questions,
            isLoading,
            isError
        } = this.state;
        const style = {
            'textAlign': 'center'
        }

        return (
            <div>
                {completed && <div className='wrapper'/>}
                <header>
                    <span className='logo'>Trivia Quiz</span>

                    {completed && < span className = 'restart-button' onClick = {
                        this.restartGame
                    } > Restart < /span>}

                    <span className='score'>{`Score : ${score * 10}`}</span>

                </header>

                <div className='content'>
                    {isLoading && <h1 style={style}>Loading...</h1>}
                    {isError && <h1 style={style}>Please check your Network connection.</h1>}

                    {!isLoading && !isError && this._renderHeader()}
                    {questions.length > 0 && <Question
                        question={questions[currentQuestion]}
                        answerSelected={this
                        ._answerSelected
                        .bind(this)}/>
}

                    {canProceed && <a className='next-button' onClick={this._nextQuestion}>Next Question</a>}
                </div>
            </div>
        );
    }

    fetchQuestions = () => {
        this.setState({isLoading: true});
        getQuestions().then((questions) => {
            if (questions == undefined) {
                this.setState({isError: true, isLoading: false});

            } else {
                this.setState({questions: questions, isLoading: false})

            }
        })
    }
    _renderHeader = () => {
        const {currentQuestion, score, questions} = this.state;

        return (
            <div className='quiz-header'>
                <p>{`Question ${currentQuestion + 1} of ${questions.length}`}</p>
            </div>
        )
    }

    _answerSelected = (isCorrect) => {
        const {currentQuestion, questions} = this.state;
        let completed = false;

        if (currentQuestion == questions.length - 1) {
            completed = true;
        }

        const score = this.state.score + (isCorrect
            ? 1
            : 0);
        this.setState({
            score,
            canProceed: currentQuestion < questions.length - 1,
            completed: completed
        });

    }

    _nextQuestion = () => {
        this.setState({
            currentQuestion: this.state.currentQuestion + 1,
            canProceed: false
        })
    }
}

export default Quiz;