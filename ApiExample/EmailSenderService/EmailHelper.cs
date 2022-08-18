using System.Net.Mail;

namespace ApiExample.EmailSenderService
{
    public static class EmailHelper
    {
        public static void EmailConfirmationSendEmail(string link, string email)
        {
            MessageService mailService = new MessageService();
            mailService.SendEmail(
            new EmailModel
            {
                From = new MailAddress("yourEmail"),
                ToMany = new List<MailAddress> { new MailAddress(email) },
                Subject = "Email Doğrulama",
                Body = $"<a href='{link}'>email doğrulama linki</a>",
                Priority = MailPriority.High
            });
        }
        public static void PasswordResetSendEmail(string link, string email)
        {
            MessageService mailService = new MessageService();
            mailService.SendEmail(
            new EmailModel
            {
                From = new MailAddress("yourEmail"),
                ToMany = new List<MailAddress> { new MailAddress(email) },
                Subject = "ŞifreSıfırlama",
                Body = $"<a href='{link}'>şifre yenileme linki</a>",
                Priority = MailPriority.High
            });
        }
    }
}
