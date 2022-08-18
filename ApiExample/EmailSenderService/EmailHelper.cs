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
        public static void SendEmailToManyWithAttachment(List<MailAddress> mailAddresses,string body, byte[] bytesData)
        {
            var att = new MemoryStream(bytesData, false);
            List<Attachment> attachment = new List<Attachment> { new Attachment(att, "Name.pdf", "application/pdf") };

            MessageService mailService = new MessageService();
            mailService.SendEmail(
            new EmailModel
            {
                From = new MailAddress("yourEmail"),
                ToMany = mailAddresses,
                Subject = "ŞifreSıfırlama",
                Body = body,
                Priority = MailPriority.High,
                AttachmentFiles = attachment
            });
        }
    }
}
