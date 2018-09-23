import * as nodemailer from 'nodemailer';
import { getTemplateById } from './mail-templates';

export interface MailOption{
    from: string,
    to: string,
    subject?: string,
    text?:string,
    html?:string

}

export interface TemplateParameter{
    name:string,
    value: string
}


export const sendMail = (mailOptions: MailOption):Promise<any> => {
    const transporter =  nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'anrm4tif2x3lbz7p@ethereal.email',
            pass: 'uhrPMW96EdvFJWn9xg'
        }
    });
    return transporter.sendMail(mailOptions);
}

export const sendMailFromTemplate = (templateId:string, templateParams:Array<TemplateParameter>, mailOptions: MailOption): Promise<any> =>{ 
    let mailTemplate = getTemplateById(templateId)  ;
    let templateMailSubject = mailTemplate.subject; 
    let templateMailContent = mailTemplate.content;
    templateParams.forEach((templateParam)=>{
        let templateParamName = `{{${templateParam.name}}}`;
        while(templateMailSubject.indexOf(templateParamName) !== -1){
            templateMailSubject = templateMailSubject.replace(templateParamName, templateParam.value)
        }
        while(templateMailContent.indexOf(templateParamName) !== -1){
            templateMailContent = templateMailContent.replace(templateParamName, templateParam.value)
        }
    });
    Object.assign(mailOptions, {subject: templateMailSubject, html: templateMailContent});
    return sendMail(mailOptions);
}