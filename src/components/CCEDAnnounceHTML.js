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
      ebookTitle = 'Ebook Title',
      title1 = '',
      author1 = '',
      provider1 = '',
      title2 = '',
      author2 = '',
      provider2 = '',
      unsubscribe = '%%PLUGIN_UNSUBSCRIBE: 2141821-UNSUBSCRIBE%%',
      link,
      img = 'http://placehold.it/300x350',
      sponsor,
      sponsorImg
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
    <title>${ebookTitle}</title>
    </head>
    
    <body bgcolor="#efefef">
    <center>
    <table width="612" border="0" cellspacing="0" cellpadding="0"  style="font-family:Gotham, sans-serif; border:solid 1px #e7e7e8; color:#000000;" bgcolor="#ffffff">
      <tbody>
        <tr>
          <td align="center" style="font-size:11px; line-height:27px;"><a href="https://dentalaegis.com" style="color:#fff;" target="_blank"> </a>Having trouble viewing this email? <a href="http://aegispublications.com/news/cced/${year}/${month}/${emailName}.html" target="_blank" style="color:#87764b; text-decoration:none;">Click here</a>.<br></td>
        </tr>
        <tr>
          <td align="center" valign="top" bgcolor="#87764b"><a href="https://dentalaegis.com/cced" target="_blank"><img src="http://aegispublications.com/news/cced/2017/03/logo-white.png" alt="Compendium of Continuing Education in Dentistry" style="margin:10px 0 10px 24px; width:322px;"/></a></td>
          </tr>
          <tr>
          <td align="center"><img src="http://aegispublications.com/news/cced/2017/03/clinical-ebook-series-4.png"  alt="Clinical eBook Series - 4 Complimentary CEU" style="margin:14px 0 14px 0;"/></td>
        </tr>
        <tr>
          <td style="background-image:url(http://aegispublications.com/news/idt/2016/06/ebook-base.png); background-repeat:repeat-x; background-position:bottom;"><table width="612" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td width="259" rowspan="2" valign="top" style="font-size:10px; color:#656464;">
                  <a href="${link}" target="_blank"><img src="${img}" width="253" style="margin:0 17px 0 19px;"/></a>
                    ${sponsorImg ?
        `<div style="margin:7px 0 0 24px;">
                      SUPPORTED BY: <br>
                          <img src="${sponsorImg}"  style="margin:4px 0 0 0;" alt="client logo" width="100">
                    </div> ` :
        ``}
                  
                     <br />

                </td>
                <td width="353" height="66" valign="top" style="padding:0 32px 0 0;">
                  <div style="font-size:16px; margin:6px 0 14px 0; color:#87764b;"><strong>${ebookTitle}</strong></div>
                  <div style="font-size:13px; color:#656464;">
            <strong>${title1}</strong><br>
            ${author1 ? `<em>${author1}</em><br>` : ``}
            ${provider1 ? `Provider: ${provider1}<br><br>` : `<br>`}
    
    ${title2 ? `<strong>${title2}
    </strong><br>
    ${author2 ? `<em>${author2}</em><br>` : ``}
    ${provider2 ? `Provider: ${provider2}` : ``}
  `: ``}
    <br>
    <br>
                  </div>
                  </td>
              </tr>
              <tr>
                <td style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; mso-table-lspace:0pt; mso-table-rspace:0pt; font-size:10px; color:#000000; font-family:'Arial', sans-serif">
                  <img src="http://aegispublications.com/news/cced/2017/03/ebook-btn3.png" alt="Download Free CE eBook | View eBook Library" usemap="#Map2" style="margin:4px 0 22px 0;"/>
                  </td>
              </tr>
              <tr>
              <!-- Fine Print Footer -->
              <td colspan="2" align="center">
                <img src="http://aegispublications.com/news/id/webinars/webinar-footer.jpg" width="580" height="85" style="margin-bottom: 15px;" />
              </td>
              <!-- /Fine Print Footer -->
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
                                  <img src="http://aegispublications.com/news/cced/2017/03/cced-aegis-logo-long.png" style="margin:0 0 0 14px;" alt="Compendium of Continuing Education in Dentistry: An AEGIS Communications Property" /> 
                                  </td>
                                <td align="right" width="220" style="color:#454545; font-size:16px; font-family:'Noto Sans', Arial, sans-serif;">
                                  Twitter
                                  <a href="https://twitter.com/compendiumced" target="_blank" style="text-decoration:none;">
                                    <img src="http://aegispublications.com/news/cced/2017/03/twitter.png" width="30" height="30" style="vertical-align:middle;">
                                    </a>		
                                  &nbsp;&nbsp;&nbsp;
                                  Facebook
                                  <a href="https://www.facebook.com/CompendiumDentistry" target="_blank" style="text-decoration:none;">
                                    <img src="http://aegispublications.com/news/cced/2017/03/facebook.png" width="15" height="30" style="vertical-align:middle; margin:0 14px 0 0;">
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
            <td align="center" style="font-family:Arial, sans-serif; font-size:11px; text-align:center; color:#818181; font-size:10px; background-color:#efefef; padding-bottom: 10px;" valign="middle"> 
                <br>
                You received this e-mail because you are a customer of <a href="https://www.aegisdentalnetwork.com" target="_blank" style="color:#818181; text-decoration:none;">AEGIS Dental Network</a> | <em>Compendium</em>.<br />
                To ensure delivery, please add <a href="mailto:215892@news.aegispublications.com" target="_blank" style="color:#818181 !important; text-decoration:none !important;">reply-207852@news.aegispublications.com</a> to your address book.<br />
                ${unsubscribe}<br />
    <em>Compendium,</em> an AEGIS Publication | 104 Pheasant Run, Suite 105 | Newtown, PA 18940 | <a href="https://www.aegisdentalnetwork.com/privacy-policy" target="_blank" style="color:#818181; text-decoration:none;">Privacy Policy</a></td>
        </tr>
      </tbody>
    </table>
    </center>
    
    <map name="Map">
      <area shape="rect" coords="371,4,441,29" href="https://twitter.com/indentaltech" target="_blank">
      <area shape="rect" coords="454,4,536,29" href="https://www.facebook.com/InsideDentalTechnology" target="_blank">
    </map>
    
    <map name="Map2">
      <area shape="rect" coords="3,2,191,24" href="${link}" target="_blank">
      <area shape="rect" coords="4,28,142,52" href="https://www.dentalaegis.com/cced/ebooks/" target="_blank">
      <area shape="rect" coords="188,5,255,111" href="${link}" target="_blank">
    </map>
    </body></html>
    `
    //Text Email        
    let textEmail = `Compendium eBook\n\n${ebookTitle}\n\n${title1 ? `${title1}\n` : ``}${author1 ? `${author1}\n` : ``}\n${title2 ? `${title2}\n` : ``}${author2 ? `${author2}\n` : ``}\n${sponsor ? `Sponsored by: ${sponsor}\n\n` : ``}Download the Free Ebook!\n${link}`;

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