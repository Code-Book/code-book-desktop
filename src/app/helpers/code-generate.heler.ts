export class CodeGenerateHelper {
    public static validateModel(parameters: any[], model: any) {
        let areAllRequiredFieldsValid = true;
        parameters
            .filter(res => res['required'])
            .forEach(element => {
                if (model[element.name] == null
                    || model[element.name] === '') {
                    areAllRequiredFieldsValid = false;
                }
            });
        return areAllRequiredFieldsValid;
    }
}