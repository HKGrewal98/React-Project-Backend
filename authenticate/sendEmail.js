
const nodemailer = require('nodemailer');
const path = require('path')


const subject = "Ottomons Respect To Hungry Heads :)"

function getTransporter(){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ottomonsfood@gmail.com',
          pass: 'aeceozmggyybflbe'
        }
      });
      return transporter;
}

function sendEmail(to,name){
 
    const transporter = getTransporter()

    const mailOptions = {
        from: 'ottomonsfood@gmail.com',
        to: to,
        subject: subject,
        attachments:[{
          filename:'food.jpg',
          path:path.join(__dirname,'food.jpg'),
          cid:'unique@kreata.ee'
        }],
        html: getHTMLBody(name)
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


}


function sendOrderConfirmation(to,order){
  const transporter = getTransporter()

  const mailOptions = {
      from: 'ottomonsfood@gmail.com',
      to: to,
      subject: subject,
      attachments:[{
        filename:'food.jpg',
        path:path.join(__dirname,'food.jpg'),
        cid:'unique@kreata.ee'
      }],
      html: getHTMLBodyForOrderConfirmation(order)
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

}

function getHTMLBodyForOrderConfirmation(order){
       const ul = `<ul> ${order.map((item)=>{
                return `<li>Burger [Amount : ${item.amount} Price : ${item.price}]</li>`
       })}</ul>`
       return `<!DOCTYPE html>
       <html>
       <body>  
           ${ul}
           <img src="cid:unique@kreata.ee" alt="ottomons" width="500" height="333">
       </body>
       </html>`
       
}


function getHTMLBody(name){
    return `<!DOCTYPE html>
    <html>
    <body>  
        <h2 style="color: green; font-size: 20px;" >Welcome to the Ottomons Family ${name}</h2> 
        <img src="cid:unique@kreata.ee" alt="ottomons" width="500" height="333">
    </body>
    </html>`
}


module.exports = {sendEmail,sendOrderConfirmation}

