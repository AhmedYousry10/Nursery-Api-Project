const { body,param,query } = require("express-validator");

exports.insertValidations=[
    body("fullname").isString().withMessage("Name Should Be String").isAlpha("en-US",{ignore:" "}).withMessage("Name Should Be Written In English With No Numbers or Special Characters")
    .isLength({min:3}).withMessage("Name Should Be at least 3 letters long"),
    body('age').isInt({min:3,max:7}).withMessage("Age Should be between 3 and 7 years old"),
]

exports.updateValidations=[
    body('_id').isInt({min:1}).withMessage("ID Should be A positive Integer"),
    body("fullname").optional().isString().withMessage("Name Should Be String").isAlpha("en-US",{ignore:" "}).withMessage("Name Should Be Written In English With No Numbers or Special Characters")
    .isLength({min:3}).withMessage("Name Should Be at least 3 letters long"),
    body('age').optional().isInt({min:3,max:7}).withMessage("Age Should be between 3 and 7 years old"),
]

exports.deleteValidations=[
    body('_id').isInt({min:1}).withMessage("ID Should be A positive Integer"),
]