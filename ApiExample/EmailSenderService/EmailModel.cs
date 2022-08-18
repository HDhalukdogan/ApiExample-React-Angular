using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace ApiExample.EmailSenderService
{
    public class EmailModel
    {
        public MailAddress From { get; set; }

        public List<MailAddress> ToMany { get; set; }

        public List<MailAddress> ToCc { get; set; }

        public List<MailAddress> ToBcc { get; set; }

        public string Subject { get; set; }

        public string Body { get; set; }

        public List<Attachment> AttachmentFiles { get; set; }

        public List<IDictionary<string, string>> EmbeddedItemsList { get; set; }

        public MailPriority Priority { get; set; }
    }
}
