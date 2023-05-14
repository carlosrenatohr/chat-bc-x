const express = require('express')
const { bigcommerceReq } = require('./services/bigcommerce')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.status(200).send('server running yeah') )

async function get_tracking_number_by_order_id(order_id) {
    const TRACKING_URL_PREFIX = 'http://wwwapps.ups.com/WebTracking/processRequest?&tracknum=';
    try {
        let shipments = await bigcommerceReq(`v2/orders/${order_id}/shipments`, 'get');
        if (shipments?.[0]?.tracking_number) {
            let first_shipment = shipments[0];
            let tracking_info = (first_shipment.hasOwnProperty('tracking_number')) ? first_shipment.tracking_number : null;
            if (tracking_info !== null) {
                tracking_url = `${TRACKING_URL_PREFIX}${tracking_info}`;
                console.log(`tracking def > order_id:  ${order_id}`)
                console.log(`tracking def > tracking_id:  ${tracking_info}`)
                return tracking_url;
            } else {
                console.log('tracking def < number not found.')
            }
        }
    } catch (err) {
        console.error(`>> Error on order received webhook > tracking number: ${err}`, err);
    }
    return tracking_url;
    
}

async function get_order_status_by_order_id(order_id) {
    let order_status = null, tracking_link = null;
    try {
        let orderResponse = await bigcommerceReq(`v2/orders/${order_id}`, 'get');
        if (orderResponse !== null) {
            // send a success response to Dialogflow
            order_status = orderResponse.status;
            if (["Shipped", "Completed"].includes(order_status)) {
                tracking_link = await get_tracking_number_by_order_id(order_id);
            }
        }
        console.log(`order_id status def > order_status: ${order_status}`)
        console.log(`order_id status def > tracking link: ${tracking_link}`)
        return {order_status, tracking_link};
    } catch (err) {
        console.error(`>> Error on order_id status def: ${err}`, err);
    }
    return {order_status, tracking_link};
}

async function get_order_status_by_email(email) {
    let order_status = null, tracking_link = null;
    try {
        let orderResponse = await bigcommerceReq(`v2/orders?email=${email}&sort=date_created:desc&limit=1`, 'get');
        // console.log(orderResponse, 'orderResponse.data')
        if (orderResponse !== null) {
            // send a success response to Dialogflow
            order = orderResponse[0]
            order_id = order.id
            order_status = orderResponse.status;
            if (["Shipped", "Completed"].includes(order_status)) {
                tracking_link = await get_tracking_number_by_order_id(order_id);
            }
        }
        console.log(`email status def > order_status: ${order_status}`)
        console.log(`email status def > tracking link: ${tracking_link}`)
        return {order_status, tracking_link};
    } catch (err) {

        console.error(`>> Error on email status def: ${err}`, err);

    }
    return {order_status, tracking_link};
}


app.post('/webhook', async (req, res) => {
    console.log('Webhook received');
    let response_text = `I'm sorry, I don't understand. Could you provide more information?`,
         order_status = null, tracking_link = null;
    const queryResult = req.body.queryResult ? req.body.queryResult : false;
    console.log('req queryResult')
    console.log(queryResult)
    try {
        if (queryResult.action && queryResult.action === 'check_order_status') {
            const parameters = queryResult.hasOwnProperty('parameters') ? queryResult.parameters : {}; // 58601
            console.log('req parameters',parameters);
            
            if (parameters.hasOwnProperty('order_id')) {
                const order_id = parameters.order_id;
                ({ order_status, tracking_link } =  await get_order_status_by_order_id(order_id));
            } else if (parameters.hasOwnProperty('email')) {
                const email = parameters.email;
                ({ order_status, tracking_link} =  await get_order_status_by_email(email)); 
            } else {
                response_text = 'Webhook received with no parameters.';
            }
            console.log('req order_status', order_status)
            console.log('req tracking_link', tracking_link)
            if (typeof tracking_link === 'undefined' || tracking_link === null) {
                if (typeof order_status === 'undefined' || order_status === null ) {
                    response_text = "I'm sorry, I couldn't find any shipping information for that order."
                } else {
                    if (order_status == "Shipped" || order_status == "Completed")
                        response_text = `Great news! Your order is already ${order_status}.`;
                    else  
                        response_text = `Your order status is ${order_status}.`
                }
            } else 
                response_text = `Great news! Your order has shipped! Here's the tracking information: \n${tracking_link}`
            response_text += "\n\n Is there anything else I can help you with?"
        }
    } catch( err ) {
        console.console(`>> Error on webhook request  def: ${err}`, err);
        console.error(err);
    }
            
    return res.json({ fulfillmentText: response_text });
})


module.exports = app ;