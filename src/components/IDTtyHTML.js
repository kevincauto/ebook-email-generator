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
      link,
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
    <! doctype html >
    <html>
      <head>
        <meta charset="UTF-8">
          <title>${title}</title>
      </head>
  
        <body>
          <center>
            <table width="612" border="0" cellspacing="0" cellpadding="0" style="font-family:Gotham, sans-serif; border:solid 1px #e7e7e8; color:#000000; background-color:#ffffff;">
              <tbody>

                <tr>
                  <td><img src="http://aegispublications.com/news/idt/2016/06/ebook-header.png" width="503" height="138" alt="" style="margin:0 0 14px 24px;" /></td>
                </tr>
                <tr>
                  <td align="center"><div style="font-family:Gotham,sans-serif;font-size:16px;padding:14px 0 14px 0; width:490px; text-align:center;">Thank you for downloading <strong>${title}</strong></div></td>
                </tr>
                <tr>
                  <td style="background-image:url(http://aegispublications.com/news/idt/2016/06/ebook-base.png); background-repeat:repeat-x; background-position:bottom;"><table width="612" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                      <tr>
                        <td width="259">
                          <a href="${link}" target="_blank"><img src="${img}" width="253" height="329" alt="" style="margin:0 17px 0 19px;" /></a>
                        </td>
                        <td width="353" style="padding:0 54px 0 0;">
                          <div style="font-family:Gotham,sans-serif;font-size:14px; color:#000000; width:267px;">
                            You recently downloaded <strong>${title}</strong>.
  We hope you enjoyed it! If you found the information useful, please consider <a href="mailto:?subject=Forward: Inside Dental Technology eBooks&amp;body=I thought you might be interested in this: ${link}" style="text-decoration:none;color:#c61f27" target="_blank" data-hs-link-id="0">sharing it with colleagues</a>. </div>
                          <div style="font-family:Gotham,sans-serif;font-size:14px; color:#000000; width:267px; clear:both;">
                            <br>
                              <br>
                                Sponsored by: </div>
                              <div style="font-family:Gotham,sans-serif;font-size:14px; color:#000000; width:267px; clear:both;">
                                <img src="${sponsorImg}" width="110" style="margin:7px 0 0 0;" alt="Client logo">    
          </div>
                                <div style="font-family:Gotham,sans-serif;font-size:14px; color:#000000; width:267px; clear:both;">
                                  <br>
                                    <a href="https://www.dentalaegis.com/idt/ebooks/" target="_blank" style="text-decoration:none; color:#c61f27" data-hs-link-id="1">View Full eBook Library ⇛</a>
          </div>
                </td>
            </tr>
                              <tr>
                                <td colspan="2">
                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tbody>
                                      <tr>
                                        <td align="center">
                                          <img src="http://aegispublications.com/news/idt/2016/06/idt-ebook-base.png" usemap="#Map" />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>&nbsp;</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
          </tbody>
        </table></td>
                      </tr>
  
                      <!--<tr>
                        <td align="center" style="font-family:Arial, sans-serif; font-size:11px; text-align:center; color:#666666; font-size:10px; border-bottom: #000 solid 1px;" valign="middle">
                          <br />
                          You received this e-mail because you are a customer of <a href="https://www.aegisdentalnetwork.com" style="color:#666 !important; text-decoration:none;" target="_blank">AEGIS Dental Network</a> | <em>Inside Dental Technology</em>.<br />
                          To ensure delivery, please add <a href="mailto:reply-289795@news.aegispublications.com" style="color:#666 !important; text-decoration:none;" target="_blank">reply-289795@news.aegispublications.com</a> to your address book<br />
                          %%PLUGIN_UNSUBSCRIBE: 2145850-UNSUBSCRIBE%%<br />
                          <em>Inside Dental Technology</em> an AEGIS Publication | 104 Pheasant Run, Suite 105 | Newtown, PA 18940 | <a href="https://www.aegisdentalnetwork.com/privacy-policy" style="color:#666; text-decoration:none;" target="_blank">Privacy Policy</a><br />
                          &nbsp;</td>
                      </tr>-->
    </tbody>
                  </table>
  
  
  
  </center>
  
                  <map name="Map">
                    <area shape="rect" coords="371,4,441,29" href="https://twitter.com/indentaltech" target="_blank">
                      <area shape="rect" coords="454,4,536,29" href="https://www.facebook.com/InsideDentalTechnology" target="_blank">
  </map>
  </body>
  </html>
  `


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
          <div className="copyArea text-copy">
            <textarea value={textEmail} readOnly={true} />
            <button onClick={() => this.downloadText(textEmail, emailName)} className="download-button">Download Text-Version Email</button>
          </div>
        </div>
      </div>
    )
  }
}




