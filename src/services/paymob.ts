import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface PaymentIntentResponse {
    success: boolean;
    paymentToken?: string;
    orderId?: number;
    message?: string;
}

export const createPaymentIntent = async (amount: number, items: any[] = []): Promise<PaymentIntentResponse> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create-payment-intent`, {
            amount,
            items,
            userData: {
                // You can add user email, name, etc. here if needed
                email: "customer@example.com",
                first_name: "Customer",
                last_name: "Name",
                phone_number: "+201234567890"
            }
        });
        return response.data;
    } catch (error: any) {
        console.error('Error creating payment intent:', error.response?.data || error.message);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to connect to payment server'
        };
    }
};
