import * as nodemailer from "nodemailer";
import { getTemplateById } from "./mail-templates";

export interface IMailOption {
    from: string;
    to: string;
    subject?: string;
    text?: string;
    html?: string;
}

export interface ITemplateParameter {
    name: string;
    value: string;
}


export const sendMail = (mailOptions: IMailOption): Promise<any> => {
    const transporter =  nodemailer.createTransport({
        auth: {
            pass: "uhrPMW96EdvFJWn9xg",
            user: "anrm4tif2x3lbz7p@ethereal.email",
        },
        host: "smtp.ethereal.email",
        port: 587,
    });
    return transporter.sendMail(mailOptions);
};

// tslint:disable-next-line:max-line-length
export const sendMailFromTemplate = (templateId: string, templateParams: ITemplateParameter[], mailOptions: IMailOption): Promise<any> => {
    const mailTemplate = getTemplateById(templateId);
    let templateMailSubject = mailTemplate.subject;
    let templateMailContent = mailTemplate.content;
    templateParams.forEach((templateParam) => {
        const templateParamName = `{{${templateParam.name}}}`;
        while (templateMailSubject.indexOf(templateParamName) !== -1) {
            templateMailSubject = templateMailSubject.replace(templateParamName, templateParam.value);
        }
        while (templateMailContent.indexOf(templateParamName) !== -1) {
            templateMailContent = templateMailContent.replace(templateParamName, templateParam.value);
        }
    });
    Object.assign(mailOptions, {subject: templateMailSubject, html: templateMailContent});
    return sendMail(mailOptions);
};
