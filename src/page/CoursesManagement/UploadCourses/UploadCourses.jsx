// import './UploadCourses.css';
// import React, { useState } from 'react';

// const QuizCreator = () => {
//   const [questions, setQuestions] = useState([]);
//   const [coursesName, setCoursesName] = useState('');
//   const [coursesDescription, setCoursesDescription] = useState('');

//   const handleQuestionChange = (e, questionIndex) => {
//     const { name, value } = e.target;
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex] = {
//       ...updatedQuestions[questionIndex],
//       [name]: value,
//     };
//     setQuestions(updatedQuestions);
//   };

//   const handleChoiceChange = (e, questionIndex, choiceIndex) => {
//     const { value } = e.target;
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].choices[choiceIndex] = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleAddQuestion = () => {
//     setQuestions([...questions, { title: '', choices: ['', '', '', ''] }]);
//   };

//   const handleRemoveQuestion = (index) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions.splice(index, 1);
//     setQuestions(updatedQuestions);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle the submission of questions
//     console.log(questions);
//   };

//   return (
//     <div className="upload-courses-page">
//         <div className="upload-courses-container">
//       <h1>Create courses</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="upload-courses-name-and-description">
//           <label> Courses name</label>
//           <input
//             type="text"
//             id="courses-name"
//             value={coursesName}
//             onChange={(e) => setCoursesName(e.target.value)}
//           />
//           <label> Courses Description</label>
//           <input
//             type="text"
//             id="courses-description"
//             value={coursesDescription}
//             onChange={(e) => setCoursesDescription(e.target.value)}
//           />
//         </div>
//         {questions.map((question, questionIndex) => (
//           <div key={questionIndex}>
//             <label>Question {questionIndex + 1}</label>
//             <input
//               type="text"
//               name="title"
//               value={question.title}
//               onChange={(e) => handleQuestionChange(e, questionIndex)}
//             />
//             <label>Choices:</label>
//             {question.choices.map((choice, choiceIndex) => (
//               <input
//                 key={choiceIndex}
//                 type="text"
//                 id="question-choice"
//                 name={`choices[${choiceIndex}]`}
//                 value={choice}
//                 onChange={(e) =>
//                   handleChoiceChange(e, questionIndex, choiceIndex)
//                 }
//               />
//             ))}
//             <button
//               type="button"
//               onClick={() => handleRemoveQuestion(questionIndex)}
//               id="btn-remove-question"
//             >
//               Remove this question
//             </button>
//             <hr />
//           </div>
//         ))}
//         <button type="button" onClick={handleAddQuestion} id="btn-add-question">
//           Add Question
//         </button>

//         <div className='button-create-courses'>
//         <button type="submit" id="btn-create-courses">
//           Create Courses
//         </button>
//         </div>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default QuizCreator;
