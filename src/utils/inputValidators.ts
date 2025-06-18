import { body, query, ValidationChain } from "express-validator";

const validateInputString = function (
  string: string,
  min: number = 2,
  max: number = 255,
  reqBody: boolean = true
): ValidationChain {
  if (reqBody)
    // if reqBody is true, validate the reqBody
    return body(string)
      .trim()
      .escape() // sanitize html tags prevent XSS attacks
      .notEmpty()
      .withMessage(`${string} is required`)
      .bail() // bail will stop the validation chain if this fails
      .isLength({ min, max })
      .withMessage(`${string} should be between ${min} and ${max} characters`);

  // else validate the reqParam
  return query(string)
    .trim()
    .escape()
    .notEmpty()
    .withMessage(`${string} is required`)
    .bail()
    .isLength({ min, max })
    .withMessage(`${string} should be between ${min} and ${max} characters`);
};

const validateInputFloat = function (
  float: string,
  min: number = -180,
  max: number = 180,
  reqBody: boolean = true
): ValidationChain {
  if (reqBody)
    // if reqBody is true, validate the reqBody
    return body(float)
      .trim()
      .escape()
      .notEmpty()
      .withMessage(`${float} is required`)
      .bail()
      .isFloat({ min, max })
      .withMessage(`${float} should be between ${min} and ${max}`);

  // else validate the reqParam
  return query(float)
    .trim()
    .escape()
    .notEmpty()
    .withMessage(`${float} is required`)
    .bail()
    .isFloat({ min, max })
    .withMessage(`${float} should be between ${min} and ${max}`);
};

export { validateInputString, validateInputFloat };
