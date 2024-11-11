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
        const updatedTests = [...tests];
        updatedTests[testIndex][questionIndex].q = event.target.value;
        setTests(updatedTests);
    };

    const handleChoiceChange = (
        testIndex: number,
        questionIndex: number,
        choiceIndex: number,
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const updatedTests = [...tests];
        updatedTests[testIndex][questionIndex].choices[choiceIndex] =
            event.target.value;
        setTests(updatedTests);
    };

    const handleCorrectAnswerSelect = (
        testIndex: number,
        questionIndex: number,
        choiceValue: string
    ) => {
        const updatedTests = [...tests];
        updatedTests[testIndex][questionIndex].a = choiceValue;
        setTests(updatedTests);
    };

    const addNewQuestion = (testIndex: number) => {
        setTests((prevTests) => {
            const updatedTests = [...prevTests];
            updatedTests[testIndex].push({
                q: "",
                a: "",
                choices: ["", "", "", ""],
                points: 1,
            });
            return updatedTests;
        });
    };

    const deleteQuestion = (testIndex: number, questionIndex: number) => {
        setTests((prevTests) => {
            const updatedTests = [...prevTests];
            updatedTests[testIndex].splice(questionIndex, 1);
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

    const deleteTest = (testIndex: number) => {
        setTests((prevTests) =>
            prevTests.filter((_, index) => index !== testIndex)
        );
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
            <h1 className="text-2xl font-bold mb-4">Create a new task</h1>

            <form
                onSubmit={createTask}
                className="border p-4 rounded-lg border-gray-300"
            >
                <div className="mb-4">
                    <div className="mb-2">
                        <input
                            type="text"
                            placeholder="Task Name"
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                    </div>

                    <div className="mb-2">
                        <select
                            name="type"
                            id="type"
                            className="border border-gray-300 p-2 rounded w-full"
                        >
                            <option value="act">Activity</option>
                            <option value="assessment">Assessment</option>
                            <option value="exam">Exam</option>
                        </select>
                    </div>

                    <div className="mb-2">
                        <input
                            type="text"
                            placeholder="Subject Code"
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                    </div>
                </div>

                {/* Render all tests */}
                {tests.map((test, testIndex) => (
                    <div
                        key={testIndex}
                        className="border border-gray-300 p-4 rounded-lg mb-4"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-semibold">
                                Test {testIndex + 1}
                            </h2>
                            <button
                                type="button"
                                onClick={() => deleteTest(testIndex)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Delete Test
                            </button>
                        </div>
                        {test.map((question, questionIndex) => (
                            <div
                                key={questionIndex}
                                className="border border-gray-200 p-4 rounded-lg mb-4"
                            >
                                <div className="flex justify-between items-center">
                                    <label
                                        htmlFor={`question-${testIndex}-${questionIndex}`}
                                        className="font-medium"
                                    >
                                        Question {questionIndex + 1}
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            deleteQuestion(
                                                testIndex,
                                                questionIndex
                                            )
                                        }
                                        className="bg-red-500 text-white p-1 rounded"
                                    >
                                        Delete Question
                                    </button>
                                </div>
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
                                    className="border border-gray-300 p-2 rounded w-full mt-2"
                                />
                                <h4 className="font-medium mt-3">Choices</h4>
                                {question.choices.map((choice, choiceIndex) => (
                                    <div
                                        key={choiceIndex}
                                        className="flex items-center mt-2"
                                    >
                                        <label
                                            htmlFor={`choice-${testIndex}-${questionIndex}-${choiceIndex}`}
                                            className="mr-2"
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
                                            className="border border-gray-300 p-2 rounded mr-2"
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
                                            className="ml-2"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addNewQuestion(testIndex)}
                            className="bg-blue-500 text-white p-2 rounded mt-2"
                        >
                            Add Question
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addNewTest}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Add Test
                </button>
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded mt-4"
                >
                    Create
                </button>
            </form>
        </>
    );
}
