const {makeRequest} = require('../helpers/utilities');
const dotEnv = require('dotenv');

dotEnv.config();

class payoutController{
    
    constructor(){

    }

    // Get SWIFT payment method required fields using Rapyd API
    static async getRequiredFields(request, response, next){
        try {
            const { 
              sender_country, 
              sender_currency, 
              beneficiary_country, 
              payout_currency, 
              sender_entity_type, 
              beneficiary_entity_type, 
              payout_amount,
            } = request.body;


            //console.log('/v1/payouts/xx_swift_bank/details?sender_country='+sender_country+'&sender_currency='+sender_currency+'&beneficiary_country='+beneficiary_country+'&payout_currency='+payout_currency+'&sender_entity_type='+sender_entity_type+'&beneficiary_entity_type='+beneficiary_entity_type+'&payout_amount='+payout_amount);
            const result = await makeRequest('GET', '/v1/payouts/xx_swift_bank/details?sender_country='+sender_country+'&sender_currency='+sender_currency+'&beneficiary_country='+beneficiary_country+'&payout_currency='+payout_currency+'&sender_entity_type='+sender_entity_type+'&beneficiary_entity_type='+beneficiary_entity_type+'&payout_amount='+payout_amount);
            response.json(result.body.data);
            
          } catch (error) {
            
            response.json(error);
          }
    }

    // Create SWIFT payment using Rapyd API
    static async sendPayment(request, response){
        const walletID = process.env.PAYOUT_WALLET_ID; // Wallet ID

        try {
            const requestBody = {
                "ewallet": walletID,
                "merchant_reference_id": "Test-Cash-8888",
                "payout_amount": request.body.payout_amount,
                "payout_method_type": "xx_swift_bank",
                "sender_currency": "USD",
                "sender_country": request.body.sender_country,
                "beneficiary_country": request.body.beneficiary_country,
                "payout_currency": request.body.payout_currency,
                "sender_entity_type": "company",
                "beneficiary_entity_type": "individual",
                "beneficiary": {
                   "payment_type": "regular",
                   "address": request.body.beneficiary_address,
                   "city": request.body.beneficiary_city,
                   "country": request.body.beneficiary_country,
                   "first_name": request.body.beneficiary_first_name,
                   "last_name": request.body.beneficiary_last_name,
                   "state": request.body.beneficiary_state,
                   "postcode": request.body.beneficiary_postcode,
                   "bic_swift": "573675777",
                   "account_number": request.body.beneficiary_account_number,
               },
               "sender": {
                   "company_name" : "My Company",
                   "address": request.body.sender_address,
                   "city": "Anytown",
                   "state": "NY",
                   "phone_number": "+145434653466"
               },
               "description": request.body.transaction_description,
               "statement_descriptor": request.body.transaction_statement_descriptor,
               "metadata": {
                   "merchant_defined": true
               }
           };

           console.log(requestBody);
            const result = await makeRequest('POST', '/v1/payouts', requestBody);
            console.log("--------------------------");
            console.log(JSON.stringify(result.body.data));
            response.json(result.body.data);
            
          } catch (error) {
            
            response.json(error);
          }
        }

} 

module.exports = payoutController;