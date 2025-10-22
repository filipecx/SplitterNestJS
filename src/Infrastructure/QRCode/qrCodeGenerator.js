import { Injectable } from '@nestjs/common';
import { error } from 'console';
import QRCode from 'qrcode';

@Injectable()
export class QRCodeGenerator {
    constructor() { }

    generateQR = async (text, name) => {
            try {
                await QRCode.toFile(`./src/Infrastructure/QRCode/codes/${name}.png`, text, {color: {dark: '#00F', light: '#0000'}}, function(err){
                    if (err) throw err
                    console.log('done')
                })
            } catch (error) {
                 console.error(error)
            }
            
            
      
    }

    

}

function showError(error) {
    if (error){ 
        throw error
        console.log(error);
    }
    console.log('done')
}

