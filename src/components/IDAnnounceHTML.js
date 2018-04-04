import React from 'react';
import DOMPurify from 'dompurify';
import { saveAs } from 'file-saver';

export default class IDTtyHTML extends React.Component {
  downloadHtml(html, fileName) {
    if (!fileName) {
      alert("This email needs a name in order to be downloaded.");
      return;
    };
    var file = new File([html], fileName + '.html', { type: "text/html" });
    saveAs(file);
  }

  downloadText(textEmail, fileName) {
    if (!fileName) {
      alert("This email needs a name in order to be downloaded.");
      return;
    };
    var file = new File([textEmail], fileName + '.txt', { type: "text/plain;charset=utf-8" });
    saveAs(file);
  }

  render() {
    //Import data from the form fields.
    let {
      emailName = 'undefined',
      title = 'To Be Updated',
      author = '',
      description = 'Lorem ipsume dolar emet hortus delirios mentas.  Lorem ipsume dolar emet hortus delirios mentas.',
      link,
      unsubscribe = "%%PLUGIN_UNSUBSCRIBE: 1654490-UNSUBSCRIBE%%",
      img = 'http://placehold.it/300x350',
      sponsorImg = 'http://placehold.it/100x30'
    } = this.props.info[this.props.info.selected_template];

    let { month, year } = this.props.info;

    if (month < 10 && month > 0) { month = '0' + '' + month; }


    //Take the Lyris Name and make a url slug out of it.
    emailName = emailName.toString()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w-]+/g, '')       // Remove all non-word chars
      .replace(/--+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text

    let url = `http://aegispublications.com/news/idt/${year}/${month}/${emailName}.html`;


    //Prevent whitespace from messing up link.
    if (link) { link = link.trim() };

    const first = `
        <!doctype html>
        <html>
        <head>
        <meta charset="UTF-8">
        <title></title>
        </head>
        
        <body>
        <center>
        <table width="612" border="0" cellspacing="0" cellpadding="0"  style="font-family:Gotham, sans-serif; border:solid 1px #e7e7e8; color:#000000;">
          <tbody>
            <tr>
              <td align="center" style="font-size:11px; line-height:27px;">Having trouble viewing this email? <a href="http://aegispublications.com/news/id/ebooks/${year}/${month}/${emailName}.html" target="_blank" style="color:#c41230; text-decoration:none;">Click here</a>.</td>
            </tr>
            <tr>
              <td><img src="http://aegispublications.com/news/id/ebooks/2016/07/ebook-header.png" alt="" style="margin:0 0 14px 24px;"/></td>
            </tr>
            <tr>
              <td>
                <div  style="font-size:15px; margin:0 24px 0 24px; line-height:19px;">
                See what your colleagues are buzzing about. Find the latest in clinical content, practice management, and product information at any time right at your fingertips. The <em>Inside Dentistry</em> eBook library delivers the latest key dental knowledge directly to you. 
                </div>
                </td>
            </tr>
            <tr>
              <td><img src="http://aegispublications.com/news/idt/2016/07/ebook-tag.jpg" width="564" alt="" style="margin:21px 0 14px 24px;"/></td>
            </tr>
            <tr>
              <td style="background-image:url(http://aegispublications.com/news/idt/2016/06/ebook-base.png); background-repeat:repeat-x; background-position:bottom;"><table width="612" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td width="259" rowspan="3" valign="top">
                      <a href="${link}" target="_blank"><img src="${img}" width="253" alt="" style="margin:0 17px 0 19px;"/></a>
                    </td>
                    <td width="353" height="66" style="padding:0 24px 0 0;">
                      <div style="font-size:16px; margin:6px 0 7px 0;"><strong>${title}</strong></div>
                      <div style="font-size:13px; line-height:15px;">
                      ${author ? `<em>${author}</em><br>` : ``}
                        
        
        ${description}
        </div>
                      </td>
                  </tr>
                  <tr>
                    <td height="66" style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; mso-table-lspace:0pt; mso-table-rspace:0pt; font-size:10px; color:#000000; font-family:'Arial', sans-serif">
                              <br>
                  SPONSORED BY: <br>
                              <img src="${sponsorImg}"  alt="client logo"  style="vertical-align:bottom; margin:4px 0 0 0;"> </td>
                  </tr>
                  
                  <tr>
                    <td height="152" valign="top">
                      <a href="${link}" target="_blank"><img src="http://aegispublications.com/news/id/ebooks/2016/07/ebook-btn.png" width="240" height="113" alt="" style="margin:21px 0 0 0;"/></a>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tbody>
                            <tr>
                          <td align="center" style="margin:27px 0 0 0;">
                            <table cellpadding="0" cellspacing="0" border="0">
                                <tbody>
                                  <tr>
                                      <td colspan="2" align="left" height="1"></td>
                                    </tr>
                                    <tr>
                                        <td align="left" width="300">
                                            <img src="http://aegispublications.com/news/id/ebooks/id-aegis-logo-long.png" width="275" style="margin:0 44px 0 24px;" /> 
                                        </td>
        
                                        <td align="right" width="220" style="color:#454545; font-size:16px; font-family:'Noto Sans', Arial, sans-serif;">
                                            Twitter
                                            &nbsp;
                                            <a href="https://twitter.com/insidedentistry" target="_blank" style="text-decoration:none;">
                                                <img src="http://aegispublications.com/news/id/roundtable/twitter.png" width="30" height="30" style="vertical-align:middle;">
                                            </a>		
                                            &nbsp;&nbsp;&nbsp;
                                            Facebook
                                            &nbsp;
                                            <a href="https://www.facebook.com/InsideDentistry" target="_blank" style="text-decoration:none;">
                                                <img src="http://aegispublications.com/news/id/roundtable/facebook.png" width="15" height="30" style="vertical-align:middle;">
                                            </a>		
                                        </td>
                                    </tr>
                                    <tr>
                                      <td colspan="2" align="left" height="14"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
          </tbody>
        </table>
                    </td>
                    </tr>
                </tbody>
              </table></td>
              </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
             <tr>
                  <td align="center" style="font-size:10px;">
                    You received this e-mail because you are a customer of AEGIS Dental Network | <em>Inside Dentistry</em>.<br>
        To ensure delivery, please add reply-207852@news.aegispublications.com to your address book.<br>
        ${unsubscribe}<br> 
        <em>Inside Dentistry</em>, an AEGIS Publication | 104 Pheasant Run, Suite 105 | Newtown, PA 18940 | Privacy Policy
                  <br>
                  <br>
                  </td>
              </tr>
          </tbody>
        </table>
        </center>
        <map name="Map">
          <area shape="rect" coords="371,4,441,29" href="https://twitter.com/indentaltech" target="_blank">
          <area shape="rect" coords="454,4,536,29" href="https://www.facebook.com/InsideDentalTechnology" target="_blank">
        </map>
        </body></html>
        `
    //Text Email        
    let textEmail = `Inside Dentistry eBook\n\n${title}\n${description}\n\nDownload the Free Ebook!\n${link}`;

    let html = first;

    //Sanitize data to avoid XSS attack
    let cleanHtml = DOMPurify.sanitize(html);

    return (
      <div >
        <div className="content" dangerouslySetInnerHTML={{ __html: cleanHtml }}></div>
        <br />
        <h3 className="download-header">3. Copy or download the email.</h3>
        <div className="copy-paste">
          <div className="copyArea html-copy">
            <textarea value={html} readOnly={true} />
            <button onClick={() => this.downloadHtml(html, emailName)} className="download-button">Download HTML Email</button>
          </div>
          <div className="copyArea text-copy">
            <textarea value={textEmail} readOnly={true} />
            <button onClick={() => this.downloadText(textEmail, emailName)} className="download-button">Download Text-Version Email</button>
          </div>
        </div>
      </div>
    )
  }
}