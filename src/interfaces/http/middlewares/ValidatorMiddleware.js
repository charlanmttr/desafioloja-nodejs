module.exports = () => ({

    validateContract: (validation, stripUnknown = true) => (req, res, next) => {
        try {
            const { exception } = req.container.cradle;
            const schemaOptions = { abortEarly: false, convert: false, allowUnknown: true, stripUnknown};

            Object.keys(validation).forEach(validationKey => {
                const { error, value } = validation[validationKey].validate(req[validationKey], schemaOptions);

                if (error) {
                    const err = new Error('Bad Request');
                    err.details = error.details;

                    throw exception.contract(err); 
                }

                req[validationKey] = value;
            }); 
            return next();

        } catch (error) {
            next(error);
        }
    }
});