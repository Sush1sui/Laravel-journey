import React, { useState, ChangeEvent } from "react";

interface Question {
    q: string;
    a: string; // This will store the correct answer value directly from the selected choice
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
        index: number,
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const updatedTests = [...tests];
        updatedTests[0][index].q = event.target.value;
        setTests(updatedTests);
    };

    const handleChoiceChange = (
        questionIndex: number,
        choiceIndex: number,
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const updatedTests = [...tests];
        updatedTests[0][questionIndex].choices[choiceIndex] =
            event.target.value;
        setTests(updatedTests);
    };

    const handleCorrectAnswerSelect = (
        questionIndex: number,
        choiceValue: string
    ) => {
        const updatedTests = [...tests];
        updatedTests[0][questionIndex].a = choiceValue; // Set the correct answer to the choice's value
        setTests(updatedTests);
    };

    const addNewQuestion = () => {
        setTests((prevTests) => [
            [
                ...prevTests[0],
                { q: "", a: "", choices: ["", "", "", ""], points: 1 },
            ],
        ]);
    };

    // Validation function to check for blank inputs
    const validateInputs = () => {
        setErrors([]);
        let isValid = true;
        let errorMessages: string[] = [];

        tests[0].forEach((question, index) => {
            if (!question.q.trim()) {
                setErrors((e) => [...e, `Question ${index + 1} is missing.`]);
                isValid = false;
            }
            question.choices.forEach((choice, choiceIndex) => {
                if (!choice.trim()) {
                    setErrors((e) => [
                        ...e,
                        `Choice ${choiceIndex + 1} for Question ${
                            index + 1
                        } is missing.`,
                    ]);
                    isValid = false;
                }
            });
            if (!question.a) {
                setErrors((e) => [
                    ...e,
                    `No correct answer selected for Question ${index + 1}.`,
                ]);
                isValid = false;
            }
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

                {/* Render all questions */}
                <div>
                    {tests[0].map((question, index) => (
                        <div key={index + 1}>
                            <br />
                            <div>
                                <label htmlFor={`${index + 1}`}>
                                    {index + 1}
                                </label>
                                <input
                                    type="text"
                                    name="q"
                                    id={`${index + 1}`}
                                    placeholder="Question"
                                    value={question.q}
                                    onChange={(e) =>
                                        handleQuestionChange(index, e)
                                    }
                                />
                                <br />
                                <h4>Choices</h4>
                                <br />
                                {question.choices.map((choice, choiceIndex) => (
                                    <div key={choiceIndex}>
                                        <label
                                            htmlFor={`choice-${index}-${choiceIndex}`}
                                        >
                                            Choice {choiceIndex + 1}
                                        </label>
                                        <input
                                            type="text"
                                            id={`choice-${index}-${choiceIndex}`}
                                            placeholder={`Choice ${
                                                choiceIndex + 1
                                            }`}
                                            value={choice}
                                            onChange={(e) =>
                                                handleChoiceChange(
                                                    index,
                                                    choiceIndex,
                                                    e
                                                )
                                            }
                                        />
                                        <input
                                            type="radio"
                                            name={`correct-answer-${index}`}
                                            checked={question.a === choice}
                                            onChange={() =>
                                                handleCorrectAnswerSelect(
                                                    index,
                                                    choice
                                                )
                                            }
                                        />
                                        <br />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="primary-btn"
                        onClick={addNewQuestion}
                    >
                        Add Question
                    </button>
                </div>

                <br />
                <button className="primary-btn">Create</button>
            </form>
        </>
    );
}
