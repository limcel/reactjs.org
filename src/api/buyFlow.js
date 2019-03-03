import {initiateCheckoutSession, initiatePayment} from 'api/axios';

export const buyFlow = async () => {
  const checkoutSessionId = await initiateCheckoutSession();
  console.log(checkoutSessionId);
  const purchase = await initiatePayment(checkoutSessionId);
  console.log(purchase);
};
