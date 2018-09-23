interface MailTemplate {
    subject?: string,
    content?: string   
}

const NullMailTemplate:MailTemplate = {}

const RegistrationValidationMailTemplate:MailTemplate = {
    subject:'Welcome to N-CMS',
    content: `<p>Thank for registering at ncms.com! Before you can being using your account, you must first validate it.</p>
            <p>To complete your registration. Please click or copy below link into our browser:
                <br/>
                <a href="http://ncms.com/user-validate/{{registration-validation-uuid}}">http://ncms.com/user-validate/{{registration-validation-uuid}}</a>
            </p>
            <p>
                Thanks, and we hope you enjoy all that ncms has to offer! Feel free to email at <a href="mailto:register@nmcs.com">register@nmcs.com</a>
            </p>`
}



export let getTemplateById = (templateId:string):MailTemplate =>{

    switch(templateId){
        case 'registration-validation': 
            return RegistrationValidationMailTemplate;
        default:
            return NullMailTemplate;   
    }
    
}