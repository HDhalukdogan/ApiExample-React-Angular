using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace ApiExample.EmailSenderService
{
    public class EmailSender : IEmailSender
    {
        protected string To { get; set; }
        protected MailMessage MailMessage { get; set; }
        protected SmtpClient SmtpClient { get; set; }
        protected string MailSubject;

        protected EmailSender()
        {
            MailMessage = new MailMessage
            {
                IsBodyHtml = true,
                SubjectEncoding = Encoding.UTF8,
                BodyEncoding = Encoding.UTF8,
                Priority = MailPriority.Normal
            };
            SmtpClient = new SmtpClient("yourHost", 25)
            {
                EnableSsl = false,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("yourUsername",
                    "yourEmail")
            };
        }

        public virtual bool SendEmail(EmailModel model)
        {
            try
            {
                SmtpClient.Send(MailMessage);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }

    public interface IEmailSender
    {
        bool SendEmail(EmailModel model);
    }
}
