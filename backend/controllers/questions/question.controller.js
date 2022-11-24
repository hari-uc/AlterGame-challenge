const DB = require("../../models");
const { Questions, Options, Other_answers, Dropdown } = DB;

exports.createQuestion = async (req, res) => {
  // const { question, question_type, surveyId } = req.body;

  // if(!surveyId){
  //     return res.status(400).send({
  //         message: "Survey Id is required"
  //     });
  // }

  // seperate each objects from array of objects using loop

  // get body array length
  const bodyLength = Object.keys(req.body).length;
  console.log(bodyLength);

  for (let i = 0; i < bodyLength; i++) {
    const { question, question_type, surveyId } = req.body[i];

    if(!question || !question_type ){
        return res.status(400).send({
            message: "Question and Question Type are required"
        });
    }   

    // create question
    const createQuestion = await Questions.create({
      question_type,
      question,
      surveyId,
    });

    // create options
    if (question_type === "option") {
      // get options array length
      const optionsLength = Object.keys(req.body[i].options).length;
      console.log("option length",optionsLength);
      // if option must be greater than 1 if not return
      if (optionsLength <= 1) {
        return res.status(400).send({
          message: "Option must be greater than 1",
        });
      }

      for (let j = 0; j < optionsLength; j++) {
        const option = req.body[i].options[j].value;

        const createOptions = await Options.create({
          surveyId: surveyId,
          questionId: createQuestion.questionId,
          option: option,
        });
      }
    }

    // create other answers
    if (question_type === "text") {
      const createOtherAnswers = await Other_answers.create({
        surveyId: surveyId,
        questionId: createQuestion.questionId,
        // answer: ""
      });
    }

    // create dropdown
    if (question_type === "dropdown") {
      // get dropdown array length
      const dropdownLength = Object.keys(req.body[i].dropdown).length;
      console.log("dropdown length", dropdownLength);

      if (dropdownLength <= 1) {
        console.log("condition true");
        return res.status(400).send({
          status: false,
          message: "Dropdown must be greater than 1",
        });
      }

      console.log("condition false");

      for (let j = 0; j < dropdownLength; j++) {
        const option = req.body[i].dropdown[j].value;
        console.log(JSON.stringify(option));
        const createDropdown = await Dropdown.create({
          surveyId: surveyId,
          questionId: createQuestion.questionId,
          dropdown: option,
        });
      }
    }
  }

  res.status(200).send({
    message: "Question created successfully",
  });
};
