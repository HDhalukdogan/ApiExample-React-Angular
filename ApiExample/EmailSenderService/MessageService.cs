using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace ApiExample.EmailSenderService
{
    public class MessageService : EmailSender
    {
        public override bool SendEmail(EmailModel emailModel)
        {
            try
            {
                MailMessage.From = new MailAddress(emailModel.From.Address, "ApiExample", Encoding.UTF8);
                MailMessage.Subject = emailModel.Subject;
                MailMessage.Body = emailModel.Body;
                MailMessage.Priority = emailModel.Priority;

                if (emailModel.ToMany != null)
                {
                    MailMessage.To.Clear();
                    foreach (var toEmailItem in emailModel.ToMany)
                    {
                        MailMessage.To.Add(toEmailItem);
                    }
                }

                if (emailModel.ToCc != null)
                {
                    MailMessage.CC.Clear();
                    foreach (var ccEmailItem in emailModel.ToCc)
                    {
                        MailMessage.CC.Add(ccEmailItem);
                    }
                }

                if (emailModel.ToBcc != null)
                {
                    MailMessage.Bcc.Clear();
                    foreach (var bccEmailItem in emailModel.ToBcc)
                    {
                        MailMessage.Bcc.Add(bccEmailItem);
                    }
                }

                if (emailModel.AttachmentFiles != null)
                {
                    MailMessage.Attachments.Clear();
                    foreach (var attachmentFileName in emailModel.AttachmentFiles)
                    {
                        MailMessage.Attachments.Add(attachmentFileName);
                    }
                }

                if (emailModel.EmbeddedItemsList != null)
                {
                    MailMessage.AlternateViews.Clear();
                    AlternateView alternateView = AlternateView.CreateAlternateViewFromString(emailModel.Body, null, MediaTypeNames.Text.Html);
                    foreach (IDictionary<string, string> embeddedItem in emailModel.EmbeddedItemsList)
                    {
                        LinkedResource embeddedResource = new LinkedResource(embeddedItem["PATH"], embeddedItem["TYPE"]);
                        embeddedResource.ContentId = embeddedItem["ID"];
                        alternateView.LinkedResources.Add(embeddedResource);
                    }
                    MailMessage.AlternateViews.Add(alternateView);
                }

                return base.SendEmail(emailModel);
            }
            catch (Exception)
            {
                return false;
            }
        }

        //public Task SendSmsAsync(string number, string message)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
