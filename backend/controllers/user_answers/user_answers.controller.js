const DB = require("../../models");
const { Users_answers, Survey, Questions, Options, Dropdown, User } = DB;

exports.createUsersAnswers = async (req, res) => {
  const { userId, surveyId, questionId, optionId, dropdownId } = req.body;

  if (!userId || !surveyId || !questionId) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }
  try {
    const newUsersAnswers = await Users_answers.create({
      userId,
      surveyId,
      questionId,
      optionId,
      dropdownId,
    }).catch((err) => {
      res.status(500).json({
        message:
          err.message ||
          "Some error occurred while creating the Users Answers.",
      });
    });

    res.status(200).json({
      status: true,
      message: "Users Answers created successfully",
      data: newUsersAnswers,
    });
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while creating the Users Answers.",
    });
  }
};

exports.getUsersAnswers = async (req, res) => {
  try {
    const usersAnswers = await Users_answers.findAll({
      where: { is_active: true },
    }).catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving Users Answers.",
      });
    });

    res.status(200).json({
      status: true,
      message: "Users Answers retrieved successfully",
      data: usersAnswers,
    });
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while retrieving Users Answers.",
    });
  }
};

exports.getUsersAnswersBySurveyId = async (req, res) => {
  const { surveyId } = req.body;

  if (!surveyId) {
    return res.status(400).json({
      message: "Survey Id is required",
    });
  }
  try {
    const usersAnswers = await Users_answers.findAll({
      where: { surveyId: surveyId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Survey,
          as: "survey",
          attributes: ["surveyName"],
        },
        {
          model: Questions,
          as: "question",
          attributes: ["question"],
        },
        {
          model: Options,
          as: "option",
          attributes: ["option"],
        },
        {
          model: Dropdown,
          as: "dropdown",
          attributes: ["dropdown"],
        },
      ],
    }).catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving Users Answers.",
      });
    });

    res.status(200).json({
      status: true,
      message: "Users Answers retrieved successfully",
      data: usersAnswers,
    });
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while retrieving Users Answers.",
    });
  }
};

//get user answers from an array and save it to the database

exports.saveUsersAnswersBulk = async (req, res) => {
  const { userId, surveyId, questions } = req.body;
  var surveyID;
  var userID;

  const usersAnswers = [];
  req.body.forEach((question) => {
    surveyID = question.surveyId;
    userID = question.userId;
    if (!question.questionId) {
      return res.status(400).json({
        message: "Question Id is required",
      });
    }

    const { questionId, userId, surveyId, optionId, dropdownId } = question;
    usersAnswers.push({
      userId,
      surveyId,
      questionId,
      optionId,
      dropdownId,
    });
  });

  try {

    // check if user has already answered the survey
    const userAnswers = await Users_answers.findOne({
        where: { userId: userID, surveyId: surveyID },
        }).catch((err) => {
        res.status(500).json({
            message:
            err.message || "Some error occurred while retrieving Users Answers.",
        });
        });

    if (userAnswers) {
        return res.status(400).json({
        message: "User has already answered the survey",
        });
    }

    // check weather the user exists
    const checkUser = await User.findOne({
        where: { userId: userID },
        }).catch((err) => {
        res.status(500).json({
            status: false,
            message:
            err.message || "Some error occurred while retrieving Users Answers.",
        });
        });

    if (!checkUser) {
        return res.status(400).json({
            status: false,
        message: "User Not found, kindly register to participate in the survey",
        });
    }




    const newUsersAnswers = await Users_answers.bulkCreate(usersAnswers).catch(
      (err) => {
        res.status(500).json({
            status:false,
          message:
            err.message ||
            "Some error occurred while creating the Users Answers.",
        });
      }
    );

    // get the survey amount and add to user
    const survey = await Survey.findOne({
      where: { surveyId: surveyID},
    }).catch((err) => {
        console.log(err)
    });

    // get survey_credit from survey table
    const surveyCredit = survey.survey_credit;
    console.log(userID,surveyID)
    // adding survey_credit to user
    const user = await User.findOne({
      where: { userId: userID },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // increment user credit
    const newCredit = user.wallet + surveyCredit;
    console.log(newCredit);

    // update user credit
    const updatedUser = await User.update(
      { wallet: newCredit },
      { where: { userId: userID } }
    ).catch((err) => {
      res.status(500).json({
        status: false,
        message: err.message || "Some error occurred while updating the User.",
      });
    });

    res.status(200).json({
      status: true,
      message: "Users Answers created successfully",
      data: newUsersAnswers,
    });
  } catch (err) {
    res.status(500).json({
        status:false,
      message:
        err.message || "Some error occurred while creating the Users Answers.",
    });
  }
};
