import React, { useState, ChangeEvent } from "react";

interface Question {
    q: string;
    a: string;
    choices: string[];
    points: number;
}

export default function Create() {
    const [tests, setTests] = useState<Question[][]>([
        [
            {
                q: "",
                a: "",
                choices: ["", "", "", ""],
                points: 1,
            },
        ],
    ]);
    const [errors, setErrors] = useState<string[]>([]);

    const handleQuestionChange = (
        testIndex: number,
        questionIndex: number,
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setTests((prevTests) => {
            const updatedTests = [...prevTests];
            updatedTests[testIndex][questionIndex].q = event.target.value;
            return updatedTests;
        });
    };

    const handleChoiceChange = (
        testIndex: number,
        questionIndex: number,
        choiceIndex: number,
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setTests((prevTests) => {
            const updatedTests = [...prevTests];
            updatedTests[testIndex][questionIndex].choices[choiceIndex] =
                event.target.value;
            return updatedTests;
        });
    };

    const handleCorrectAnswerSelect = (
        testIndex: number,
        questionIndex: number,
        choiceValue: string
    ) => {
        setTests((prevTests) => {
            const updatedTests = [...prevTests];
            updatedTests[testIndex][questionIndex].a = choiceValue;
            return updatedTests;
        });
    };

    const addNewQuestion = (testIndex: number) => {
        setTests((prevTests) => {
            const updatedTests = [...prevTests];
            updatedTests[testIndex] = [
                ...updatedTests[testIndex],
                { q: "", a: "", choices: ["", "", "", ""], points: 1 },
            ];
            return updatedTests;
        });
    };

    const addNewTest = () => {
        setTests((prevTests) => [
            ...prevTests,
            [
                {
                    q: "",
                    a: "",
                    choices: ["", "", "", ""],
                    points: 1,
                },
            ],
        ]);
    };

    const validateInputs = () => {
        setErrors([]);
        let isValid = true;

        tests.forEach((test, testIndex) => {
            test.forEach((question, questionIndex) => {
                if (!question.q.trim()) {
                    setErrors((e) => [
                        ...e,
                        `Question ${questionIndex + 1} in Test ${
                            testIndex + 1
                        } is missing.`,
                    ]);
                    isValid = false;
                }
                question.choices.forEach((choice, choiceIndex) => {
                    if (!choice.trim()) {
                        setErrors((e) => [
                            ...e,
                            `Choice ${choiceIndex + 1} for Question ${
                                questionIndex + 1
                            } in Test ${testIndex + 1} is missing.`,
                        ]);
                        isValid = false;
                    }
                });
                if (!question.a) {
                    setErrors((e) => [
                        ...e,
                        `No correct answer selected for Question ${
                            questionIndex + 1
                        } in Test ${testIndex + 1}.`,
                    ]);
                    isValid = false;
                }
            });
        });

        if (!isValid) {
            console.log(errors);
        }

        return isValid;
    };

    async function createTask(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (validateInputs()) {
            console.log("Form data:", tests);
            // Proceed with form submission or further processing
        }
    }

    return (
        <>
            <h1>Create a new task</h1>

            <form onSubmit={createTask}>
                <div>
                    <div>
                        <input type="text" placeholder="Task Name" />
                    </div>

                    <div>
                        <select name="type" id="type">
                            <option value="act">Activity</option>
                            <option value="assessment">Assessment</option>
                            <option value="exam">Exam</option>
                        </select>
                    </div>

                    <div>
                        <input type="text" placeholder="Subject Code" />
                    </div>
                </div>

                {/* Render all tests */}
                {tests.map((test, testIndex) => (
                    <div key={testIndex} className="border-gray-300">
                        <br />
                        <h2>Test {testIndex + 1}</h2>
                        {test.map((question, questionIndex) => (
                            <div key={questionIndex}>
                                <br />
                                <label
                                    htmlFor={`question-${testIndex}-${questionIndex}`}
                                >
                                    Question {questionIndex + 1}
                                </label>
                                <input
                                    type="text"
                                    id={`question-${testIndex}-${questionIndex}`}
                                    placeholder="Question"
                                    value={question.q}
                                    onChange={(e) =>
                                        handleQuestionChange(
                                            testIndex,
                                            questionIndex,
                                            e
                                        )
                                    }
                                />
                                <br />
                                <h4>Choices</h4>
                                {question.choices.map((choice, choiceIndex) => (
                                    <div key={choiceIndex}>
                                        <label
                                            htmlFor={`choice-${testIndex}-${questionIndex}-${choiceIndex}`}
                                        >
                                            Choice {choiceIndex + 1}
                                        </label>
                                        <input
                                            type="text"
                                            id={`choice-${testIndex}-${questionIndex}-${choiceIndex}`}
                                            placeholder={`Choice ${
                                                choiceIndex + 1
                                            }`}
                                            value={choice}
                                            onChange={(e) =>
                                                handleChoiceChange(
                                                    testIndex,
                                                    questionIndex,
                                                    choiceIndex,
                                                    e
                                                )
                                            }
                                        />
                                        <input
                                            type="radio"
                                            name={`correct-answer-${testIndex}-${questionIndex}`}
                                            checked={question.a === choice}
                                            onChange={() =>
                                                handleCorrectAnswerSelect(
                                                    testIndex,
                                                    questionIndex,
                                                    choice
                                                )
                                            }
                                        />
                                    </div>
                                ))}
                                <br />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addNewQuestion(testIndex)}
                            className="primary-btn"
                        >
                            Add Question
                        </button>
                        <br />
                    </div>
                ))}
                <br />
                <button
                    type="button"
                    onClick={addNewTest}
                    className="primary-btn"
                >
                    Add Test
                </button>
                <br />
                <button type="submit" className="primary-btn">
                    Create
                </button>
            </form>
        </>
    );
}
