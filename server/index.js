import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Paymob Base URL
const PAYMOB_BASE_URL = 'https://egypt.paymob.com/api';

// 1. Authenticate with Paymob
const getAuthToken = async () => {
    try {
        const response = await axios.post(`${PAYMOB_BASE_URL}/auth/tokens`, {
            api_key: process.env.PAYMOB_API_KEY
        });
        return response.data.token;
    } catch (error) {
        console.error('Auth Error:', error.response?.data || error.message);
        throw new Error('Failed to authenticate with Paymob');
    }
};

// 2. Register Order
const registerOrder = async (authToken, amountInCents, items) => {
    try {
        const response = await axios.post(`${PAYMOB_BASE_URL}/ecommerce/orders`, {
            auth_token: authToken,
            delivery_needed: "false",
            amount_cents: amountInCents,
            currency: "EGP",
            items: items || []
        });
        return response.data.id;
    } catch (error) {
        console.error('Order Error:', error.response?.data || error.message);
        throw new Error('Failed to register order');
    }
};

// 3. Get Payment Key
const getPaymentKey = async (authToken, orderId, amountInCents ,userData) => {
    try {
        const response = await axios.post(`${PAYMOB_BASE_URL}/acceptance/payment_keys`, {
            auth_token: authToken,
            amount_cents: amountInCents,
            expiration: 3600,
            order_id: orderId,
            billing_data: {
                apartment: "NA",
                email: userData.email, // Should come from frontend
                floor: "NA",
                first_name: userData.first_name, // Should come from frontend
                street: "NA",
                building: "NA",
                phone_number: userData.phone_number, // Should come from frontend
                shipping_method: "NA",
                postal_code: "NA",
                city: "NA",
                country: "EG",
                last_name: userData.last_name,
                state: "NA"
            },
            currency: "EGP",
            integration_id: parseInt(process.env.PAYMOB_INTEGRATION_ID),
            lock_order_when_paid: "false"
        });
        return response.data.token;
    } catch (error) {
        console.error('Payment Key Error:', error.response?.data || error.message);
        throw new Error('Failed to generate payment key');
    }
};

// Main Endpoint: Create Payment Intent
app.post('/api/create-payment-intent', async (req, res) => {
    const { amount, items, userData } = req.body;

    try {
        // Amount must be in cents
        const amountInCents = amount * 100;

        // Step 1: Auth
        const authToken = await getAuthToken();

        // Step 2: Register Order
        const orderId = await registerOrder(authToken, amountInCents, items);

        // Step 3: Get Payment Key
        const paymentToken = await getPaymentKey(authToken, orderId, amountInCents ,userData);

        res.json({ 
            success: true, 
            paymentToken,
            orderId 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// Health Check
app.get('/', (req, res) => {
    res.send('English Learning Payment Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
