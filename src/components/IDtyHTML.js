import React from 'react';
import DOMPurify from 'dompurify';
import { saveAs } from 'file-saver';

export default class CCEDLiveWebinarHTML extends React.Component {
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
      emailName = '',
      title = 'To Be Updated',
      link,
      img = 'http://placehold.it/300x350',
      sponsorImg = 'http://placehold.it/50x30'
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

    let url = `http://aegispublications.com/news/id/${year}/${month}/${emailName}.html`;


    //Prevent whitespace from messing up link.
    if (link) { link = link.trim() };

    const first = `
    <!doctype html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>${title}</title>
    </head>
    <body>
    <title></title>
    <center>
    <table width="580" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="border:solid 1px #aaaaaa; background-color:#ffffff;">
      <tbody>
        <tr>
          <td colspan="3"><img src="http://aegispublications.com/news/id/ebooks/2016/07/ebook-header.png" alt="" style="margin:0 0 14px 24px;"/></td>
        </tr>
        <tr>
          <td colspan="3" align="center"><div style="font-family:Gotham,sans-serif;font-size:16px;padding:14px 0 14px 0; width:100%">Thank you for downloading 
          <strong> 
            <br>
            ${title}</strong></div></td>
        </tr>
        <tr>
          <td width="238" valign="top"><a href="${link}" target="_blank"><img src="${img}" width="253" alt="" style="margin:0 17px 0 19px;"/></a></td>
          <td width="20" valign="top">
          </td>
          <td width="322" valign="top">
              <div style="font-family:Gotham,sans-serif;font-size:14px; color:#000000; width:267px;">
            <br>
    You recently downloaded <strong>${title}</strong>.
    We hope you enjoyed it! If you found the information useful, please consider <a href="mailto:?subject=Forward: Inside Dentistry eBooks&amp;body=I thought you might be interested in this: ${link}" style="text-decoration:none;color:#c61f27" target="_blank" data-hs-link-id="0">sharing it with colleagues</a>. </div>
        <div style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; mso-table-lspace:0pt; mso-table-rspace:0pt; font-size:10px; color:#000000; font-family:'Arial', sans-serif; clear:both;">
            <br>
            SPONSORED BY: </div>
            <div style="font-family:Gotham,sans-serif;font-size:14px; color:#000000; width:267px; clear:both;">
                <img src="${sponsorImg}" alt="sponsor logo"  style="vertical-align:bottom; margin:4px 0 0 0;">    
            </div>
            <div style="font-family:Gotham,sans-serif;font-size:14px; color:#000000; width:267px; clear:both;">
            <br>
              <a href="https://www.aegisdentalnetwork.com/id/ebooks/" target="_blank" style="text-decoration:none; color:#c61f27" data-hs-link-id="1">View Full eBook Library ⇛</a>
            </div>
    </td>
        </tr>
        <tr>
          <td colspan="3">
          <div style="margin:14px 16px 0 16px">
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3" align="center"><img src="http://aegispublications.com/news/id/2015/07/id-footer.jpg" alt="" width="552" height="74"></td>
        </tr>
      </tbody>
    </table>
    </center>
    
    </body>
    </html>`


    //Text Email        
    let textEmail = ``;

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
          {/* <div className="copyArea text-copy">
            <textarea value={textEmail} readOnly={true} />
            <button onClick={() => this.downloadText(textEmail, emailName)} className="download-button">Download Text-Version Email</button>
          </div> */}
        </div>
      </div>
    )
  }
}
