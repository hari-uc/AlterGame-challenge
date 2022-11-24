const DB = require("../../models");
const { Survey, Questions, Options, Other_answers, Dropdown } = DB;

exports.createSurvey = async (req, res) => {
  const { surveyName, survey_credit, userId } = req.body;

  if (!surveyName || !survey_credit) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }
  try {
    const newSurvey = await Survey.create({
      surveyName,
      survey_credit,
      userId
    }).catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Survey.",
      });
    });

    res.status(200).json({
      status: true,
      message: "Survey created successfully",
      data: newSurvey,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Survey.",
    });
  }
};


exports.getSurvey = async (req, res) => {
    try {
        const survey = await Survey.findAll({
        where: { is_active: true },
        }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Survey.",
        });
        });
    
        res.status(200).json({
        status: true,
        message: "Survey retrieved successfully",
        data: survey,
        });
    } catch (err) {
        res.status(500).json({
        message: err.message || "Some error occurred while retrieving Survey.",
        });
    }
    };


exports.updateSurvey = async (req, res) => {
    const { surveyName, survey_credit, surveyId} = req.body;
    
    try {
        if(!surveyId){
            return res.status(400).json({
                message: "Please provide survey id to update",
            });
        }



        const survey = await Survey.update(
        {
            surveyName,
            survey_credit,
        },
        {
            where: {surveyId:surveyId },
        }
        )

        .catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while updating Survey.",
        });
        });

        updatedSurvey = await Survey.findOne(
        {
            where: {surveyId:surveyId },
        }
        ).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while updating Survey.",
        });
        }
        );
    
        res.status(200).json({
        status: true,
        message: "Survey updated successfully",
        data: updatedSurvey,
        });
    } catch (err) {
        res.status(500).json({
        message: err.message || "Some error occurred while updating Survey.",
        });
    }
    }


exports.deleteSurvey = async (req, res) => {
    const { surveyId } = req.body;
    
    try {
        if(!surveyId){
            return res.status(400).json({
                message: "Please provide survey id to delete",
            });
        }

        const survey = await Survey.update(
        {
            is_active:false
        },
        {
            where: {surveyId:surveyId },
        }
        ).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while deleting Survey.",
        });
        }
        );

        res.status(200).json({
        status: true,
        message: "Survey deleted successfully",
        data: survey,
        });
    } catch (err) {
        res.status(500).json({
        message: err.message || "Some error occurred while deleting Survey.",
        });
    }
    }


exports.getSurveyById = async (req, res) => {
    const { surveyId } = req.body;
    
    try {
        if(!surveyId){
            return res.status(400).json({
                message: "Please provide survey id to get",
            });
        }

        const survey = await Survey.findOne(
        {
            where: {surveyId:surveyId, is_active:true },
            include: [
                {
                    model: Questions,
                    as: "questions",
                    required: false,
                    include: [
                        {
                            model: Options,
                            as: "options",
                            attributes: { exclude: ["createdAt", "updatedAt"] },
                            required: false,
                        },
                        {
                            model: Dropdown,
                            as: "dropdown",
                            attributes: { exclude: ["createdAt", "updatedAt"] },
                            required: false,
                        }],
                }
            ],
          

        }

        ).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while getting Survey.",
        });
        }
        );

        if(!survey){
            return res.status(400).json({
                message: "Survey not found",
            });
        }

        res.status(200).json({
        status: true,
        message: "Survey retrieved successfully",
        data: survey,
        });
    } catch (err) {
        res.status(500).json({
        message: err.message || "Some error occurred while getting Survey.",
        });
    }
    }


exports.getSurveyByUserId = async (req, res) => {
    const { userId } = req.body;
    
    try {
        if(!userId){
            return res.status(400).json({
                message: "Please provide user id to get",
            });
        }

        const survey = await Survey.findAll(
        {
            where: {userId:userId, is_active:true },
            include: [
                {
                    model: Questions,
                    as: "questions",
                    required: false,
                    include: [
                        {
                            model: Options,
                            as: "options",
                            attributes: { exclude: ["createdAt", "updatedAt"] },
                            required: false,
                        },
                        {
                            model: Dropdown,
                            as: "dropdown",
                            attributes: { exclude: ["createdAt", "updatedAt"] },
                            required: false,
                        }],
                }
            ],
          

        }

        ).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while getting Survey.",
        });
        }
        );

        if(!survey){
            return res.status(400).json({
                message: "Survey not found",
            });
        }

        res.status(200).json({
        status: true,
        message: "Survey retrieved successfully",
        data: survey,
        });
    } catch (err) {
        res.status(500).json({
        message: err.message || "Some error occurred while getting Survey.",
        });
    }
    }