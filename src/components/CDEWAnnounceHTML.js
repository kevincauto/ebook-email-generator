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
            author,
            description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            supporter,
            unsubscribe = '%%PLUGIN_UNSUBSCRIBE: 1635405-UNSUBSCRIBE%%',
            link,
            img = 'http://placehold.it/300x350',

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

        const first = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
         <title>Featured CE eBooks from CDEWorld!</title>
         <meta name="viewport" content="width=device-width, initial-scale=1">
         <style>
             body {
                 font-size: 16px;
                 background-color: #ebebeb;
             }
             @media (max-width: 425px){
                 .main-container {
                     max-width: 650px;
                     width: 100%;
                 }
                 .header-image-container {
                     text-align: center;
                     display: block;
                 }
                 .header-image {
                     padding: 20px 0 !important;
                     width: 80%;
                     height: auto;
                 }
                 .header-right {
                     display: block;
                     width: 100%;
                 }
                 td[class="header-right"] table, td[class="header-right"] tr {
                     width: 100%;
                     display: 100%;
                 }
                 td[class="header-right"] td {
                     width: 50%;
                     text-align: center;
                     padding: 0 !important;
                     padding-bottom: 12px !important;
                 }
                 .navigation {
                     width: 100%;
                 }
                 table[class="navigation"] td {
                     width: 50% !important;
                     display: block;
                     float: left;
                     padding: 0 !important;
                 }
                 table[class="navigation"] a {
                     padding: 12px 0 !important;
                 }
                 table[class="navigation"] td:nth-child(1n + 1){
                     border-bottom: 1px solid #1A5286;
                 }
                 table[class="main-text"] {
                     padding: 0 !important;
                 }
                 table[class="main-text"] .text-intro {
                    padding: 35px 25px 0 25px;
                }
                td[class="ebook-entry"] {
                    padding: 0 !important;
                }
                table[class="main-text"] tr:last-child td[class="ebook-entry"] {
                    border-bottom: 1px solid #e8e8e8;
                    padding-bottom: 10px !important;
                }
                 td[class="ebook-entry"] td {
                    display: block !important;
                }
                td[class="ebook-entry"] .ebook-image {
                    text-align: center;
                    width: 100% !important;
                    padding-top: 30px;
                }
                td[class="ebook-entry"] .ebook-text {
                    padding: 30px 20px !important;
                }
                td[class="ebook-entry"] .button {
                    display: block !important;
                    border-radius: 0 !important;
                    padding: 14px 22px !important;
                    text-align: center;
                }
                td[class="cerp-pace"] {
                    width: 100%;
                    padding: 0 !important;
                    text-align: center;
                }
                td[class="cerp-pace"] img {
                    max-width: 100%;
                    width: 90%;
                }
                .button-container {
                    padding-top: 30px;
                }
                table[class="main-container footer"] td {
                    padding-left: 20px !important;
                    padding-right: 20px !important;
                }
             }
        </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #ebebeb;">
        <table class="main-container" width="650" cellpadding="0" cellspacing="0" border="0" align="center">
            <tr>
                <td align="center" style="font-size: 0.75rem; font-family:Helvetica, sans-serif; padding:7px 0; color:#666666;">
                    Having trouble viewing this email? <a href="http://www.aegispublications.com/news/cdeworld/${year}/${month}/${emailName}.html" target="_blank" style="font-family:Helvetica, sans-serif; color:#2469aa; text-decoration:none;">Click here.</a>
                   </td>
            </tr>
        </table>
        <table class="main-container" width="650" cellpadding="0" cellspacing="0" border="0" align="center" style="border: solid 1px #dcdada; background-color: #ffffff; font-size: 16px; line-height: 1.2em; font-family: Helvetica, sans-serif; color: #666666;">
            <tr>
                <td align="center" class="">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td class="header-image-container" style="background:#2469aa;">
                                <a href="http://cdeworld.com/ebooks" target="_blank">
                                    <img class="header-image" src="http://aegispublications.com/news/cdeworld/2016/02/images/cdeworld-ebook-logo.jpg" alt="CDEWorld eBooks" width="266" height="70" border="0" style="padding: 20px 0 20px 30px; color: #ffffff;">
                                </a>
                            </td>
                            <td class="header-right" width="650" align="right" style="background-color: #2469aa;">
                                <table cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                        <td class="header-forward" align="right" style="background:#2469aa;">
                                            <a href="mailto:?subject=CDEWorld eBooks&amp;body=I thought you might be interested in this: ${link}" target="_blank" style="text-decoration:none; color:#ffffff; font-size:12px;">
                                    Forward to a Colleague
                                            </a>
                                        </td>
                                        <td class="header-social" align="right" style="background-color: #2469aa; padding-right: 35px; padding-left: 25px;">
                                            <img src="http://aegispublications.com/news/ce/2016/templates/soc-2.png" alt="" usemap="#map2">
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="background-color: #2469aa; border-top: 1px solid #1A5286;">
                                <table class="navigation" align="center" width="100%" style="font-family: Arial, sans-serif; font-size: .9375em; background: #2469aa; color: #ffffff;">
                                    <tr>
                                        <td align="center" style="width:25%;">
                                            <a href="https://cdeworld.com/courses" target="_blank" style="border-right:1px solid #1A5286; padding:8px 0 6px 0; text-transform:uppercase; color: #ffffff; display:block; text-decoration:none;">Courses</a>
                                        </td>
                                        <td align="center" style="width:25%;">
                                            <a href="https://cdeworld.com/events" target="_blank" style="border-right:1px solid #1A5286; padding:8px 0 6px 0; text-transform:uppercase; color: #ffffff; display:block; text-decoration:none;">Events</a>
                                        </td>
                                        <td align="center" style="width:25%;">
                                            <a href="https://cdeworld.com/webinars" target="_blank" style="border-right:1px solid #1A5286; padding:8px 0 6px 0; text-transform:uppercase; color: #ffffff; display:block; text-decoration:none;">Webinars</a>
                                        </td>
                                        <td align="center" style="width:25%;">
                                            <a href="https://cdeworld.com/ebooks" target="_blank" style="padding:8px 0 6px 0; text-transform:uppercase; color: #ffffff; display:block; text-decoration:none;">eBooks</a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" align="center">
                                <table class="main-text" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 45px 45px 0 45px;">
                                    <tr>
                                        <td class="text-intro">
                                            <div style="font-size: 16px; line-height: 1.5em;">CDEWorld knows dental professionals are busy. That’s why we make sure the information and CE credits you need are easy to access anywhere, anytime. <strong>CDEWorld eBooks</strong> are worth 2 CE credits and free of charge!<br><br>
                                            
    </div>
                                        </td>
                                    </tr>
                                    <!-- Book 1 -->
                                    <tr>
                                        <td colspan="2" class="ebook-entry">
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                <tr>
                                                    <td width="150" align="left" valign="top" class="ebook-image">
                                                        <a href="${link}" target="_blank">
                                                            <img src="${img}" border="0" style="padding:0 14px 14px 0; width:212px;">
                                                        </a>
                                                    </td>
                                                    <td valign="top" class="ebook-text">
                                                        <div style="font-family: Helvetica, sans-serif; color: #444444; font-size: 1.1em; line-height: 1.2em; font-weight: bold; padding:5px 0 5px 0;">${title}</div>
                                                        ${author ? `<div style="font-size: .9rem; line-height: 1.2em; padding-top: 5px;">
                                                        ${author}
    <br>
                                                        </div>` : ``}
                                                        <p style="font-size: .9rem; line-height:1.3em;">${description}<br>
                                                      ${supporter ? `<span style="font-size: 0.8rem"><em>Supported by ${supporter}</em></span>` : ``}
                                                      <div style="font-size: 20px; margin:0 0 34px 0;">
                                                <a class="button" href="${link}" target="_blank" style="background: #2469aa; padding: 11px 22px 9px 22px; display: inline-block; color: #ffffff; text-decoration: none; text-transform: uppercase; margin-top:7px; font-size: 0.8125em; border-radius: 5px;">
                                                            Download the FREE CE eBook! 
                                                        </a>
                                                      </div>
                                                      
                                                        
                                                    </td>
                                                </tr>
                                                
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table class="main-container footer" width="650" cellpadding="0" cellspacing="0" border="0" align="center">
            <tr>
              <td align="center"  style="font-family:Arial, sans-serif; font-size:10px; color:#818181; text-align:center; padding:0px 10;"><br>
    You received this e-mail because you are a customer of <a href="https://www.aegisdentalnetwork.com" target="_blank" style="color:#818181; text-decoration:none;">AEGIS Dental Network</a> | CDEWorld.<br>
                To ensure delivery, please add <span class="grey" style="color:#818181; text-decoration:none;"><a href="mailto:215892@news.aegispublications.com" target="_blank" style="color:#818181; text-decoration:none;">reply-215892@news.aegispublications.com</a></span> to your address book.<br />
                ${unsubscribe}<br />
                CDEWorld part of the AEGIS Publication | 104 Pheasant Run, Suite 105 | Newtown, PA 18940 | <a href="https://www.aegisdentalnetwork.com/privacy-policy" target="_blank" style="color:#818181; text-decoration:none;">Privacy Policy</a></td>
            </tr>
    
        </table>
        <map name="Map2">
      <area shape="rect" coords="-1,2,26,25" href="https://www.facebook.com/CDEWorldDentistry/" target="_blank">
      <area shape="rect" coords="29,2,51,30" href="https://twitter.com/CDEWorld" target="_blank">
    </map>
    </body></html>`
        //Text Email        
        let textEmail = `CDEWorld eBook\n\n${title}\n${description}\n\nDownload the Free Ebook!\n${link}`;

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